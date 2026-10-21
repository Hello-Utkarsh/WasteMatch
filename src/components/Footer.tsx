import React from 'react';
import { SimulatedBadge } from './SimulatedBadge';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-surface-subtle bg-surface/50 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-sm font-semibold text-ink-primary font-display">
              Waste<span className="text-brand-600">Match</span>
            </span>
            <span className="hidden sm:inline text-ink-muted text-xs">•</span>
            <p className="text-xs text-ink-secondary text-center sm:text-left">
              AI-Powered Industrial Symbiosis & Autonomous Settlement Engine
            </p>
            <SimulatedBadge subtle />
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-xs text-ink-muted mr-1">UN SDGs:</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              SDG 9.4 Clean Industry
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              SDG 12.5 Waste Circularity
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              SDG 8.4 Resource Efficiency
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-surface-muted/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink-muted">
          <p>
            Designed for Live Pitch Demonstration. Offline standalone architecture.
          </p>
          <p className="mt-2 sm:mt-0">
            Delhi NCR & North India Industrial Corridor Prototype
          </p>
        </div>
      </div>
    </footer>
  );
};

