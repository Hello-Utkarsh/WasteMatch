import {
  HERO_FINGERPRINT,
  HERO_MATCH_OPTIONS,
  HERO_INITIAL_DEAL,
  SAMPLE_INPUT_FILES,
  ARAVALI_INCOMING_OFFERS,
  ReceiverOfferItem,
} from './data';
import {
  WasteFingerprint,
  MatchOption,
  Deal,
  IngestedFile,
} from './types';

// Helper for simulating async server latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory mutable states for current session
let currentFingerprint: WasteFingerprint = JSON.parse(JSON.stringify(HERO_FINGERPRINT));
let currentOffers: ReceiverOfferItem[] = JSON.parse(JSON.stringify(ARAVALI_INCOMING_OFFERS));
let currentDeal: Deal = JSON.parse(JSON.stringify(HERO_INITIAL_DEAL));

/**
 * Simulates uploading or loading a sample input file
 */
export async function getSampleFiles(): Promise<IngestedFile[]> {
  await delay(300);
  return [...SAMPLE_INPUT_FILES];
}

/**
 * Simulates AI ingestion & chemical feature extraction across multimodal inputs
 */
export async function extractFingerprint(
  _files: string[],
  onProgress?: (step: string, pct: number) => void
): Promise<WasteFingerprint> {
  const steps = [
    { label: 'Ingesting lab PDF & OCR parsing chemical assay...', pct: 20 },
    { label: 'Computer vision analysis of IBC storage vat liquid sample...', pct: 45 },
    { label: 'Deconvoluting handheld NIR absorption spectrum peaks...', pct: 70 },
    { label: 'Transcribing shift supervisor voice note & telemetry...', pct: 88 },
    { label: 'Synthesizing 50-parameter verified fingerprint...', pct: 100 },
  ];

  for (const step of steps) {
    if (onProgress) {
      onProgress(step.label, step.pct);
    }
    await delay(650);
  }

  return JSON.parse(JSON.stringify(currentFingerprint));
}

/**
 * Human-in-the-loop manual verification / parameter override
 */
export async function updateFingerprintParam(
  paramKey: string,
  newValue: number | string
): Promise<WasteFingerprint> {
  await delay(250);
  if (currentFingerprint.params[paramKey]) {
    currentFingerprint.params[paramKey].value = newValue;
    currentFingerprint.params[paramKey].confidence = 0.99;
    currentFingerprint.params[paramKey].isFlagged = false;
  }
  return { ...currentFingerprint };
}

/**
 * Simulates the OR-Tools / Mixed Integer Linear Programming (MILP) solver
 */
export async function runOptimizer(
  _wasteId: string,
  onStep?: (msg: string, progressPct: number) => void
): Promise<MatchOption[]> {
  const steps = [
    { label: 'Querying geo-spatial receiver index within 500km radius...', pct: 25 },
    { label: 'Evaluating EU BREF & CPCB co-processing compatibility constraints...', pct: 55 },
    { label: 'Solving multi-depot vehicle routing & multi-party payload bundling...', pct: 85 },
    { label: 'Calculating Pareto-optimal net economic & CO₂ savings frontier...', pct: 100 },
  ];

  for (const step of steps) {
    if (onStep) {
      onStep(step.label, step.pct);
    }
    await delay(700);
  }

  return JSON.parse(JSON.stringify(HERO_MATCH_OPTIONS));
}

/**
 * Receiver dashboard: accept or decline an incoming material offer
 */
export async function updateReceiverOfferStatus(
  offerId: string,
  status: 'Accepted' | 'Declined'
): Promise<ReceiverOfferItem[]> {
  await delay(300);
  currentOffers = currentOffers.map((item) =>
    item.id === offerId ? { ...item, status } : item
  );
  return [...currentOffers];
}

export async function getReceiverOffers(): Promise<ReceiverOfferItem[]> {
  await delay(200);
  return [...currentOffers];
}

/**
 * Settle Engine: initialize or fetch active escrow deal
 */
export async function fetchCurrentDeal(): Promise<Deal> {
  await delay(200);
  return JSON.parse(JSON.stringify(currentDeal));
}

export async function advanceDealStage(nextStage: Deal['stage']): Promise<Deal> {
  await delay(400);
  currentDeal.stage = nextStage;
  return JSON.parse(JSON.stringify(currentDeal));
}

/**
 * AI Test-Strip verification with optional fail condition
 */
export async function verifyDelivery(forceFail: boolean = false): Promise<Deal> {
  await delay(1200);

  if (forceFail) {
    currentDeal.stage = 'Verifying';
    currentDeal.verification = {
      result: 'FAIL',
      timestamp: new Date().toLocaleTimeString() + ' IST',
      operator: 'Automated In-Line Sensor Array (Gate #4)',
      rejectionReason: 'Chloride threshold exceeded batch limit (Measured 242,000 ppm vs Max 200,000 ppm). Potential corrosive hazard to pre-calciner kiln refractory.',
      checks: [
        {
          name: 'pH Range (Extreme Acidic Compartment)',
          expected: 'pH 0.5 - 1.2',
          measured: 'pH 0.88',
          pass: true,
          margin: 'Compliant',
        },
        {
          name: 'Chloride Max Cap (< 200,000 ppm)',
          expected: '< 200,000 ppm',
          measured: '242,000 ppm [ANOMALY]',
          pass: false,
          margin: '+21% over safety threshold',
        },
        {
          name: 'Toxic Heavy Metals (Pb, Cd, Hg)',
          expected: 'Pb < 10, Cd < 1, Hg < 0.1 ppm',
          measured: 'Pb 4.6, Cd 0.11, Hg 0.01 ppm',
          pass: true,
          margin: 'Compliant',
        },
        {
          name: 'Optical Density & Turbidity Signature',
          expected: 'Dark olive liquid (1.25 - 1.32 g/cm³)',
          measured: 'Turbid dark amber, 1.34 g/cm³',
          pass: false,
          margin: 'Density mismatch detected',
        },
      ],
    };
  } else {
    currentDeal.stage = 'Verified';
    currentDeal.verification = JSON.parse(JSON.stringify(HERO_INITIAL_DEAL.verification!));
  }

  return JSON.parse(JSON.stringify(currentDeal));
}

/**
 * Smart Contract Escrow Release
 */
export async function releaseEscrowFunds(): Promise<Deal> {
  await delay(800);
  currentDeal.stage = 'Released';
  return JSON.parse(JSON.stringify(currentDeal));
}

/**
 * Reset demo state back to pristine
 */
export function resetDemoMockState() {
  currentFingerprint = JSON.parse(JSON.stringify(HERO_FINGERPRINT));
  currentOffers = JSON.parse(JSON.stringify(ARAVALI_INCOMING_OFFERS));
  currentDeal = JSON.parse(JSON.stringify(HERO_INITIAL_DEAL));
}

