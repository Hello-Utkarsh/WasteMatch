import {
  Party,
  WasteFingerprint,
  MatchOption,
  Deal,
  IngestedFile,
} from './types';

// ==========================================
// 1. GENERATOR & RECEIVER PARTIES
// ==========================================

export const GENERATORS: Party[] = [
  {
    id: 'gen-1',
    name: 'Shree Ganesh Galvanizers',
    type: 'generator',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    lat: 28.6692,
    lng: 77.4538,
    industry: 'Steel Hot-Dip Galvanizing & Surface Finishing',
    capacityTonnesPerMonth: 12,
    acceptedMaterials: ['Spent pickle liquor (HCl)'],
  },
  {
    id: 'gen-2',
    name: 'Bharat Paper & Board Mills',
    type: 'generator',
    city: 'Muzaffarnagar',
    state: 'Uttar Pradesh',
    lat: 29.4727,
    lng: 77.7085,
    industry: 'Kraft Pulp & Recycled Paper Processing',
    capacityTonnesPerMonth: 9,
    acceptedMaterials: ['Alkaline caustic sludge'],
  },
  {
    id: 'gen-3',
    name: 'Rana Plastics Ltd.',
    type: 'generator',
    city: 'Faridabad',
    state: 'Haryana',
    lat: 28.4089,
    lng: 77.3178,
    industry: 'Automotive Injection Moulding',
    capacityTonnesPerMonth: 15,
    acceptedMaterials: ['Mixed polyolefin scrap'],
  },
  {
    id: 'gen-4',
    name: 'Krishna Textile Processing',
    type: 'generator',
    city: 'Panipat',
    state: 'Haryana',
    lat: 29.3909,
    lng: 76.9635,
    industry: 'Textile Yarn Dyeing & Washing',
    capacityTonnesPerMonth: 7,
    acceptedMaterials: ['Dye-house wastewater sludge'],
  },
  {
    id: 'gen-5',
    name: 'Singh Foundry Works',
    type: 'generator',
    city: 'Ludhiana',
    state: 'Punjab',
    lat: 30.9010,
    lng: 75.8573,
    industry: 'Grey Iron Casting & Moulding',
    capacityTonnesPerMonth: 20,
    acceptedMaterials: ['Spent resin-bonded foundry sand'],
  },
];

export const RECEIVERS: Party[] = [
  {
    id: 'rec-1',
    name: 'Aravali Cement Works (Co-processing Kiln)',
    type: 'receiver',
    city: 'Nimbahera / Chittorgarh',
    state: 'Rajasthan',
    lat: 24.6225,
    lng: 74.6869,
    industry: 'Cement Clinker Manufacturing (Co-processing AFR)',
    capacityTonnesPerMonth: 450,
    acceptedMaterials: ['Spent acid', 'Alkaline sludge', 'Solid recovered fuel', 'High-calorific waste'],
  },
  {
    id: 'rec-2',
    name: 'GreenBrick Eco-Industries',
    type: 'receiver',
    city: 'Meerut',
    state: 'Uttar Pradesh',
    lat: 28.9845,
    lng: 77.7064,
    industry: 'Fly Ash & Geopolymer Bricks Manufacturing',
    capacityTonnesPerMonth: 120,
    acceptedMaterials: ['Foundry sand', 'Inorganic industrial sludge', 'Fly ash'],
  },
  {
    id: 'rec-3',
    name: 'EcoPoly Advanced Recyclers',
    type: 'receiver',
    city: 'Rewari',
    state: 'Haryana',
    lat: 28.1834,
    lng: 76.6191,
    industry: 'Mechanical & Chemical Polymer Compounding',
    capacityTonnesPerMonth: 80,
    acceptedMaterials: ['HDPE/PP Rigid scrap', 'Clean post-industrial polymer purge'],
  },
  {
    id: 'rec-4',
    name: 'NeutraChem Solutions',
    type: 'receiver',
    city: 'Ankleshwar / Dahej',
    state: 'Gujarat',
    lat: 21.6264,
    lng: 73.0152,
    industry: 'Hydrochloric Acid Regeneration & Ferric Chloride Synthesis',
    capacityTonnesPerMonth: 200,
    acceptedMaterials: ['Spent pickle liquor', 'Ferrous chloride solution'],
  },
];

