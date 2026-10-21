export type HazardClass = 'Non-hazardous' | 'Corrosive' | 'Flammable' | 'Toxic' | 'Mixed';

export type PhysicalState = 'Solid' | 'Liquid' | 'Sludge' | 'Powder';

export type SourceType = 'photo' | 'lab_pdf' | 'nir_scan' | 'voice_note';

export interface ParameterData {
  name?: string;
  category?: 'Physicochemical' | 'Heavy Metals' | 'Hazmat & Safety' | 'Combustion / Co-Processing' | 'Logistics';
  value: number | string;
  unit?: string;
  confidence: number;
  source: SourceType;
  benchmark?: string;
  isFlagged?: boolean;
}

export interface WasteFingerprint {
  id: string;
  generatorId: string;
  material: string;            // e.g. "Spent pickle liquor (HCl)"
  quantityTonnes: number;
  physicalState: PhysicalState;
  hazardClass: HazardClass;
  confidence: number;          // 0-1 overall extraction confidence
  params: Record<string, ParameterData>;
  // 50 parameters total in the concept. Show ~12 key ones in UI, rest behind "View all 50".
}

export interface Party {
  id: string;
  name: string;
  type: 'generator' | 'receiver';
  city: string;
  state: string;
  lat: number;
  lng: number;
  industry: string;
  capacityTonnesPerMonth?: number;
  acceptedMaterials?: string[];
}

export interface RuleCheck {
  rule: string;
  source: 'EU BREF' | 'EPA' | 'CPCB';
  status: 'pass' | 'warn' | 'fail';
  note: string;
}

export interface MatchOption {
  id: string;
  receiverId: string;
  wasteIds: string[];
  title: string;
  description: string;
  compatibilityScore: number;       // 0-100
  rulesPassed: number;
  rulesTotal: number;
  rulesChecked: RuleCheck[];
  distanceKm: number;
  truckFillPct: number;
  revenuePerTonne: number;          // INR, can be negative (disposal fee avoided)
  disposalCostAvoided: number;
  netBenefit: number;
  co2SavedTonnes: number;
  recommended: boolean;
  transitCostSavedInr?: number;
  bundledParties?: string[];
}

export type EscrowStage = 'Locked' | 'In transit' | 'Delivered' | 'Verifying' | 'Verified' | 'Released';

export interface TelemetryPoint {
  t: string;
  lat: number;
  lng: number;
  tempC: number;
  sealIntact: boolean;
  locationName: string;
  speedKmh?: number;
}

export interface VerificationCheck {
  name: string;
  expected: string;
  measured: string;
  pass: boolean;
  margin?: string;
}

export interface VerificationResult {
  result: 'PASS' | 'FAIL';
  timestamp: string;
  operator: string;
  checks: VerificationCheck[];
  rejectionReason?: string;
}

export interface CreditCertificate {
  id: string;
  type: 'Carbon' | 'Plastic';
  tonnes: number;
  standard: string;
  issuedAt: string;
  txHash: string;
  issuer: string;
  beneficiary: string;
  co2eAvoidedTonnes: number;
  registryUrl?: string;
}

export interface Deal {
  id: string;
  matchId: string;
  amountInr: number;
  stage: EscrowStage;
  telemetry: TelemetryPoint[];
  verification?: VerificationResult;
  certificate?: CreditCertificate;
  contractAddress?: string;
  chainName?: string;
  escrowLockedAt?: string;
  generatorName?: string;
  partnerGeneratorName?: string;
  receiverName?: string;
  materialsSummary?: string;
  totalTonnes?: number;
}

export interface IngestedFile {
  id: string;
  type: SourceType;
  title: string;
  fileName: string;
  size: string;
  extractedSnippet: string;
  timestamp: string;
}

