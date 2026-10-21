import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const BaselineComparisonChart: React.FC = () => {
  const data = [
    {
      name: 'Status Quo (TSDF Landfill)',
      costOrBenefit: -84000,
      label: '-₹84,000 (Disposal Cost Penalty)',
      fill: '#DC2626',
    },
    {
      name: 'Single Unbundled Trip',
      costOrBenefit: 46000,
      label: '+₹46,000 (52% Truckfill Penalty)',
      fill: '#F59E0B',
    },
    {
      name: 'WasteMatch Co-loaded Bundle',
      costOrBenefit: 99000,
      label: '+₹99,000 (92% Fill + Replaced Raw Meal)',
      fill: '#15803D',
    },
  ];

  return (
    <div className="bg-surface rounded-2xl p-5 border border-surface-subtle shadow-card">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
          Economic Net Outcome Comparison (₹ per Batch)
        </h4>
        <span className="text-[11px] font-bold text-status-success">
          +₹183,000 Total Swing
        </span>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[-90000, 110000]}
              tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
              tick={{ fontSize: 10, fill: '#8C8785' }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={160}
              tick={{ fontSize: 11, fill: '#1A1818', fontWeight: 600 }}
            />
            <Tooltip
              formatter={(val: number) => [
                `₹${val.toLocaleString()}`,
                val >= 0 ? 'Net Economic Gain' : 'Disposal Cost Liability',
              ]}
              contentStyle={{
                backgroundColor: '#1A1818',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="costOrBenefit" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-2 border-t border-surface-subtle flex items-center justify-between text-[11px] text-ink-muted">
        <span>Includes TSDF tipping fee, hazardous transport & receiver credit</span>
        <span className="font-semibold text-status-success">
          14.8 tonnes CO₂ avoided
        </span>
      </div>
    </div>
  );
};