// ==========================================
// 2. HERO SAMPLE INGESTION FILES
// ==========================================

export const SAMPLE_INPUT_FILES: IngestedFile[] = [
  {
    id: 'file-lab',
    type: 'lab_pdf',
    title: 'SGS Lab Report - Batch #SG-2026-08',
    fileName: 'SGS_Chemical_Assay_Batch_SG08.pdf',
    size: '1.4 MB',
    extractedSnippet: 'pH: 0.85 (Strong Acid) | Free HCl: 4.8% | Fe Total: 118,500 ppm | Chloride: 182,000 ppm',
    timestamp: '2 hours ago',
  },
  {
    id: 'file-photo',
    type: 'photo',
    title: 'Storage IBC Tank & Vat Visual Inspection',
    fileName: 'IBC_Tanks_Vat_Inspection_Aug.jpg',
    size: '3.8 MB',
    extractedSnippet: 'Clear greenish-dark liquid | Low turbidity | No visible sediment cake | Density est: 1.28 g/cm³',
    timestamp: 'Yesterday',
  },
  {
    id: 'file-nir',
    type: 'nir_scan',
    title: 'Handheld NIR Spectroscopy Array',
    fileName: 'MicroNIR_Scan_Point_04.csv',
    size: '420 KB',
    extractedSnippet: 'Peak absorption at 1440nm & 1940nm (aqueous HCl hydrate) | Hydrocarbon traces < 12 ppm',
    timestamp: 'Today, 09:15 AM',
  },
  {
    id: 'file-voice',
    type: 'voice_note',
    title: 'Plant Shift Supervisor Voice Log',
    fileName: 'Shift_Foreman_Ramesh_PickleTank4.m4a',
    size: '2.1 MB',
    extractedSnippet: '"We cleared 12 tonnes from line 2 after mild steel descaling. Temperature was around 32°C, no oil skimmings added."',
    timestamp: 'Today, 10:30 AM',
  },
];

// ==========================================
// 3. 50-PARAMETER FINGERPRINT (Hero: Spent Pickle Liquor)
// ==========================================

