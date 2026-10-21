import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight,
  Lock,
  Unlock,
  Radio,
  FileCheck,
  Check,
  XCircle,
  ExternalLink,
  Flame,
  Leaf,
  Layers,
  Thermometer,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { CertificateCard } from './CertificateCard';
import { SimulatedBadge } from '../../components/SimulatedBadge';
import { EscrowStage } from '../../mock/types';

export const SettlementPage: React.FC = () => {
  const {
    deal,
    isDelivering,
    isVerifying,
    forceFailMode,
    setForceFailMode,
    simulateDeliveryTransit,
    runVerificationCheck,
    releaseEscrowPayment,
  } = useDemoStore();

  const [activeTelemetryIndex, setActiveTelemetryIndex] = useState<number>(deal.telemetry.length - 1);

  const stages: { stage: EscrowStage; label: string; desc: string }[] = [
    { stage: 'Locked', label: '1. Escrow Locked', desc: 'Funds secured on-chain' },
    { stage: 'In transit', label: '2. In Transit', desc: 'IoT GPS & seals tracking' },
    { stage: 'Delivered', label: '3. Delivered', desc: 'Arrived at Kiln Gate #4' },
    { stage: 'Verifying', label: '4. Sensor Verifying', desc: 'In-line assay testing' },
    { stage: 'Verified', label: '5. Quality Verified', desc: 'Assay passed specs' },
    { stage: 'Released', label: '6. Funds Released', desc: 'Instant payout + Credit' },
  ];

  const stageOrder: EscrowStage[] = [
    'Locked',
    'In transit',
    'Delivered',
    'Verifying',
    'Verified',
    'Released',
  ];

  const currentStageIndex = stageOrder.indexOf(deal.stage);

  const handleRunVerification = async () => {
    await runVerificationCheck();
    if (!forceFailMode) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D1343A', '#15803D', '#F59E0B', '#10B981'],
      });
    }
  };

  const handleRelease = async () => {
    await releaseEscrowPayment();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#15803D', '#10B981', '#34D399', '#D1343A'],
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
            <span>Engine 3</span>
            <span>•</span>
            <span>Escrow Settlement, IoT Telemetry & Quality Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-primary font-display">
            Autonomous Deal Settlement & Escrow
          </h1>
          <p className="text-sm text-ink-secondary mt-1">
            Smart contract escrow protects both SME generator and receiver kiln until verified physical delivery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SimulatedBadge />
        </div>
      </div>

      {/* 6-Stage Horizontal Escrow Stepper */}
      <div className="bg-surface rounded-2xl p-4 sm:p-6 border border-surface-subtle shadow-card mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((stg, idx) => {
            const isCompleted = currentStageIndex > idx || (idx === 5 && deal.stage === 'Released');
            const isCurrent = currentStageIndex === idx && deal.stage !== 'Released';
            const isReleased = idx === 5 && deal.stage === 'Released';

            return (
              <div
                key={stg.stage}
                className={`p-3 rounded-xl border transition-all ${
                  isReleased || (isCurrent && deal.stage === 'Verified')
                    ? 'bg-status-success-bg/30 border-status-success'
                    : isCurrent
                    ? 'bg-brand-50 border-brand-500 shadow-sm ring-1 ring-brand-500/20'
                    : isCompleted
                    ? 'bg-surface border-surface-muted'
                    : 'bg-surface-subtle/40 border-surface-subtle opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted || isReleased
                        ? 'bg-status-success text-white'
                        : isCurrent
                        ? 'bg-brand-600 text-white animate-pulse'
                        : 'bg-surface-muted text-ink-muted'
                    }`}
                  >
                    {isCompleted || isReleased ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </span>

                  {isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-1.5 py-0.5 rounded">
                      Current
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-ink-primary truncate">
                  {stg.label}
                </div>
                <div className="text-[10px] text-ink-secondary mt-0.5 leading-tight">
                  {stg.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Split: Deal & Transit on Left, Quality Verification on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left Column: Deal Manifest & Live Telemetry (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Deal Manifest Box */}
          <div className="bg-surface rounded-3xl p-6 border border-surface-subtle shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-surface-subtle mb-4">
              <div>
                <span className="text-[10px] font-mono text-ink-muted uppercase">
                  Active Deal ID
                </span>
                <h3 className="text-base font-bold text-ink-primary font-mono">
                  {deal.id}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-ink-muted uppercase">Escrow Locked Amount</span>
                <div className="text-xl font-black text-status-success font-display">
                  ₹{deal.amountInr.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Parties Manifest */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-ink-secondary">Consortium Generators:</span>
                <div className="text-right font-medium text-ink-primary">
                  <div>{deal.generatorName} (12t)</div>
                  <div className="text-ink-muted">{deal.partnerGeneratorName} (9t)</div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-ink-secondary">Co-processing Receiver:</span>
                <strong className="text-ink-primary font-semibold">{deal.receiverName}</strong>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-ink-secondary">Total Transport Payload:</span>
                <strong className="text-ink-primary font-semibold">{deal.totalTonnes} Tonnes (Dual Tanker)</strong>
              </div>

              <div className="flex items-start justify-between pt-2 border-t border-surface-subtle">
                <span className="text-ink-secondary">Smart Contract Registry:</span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-brand-700">
                  <Lock className="w-3 h-3" />
                  <span>{deal.contractAddress}</span>
                  <span className="text-ink-muted">({deal.chainName})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Transit & IoT Telemetry Panel */}
          <div className="bg-surface rounded-3xl p-6 border border-surface-subtle shadow-card flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-600" />
                <h3 className="text-sm font-bold text-ink-primary">
                  Live Hazmat Road Transit (420 km)
                </h3>
              </div>

              {deal.stage === 'Locked' || deal.stage === 'In transit' ? (
                <button
                  onClick={simulateDeliveryTransit}
                  disabled={isDelivering}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{isDelivering ? 'Simulating Transit...' : 'Simulate Delivery Arrival'}</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-status-success bg-status-success-bg px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Arrived at Gate #4</span>
                </span>
              )}
            </div>

            {/* Telemetry Waypoints List */}
            <div className="space-y-2 mt-2">
              {deal.telemetry.map((pt, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTelemetryIndex(i)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeTelemetryIndex === i
                      ? 'bg-surface-subtle border-brand-300 shadow-sm'
                      : 'bg-surface border-surface-subtle hover:border-surface-muted'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-ink-primary">
                      {pt.locationName}
                    </span>
                    <span className="font-mono text-[10px] text-ink-muted">
                      {pt.t}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-ink-secondary">
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                      <span>{pt.tempC}°C</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Seal: {pt.sealIntact ? 'Tamper Intact' : 'Breached'}</span>
                    </span>
                    {pt.speedKmh !== undefined && (
                      <span className="text-ink-muted">{pt.speedKmh} km/h</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI In-Line Verification & Payout (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-subtle shadow-card">
            <div className="flex items-center justify-between pb-4 border-b border-surface-subtle mb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-600">
                  Receiver Gate Quality Verification
                </span>
                <h3 className="text-lg font-bold text-ink-primary mt-0.5">
                  Automated In-Line Chemical Assay
                </h3>
              </div>

              {/* Force Fail Demo Toggle */}
              <div className="flex items-center gap-2 bg-surface-subtle px-3 py-1.5 rounded-xl border border-surface-muted">
                <span className="text-[11px] font-semibold text-ink-secondary">
                  Demo Fail Path:
                </span>
                <button
                  onClick={() => setForceFailMode(!forceFailMode)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                    forceFailMode
                      ? 'bg-status-error text-white'
                      : 'bg-surface text-ink-muted border border-surface-muted'
                  }`}
                >
                  {forceFailMode ? 'FAIL ON' : 'NORMAL'}
                </button>
              </div>
            </div>

            {/* Test Strip Checks */}
            {deal.verification ? (
              <div className="space-y-4">
                {deal.verification.result === 'FAIL' ? (
                  <div className="p-4 rounded-2xl bg-status-error-bg/60 border border-status-error text-xs space-y-2">
                    <div className="flex items-center gap-2 text-status-error font-bold">
                      <XCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">Batch Rejected: Chemical Threshold Breached</span>
                    </div>
                    <p className="text-red-900 leading-relaxed">
                      {deal.verification.rejectionReason}
                    </p>
                    <div className="pt-2 border-t border-red-200 text-[11px] text-red-800 font-semibold flex items-center justify-between">
                      <span>Funds Locked in Escrow ($0 Released)</span>
                      <span>Dispute Arbitration Protocol Activated</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-status-success-bg/40 border border-status-success text-xs">
                    <div className="flex items-center gap-2 text-status-success font-bold mb-1">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm">Quality Verified: 100% In-Line Compliance</span>
                    </div>
                    <p className="text-emerald-900">
                      Sample titration matches original fingerprint. Kiln refractory safety guaranteed.
                    </p>
                  </div>
                )}

                {/* 4 Checks list */}
                <div className="space-y-2.5">
                  {deal.verification.checks.map((chk, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                        chk.pass
                          ? 'bg-surface border-surface-muted'
                          : 'bg-status-error-bg/30 border-red-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {chk.pass ? (
                          <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-status-error flex-shrink-0" />
                        )}
                        <div>
                          <div className="font-bold text-ink-primary">{chk.name}</div>
                          <div className="text-[11px] text-ink-muted">
                            Target: {chk.expected}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`font-mono font-bold ${
                            chk.pass ? 'text-status-success' : 'text-status-error'
                          }`}
                        >
                          {chk.measured}
                        </div>
                        <div className="text-[10px] text-ink-muted">{chk.margin}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Autonomous Release Action */}
                {deal.verification.result === 'PASS' && (
                  <div className="mt-6 pt-4 border-t border-surface-subtle">
                    {deal.stage === 'Released' ? (
                      <div className="p-4 rounded-2xl bg-status-success-bg/50 border border-status-success flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-status-success text-white flex items-center justify-center">
                            <Unlock className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-emerald-900">
                              Escrow Settled & Disbursed
                            </div>
                            <div className="text-[11px] text-emerald-700">
                              ₹99,000 transferred to Shree Ganesh & Bharat Paper
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-800">
                          TX #4f92...10fa
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={handleRelease}
                        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-status-success hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-card hover:shadow-elevated active:scale-98"
                      >
                        <Unlock className="w-4 h-4" />
                        <span>Release Smart Contract Escrow (₹99,000)</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Awaiting Verification CTA */
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-3">
                  <FileCheck className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-ink-primary">
                  Awaiting Arrival & Sample Titration
                </h4>
                <p className="text-xs text-ink-secondary max-w-xs mt-1 mb-6">
                  {deal.stage === 'Locked'
                    ? 'Simulate delivery transit to bring the tanker to Aravali Cement Kiln Gate #4.'
                    : 'The tanker is docked at the unloading manifold. Run verification check to test chemical limits.'}
                </p>

                <button
                  onClick={handleRunVerification}
                  disabled={isVerifying}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-card active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-brand-200" />
                  <span>{isVerifying ? 'Testing Spectrophotometry...' : 'Run In-Line Chemical Verification'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Certificate Display on Pass */}
          {deal.stage === 'Released' && deal.certificate && (
            <CertificateCard
              certificate={deal.certificate}
              onPrint={handlePrint}
            />
          )}
        </div>
      </div>

      {/* Bottom Impact Summary (Count-Up Highlighting) */}
      <div className="bg-ink-primary rounded-3xl p-6 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Lifecycle Symbiosis Outcome</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-display">
              Quantified Value Generated This Cycle
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">SDG 9.4 • 12.5 • 8.4 Aligned</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-brand-300 block mb-1">
              Net Economic Gain
            </span>
            <div className="text-3xl sm:text-4xl font-black font-display text-white">
              ₹99,000
            </div>
            <p className="text-[11px] text-surface-subtle mt-1">
              ₹84k landfill fee eliminated + ₹15k net byproduct sales revenue
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-emerald-300 block mb-1">
              Greenhouse Gases Avoided
            </span>
            <div className="text-3xl sm:text-4xl font-black font-display text-emerald-400">
              14.8 <span className="text-lg">t CO₂e</span>
            </div>
            <p className="text-[11px] text-surface-subtle mt-1">
              Displaced virgin bauxite & fossil fluxing agents in cement raw meal
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-amber-300 block mb-1">
              Diverted From Landfill
            </span>
            <div className="text-3xl sm:text-4xl font-black font-display text-amber-400">
              21.0 <span className="text-lg">Tonnes</span>
            </div>
            <p className="text-[11px] text-surface-subtle mt-1">
              100% circular valorization across Shree Ganesh and Bharat Paper
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

