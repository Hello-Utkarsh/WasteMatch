# WasteMatch — AI Industrial Symbiosis Engine

> **Autonomous Multimodal Chemical Fingerprinting, Constraint Solver Bundling & Smart Escrow Settlement for Manufacturing SMEs.**

WasteMatch is an AI-powered industrial symbiosis engine designed to turn hazardous waste disposal liabilities into resource revenue. This repository is a **frontend-only, demo-grade prototype** designed for high-impact pitch and evaluation demonstrations.

---

## 🚀 Live Demo Architecture

### The Problem
- **₹252 Lakh Crore / year** in chemical and industrial byproducts are dumped into landfills in India.
- **70%** of industrial waste streams have a viable secondary use (e.g. acidic pickle liquors replace mined bauxite in cement kilns; alkaline sludges neutralize acidic reagents).
- **85%** of manufacturing SMEs generate partial truckloads, making hazardous road transport economically unviable without multi-party bundling.

### The 3-Engine Solution Demonstrated
1. **Engine 1: Multimodal Ingestion & Chemical Fingerprinting (`/generator`)**
   - Ingests messy PDF lab assays, IBC storage tank visual photos, handheld NIR spectroscopy csv logs, and foreman audio notes.
   - Extracts a **50-parameter verified chemical passport** (pH, chlorides, heavy metals, calorific value, viscosity, hazard class) with extraction confidence ratings and Human-in-the-Loop verification.
   - **Data Completeness Tier Strip**: Tier 0 (Process + photo) → Tier 1 (Quick on-site checks) → Tier 2 (Lab test) with "Request partner-lab test" provisional matching.

2. **Engine 2: Constraint Optimization & Multi-Party Bundling (`/matching` & `/receivers`)**
   - Evaluates environmental and safety rules across CPCB and EU BREF standards using Google OR-Tools CP-SAT logic.
   - **The Hero Bundle**: Muzaffarnagar (Bharat Paper, 9t alkaline sludge) → Ghaziabad (Shree Ganesh, 12t acidic liquor) → Aravali Cement Works kiln (Rajasthan).
   - Turns two half-empty trips into **one 91% full tanker (820 km)**, unlocking **₹40,550 net benefit** and avoiding **1.6 tonnes of CO₂e (estimated)**.
   - Simplified offline vector SVG network map with sequence-optimized routing.
   - **Receiver Registry (`/receivers`)**: Public SPCB/CPCB authorization list with facility profile claiming and intake limits verification.

3. **Engine 3: Autonomous Escrow Settlement & Verification (`/settlement`)**
   - 4-stage escrow lifecycle (`Escrow locked` ➔ `In transit` ➔ `Gate verified` ➔ `Funds released`).
   - Compact transit tracker with vehicle GPS e-manifest milestones and e-seal status.
   - **Two-stage release**:
     - Stage 1: Gate in-line checks (pH, chloride, density) → 80% (₹21,000) released.
     - Stage 2: 24-48h lab report for trace metals → 20% (₹5,250) released.
   - Toggleable **"Demo fail path"** to demonstrate dispute protection and escrow freeze.
   - Issuance of **Printable Diversion Certificate** (Verra-methodology-aligned estimate).

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Industrial-Fintech tokens (Brand Red `#D1343A`, `#A81818`, `#F8F6F5`)
- **Routing**: React Router v6
- **State**: Zustand (reactive demo pipeline state & auto-play engine)
- **Charts & Maps**: Recharts (Radar, Horizontal Bar) + Custom Geo-Vector SVG Map
- **Economics**: Single source of truth in `src/mock/economics.ts`
- **Micro-interactions**: Canvas Confetti, step animations, responsive layouts (1280px, 1440px, 1920px projector-ready)

---

## 📋 What is Real vs. What is Simulated

| Feature | Current Prototype (Demo Mode) | Production Roadmap |
| :--- | :--- | :--- |
| **Data Ingestion** | Synthetic representative files in `src/mock/data.ts` | Gemma 2 / Claude 3.5 Sonnet multimodal OCR & audio transcription |
| **Chemical Fingerprint** | 50-parameter taxonomy with simulated confidence | Fine-tuned chemical LLM + spectral peak deconvolution |
| **Matching Engine** | CP-SAT Pareto solver simulation | Google OR-Tools CP-SAT Mixed Integer Linear Programming (MILP) |
| **Escrow & Settle** | In-memory simulated smart contract | Solidity contracts on Base Sepolia / Polygon L2 |
| **IoT Telemetry** | Scripted GPS & e-seal tracker | Quectel GPS + LoRaWAN tamper-seal hardware feed |

---

## 🔌 Connecting a Real Backend

All simulated asynchronous behavior is cleanly abstracted behind the `src/mock/api.ts` layer. To plug into a real backend (e.g. FastAPI / Python OR-Tools solver):
1. Keep the data types in `src/mock/types.ts`.
2. Swap the implementations inside `src/mock/api.ts` with real `fetch` / `axios` endpoints.
3. The UI components will function identically without any refactoring.

---

## 🏃 Running Locally

```bash
# Clone repository
git clone https://github.com/WasteMatch/wastematch.git
cd wastematch

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

To build for production:
```bash
npm run build
npm run preview
```

---

## 🎬 Live Demo Script (3 to 4 Minutes)

1. **Problem (0:00 - 0:30)**: Start on `/`. Highlight the ₹252 Lakh Crore annual waste loss and the 85% partial truckload rejection barrier for Indian SMEs.
2. **Fingerprint (0:30 - 1:15)**: Click "Start Interactive Demo". Load sample files and run analysis. Point out the Data Completeness Strip (Tier 1 on-site checks, tests needed: chloride titration & zinc XRF). Show human-in-the-loop verify and the 50-parameter passport.
3. **Registry Flash (1:15 - 1:30)**: Visit Receiver Registry (`/receivers`). Explain how public SPCB records are claimed by facilities to set gate envelopes.
4. **Optimize (1:30 - 2:30)**: Go to `/matching`. Run CP-SAT solver. Show the clean 820 km road route (Muzaffarnagar pickup 1 ➔ Ghaziabad pickup 2 ➔ Aravali Cement kiln). Show "Two half-empty loads become one 91% full tanker" and the ₹40,550 net benefit (+₹134k total swing vs shipping separately).
5. **Settle (2:30 - 3:30)**: Accept match and lock ₹26,250 escrow. Fast-forward transit to Gate #4. Run in-line gate checks: release Stage 1 (₹21,000). Simulate lab report: release Stage 2 (₹5,250). Inspect the official Diversion Certificate. Toggle "Demo fail path" to show dispute protection.
6. **Close (3:30 - 4:00)**: Show final impact numbers (₹40,550 net gain, 1.6 t CO₂e estimated with methodology popover, 21.0 t diverted).