export const HERO_FINGERPRINT: WasteFingerprint = {
  id: 'fp-hero-01',
  generatorId: 'gen-1',
  material: 'Spent pickle liquor (HCl aqueous solution)',
  quantityTonnes: 12.0,
  physicalState: 'Liquid',
  hazardClass: 'Corrosive',
  confidence: 0.94,
  params: {
    // 12 Key Parameters shown on primary dashboard
    pH: {
      name: 'pH Level',
      category: 'Physicochemical',
      value: 0.85,
      unit: 'pH',
      confidence: 0.98,
      source: 'lab_pdf',
      benchmark: '< 2.0 (Extreme Acidic)',
      isFlagged: false,
    },
    chloride: {
      name: 'Total Chloride (Cl⁻)',
      category: 'Physicochemical',
      value: 182000,
      unit: 'ppm',
      confidence: 0.96,
      source: 'lab_pdf',
      benchmark: '150,000 - 210,000 ppm',
      isFlagged: false,
    },
    calorificValue: {
      name: 'Net Calorific Value (NCV)',
      category: 'Combustion / Co-Processing',
      value: 0.4,
      unit: 'MJ/kg',
      confidence: 0.92,
      source: 'lab_pdf',
      benchmark: '< 2.0 MJ/kg (Non-combustible)',
      isFlagged: false,
    },
    moisture: {
      name: 'Moisture / Water Content',
      category: 'Physicochemical',
      value: 68.4,
      unit: '%',
      confidence: 0.95,
      source: 'lab_pdf',
      benchmark: '65 - 75 %',
      isFlagged: false,
    },
    fe: {
      name: 'Dissolved Iron (Fe²⁺/Fe³⁺)',
      category: 'Heavy Metals',
      value: 118500,
      unit: 'ppm',
      confidence: 0.97,
      source: 'lab_pdf',
      benchmark: '100,000 - 130,000 ppm',
      isFlagged: false,
    },
    zn: {
      name: 'Zinc (Zn)',
      category: 'Heavy Metals',
      value: 840,
      unit: 'ppm',
      confidence: 0.74,
      source: 'nir_scan',
      benchmark: '< 1,200 ppm (Galv dragout)',
      isFlagged: true, // Human-in-the-loop verify demo
    },
    pb: {
      name: 'Lead (Pb)',
      category: 'Heavy Metals',
      value: 4.8,
      unit: 'ppm',
      confidence: 0.91,
      source: 'lab_pdf',
      benchmark: '< 10 ppm permissible',
      isFlagged: false,
    },
    cr: {
      name: 'Total Chromium (Cr)',
      category: 'Heavy Metals',
      value: 2.1,
      unit: 'ppm',
      confidence: 0.89,
      source: 'lab_pdf',
      benchmark: '< 5 ppm permissible',
      isFlagged: false,
    },
    viscosity: {
      name: 'Kinematic Viscosity @ 25°C',
      category: 'Physicochemical',
      value: 2.45,
      unit: 'cP',
      confidence: 0.88,
      source: 'photo',
      benchmark: '2.0 - 3.2 cP',
      isFlagged: false,
    },
    flashPoint: {
      name: 'Closed Cup Flash Point',
      category: 'Hazmat & Safety',
      value: '> 100',
      unit: '°C',
      confidence: 0.99,
      source: 'lab_pdf',
      benchmark: 'Non-flammable',
      isFlagged: false,
    },
    density: {
      name: 'Specific Gravity / Density',
      category: 'Physicochemical',
      value: 1.284,
      unit: 'g/cm³',
      confidence: 0.94,
      source: 'photo',
      benchmark: '1.25 - 1.32 g/cm³',
      isFlagged: false,
    },
    hazardClass: {
      name: 'UN Hazard Classification',
      category: 'Hazmat & Safety',
      value: 'Class 8 (Corrosive Liquid)',
      unit: 'UN 1789',
      confidence: 0.99,
      source: 'voice_note',
      benchmark: 'CPCB HazCat Schedule I #26.1',
      isFlagged: false,
    },

    // Remaining parameters completing the 50-parameter fingerprint
    freeHcl: { name: 'Free Hydrochloric Acid', category: 'Physicochemical', value: 4.8, unit: '% w/w', confidence: 0.96, source: 'lab_pdf', benchmark: '3 - 7%' },
    totalDissolvedSolids: { name: 'Total Dissolved Solids (TDS)', category: 'Physicochemical', value: 312000, unit: 'ppm', confidence: 0.93, source: 'lab_pdf', benchmark: '< 350,000 ppm' },
    totalSuspendedSolids: { name: 'Total Suspended Solids (TSS)', category: 'Physicochemical', value: 450, unit: 'ppm', confidence: 0.85, source: 'photo', benchmark: '< 1000 ppm' },
    temperature: { name: 'Discharge Temperature', category: 'Physicochemical', value: 32, unit: '°C', confidence: 0.92, source: 'voice_note', benchmark: 'Ambient (25-40°C)' },
    redoxPotential: { name: 'Oxidation-Reduction Potential (ORP)', category: 'Physicochemical', value: +480, unit: 'mV', confidence: 0.91, source: 'lab_pdf', benchmark: '+400 to +600 mV' },
    surfaceTension: { name: 'Surface Tension', category: 'Physicochemical', value: 71.2, unit: 'mN/m', confidence: 0.82, source: 'nir_scan', benchmark: '68 - 75 mN/m' },
    sulfate: { name: 'Sulfate (SO₄²⁻)', category: 'Physicochemical', value: 420, unit: 'ppm', confidence: 0.89, source: 'lab_pdf', benchmark: '< 1000 ppm' },
    nitrate: { name: 'Nitrate (NO₃⁻)', category: 'Physicochemical', value: 35, unit: 'ppm', confidence: 0.87, source: 'lab_pdf', benchmark: '< 100 ppm' },
    phosphate: { name: 'Phosphate (PO₄³⁻)', category: 'Physicochemical', value: 12, unit: 'ppm', confidence: 0.84, source: 'lab_pdf', benchmark: '< 50 ppm' },
    cadmium: { name: 'Cadmium (Cd)', category: 'Heavy Metals', value: 0.12, unit: 'ppm', confidence: 0.95, source: 'lab_pdf', benchmark: '< 0.5 ppm' },
    nickel: { name: 'Nickel (Ni)', category: 'Heavy Metals', value: 18.5, unit: 'ppm', confidence: 0.92, source: 'lab_pdf', benchmark: '< 50 ppm' },
    copper: { name: 'Copper (Cu)', category: 'Heavy Metals', value: 24.0, unit: 'ppm', confidence: 0.90, source: 'lab_pdf', benchmark: '< 50 ppm' },
    arsenic: { name: 'Arsenic (As)', category: 'Heavy Metals', value: 0.08, unit: 'ppm', confidence: 0.94, source: 'lab_pdf', benchmark: '< 1.0 ppm' },
    mercury: { name: 'Mercury (Hg)', category: 'Heavy Metals', value: 0.015, unit: 'ppm', confidence: 0.97, source: 'lab_pdf', benchmark: '< 0.05 ppm' },
    manganese: { name: 'Manganese (Mn)', category: 'Heavy Metals', value: 680, unit: 'ppm', confidence: 0.91, source: 'lab_pdf', benchmark: '< 1,200 ppm' },
    aluminum: { name: 'Aluminum (Al)', category: 'Heavy Metals', value: 145, unit: 'ppm', confidence: 0.88, source: 'lab_pdf', benchmark: '< 300 ppm' },
    tin: { name: 'Tin (Sn)', category: 'Heavy Metals', value: 3.2, unit: 'ppm', confidence: 0.86, source: 'lab_pdf', benchmark: '< 20 ppm' },
    cobalt: { name: 'Cobalt (Co)', category: 'Heavy Metals', value: 1.4, unit: 'ppm', confidence: 0.89, source: 'lab_pdf', benchmark: '< 10 ppm' },
    barium: { name: 'Barium (Ba)', category: 'Heavy Metals', value: 5.6, unit: 'ppm', confidence: 0.88, source: 'lab_pdf', benchmark: '< 50 ppm' },
    antimony: { name: 'Antimony (Sb)', category: 'Heavy Metals', value: 0.45, unit: 'ppm', confidence: 0.85, source: 'lab_pdf', benchmark: '< 5 ppm' },
    toc: { name: 'Total Organic Carbon (TOC)', category: 'Combustion / Co-Processing', value: 180, unit: 'ppm', confidence: 0.89, source: 'lab_pdf', benchmark: '< 500 ppm' },
    cod: { name: 'Chemical Oxygen Demand (COD)', category: 'Combustion / Co-Processing', value: 620, unit: 'mg/L', confidence: 0.87, source: 'lab_pdf', benchmark: '< 1500 mg/L' },
    bod: { name: 'Biochemical Oxygen Demand (BOD5)', category: 'Combustion / Co-Processing', value: 45, unit: 'mg/L', confidence: 0.82, source: 'lab_pdf', benchmark: '< 100 mg/L' },
    ashContent: { name: 'Inorganic Ash Residue @ 850°C', category: 'Combustion / Co-Processing', value: 14.8, unit: '% w/w', confidence: 0.93, source: 'lab_pdf', benchmark: '12 - 18%' },
    volatileMatter: { name: 'Volatile Compounds', category: 'Combustion / Co-Processing', value: 16.8, unit: '% w/w', confidence: 0.90, source: 'nir_scan', benchmark: '15 - 20%' },
    sulfurTotal: { name: 'Total Sulfur (S)', category: 'Combustion / Co-Processing', value: 0.04, unit: '%', confidence: 0.92, source: 'lab_pdf', benchmark: '< 0.5% kiln limit' },
    fluorine: { name: 'Total Fluorine (F⁻)', category: 'Combustion / Co-Processing', value: 14, unit: 'ppm', confidence: 0.89, source: 'lab_pdf', benchmark: '< 50 ppm kiln limit' },
    alkaliTotal: { name: 'Equivalent Alkali (Na₂O + 0.658 K₂O)', category: 'Combustion / Co-Processing', value: 0.22, unit: '%', confidence: 0.86, source: 'lab_pdf', benchmark: '< 0.6% kiln limit' },
    polychlorinatedBiphenyls: { name: 'PCB / POPs Screening', category: 'Hazmat & Safety', value: '< 0.5', unit: 'ppb', confidence: 0.98, source: 'lab_pdf', benchmark: 'Zero tolerance' },
    radioactivity: { name: 'Gross Alpha / Beta Radioactivity', category: 'Hazmat & Safety', value: '< 0.1', unit: 'Bq/g', confidence: 0.99, source: 'lab_pdf', benchmark: 'Background only' },
    corrosivityRate: { name: 'Steel Corrosion Rate (SAE 1020)', category: 'Hazmat & Safety', value: 6.8, unit: 'mm/yr', confidence: 0.94, source: 'lab_pdf', benchmark: '> 6.25 mm/yr (Class 8)' },
    vaporPressure: { name: 'Vapor Pressure @ 20°C', category: 'Hazmat & Safety', value: 16, unit: 'hPa', confidence: 0.85, source: 'nir_scan', benchmark: '< 30 hPa' },
    inhalationToxicity: { name: 'LC50 Inhalation (Rat equiv)', category: 'Hazmat & Safety', value: 3124, unit: 'ppm/1h', confidence: 0.92, source: 'lab_pdf', benchmark: 'CPCB Haz Class' },
    odorThreshold: { name: 'Pungent Acrid Odor Intensity', category: 'Hazmat & Safety', value: 'Moderate Pungent', unit: 'scale', confidence: 0.80, source: 'voice_note', benchmark: 'Pungent HCl fumes' },
    ibcCompatibility: { name: 'HDPE / FRP Container Compatibility', category: 'Logistics', value: 'Approved (Type 31HA1)', unit: 'cert', confidence: 0.96, source: 'photo', benchmark: 'Acid-resistant composite' },
    pumpabilityRating: { name: 'Positive Displacement Pumpability', category: 'Logistics', value: 'High / Standard Diaphragm', unit: 'rating', confidence: 0.93, source: 'photo', benchmark: 'No solid suspension risk' },
    ambientCrystallizationPoint: { name: 'Freezing / Crystallization Temp', category: 'Logistics', value: -18, unit: '°C', confidence: 0.91, source: 'lab_pdf', benchmark: 'No freezing risk in North India' },
    co2FootprintVirgin: { name: 'Virgin HCl Offset Factor', category: 'Logistics', value: 1.42, unit: 'kg CO₂e/kg', confidence: 0.95, source: 'lab_pdf', benchmark: 'Life Cycle Assessment' },
  },
};

