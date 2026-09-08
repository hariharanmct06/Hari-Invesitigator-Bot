# HARI INVESTIGATOR AI

## OBSERVE. CONNECT. INVESTIGATE.

**Created by Hari Bot & Business Solutions**

HARI INVESTIGATOR AI is a complete, production-quality, premium, responsive AI investigation and evidence-intelligence web application. It functions as a professional investigation intelligence operating system designed for capturing evidence, organizing cryptographic records, extracting entities, building timelines, comparing statements, identifying evidence gaps, and generating executive reports.

---

## Key Features

### 1. Professional Evidence Camera Workspace & Smart Document Scanner
- **Multi-Mode Capture**: Photo, Video, Document, ID / Card, Multi-shot, Panorama, Burst, Audio.
- **Live Camera Quality Guidance (HUD)**: Real-time feedback for lighting quality, focus stability, and camera tilt.
- **Smart Document Scanner**: Edge detection overlay, auto/manual perspective correction, monochrome/high-contrast enhancement filters, and immutable original storage (`Original -> Processed Copy`).
- **Ergonomic Touch Controls**: Lens flip, flash/torch toggle, grid overlay, level crosshair, countdown timer, `1x-5x` zoom presets, and tap-to-focus animation.
- **Permission Fallback**: Graceful fallback when camera access is denied, with upload capabilities.

### 2. Strict 5-Level Evidence & Truth Hierarchy
- **Level 1**: Directly Observed Fact (e.g., CCTV frame timestamp, EXIF data)
- **Level 2**: Information Extracted from Evidence (e.g., OCR text, logsheets)
- **Level 3**: Reasonable AI Inference (e.g., vehicle model profile, door prying mechanics)
- **Level 4**: Unverified Information
- **Level 5**: Unknown Information
- **Confidence Disclaimer**: Includes explicit disclaimer: *"Confidence indicates model certainty in this interpretation; it does not establish factual truth."*
- **Human Verification Flow**: Interactive verification buttons that log human verification into the audit trail.

### 3. Command Center & Multi-Step Case Intake
- Metric cards for Active Cases, Evidence Items, Open Leads, and AI Analyses.
- Pre-populated with **Case #2026-001 (Warehouse Incident)** fictional investigation.
- 4-step wizard for creating new cases with validation.

### 4. Forensic Evidence Vault & AI Media Analysis Engine
- Vault filters for Images, Videos, Audio, Documents, Verified, and Needs Review.
- Grid & List view modes with SHA-256 cryptographic hash previews.
- Split-view AI Media Analysis panel (desktop side panel / mobile bottom sheet) displaying observed objects, scene details, OCR text, and verification requirements.

### 5. Connection Intelligence Graph
- Interactive SVG entity network mapping nodes for Persons, Evidence, Vehicles, Locations, Events, and Statements.
- Dynamic zoom (`60%` - `160%`), node search, filter, and detail drawer.
- Guilt-neutral styling.

### 6. Investigation Timeline & Statement Intelligence
- Desktop horizontal & mobile vertical interactive event timelines with AI-suggested event badges.
- Statement Intelligence side-by-side claim extractor and cross-evidence discrepancy matrix.

### 7. Hari AI Analyst, Leads & Evidence Gap Intelligence
- Case-aware assistant with quick prompt triggers (*SUMMARIZE CASE*, *FIND INCONSISTENCIES*, *BUILD TIMELINE*, *IDENTIFY EVIDENCE GAPS*, *FIND CONNECTIONS*).
- Prioritized Lead Manager (`NEW`, `REVIEWING`, `VERIFIED`, `COMPLETED`).
- Evidence Gap Intelligence breakdown of Known vs Unknown context with compliance guarantees for lawful evidence protocols.

### 8. Report Studio & Security Audit Trail
- Executive dossier builder with printable layout styling (`window.print()`) and plain text / DOC export.
- Immutable append-only audit trail logging case creation, evidence uploads, AI queries, and human verifications.
- Dark graphite theme and high-contrast light theme toggle.

---

## Tech Stack

- **Framework**: React 18 / TypeScript / Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Camera Engine**: WebRTC `getUserMedia` + HTML5 Canvas processing

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
# Clone the repository
git clone git@github.com:hariharanmct06/Hari-Invesitigator-Bot.git
cd Hari-Invesitigator-Bot

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## License & Attribution

Created by **Hari Bot & Business Solutions**. All rights reserved.
