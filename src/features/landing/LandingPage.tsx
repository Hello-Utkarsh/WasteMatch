import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Fingerprint,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Truck,
  CheckCircle2,
  BarChart3,
  Flame,
  Leaf,
  Layers,
  Building2,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { SimulatedBadge } from '../../components/SimulatedBadge';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { startGuidedDemo } = useDemoStore();

  const handleStartGuidedDemo = () => {
    startGuidedDemo();
    navigate('/generator');
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-brand-50/70 via-transparent to-transparent pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 mb-6 shadow-subtle">
              <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
              <span className="text-xs font-semibold text-brand-700">
                AI Industrial Symbiosis & Autonomous Settlement Engine
              </span>
              <span className="text-xs text-ink-muted">|</span>
              <SimulatedBadge subtle />
            </div>

            {/* Main Punchy Hero Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink-primary font-display leading-[1.12]">
              Turn waste disposal costs into{' '}
              <span className="text-brand-600 underline decoration-brand-200 decoration-wavy decoration-2">
                resource revenue.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-lg sm:text-xl text-ink-secondary leading-relaxed max-w-2xl mx-auto text-balance">
              WasteMatch converts messy hazardous chemical manifests into 50-parameter fingerprints, solves multi-facility freight bundling, and settles deals via escrow with in-line test verification.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/generator')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base transition-all shadow-card hover:shadow-elevated active:scale-98"
              >
                <span>Start Interactive Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleStartGuidedDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-surface hover:bg-surface-subtle text-ink-primary font-semibold text-base transition-all border border-surface-muted shadow-sm hover:shadow"
              >
                <Sparkles className="w-5 h-5 text-brand-600" />
                <span>Run 3-Min Guided Story</span>
              </button>
            </div>

            {/* Live Context Micro-note */}
            <div className="mt-6 flex items-center justify-center gap-3 text-xs text-ink-muted">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                No login required
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                Full offline execution
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                Sample Indian SME datasets included
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Stat Cards (Directly from pitch deck) */}
      <section className="py-12 bg-surface border-y border-surface-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <div className="p-6 rounded-2xl bg-brand-50/60 border border-brand-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-brand-700 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider">The National Gap</span>
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-brand-700 font-display">
                  ₹252 Lakh Cr
                </div>
                <div className="text-sm font-semibold text-ink-primary mt-1">
                  Valuable industrial material lost annually
                </div>
                <p className="text-xs text-ink-secondary mt-2">
                  Chemical byproducts dumped or landfilled in India each year due to lack of verified off-takers and chemistry mismatches.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-200/50 flex items-center gap-1.5 text-[11px] font-medium text-brand-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Source: CPCB Industrial Byproduct Census 2025</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-6 rounded-2xl bg-surface-subtle/80 border border-surface-muted flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-ink-secondary mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider">Opportunity</span>
                  <Leaf className="w-5 h-5 text-status-success" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-ink-primary font-display">
                  70%
                </div>
                <div className="text-sm font-semibold text-ink-primary mt-1">
                  Has a viable secondary manufacturing use
                </div>
                <p className="text-xs text-ink-secondary mt-2">
                  Acid wastes neutralize alkaline streams; spent sands feed precast brick kilns; heavy metal liquors serve as cement clinker flux.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-muted flex items-center gap-1.5 text-[11px] font-medium text-status-success">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>EU BREF & Circular Metallurgy Benchmarks</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-6 rounded-2xl bg-surface-subtle/80 border border-surface-muted flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-ink-secondary mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider">The SME Bottleneck</span>
                  <Truck className="w-5 h-5 text-brand-600" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-ink-primary font-display">
                  85%
                </div>
                <div className="text-sm font-semibold text-ink-primary mt-1">
                  Rejected for partial truckload freight
                </div>
                <p className="text-xs text-ink-secondary mt-2">
                  Individual SMEs generate half-truckloads, making dedicated hazardous transit economically impossible without intelligent bundling.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-muted flex items-center gap-1.5 text-[11px] font-medium text-ink-secondary">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Solved via WasteMatch Multi-Depot Bundling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3-Engine Architecture Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs uppercase font-bold tracking-widest text-brand-600 mb-2">
              Autonomous Pipeline
            </h2>
            <p className="text-3xl font-extrabold text-ink-primary font-display">
              Three engines that turn liability into liquidity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Engine 1 */}
            <div className="p-8 rounded-3xl bg-surface border border-surface-subtle shadow-card hover:shadow-elevated transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-6">
                <Fingerprint className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-600 mb-1">
                Engine 1 • Ingestion
              </span>
              <h3 className="text-xl font-bold text-ink-primary mb-3">
                50-Parameter Fingerprinting
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed flex-1">
                SMEs upload messy PDF assays, vat photos, handheld NIR scans, or spoken voice logs. Multimodal AI extracts pH, chlorides, and heavy metals into a structured verified fingerprint.
              </p>
              <div className="mt-6 pt-6 border-t border-surface-muted/60 flex items-center justify-between text-xs font-semibold text-brand-700">
                <span>Human-in-the-loop verify</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Engine 2 */}
            <div className="p-8 rounded-3xl bg-surface border border-surface-subtle shadow-card hover:shadow-elevated transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-600 mb-1">
                Engine 2 • Optimization
              </span>
              <h3 className="text-xl font-bold text-ink-primary mb-3">
                Constraint Solver & Bundling
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed flex-1">
                Evaluates 500+ EU BREF & CPCB co-processing rules. Pairs acidic pickle liquor with alkaline sludge into one 92% full-truck hazmat convoy, converting disposal penalties into net profit.
              </p>
              <div className="mt-6 pt-6 border-t border-surface-muted/60 flex items-center justify-between text-xs font-semibold text-brand-700">
                <span>MILP & Rule Verification</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Engine 3 */}
            <div className="p-8 rounded-3xl bg-surface border border-surface-subtle shadow-card hover:shadow-elevated transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-600 mb-1">
                Engine 3 • Settlement
              </span>
              <h3 className="text-xl font-bold text-ink-primary mb-3">
                Escrow & In-Line Verification
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed flex-1">
                Smart contract holds payment in escrow during transit. At receiver gate, automated in-line sensor checks verify chemical integrity before triggering autonomous fund release and carbon credits.
              </p>
              <div className="mt-6 pt-6 border-t border-surface-muted/60 flex items-center justify-between text-xs font-semibold text-brand-700">
                <span>Tamper-proof settlement</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Scenario Spotlight Banner */}
      <section className="py-12 bg-ink-primary text-white mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-bold mb-3">
                <Layers className="w-3.5 h-3.5" />
                Featured Live Demo Scenario: Delhi NCR Corridor
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                Shree Ganesh Acid + Bharat Paper Sludge → Aravali Cement
              </h3>
              <p className="mt-3 text-sm text-surface-subtle leading-relaxed">
                Individually, Shree Ganesh's 12t of acidic pickle liquor costs ₹84,000 to landfill. Bharat Paper faces similar penalties for alkaline sludge. WasteMatch bundles them into a single 21t load for Aravali Cement Kiln, unlocking <span className="text-status-success-bg font-bold">₹99,000 net benefit</span> and avoiding 14.8 tonnes of CO₂.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-4">
              <button
                onClick={() => navigate('/generator')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm transition-transform active:scale-95 shadow-lg"
              >
                <span>Launch Scenario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