// ==========================================
// 4. MATCH OPTIONS (Generated by Optimizer)
// ==========================================

export const HERO_MATCH_OPTIONS: MatchOption[] = [
  {
    id: 'match-opt-1',
    receiverId: 'rec-1', // Aravali Cement Works
    wasteIds: ['fp-hero-01', 'gen-2-waste-alkali'],
    title: 'Multi-Generator Shared Hazmat Bundle (Recommended)',
    description: 'Joint freight: 12t acidic pickle liquor (Shree Ganesh) + 9t alkaline caustic sludge (Bharat Paper) in compartmentalized ADR tanker to Aravali Cement co-processing kiln.',
    compatibilityScore: 94,
    rulesPassed: 487,
    rulesTotal: 500,
    distanceKm: 420,
    truckFillPct: 92, // 21 tonnes / 23 tonne tanker capacity
    revenuePerTonne: 1250, // Positive revenue paid by cement plant for iron & mineral source
    disposalCostAvoided: 84000, // ₹7,000/t standard hazardous landfill fee avoided
    netBenefit: 99000, // ₹15,000 net revenue + ₹84,000 disposal avoided
    co2SavedTonnes: 14.8,
    recommended: true,
    transitCostSavedInr: 32000,
    bundledParties: ['Shree Ganesh Galvanizers (Ghaziabad)', 'Bharat Paper & Board (Muzaffarnagar)'],
    rulesChecked: [
      {
        rule: 'EU BREF (Cement & Lime): Raw Material Clinker Substitute',
        source: 'EU BREF',
        status: 'pass',
        note: 'High Fe (11.8%) serves as beneficial iron flux in raw mix calcination; replaces mined bauxite/hematite additive.',
      },
      {
        rule: 'CPCB Guidelines: Co-processing of Hazardous Wastes in Cement Kilns',
        source: 'CPCB',
        status: 'pass',
        note: 'Heavy metals (Pb 4.8 ppm, Cr 2.1 ppm) are far below maximum trace threshold limits (< 100 ppm).',
      },
      {
        rule: 'Kiln Chloride Loading Constraint (< 0.10% total feed)',
        source: 'CPCB',
        status: 'warn',
        note: 'Chloride is elevated (18.2%); safe when blended with high-alkaline sludge buffer and bypass fan operating at 15%.',
      },
      {
        rule: 'Dual Compartment Hazmat Transport (Petroleum and Explosives Safety Rules)',
        source: 'CPCB',
        status: 'pass',
        note: 'AIS-028 certified segregated dual-vessel road tanker prevents cross-mixing during transit.',
      },
      {
        rule: 'EPA RCRA Waste Minimization / Subpart CC Volatiles Standards',
        source: 'EPA',
        status: 'pass',
        note: 'Zero VOC release detected; vapor recovery couplings verified for loading and unloading manifolds.',
      },
      {
        rule: 'Receiver Capacity & Pre-calciner Temperature Retention (> 1100°C for 2s)',
        source: 'EU BREF',
        status: 'pass',
        note: 'Thermal breakdown of acidic chlorides guaranteed without dioxin/furan synthesis.',
      },
    ],
  },
  {
    id: 'match-opt-2',
    receiverId: 'rec-4', // NeutraChem Solutions
    wasteIds: ['fp-hero-01'],
    title: 'Direct Single-Trip Acid Recovery',
    description: 'Dedicated single tanker to NeutraChem Solutions in Gujarat for FeCl₃ coagulant synthesis. Higher distance and half-empty truck penalty.',
    compatibilityScore: 82,
    rulesPassed: 462,
    rulesTotal: 500,
    distanceKm: 890,
    truckFillPct: 52, // 12t on a 23t tanker
    revenuePerTonne: 1800,
    disposalCostAvoided: 84000,
    netBenefit: 46000, // Reduced due to massive freight cost of ₹59,600
    co2SavedTonnes: 7.2,
    recommended: false,
    transitCostSavedInr: 0,
    bundledParties: ['Shree Ganesh Galvanizers only'],
    rulesChecked: [
      {
        rule: 'Chemical Re-synthesis Assay Fe Level (> 100,000 ppm)',
        source: 'CPCB',
        status: 'pass',
        note: 'Ideal Fe content for ferric chloride coagulant conversion.',
      },
      {
        rule: 'Interstate Hazmat Transit Transit Permit (MoEFCC Schedule III)',
        source: 'CPCB',
        status: 'warn',
        note: 'Requires 3 interstate transit clearances (UP -> Haryana -> Rajasthan -> Gujarat). Transit time ~48h.',
      },
      {
        rule: 'Freight Logistics Efficiency Factor',
        source: 'EPA',
        status: 'warn',
        note: 'Deadhead / half-capacity penalty: 48% unutilized container space increases per-tonne freight footprint.',
      },
    ],
  },
  {
    id: 'match-opt-3',
    receiverId: 'rec-2', // GreenBrick Industries
    wasteIds: ['fp-hero-01'],
    title: 'Neutralization for Fly Ash Geopolymer Matrix',
    description: 'Local dispatch to GreenBrick Meerut for acid neutralization and metal immobilization in non-structural precast pavers.',
    compatibilityScore: 68,
    rulesPassed: 412,
    rulesTotal: 500,
    distanceKm: 65,
    truckFillPct: 52,
    revenuePerTonne: -800, // Disposal fee paid to brick plant, but cheaper than TSDF
    disposalCostAvoided: 84000,
    netBenefit: 38400,
    co2SavedTonnes: 4.1,
    recommended: false,
    transitCostSavedInr: 12000,
    bundledParties: ['Shree Ganesh Galvanizers only'],
    rulesChecked: [
      {
        rule: 'CPCB TCLP Leaching Toxicity Test for Construction Products',
        source: 'CPCB',
        status: 'warn',
        note: 'Requires 4:1 lime stoichiometric buffering to prevent leaching in outdoor rain exposure.',
      },
      {
        rule: 'Heavy Metal Immobilization In Silicate Matrix',
        source: 'EU BREF',
        status: 'pass',
        note: 'Meets non-load bearing compressive strength criteria (Class 7.5 MPa).',
      },
      {
        rule: 'Odor & Corrosivity Handling on Open Yard',
        source: 'EPA',
        status: 'fail',
        note: 'Receiver does not possess automated closed scrubber venting for tank unloading.',
      },
    ],
  },
];

