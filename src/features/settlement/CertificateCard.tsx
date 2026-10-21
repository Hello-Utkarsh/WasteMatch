import React from 'react';
import { Award, Printer, CheckCircle2, ShieldCheck, QrCode, ExternalLink } from 'lucide-react';
import { CreditCertificate } from '../../mock/types';

interface CertificateCardProps {
  certificate: CreditCertificate;
  onPrint: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onPrint }) => {
  return (
    <div
      id="printable-certificate"
      className="bg-surface rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-elevated relative overflow-hidden"
    >
      {/* Decorative top pattern ribbon */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-brand-500" />

      {/* Watermark Logo Background */}
      <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none select-none text-emerald-900 font-display font-black text-9xl">
        WM
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-subtle">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm flex-shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Verified Industrial Offset Credit
              </span>
              <span className="text-xs font-mono text-ink-muted">
                {certificate.id}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-ink-primary font-display mt-0.5">
              Certificate of Industrial Byproduct Diversion
            </h3>
          </div>
        </div>

        <button
          onClick={onPrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink-primary hover:bg-black text-white text-xs font-bold transition-all shadow-sm print:hidden"
        >
          <Printer className="w-4 h-4" />
          <span>Download PDF / Print</span>
        </button>
      </div>

      {/* Certificate Body */}
      <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            This digital certificate autonomously certifies that <strong className="text-ink-primary">{certificate.tonnes} tonnes</strong> of hazardous chemical byproducts have been diverted from landfill disposal and successfully integrated into circular cement co-processing in compliance with CPCB Schedule I & EU BREF AFR standards.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-surface-subtle border border-surface-muted/60">
              <span className="text-[10px] text-ink-muted block uppercase font-bold">Avoided Emissions</span>
              <span className="text-lg font-black text-emerald-700 font-display">
                {certificate.co2eAvoidedTonnes} t CO₂e
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-subtle border border-surface-muted/60">
              <span className="text-[10px] text-ink-muted block uppercase font-bold">Standard Alignment</span>
              <span className="text-xs font-bold text-ink-primary block truncate">
                Verra VCS / Gold Std
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-subtle border border-surface-muted/60">
              <span className="text-[10px] text-ink-muted block uppercase font-bold">Issued At</span>
              <span className="text-xs font-bold text-ink-primary">
                {certificate.issuedAt}
              </span>
            </div>
          </div>

          <div className="pt-2 text-xs text-ink-secondary space-y-1">
            <div>
              <span className="text-ink-muted">Beneficiary Consortium: </span>
              <strong className="text-ink-primary">{certificate.beneficiary}</strong>
            </div>
            <div>
              <span className="text-ink-muted">Issuing Protocol: </span>
              <span className="font-mono text-ink-primary">{certificate.issuer}</span>
            </div>
          </div>
        </div>

        {/* QR Code & Chain Authenticity Box */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface-subtle border border-surface-muted text-center">
          <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-subtle border border-surface-muted flex items-center justify-center mb-3">
            <QrCode className="w-20 h-20 text-ink-primary" />
          </div>
          <span className="text-[10px] font-mono text-ink-muted uppercase">
            Proof of Receipt Hash
          </span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold break-all max-w-[190px] mt-0.5">
            {certificate.txHash.slice(0, 22)}...
          </span>

          <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-status-success">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Autonomous Smart Escrow</span>
          </div>
        </div>
      </div>

      {/* Certificate Footer */}
      <div className="pt-4 border-t border-surface-subtle flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink-muted gap-2">
        <span>Public Ledger Proof: Base Sepolia (Simulated Execution)</span>
        <span className="font-mono">Hash ID: {certificate.txHash.slice(0, 16)}</span>
      </div>
    </div>
  );
};

