import { create } from 'zustand';
import {
  WasteFingerprint,
  MatchOption,
  Deal,
  IngestedFile,
} from '../mock/types';
import {
  SAMPLE_INPUT_FILES,
  HERO_FINGERPRINT,
  HERO_MATCH_OPTIONS,
  HERO_INITIAL_DEAL,
} from '../mock/data';
import * as api from '../mock/api';

export interface GuidedDemoState {
  isActive: boolean;
  isPaused: boolean;
  stepIndex: number; // 0 to 6
  caption: string;
}

interface DemoStore {
  // Navigation & Pipeline Progress
  currentPipelineStep: 1 | 2 | 3;
  setPipelineStep: (step: 1 | 2 | 3) => void;

  // Generator Portal State
  uploadedFiles: IngestedFile[];
  isAnalyzing: boolean;
  analysisProgress: { label: string; pct: number };
  fingerprint: WasteFingerprint | null;
  addSampleFiles: () => void;
  runAnalysis: () => Promise<void>;
  updateParameter: (key: string, value: number | string) => Promise<void>;

  // Matching Engine State
  isSolving: boolean;
  solverProgress: { label: string; pct: number };
  hasSolved: boolean;
  matches: MatchOption[];
  selectedMatch: MatchOption | null;
  activeMatchTab: 'generator' | 'receiver';
  setActiveMatchTab: (tab: 'generator' | 'receiver') => void;
  runOptimizer: () => Promise<void>;
  selectMatch: (match: MatchOption) => void;

  // Settlement Engine State
  deal: Deal;
  isDelivering: boolean;
  isVerifying: boolean;
  forceFailMode: boolean;
  setForceFailMode: (val: boolean) => void;
  simulateDeliveryTransit: () => Promise<void>;
  runVerificationCheck: () => Promise<void>;
  releaseEscrowPayment: () => Promise<void>;

  // Guided Auto-Play Demo
  guidedDemo: GuidedDemoState;
  startGuidedDemo: () => void;
  pauseGuidedDemo: () => void;
  resumeGuidedDemo: () => void;
  nextGuidedDemoStep: () => void;
  stopGuidedDemo: () => void;

  // Reset
  resetAll: () => void;
}

export const useDemoStore = create<DemoStore>((set, get) => ({
  currentPipelineStep: 1,
  setPipelineStep: (step) => set({ currentPipelineStep: step }),

  // Generator Portal
  uploadedFiles: [],
  isAnalyzing: false,
  analysisProgress: { label: 'Ready', pct: 0 },
  fingerprint: null,

  addSampleFiles: () => {
    set({ uploadedFiles: [...SAMPLE_INPUT_FILES] });
  },

  runAnalysis: async () => {
    set({ isAnalyzing: true, analysisProgress: { label: 'Initializing multimodal ingestion...', pct: 5 } });
    try {
      const fp = await api.extractFingerprint(
        get().uploadedFiles.map((f) => f.id),
        (label, pct) => set({ analysisProgress: { label, pct } })
      );
      set({ fingerprint: fp, isAnalyzing: false, analysisProgress: { label: 'Analysis complete', pct: 100 } });
    } catch {
      set({ isAnalyzing: false });
    }
  },

  updateParameter: async (key: string, value: number | string) => {
    const updated = await api.updateFingerprintParam(key, value);
    set({ fingerprint: updated });
  },

  // Matching Engine
  isSolving: false,
  solverProgress: { label: 'Ready', pct: 0 },
  hasSolved: false,
  matches: [],
  selectedMatch: null,
  activeMatchTab: 'generator',
  setActiveMatchTab: (tab) => set({ activeMatchTab: tab }),

  runOptimizer: async () => {
    set({ isSolving: true, solverProgress: { label: 'Initializing constraint solver...', pct: 10 } });
    try {
      const opts = await api.runOptimizer(
        get().fingerprint?.id || 'fp-hero-01',
        (label, pct) => set({ solverProgress: { label, pct } })
      );
      set({
        matches: opts,
        selectedMatch: opts[0],
        hasSolved: true,
        isSolving: false,
        solverProgress: { label: 'Optimal match bundle synthesized', pct: 100 },
      });
    } catch {
      set({ isSolving: false });
    }
  },

  selectMatch: (match: MatchOption) => {
    set({ selectedMatch: match });
  },

  // Settlement Engine
  deal: JSON.parse(JSON.stringify(HERO_INITIAL_DEAL)),
  isDelivering: false,
  isVerifying: false,
  forceFailMode: false,
  setForceFailMode: (val: boolean) => set({ forceFailMode: val }),

  simulateDeliveryTransit: async () => {
    set({ isDelivering: true });
    // Advance deal from Locked -> In transit -> Delivered
    await api.advanceDealStage('In transit');
    set((state) => ({ deal: { ...state.deal, stage: 'In transit' } }));

    // Small delay to simulate road transit
    await new Promise((r) => setTimeout(r, 1200));

    await api.advanceDealStage('Delivered');
    set((state) => ({ deal: { ...state.deal, stage: 'Delivered' }, isDelivering: false }));
  },

  runVerificationCheck: async () => {
    set({ isVerifying: true });
    const isFail = get().forceFailMode;
    const updated = await api.verifyDelivery(isFail);
    set({ deal: updated, isVerifying: false });
  },

  releaseEscrowPayment: async () => {
    const updated = await api.releaseEscrowFunds();
    set({ deal: updated });
  },

  // Guided Demo Mode
  guidedDemo: {
    isActive: false,
    isPaused: false,
    stepIndex: 0,
    caption: '',
  },

  startGuidedDemo: () => {
    set({
      guidedDemo: {
        isActive: true,
        isPaused: false,
        stepIndex: 0,
        caption: 'Starting WasteMatch Autonomous Symbiosis Demo...',
      },
    });
  },

  pauseGuidedDemo: () => {
    set((s) => ({ guidedDemo: { ...s.guidedDemo, isPaused: true } }));
  },

  resumeGuidedDemo: () => {
    set((s) => ({ guidedDemo: { ...s.guidedDemo, isPaused: false } }));
  },

  nextGuidedDemoStep: () => {
    set((s) => ({
      guidedDemo: {
        ...s.guidedDemo,
        stepIndex: s.guidedDemo.stepIndex + 1,
      },
    }));
  },

  stopGuidedDemo: () => {
    set({
      guidedDemo: {
        isActive: false,
        isPaused: false,
        stepIndex: 0,
        caption: '',
      },
    });
  },

  // Reset
  resetAll: () => {
    api.resetDemoMockState();
    set({
      currentPipelineStep: 1,
      uploadedFiles: [],
      isAnalyzing: false,
      analysisProgress: { label: 'Ready', pct: 0 },
      fingerprint: null,
      isSolving: false,
      solverProgress: { label: 'Ready', pct: 0 },
      hasSolved: false,
      matches: [],
      selectedMatch: null,
      activeMatchTab: 'generator',
      deal: JSON.parse(JSON.stringify(HERO_INITIAL_DEAL)),
      isDelivering: false,
      isVerifying: false,
      forceFailMode: false,
      guidedDemo: {
        isActive: false,
        isPaused: false,
        stepIndex: 0,
        caption: '',
      },
    });
  },
}));