// ==========================================
// 5. RECEIVER INCOMING OFFERS (Aravali Cement Works)
// ==========================================

export interface ReceiverOfferItem {
  id: string;
  sourceCompany: string;
  location: string;
  material: string;
  tonnes: number;
  hazardClass: string;
  compatibility: number;
  pricePerTonneInr: number;
  eta: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  chloridePpm: number;
  calorificMjKg: number;
}

export const ARAVALI_INCOMING_OFFERS: ReceiverOfferItem[] = [
  {
    id: 'off-101',
    sourceCompany: 'Shree Ganesh + Bharat Paper (Bundled)',
    location: 'Ghaziabad + Muzaffarnagar, UP',
    material: 'Spent Pickle Liquor + Caustic Sludge Bundle',
    tonnes: 21.0,
    hazardClass: 'Class 8 (Dual Hazmat)',
    compatibility: 94,
    pricePerTonneInr: 1250,
    eta: 'Tomorrow, 16:00',
    status: 'Pending',
    chloridePpm: 104000, // Averaged post-bundle
    calorificMjKg: 1.8,
  },
  {
    id: 'off-102',
    sourceCompany: 'Krishna Textile Processing',
    location: 'Panipat, HR',
    material: 'Dye-house ETP Sludge Cake',
    tonnes: 14.5,
    hazardClass: 'Class 9 (Miscellaneous)',
    compatibility: 87,
    pricePerTonneInr: 800,
    eta: '24 Oct 2026',
    status: 'Pending',
    chloridePpm: 24000,
    calorificMjKg: 14.2, // Good secondary fuel
  },
  {
    id: 'off-103',
    sourceCompany: 'Rana Plastics Ltd.',
    location: 'Faridabad, HR',
    material: 'Polyolefin Purge & Film Shreds',
    tonnes: 18.0,
    hazardClass: 'Non-hazardous',
    compatibility: 96,
    pricePerTonneInr: 3200,
    eta: '25 Oct 2026',
    status: 'Accepted',
    chloridePpm: 1200,
    calorificMjKg: 36.5, // High calorific AFR
  },
  {
    id: 'off-104',
    sourceCompany: 'Singh Foundry Works',
    location: 'Ludhiana, PB',
    material: 'Spent Phenolic Moulding Sand',
    tonnes: 32.0,
    hazardClass: 'Non-hazardous',
    compatibility: 76,
    pricePerTonneInr: 450,
    eta: '27 Oct 2026',
    status: 'Pending',
    chloridePpm: 800,
    calorificMjKg: 0.1,
  },
];

