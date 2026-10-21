import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Play, RotateCcw, Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import { SimulatedBadge } from './SimulatedBadge';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    fingerprint,
    matches,
    deal,
    guidedDemo,
    startGuidedDemo,
    resetAll,
  } = useDemoStore();

  const isLanding = location.pathname === '/';

  const steps = [
    {
      num: 1,
      title: 'Fingerprint',
      path: '/generator',
      done: !!fingerprint,
      active: location.pathname === '/generator',
    },
    {
      num: 2,
      title: 'Match & Optimize',
      path: '/matching',
      done: matches.length > 0,
      active: location.pathname === '/matching',
    },
    {
      num: 3,
      title: 'Settle & Trust',
      path: '/settlement',
      done: deal.stage === 'Released' || deal.stage === 'Verified',
      active: location.pathname === '/settlement',
    },
  ];

  const handleReset = () => {
    resetAll();
    navigate('/');
  };

  const handleStartDemo = () => {
    startGuidedDemo();
    navigate('/generator');
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surface-subtle shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-ink-primary font-display">
                  Waste<span className="text-brand-600">Match</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-100 text-brand-700">
                  AI v1.4
                </span>
              </div>
              <p className="text-[11px] text-ink-muted hidden sm:block -mt-0.5">
                Autonomous Industrial Symbiosis Engine
              </p>
            </div>
          </Link>
          <div className="hidden lg:block ml-2">
            <SimulatedBadge subtle />
          </div>
        </div>

        {/* 3-Step Interactive Pipeline Stepper */}
        {!isLanding && (
          <nav className="hidden md:flex items-center gap-1 bg-surface-subtle/80 p-1.5 rounded-full border border-surface-muted/60">
            {steps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <Link
                  to={step.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    step.active
                      ? 'bg-surface text-brand-700 shadow-sm font-bold border border-surface-muted'
                      : step.done
                      ? 'text-status-success hover:text-status-success hover:bg-surface/50'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-surface/40'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step.active
                        ? 'bg-brand-600 text-white'
                        : step.done
                        ? 'bg-status-success-bg text-status-success'
                        : 'bg-surface-muted text-ink-secondary'
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                  </span>
                  <span>{step.title}</span>
                </Link>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-ink-muted/50" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            title="Reset simulated environment to initial state"
            className="p-2 rounded-xl text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleStartDemo}
            disabled={guidedDemo.isActive}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              guidedDemo.isActive
                ? 'bg-surface-subtle text-ink-muted cursor-not-allowed border border-surface-muted'
                : 'bg-brand-600 hover:bg-brand-700 text-white hover:shadow-card active:scale-95'
            }`}
          >
            <Sparkles className="w-4 h-4 text-brand-200 animate-pulse" />
            <span className="hidden sm:inline">Run Guided Demo</span>
            <span className="sm:hidden">Demo</span>
            <Play className="w-3 h-3 fill-current ml-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

