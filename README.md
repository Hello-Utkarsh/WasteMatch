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

2. **Engine 2: Constraint Optimization & Multi-Party Bundling (`/matching`)**
   - Evaluates 500+ regulatory rules (CPCB, EU BREF for Cement Kilns, US EPA RCRA).
   - **The Breakout Hero Bundle**: Shree Ganesh Galvanizers (12t acidic liquor, Ghaziabad) + Bharat Paper Mills (9t alkaline sludge, Muzaffarnagar) bundled into **one 92% full-truck hazmat tanker** bound for Aravali Cement Works (Rajasthan).
   - Turns a **-₹84,000 disposal cost penalty** into a **+₹99,000 net economic gain** and avoids **14.8 tonnes of CO₂**.
   - Custom vector SVG network map of North India industrial corridor (works 100% offline without map tile dependencies).
   - Receiver perspective dashboard for kiln intake quotas.

3. **Engine 3: Autonomous Escrow Settlement & Verification (`/settlement`)**
   - 6-stage escrow lifecycle (`Locked` ➔ `In transit` ➔ `Delivered` ➔ `Verifying` ➔ `Verified` ➔ `Released`).
   - Live IoT telemetry track (GPS route, cargo temperature, tamper-evident seals).
   - Automated in-line sensor verification check with toggleable **"Demo: Force FAIL mode"** to demonstrate dispute resolution.
   - Autonomous payout release + issuance of **Printable Carbon Credit Diversion Certificate** (Verra VCS / Gold Standard aligned).

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Industrial-Fintech tokens (Brand Red `#D1343A`, `#A81818`, `#F8F6F5`)
- **Routing**: React Router v6
- **State**: Zustand (reactive demo pipeline state & auto-play engine)
- **Charts & Maps**: Recharts (Radar, Horizontal Bar) + Custom Geo-Vector SVG Map
- **Micro-interactions**: Canvas Confetti, step animations, responsive layouts (1280px, 1440px, 1920px projector-ready)

---

## 📋 What is Real vs. What is Simulated

| Feature | Current Prototype (Demo Mode) | Production Roadmap |
| :--- | :--- | :--- |
| **Data Ingestion** | Synthetic representative files in `src/mock/data.ts` | Gemma 2 / Claude 3.5 Sonnet multimodal OCR & audio transcription |
| **Chemical Fingerprint** | 50-parameter taxonomy with simulated confidence | Fine-tuned chemical LLM + spectral peak deconvolution |
| **Matching Engine** | Deterministic Pareto solver simulation | Google OR-Tools CP-SAT Mixed Integer Linear Programming (MILP) |
| **Escrow & Settle** | In-memory simulated smart contract | Solidity contracts on Base Sepolia / Polygon L2 |
| **IoT Telemetry** | Scripted GPS & sensor telemetry array | Quectel GPS + LoRaWAN tamper-seal hardware feed |

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
2. **Fingerprint (0:30 - 1:15)**: Click "Start Interactive Demo" (or click "Run Guided Demo" in top bar). Click "Load Sample Files" ➔ "Analyze Multimodal Inputs". Show the 50-parameter chemical passport, the radar signature, and click "Verify" on Zinc (74% ➔ 100%).
3. **Optimize (1:15 - 2:30)**: Click "Find Matches". Run the solver. Show the **Hero Moment**: Shree Ganesh acid + Bharat Paper sludge combined into one 92% full-truck hazmat tanker to Aravali Cement. Show the ₹183,000 economic swing on the comparison chart.
4. **Settle (2:30 - 3:30)**: Click "Accept Match & Lock Escrow". Fast-forward the 420km transit. Dock at Gate #4. Run the in-line chemical verification (PASS). Watch escrow auto-release with celebration and inspect the official Carbon Credit Certificate. Toggle "Demo: Force FAIL mode" to prove dispute safety.
5. **Close (3:30 - 4:00)**: Show final impact numbers (₹99k net benefit, 14.8t CO₂, 21t diverted, SDG 9.4/12.5/8.4 alignment).