// ==========================================
// 6. HERO DEAL & TELEMETRY (Screen 3: Settle)
// ==========================================

export const HERO_INITIAL_DEAL: Deal = {
  id: 'DEAL-WM-2026-9042',
  matchId: 'match-opt-1',
  amountInr: 99000,
  stage: 'Locked',
  contractAddress: '0x882E...79bA',
  chainName: 'Base Sepolia (Testnet, Simulated)',
  escrowLockedAt: '21 Oct 2026, 11:42 IST',
  generatorName: 'Shree Ganesh Galvanizers',
  partnerGeneratorName: 'Bharat Paper & Board Mills',
  receiverName: 'Aravali Cement Works (Kiln #3)',
  materialsSummary: 'Bundled Acidic Pickle Liquor (12t) + Alkaline Sludge (9t)',
  totalTonnes: 21.0,
  telemetry: [
    {
      t: '11:45 IST',
      lat: 28.6692,
      lng: 77.4538,
      tempC: 28.4,
      sealIntact: true,
      locationName: 'Dispatched: Shree Ganesh Yard, Ghaziabad',
      speedKmh: 0,
    },
    {
      t: '13:30 IST',
      lat: 29.4727,
      lng: 77.7085,
      tempC: 29.8,
      sealIntact: true,
      locationName: 'Co-loading: Bharat Paper Mills, Muzaffarnagar',
      speedKmh: 0,
    },
    {
      t: '15:15 IST',
      lat: 28.3245,
      lng: 76.9821,
      tempC: 31.0,
      sealIntact: true,
      locationName: 'Delhi-Mumbai Expressway Toll km 42',
      speedKmh: 64,
    },
    {
      t: '18:40 IST',
      lat: 26.9124,
      lng: 75.7873,
      tempC: 30.5,
      sealIntact: true,
      locationName: 'Jaipur Outer Ring Road Waypoint',
      speedKmh: 68,
    },
    {
      t: '22:10 IST',
      lat: 25.3407,
      lng: 74.6313,
      tempC: 29.1,
      sealIntact: true,
      locationName: 'Bhilwara Fuel & Safety Inspection Check',
      speedKmh: 58,
    },
    {
      t: '01:25 IST',
      lat: 24.6225,
      lng: 74.6869,
      tempC: 28.2,
      sealIntact: true,
      locationName: 'Arrival Gate #4: Aravali Cement Works, Nimbahera',
      speedKmh: 0,
    },
  ],
  verification: {
    result: 'PASS',
    timestamp: '22 Oct 2026, 01:45 IST',
    operator: 'N. Sharma (Chief Chemist, Kiln QA/QC)',
    checks: [
      {
        name: 'pH Range (Extreme Acidic Compartment)',
        expected: 'pH 0.5 - 1.2',
        measured: 'pH 0.88',
        pass: true,
        margin: 'Within 5% variance tolerance',
      },
      {
        name: 'Chloride Max Cap (< 200,000 ppm)',
        expected: '< 200,000 ppm',
        measured: '179,400 ppm',
        pass: true,
        margin: '10.3% safety margin below limit',
      },
      {
        name: 'Toxic Metal Contaminant Screening (Pb, Cd, Hg)',
        expected: 'Pb < 10, Cd < 1, Hg < 0.1 ppm',
        measured: 'Pb 4.6, Cd 0.11, Hg 0.01 ppm',
        pass: true,
        margin: 'All trace elements compliant',
      },
      {
        name: 'AI Spectrophotometric & Visual Density Match',
        expected: 'Dark greenish liquid (1.25 - 1.32 g/cm³)',
        measured: 'Dark olive green, 1.282 g/cm³',
        pass: true,
        margin: '99.1% optical pattern match',
      },
    ],
  },
  certificate: {
    id: 'CERT-WM-CO2-2026-8842',
    type: 'Carbon',
    tonnes: 21.0,
    standard: 'Verra VCS / Gold Standard Aligned Industrial Symbiosis Metric',
    issuedAt: '22 Oct 2026, 01:50 IST',
    txHash: '0x4f92c7104b28d7120a48b919d381023a9d77e481c7e92384a8b7c938472910fa',
    issuer: 'WasteMatch Autonomous Settlement Protocol (v1.4)',
    beneficiary: 'Shree Ganesh Galvanizers & Aravali Cement Co.',
    co2eAvoidedTonnes: 14.8,
    registryUrl: 'https://registry.wastematch.io/cert/WM-CO2-2026-8842',
  },
};

