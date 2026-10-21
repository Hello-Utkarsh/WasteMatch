import React from 'react';
import { Truck, CheckCircle2, AlertTriangle, Layers, MapPin } from 'lucide-react';
import { MatchOption } from '../../mock/types';

interface NetworkMapSvgProps {
  selectedMatch: MatchOption | null;
  isSolving: boolean;
  hasSolved: boolean;
  onSelectRecommended?: () => void;
}

export const NetworkMapSvg: React.FC<NetworkMapSvgProps> = ({
  selectedMatch,
  isSolving,
  hasSolved,
}) => {
  // SVG Canvas 640 x 420 coordinates
  // Generators (Left / Upper cluster)
  // G1: Shree Ganesh (Ghaziabad) - x: 260, y: 155
  // G2: Bharat Paper (Muzaffarnagar) - x: 280, y: 85
  // G3: Rana Plastics (Faridabad) - x: 250, y: 190
  // G4: Krishna Textile (Panipat) - x: 210, y: 110
  // G5: Singh Foundry (Ludhiana) - x: 130, y: 50

  // Receivers (Target destinations)
  // R1: Aravali Cement (Rajasthan) - x: 180, y: 350
  // R2: GreenBrick (Meerut) - x: 310, y: 135
  // R3: EcoPoly (Rewari) - x: 190, y: 220
  // R4: NeutraChem (Gujarat) - x: 90, y: 380

  const isHeroBundle = selectedMatch?.id === 'match-opt-1';

  return (
    <div className="relative w-full h-full min-h-[380px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex flex-col">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold">North India Industrial Corridor (Offline Geo-Vector)</span>
        </div>

        {hasSolved && isHeroBundle && (
          <div className="bg-brand-600/95 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
            <Layers className="w-3.5 h-3.5" />
            <span>Optimal Multi-Party Bundle Active (92% Fill)</span>
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 640 420"
        className="w-full h-full flex-1 select-none"
        style={{ background: 'radial-gradient(circle at 40% 40%, #1e293b 0%, #0f172a 100%)' }}
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.4" />
          </pattern>

          {/* Glow filter for winning route */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Winning route gradient */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D1343A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect width="640" height="420" fill="url(#grid)" />

        {/* Stylized State Border Outlines (Delhi NCR / UP / Haryana / Rajasthan / Punjab) */}
        <g stroke="#334155" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6">
          {/* Punjab / Haryana boundary */}
          <path d="M 80 40 Q 150 90 200 130" />
          {/* Haryana / Delhi / UP */}
          <path d="M 200 130 Q 250 170 330 180" />
          {/* Rajasthan border */}
          <path d="M 120 180 Q 210 240 180 370" />
        </g>

        {/* Road Highway Network Lines */}
        <g stroke="#1e293b" strokeWidth="1.5" fill="none">
          <line x1="130" y1="50" x2="210" y2="110" />
          <line x1="210" y1="110" x2="260" y2="155" />
          <line x1="280" y1="85" x2="260" y2="155" />
          <line x1="260" y1="155" x2="250" y2="190" />
          <line x1="250" y1="190" x2="190" y2="220" />
          <line x1="190" y1="220" x2="180" y2="350" />
          <line x1="260" y1="155" x2="310" y2="135" />
        </g>

        {/* Dynamic Match Corridors */}
        {hasSolved && (
          <g>
            {/* Candidate Sub-optimal Edge: Single to Gujarat */}
            <path
              d="M 260 155 Q 160 260 90 380"
              fill="none"
              stroke="#64748b"
              strokeWidth={selectedMatch?.id === 'match-opt-2' ? '3' : '1'}
              strokeDasharray={selectedMatch?.id === 'match-opt-2' ? 'none' : '4 4'}
              opacity={selectedMatch?.id === 'match-opt-2' ? 0.9 : 0.3}
            />

            {/* Candidate Edge: Single to Meerut Brick */}
            <path
              d="M 260 155 L 310 135"
              fill="none"
              stroke="#64748b"
              strokeWidth={selectedMatch?.id === 'match-opt-3' ? '3' : '1'}
              strokeDasharray={selectedMatch?.id === 'match-opt-3' ? 'none' : '4 4'}
              opacity={selectedMatch?.id === 'match-opt-3' ? 0.9 : 0.3}
            />

            {/* WINNING HERO BUNDLE ROUTE */}
            {isHeroBundle && (
              <g>
                {/* Feeder 1: Muzaffarnagar (Bharat Paper) -> Ghaziabad Co-loading */}
                <path
                  d="M 280 85 Q 275 120 260 155"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />

                {/* Main Shared Trunk Route: Ghaziabad -> Aravali Cement Kiln */}
                <path
                  d="M 260 155 Q 220 230 180 350"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Animated Moving Truck on Shared Corridor */}
                <g className="transition-all duration-1000">
                  <circle cx="215" cy="255" r="14" fill="#D1343A" stroke="#FFFFFF" strokeWidth="2" />
                  <Truck x="207" y="247" width="16" height="16" color="#FFFFFF" />
                  <text
                    x="235"
                    y="260"
                    fill="#FDE8E8"
                    fontSize="10"
                    fontWeight="bold"
                    className="select-none"
                  >
                    Bundled Hazmat Tanker (21t / 92%)
                  </text>
                </g>
              </g>
            )}
          </g>
        )}

        {/* Solver Scanning Animation */}
        {isSolving && (
          <g>
            <circle cx="260" cy="155" r="90" fill="none" stroke="#D1343A" strokeWidth="1" strokeDasharray="5 5">
              <animateTransform attributeName="transform" type="rotate" from="0 260 155" to="360 260 155" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="260" cy="155" r="180" fill="none" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="8 8" opacity="0.6">
              <animateTransform attributeName="transform" type="rotate" from="360 260 155" to="0 260 155" dur="6s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* NODES: Generators (Red Nodes) */}
        {/* G1: Shree Ganesh Galvanizers (Hero Generator) */}
        <g transform="translate(260, 155)" className="cursor-pointer">
          <circle r="14" fill="#D1343A" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle r="22" fill="#D1343A" opacity="0.3" className="animate-ping" />
          <text x="18" y="4" fill="#FFFFFF" fontSize="11" fontWeight="bold">
            Shree Ganesh (Ghaziabad)
          </text>
          <text x="18" y="16" fill="#FCA5A5" fontSize="9">
            12t Acidic Pickle Liquor
          </text>
        </g>

        {/* G2: Bharat Paper Mills (Co-loading Generator) */}
        <g transform="translate(280, 85)" className="cursor-pointer">
          <circle r="10" fill={isHeroBundle ? '#F59E0B' : '#DC2626'} stroke="#FFFFFF" strokeWidth="2" />
          <text x="16" y="0" fill="#FFFFFF" fontSize="10" fontWeight="bold">
            Bharat Paper & Board
          </text>
          <text x="16" y="12" fill="#FCD34D" fontSize="9">
            9t Alkaline Sludge (Bundled)
          </text>
        </g>

        {/* Other Generators */}
        <g transform="translate(210, 110)" opacity="0.65">
          <circle r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="10" y="3" fill="#94A3B8" fontSize="8">
            Krishna Textile (Panipat)
          </text>
        </g>

        <g transform="translate(250, 190)" opacity="0.65">
          <circle r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="10" y="3" fill="#94A3B8" fontSize="8">
            Rana Plastics (Faridabad)
          </text>
        </g>

        <g transform="translate(130, 50)" opacity="0.5">
          <circle r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="10" y="3" fill="#94A3B8" fontSize="8">
            Singh Foundry (Ludhiana)
          </text>
        </g>

        {/* NODES: Receivers (Dark / Emerald Nodes) */}
        {/* R1: Aravali Cement Works (Hero Receiver) */}
        <g transform="translate(180, 350)" className="cursor-pointer">
          <circle r="14" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle r="24" fill="#10B981" opacity="0.25" className="animate-pulse" />
          <text x="-160" y="4" fill="#FFFFFF" fontSize="11" fontWeight="bold">
            Aravali Cement Works
          </text>
          <text x="-160" y="16" fill="#6EE7B7" fontSize="9">
            Co-processing Kiln (Rajasthan)
          </text>
        </g>

        {/* R2: GreenBrick Industries */}
        <g transform="translate(310, 135)" opacity="0.65">
          <circle r="7" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="12" y="3" fill="#94A3B8" fontSize="8">
            GreenBrick (Meerut)
          </text>
        </g>

        {/* R3: EcoPoly */}
        <g transform="translate(190, 220)" opacity="0.5">
          <circle r="6" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1" />
          <text x="10" y="3" fill="#94A3B8" fontSize="8">
            EcoPoly Recyclers (Rewari)
          </text>
        </g>

        {/* R4: NeutraChem */}
        <g transform="translate(90, 380)" opacity="0.65">
          <circle r="7" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="12" y="3" fill="#94A3B8" fontSize="8">
            NeutraChem (Gujarat)
          </text>
        </g>
      </svg>

      {/* Map Footer Legend */}
      <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            <span className="text-slate-300">Waste Generators</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-300">Co-Processing Off-takers</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-400" />
            <span className="text-slate-300">Co-loading Hazmat Link</span>
          </span>
        </div>

        <div className="text-[10px] text-slate-500 font-mono">
          Route Distance: 420 km via Western DFC Corridor
        </div>
      </div>
    </div>
  );
};

