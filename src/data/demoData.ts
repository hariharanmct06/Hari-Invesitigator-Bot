import {
  Case,
  Evidence,
  AIAnalysis,
  Person,
  LocationItem,
  InvestigationEvent,
  Statement,
  GraphNode,
  GraphEdge,
  Lead,
  EvidenceGap,
  AuditLog
} from '../types/investigation';

// Fictional visual assets generated via Inline SVG Data URIs for complete self-contained demo support
export const DEMO_MEDIA = {
  cctv: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"><rect width="800" height="450" fill="%230f141d"/><path d="M0 0h800v450H0z" fill="url(%23g1)" opacity="0.3"/><rect x="50" y="100" width="700" height="300" rx="8" stroke="%23334155" stroke-width="2" fill="%231a202c"/><rect x="120" y="160" width="220" height="180" fill="%232d3748" stroke="%234a5568"/><rect x="380" y="140" width="180" height="200" fill="%232b3648"/><path d="M600 220l50 30-50 30z" fill="%23e53e3e"/><text x="70" y="130" fill="%2300ffcc" font-family="monospace" font-size="16">CAM-04 | COIMBATORE DOCK B | 08/09/2026 10:18:42 IST</text><text x="70" y="380" fill="%23ef4444" font-family="monospace" font-size="14">[MOTION DETECTED - 88% CONFIDENCE]</text><circle cx="680" cy="80" r="12" fill="%23ef4444"><animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/></circle><text x="700" y="85" fill="%23ffffff" font-family="sans-serif" font-size="14" font-weight="bold">REC</text><line x1="50" y1="250" x2="750" y2="250" stroke="%2300ffcc" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/></svg>`,
  vehicle: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"><rect width="800" height="450" fill="%23090d16"/><rect x="100" y="180" width="600" height="180" rx="30" fill="%231e293b" stroke="%233b82f6" stroke-width="2"/><path d="M220 180 L320 100 L550 100 L620 180 Z" fill="%230f172a" stroke="%2364748b" stroke-width="2"/><circle cx="220" cy="360" r="45" fill="%23334155" stroke="%2394a3b8" stroke-width="6"/><circle cx="580" cy="360" r="45" fill="%23334155" stroke="%2394a3b8" stroke-width="6"/><rect x="650" y="240" width="40" height="20" fill="%23f59e0b" rx="4"/><rect x="340" y="280" width="160" height="32" fill="%23ffffff" rx="4" stroke="%23000000" stroke-width="2"/><text x="352" y="302" fill="%23000000" font-family="monospace" font-size="16" font-weight="bold">TN 38 AB 1234</text><text x="40" y="50" fill="%233b82f6" font-family="monospace" font-size="16">EVD-IN-2026-015-024 | VEHICLE RECONNAISSANCE SCAN</text></svg>`,
  scene: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"><rect width="800" height="450" fill="%23111827"/><rect x="80" y="80" width="640" height="300" fill="%231f2937" stroke="%23374151" stroke-width="2"/><line x1="200" y1="80" x2="200" y2="380" stroke="%23ef4444" stroke-width="4" stroke-dasharray="6 6"/><rect x="350" y="200" width="180" height="120" fill="%23374151" stroke="%23f59e0b" stroke-width="2"/><text x="370" y="260" fill="%23f59e0b" font-family="sans-serif" font-size="14">CONSIGNMENT #C-409</text><text x="370" y="280" fill="%23ef4444" font-family="sans-serif" font-size="12">TAMPER SEAL BROKEN</text><circle cx="200" cy="240" r="30" stroke="%23ef4444" stroke-width="2" fill="none"/><text x="100" y="420" fill="%239ca3af" font-family="monospace" font-size="14">SCENE PHOTOGRAPHY - LOADING DOCK OVERVIEW (POINT OF BREACH)</text></svg>`,
  document: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="none"><rect width="600" height="800" fill="%23f8fafc"/><rect x="40" y="40" width="520" height="720" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2" rx="4"/><text x="80" y="100" fill="%230f172a" font-family="sans-serif" font-size="20" font-weight="bold">WAREHOUSE SECURITY LOGSHEET</text><text x="80" y="130" fill="%2364748b" font-family="monospace" font-size="12">LOCATION: SAIBABA COLONY, COIMBATORE, TAMIL NADU (641011)</text><line x1="80" y1="150" x2="520" y2="150" stroke="%23e2e8f0" stroke-width="2"/><text x="80" y="190" fill="%23334155" font-family="sans-serif" font-size="14">10:05 AM IST - Gate 2 check-in: SUV (TN 38 AB 1234) entered.</text><text x="80" y="230" fill="%23334155" font-family="sans-serif" font-size="14">10:14 AM IST - Cargo manifest validation approved.</text><text x="80" y="270" fill="%23dc2626" font-family="sans-serif" font-size="14" font-weight="bold">10:18 AM IST - ALARM TRIGGER: Dock Door B Force Disconnected.</text><text x="80" y="310" fill="%23334155" font-family="sans-serif" font-size="14">10:23 AM IST - Vehicle departed gate at elevated speed.</text><rect x="75" y="250" x2="450" y2="330" fill="none" stroke="%23ef4444" stroke-width="2" stroke-dasharray="4 4"/><text x="80" y="720" fill="%2394a3b8" font-family="monospace" font-size="11">SCAN PROVENANCE: ENHANCED PDF OCR COPIED TO VAULT</text></svg>`,
  audioWaveform: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200" viewBox="0 0 800 200" fill="none"><rect width="800" height="200" fill="%230f172a"/><path d="M20 100 L 40 80 L 60 120 L 80 40 L 100 160 L 120 70 L 140 130 L 160 30 L 180 170 L 200 90 L 220 110 L 240 50 L 260 150 L 280 80 L 300 120 L 320 20 L 340 180 L 360 90 L 380 110 L 400 60 L 420 140 L 440 80 L 460 120 L 480 40 L 500 160 L 520 70 L 540 130 L 560 30 L 580 170 L 600 90 L 620 110 L 640 50 L 660 150 L 680 80 L 700 120 L 720 90 L 740 110 L 760 100 L 780 100" stroke="%233b82f6" stroke-width="3" fill="none"/><line x1="0" y1="100" x2="800" y2="100" stroke="%23334155" stroke-width="1"/><text x="30" y="30" fill="%2360a5fa" font-family="monospace" font-size="14">AUDIO RECORDING - SECURITY DISPATCH CALL (02m 45s IST)</text></svg>`
};

export const DEMO_CASE: Case = {
  id: 'case-2026-001',
  caseNumber: 'CASE #2026-001',
  title: 'Coimbatore Warehouse Incident',
  description: 'Fictional investigation into unauthorized access, breach of Dock B door, and consignment displacement at Sector 4 Logistics Hub, Saibaba Colony, Coimbatore.',
  incidentDate: '08/09/2026 • 10:18 AM IST',
  location: 'Saibaba Colony, Coimbatore, Tamil Nadu (641011)',
  address: {
    country: 'India',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    city: 'Coimbatore',
    locality: 'Saibaba Colony',
    street: '104 Mettupalayam Road',
    building: 'Sector 4 Logistics Hub',
    pinCode: '641011'
  },
  priority: 'CRITICAL',
  status: 'ACTIVE',
  leadInvestigator: 'Inspector K. Sundaram',
  tags: ['Coimbatore', 'Tamil Nadu', 'Warehouse Breach', 'Consignment', 'Discrepancy'],
  createdAt: '08/09/2026 • 10:30 AM IST',
  updatedAt: '08/09/2026 • 11:15 AM IST',
};

export const DEMO_EVIDENCE: Evidence[] = [
  {
    id: 'evd-001',
    evidenceId: 'EVD-IN-2026-015-024',
    caseId: 'case-2026-001',
    title: 'CCTV Camera 04 Dock B Frame',
    description: 'Frame capture showing dark SUV positioned near Dock Door B during alarm trigger at Coimbatore facility.',
    category: 'IMAGE',
    fileUrl: DEMO_MEDIA.cctv,
    originalUrl: DEMO_MEDIA.cctv,
    processedUrl: DEMO_MEDIA.cctv,
    hash: 'a8f5d72e9c13b48201a4e6f98c251d7e3401b2c4d5e6f7a8b9c0d1e2f3a4b5c6',
    status: 'VERIFIED',
    level: 1,
    capturedAt: '08/09/2026 • 10:18 AM IST',
    deviceTime: '08/09/2026 • 10:18 AM IST',
    resolution: '3840x2160 4K UHD',
    fileSize: '4.8 MB',
    mimeType: 'image/svg+xml',
    qualityMetrics: {
      lighting: 'GOOD',
      blur: 'SLIGHT',
      tiltAngle: 1.2,
      focusStable: true,
      score: 91
    },
    notes: [
      {
        id: 'n-1',
        author: 'Inspector K. Sundaram',
        timestamp: '08/09/2026 • 10:45 AM IST',
        text: 'Vehicle license plate partially obscured by angle. Frame timestamp corresponds exactly with security system door alarm.'
      }
    ],
    tags: ['CCTV', 'Coimbatore', 'Dock B', 'Vehicle TN 38', 'Alarm Trigger'],
    capturedBy: 'System Camera CAM-04'
  },
  {
    id: 'evd-002',
    evidenceId: 'EVD-IN-2026-015-025',
    caseId: 'case-2026-001',
    title: 'Vehicle Reconnaissance Photo (TN 38 AB 1234)',
    description: 'Close-up capture of dark blue SUV license plate TN 38 AB 1234 recorded near perimeter fence in Saibaba Colony.',
    category: 'IMAGE',
    fileUrl: DEMO_MEDIA.vehicle,
    originalUrl: DEMO_MEDIA.vehicle,
    processedUrl: DEMO_MEDIA.vehicle,
    hash: 'b7e4c3d2a1098f7e6d5c4b3a210987654321fedcba9876543210abcdef123456',
    status: 'VERIFIED',
    level: 1,
    capturedAt: '08/09/2026 • 10:10 AM IST',
    deviceTime: '08/09/2026 • 10:10 AM IST',
    resolution: '4032x3024 12MP',
    fileSize: '3.2 MB',
    mimeType: 'image/svg+xml',
    qualityMetrics: {
      lighting: 'EXCELLENT',
      blur: 'NONE',
      tiltAngle: 0.4,
      focusStable: true,
      score: 96
    },
    notes: [
      {
        id: 'n-2',
        author: 'Security Officer Priyadarshini Rajan',
        timestamp: '08/09/2026 • 10:15 AM IST',
        text: 'Captured during perimeter patrol prior to main incident.'
      }
    ],
    tags: ['Vehicle', 'TN 38 AB 1234', 'Coimbatore', 'Reconnaissance'],
    capturedBy: 'Officer Priyadarshini Rajan'
  },
  {
    id: 'evd-003',
    evidenceId: 'EVD-IN-2026-015-026',
    caseId: 'case-2026-001',
    title: 'Dock B Breach Scene Photo',
    description: 'Direct evidence photo showing broken security tamper seal on Consignment #C-409 inside Loading Dock B.',
    category: 'IMAGE',
    fileUrl: DEMO_MEDIA.scene,
    originalUrl: DEMO_MEDIA.scene,
    processedUrl: DEMO_MEDIA.scene,
    hash: 'c1d2e3f4a5b6c7d8e9f0123456789abcdef0123456789abcdef0123456789abc',
    status: 'VERIFIED',
    level: 1,
    capturedAt: '08/09/2026 • 10:50 AM IST',
    deviceTime: '08/09/2026 • 10:50 AM IST',
    resolution: '3000x2250',
    fileSize: '2.9 MB',
    mimeType: 'image/svg+xml',
    qualityMetrics: {
      lighting: 'GOOD',
      blur: 'NONE',
      tiltAngle: 0.8,
      focusStable: true,
      score: 94
    },
    notes: [],
    tags: ['Scene', 'Tamper Seal', 'Consignment C-409'],
    capturedBy: 'Inspector K. Sundaram'
  },
  {
    id: 'evd-004',
    evidenceId: 'EVD-IN-2026-015-027',
    caseId: 'case-2026-001',
    title: 'Coimbatore Gate Logsheet Document Scan',
    description: 'Scanned security log sheet documenting gate check-ins at Saibaba Colony logistics hub.',
    category: 'DOCUMENT',
    fileUrl: DEMO_MEDIA.document,
    originalUrl: DEMO_MEDIA.document,
    processedUrl: DEMO_MEDIA.document,
    hash: 'd9e8f7a6b5c4d3e2f109876543210fe9876543210fedcba98765432101234567',
    status: 'VERIFIED',
    level: 2,
    capturedAt: '08/09/2026 • 11:15 AM IST',
    deviceTime: '08/09/2026 • 11:15 AM IST',
    resolution: '2400x3200 PDF Scan',
    fileSize: '1.4 MB',
    mimeType: 'application/pdf',
    qualityMetrics: {
      lighting: 'EXCELLENT',
      blur: 'NONE',
      tiltAngle: 0.0,
      focusStable: true,
      score: 98
    },
    notes: [],
    tags: ['Document', 'Logsheet', 'OCR', 'Security Log'],
    capturedBy: 'Scanner App'
  },
  {
    id: 'evd-005',
    evidenceId: 'EVD-IN-2026-015-028',
    caseId: 'case-2026-001',
    title: 'Security Control Call Recording Audio',
    description: 'Dispatch audio recording from security control room reporting forced door alarm.',
    category: 'AUDIO',
    fileUrl: DEMO_MEDIA.audioWaveform,
    originalUrl: DEMO_MEDIA.audioWaveform,
    processedUrl: DEMO_MEDIA.audioWaveform,
    hash: 'e5f6a7b8c9d0e1f2013456789abcdef0123456789abcdef0123456789abcdef0',
    status: 'NEEDS_REVIEW',
    level: 2,
    capturedAt: '08/09/2026 • 10:20 AM IST',
    deviceTime: '08/09/2026 • 10:20 AM IST',
    resolution: 'Audio 44.1kHz WAV',
    fileSize: '15.6 MB',
    mimeType: 'audio/wav',
    qualityMetrics: {
      lighting: 'EXCELLENT',
      blur: 'NONE',
      tiltAngle: 0.0,
      focusStable: true,
      score: 88
    },
    notes: [],
    tags: ['Audio', 'Dispatch Call', 'Witness Recording'],
    capturedBy: 'Security Control System'
  }
];

export const DEMO_AI_ANALYSIS: Record<string, AIAnalysis> = {
  'evd-001': {
    id: 'ana-001',
    evidenceId: 'evd-001',
    caseId: 'case-2026-001',
    observedObjects: ['Dark SUV Vehicle', 'Loading Dock Door B', 'Emergency Strobe Light', 'Security Perimeter Line'],
    sceneDetails: 'Low-light industrial exterior perimeter in Saibaba Colony, Coimbatore. Loading dock door B rendered partially open by approximately 45cm.',
    visibleText: ['CAM-04', 'COIMBATORE DOCK B', '08/09/2026 10:18:42 IST'],
    metadata: {
      'Camera Sensor': 'Sony Starvis 4K',
      'Location': 'Coimbatore, TN (641011)',
      'Frame Rate': '30 fps',
      'Timestamp': '08/09/2026 10:18:42 IST'
    },
    inferences: [
      {
        id: 'inf-01',
        text: 'Vehicle profile matches a Dark Blue Commercial SUV (Reg: TN 38 series).',
        confidence: 88,
        evidenceId: 'EVD-IN-2026-015-024',
        level: 3,
        reasoningBasis: 'Visual feature extraction matches domestic SUV chassis database.',
        verificationStatus: 'REQUIRES_VERIFICATION'
      },
      {
        id: 'inf-02',
        text: 'The dock door was opened from exterior using mechanical leverage.',
        confidence: 76,
        evidenceId: 'EVD-IN-2026-015-024',
        level: 3,
        reasoningBasis: 'Stress bending on lower panel latch matches exterior pry tool application.',
        verificationStatus: 'REQUIRES_VERIFICATION'
      }
    ],
    requiresVerification: [
      'Confirm physical tool marks on Dock B latch',
      'Cross-reference vehicle entry clearance with Gate 2 logs'
    ],
    confidenceScore: 86,
    generatedAt: '08/09/2026 • 10:25 AM IST',
    modelName: 'Hari Vision OS v3.2-Forensic'
  },
  'evd-002': {
    id: 'ana-002',
    evidenceId: 'evd-002',
    caseId: 'case-2026-001',
    observedObjects: ['License Plate "TN 38 AB 1234"', 'SUV Rear Bumper', 'Exhaust Port'],
    sceneDetails: 'Close-up high contrast vehicle photo. License plate TN 38 AB 1234 clean and clearly legible.',
    visibleText: ['TN 38 AB 1234'],
    metadata: {
      'Camera': 'Mobile Optical 3x Lens',
      'Location': 'Saibaba Colony, Coimbatore',
      'Registration': 'Tamil Nadu RTO TN-38 (Coimbatore North)'
    },
    inferences: [
      {
        id: 'inf-03',
        text: 'License Plate TN 38 AB 1234 is registered under RTO Coimbatore North (TN-38).',
        confidence: 94,
        evidenceId: 'EVD-IN-2026-015-025',
        level: 2,
        reasoningBasis: 'Direct OCR text query against mock vehicle registry.',
        verificationStatus: 'HUMAN_VERIFIED'
      }
    ],
    requiresVerification: [
      'Verify driver authorization records for plate TN 38 AB 1234'
    ],
    confidenceScore: 94,
    generatedAt: '08/09/2026 • 10:20 AM IST',
    modelName: 'Hari OCR & Entity Extractor'
  }
};

export const DEMO_PEOPLE: Person[] = [
  {
    id: 'p-001',
    caseId: 'case-2026-001',
    name: 'Inspector K. Sundaram',
    role: 'Other',
    phone: '+91 98422 10982',
    email: 'k.sundaram@investigations.gov.in',
    notes: 'Lead Investigator assigned to Coimbatore Sector 4 incident.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    connectedEvidenceIds: ['evd-001', 'evd-003']
  },
  {
    id: 'p-002',
    caseId: 'case-2026-001',
    name: 'Arumugam Perumal',
    role: 'Witness',
    phone: '+91 98765 43210',
    email: 'a.perumal@logistics.co.in',
    notes: 'Night Shift Warehouse Manager on duty during breach.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    connectedEvidenceIds: ['evd-004']
  },
  {
    id: 'p-003',
    caseId: 'case-2026-001',
    name: 'Priyadarshini Rajan',
    role: 'Reporting Party',
    phone: '+91 94431 88201',
    email: 'p.rajan@security.co.in',
    notes: 'Perimeter Security Officer who discovered vehicle TN 38 AB 1234 and reported alarm.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    connectedEvidenceIds: ['evd-002', 'evd-005']
  },
  {
    id: 'p-004',
    caseId: 'case-2026-001',
    name: 'Unknown SUV Driver',
    role: 'Person of Interest',
    notes: 'Individual observed operating SUV TN 38 AB 1234 near Dock B.',
    connectedEvidenceIds: ['evd-001', 'evd-002']
  }
];

export const DEMO_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-001',
    caseId: 'case-2026-001',
    name: 'Dock Door B, Saibaba Colony Warehouse',
    address: '104 Mettupalayam Road, Saibaba Colony, Coimbatore, Tamil Nadu (641011)',
    description: 'Main loading bay door equipped with pressure sensors and security locks.',
    connectedEvidenceIds: ['evd-001', 'evd-003']
  },
  {
    id: 'loc-002',
    caseId: 'case-2026-001',
    name: 'Perimeter Gate 2 Checkpoint',
    address: 'Gate 2, Mettupalayam Highway, Coimbatore (641011)',
    description: 'Vehicle entry checkpoint with license plate camera.',
    connectedEvidenceIds: ['evd-002', 'evd-004']
  }
];

export const DEMO_EVENTS: InvestigationEvent[] = [
  {
    id: 'evt-001',
    caseId: 'case-2026-001',
    timestamp: '08/09/2026 • 10:05 AM IST',
    title: 'Vehicle Check-in at Gate 2',
    description: 'Dark SUV with license plate TN 38 AB 1234 enters Sector 4 perimeter via Gate 2.',
    locationName: 'Perimeter Gate 2 Checkpoint',
    supportingEvidenceIds: ['evd-002', 'evd-004'],
    confidence: 98,
    verified: true
  },
  {
    id: 'evt-002',
    caseId: 'case-2026-001',
    timestamp: '08/09/2026 • 10:18 AM IST',
    title: 'Dock Door B Forced Open Alarm',
    description: 'Security sensor triggers forced open alarm on Dock Door B. Motion detected by CAM-04.',
    locationName: 'Dock Door B, Coimbatore Warehouse',
    supportingEvidenceIds: ['evd-001'],
    confidence: 100,
    verified: true
  },
  {
    id: 'evt-003',
    caseId: 'case-2026-001',
    timestamp: '08/09/2026 • 10:20 AM IST',
    title: 'Dispatch Notification by Officer Priyadarshini',
    description: 'Emergency security notification initiated following door alarm trigger.',
    locationName: 'Coimbatore Security Office',
    supportingEvidenceIds: ['evd-005'],
    confidence: 95,
    verified: true
  },
  {
    id: 'evt-004',
    caseId: 'case-2026-001',
    timestamp: '08/09/2026 • 10:23 AM IST',
    title: 'Rapid Departure of SUV (TN 38 AB 1234)',
    description: 'Vehicle TN 38 AB 1234 exits perimeter gate towards Mettupalayam Highway.',
    locationName: 'Perimeter Gate 2 Checkpoint',
    supportingEvidenceIds: ['evd-004'],
    confidence: 85,
    verified: false,
    isAiSuggested: true
  }
];

export const DEMO_STATEMENTS: Statement[] = [
  {
    id: 'stmt-001',
    caseId: 'case-2026-001',
    personId: 'p-002',
    personName: 'Arumugam Perumal (Manager)',
    date: '08/09/2026 • 11:15 AM IST',
    rawText: 'I was in the control room in Saibaba Colony reviewing stock registers when the Dock B alarm chimed at around 10:25 AM IST. I did not hear any vehicle engines prior to the alarm. All dock doors were supposed to be locked at 10:00 AM sharp.',
    extractedEntities: {
      people: ['Arumugam Perumal'],
      locations: ['Control Room', 'Saibaba Colony', 'Dock B'],
      times: ['10:25 AM IST', '10:00 AM IST'],
      claims: ['Alarm sounded at 10:25 AM IST', 'No vehicle engine noise heard', 'Doors locked at 10:00 AM IST'],
      objects: ['Stock Registers', 'Dock B Doors']
    },
    comparisons: [
      {
        id: 'comp-01',
        evidenceId: 'EVD-IN-2026-015-024',
        evidenceTitle: 'CCTV Camera 04 Dock B Frame',
        status: 'DISCREPANCY',
        detail: 'Witness claimed alarm occurred at 10:25 AM IST, but CCTV timestamp proves alarm triggered precisely at 10:18:42 AM IST.'
      },
      {
        id: 'comp-02',
        evidenceId: 'EVD-IN-2026-015-027',
        evidenceTitle: 'Security Gate Logsheet',
        status: 'SUPPORTED',
        detail: 'Confirms doors were scheduled for lockdown at 10:00 AM IST.'
      }
    ]
  },
  {
    id: 'stmt-002',
    caseId: 'case-2026-001',
    personId: 'p-003',
    personName: 'Priyadarshini Rajan (Security Guard)',
    date: '08/09/2026 • 10:40 AM IST',
    rawText: 'I was conducting routine perimeter checks along Mettupalayam Road when I spotted a dark blue SUV idling near Dock B around 10:10 AM IST. I took a photo of the license plate TN 38 AB 1234. Eight minutes later I heard the door latch snap and called security control immediately.',
    extractedEntities: {
      people: ['Priyadarshini Rajan'],
      locations: ['Mettupalayam Road', 'Dock B'],
      times: ['10:10 AM IST', '10:18 AM IST'],
      claims: ['SUV idled near Dock B at 10:10 AM IST', 'Heard door latch snap at 10:18 AM IST', 'Called security control immediately'],
      objects: ['Dark Blue SUV', 'Plate TN 38 AB 1234', 'Door Latch']
    },
    comparisons: [
      {
        id: 'comp-03',
        evidenceId: 'EVD-IN-2026-015-025',
        evidenceTitle: 'Vehicle Reconnaissance Photo',
        status: 'SUPPORTED',
        detail: 'Photo EXIF timestamp confirms 10:10:15 AM IST capture time.'
      },
      {
        id: 'comp-04',
        evidenceId: 'EVD-IN-2026-015-028',
        evidenceTitle: 'Security Control Call Recording Audio',
        status: 'SUPPORTED',
        detail: 'Call recording audio timestamp matches call at 10:20:12 AM IST.'
      }
    ]
  }
];

export const DEMO_GRAPH_NODES: GraphNode[] = [
  { id: 'node-case', label: 'CASE #2026-001', type: 'EVENT', subtitle: 'Coimbatore Warehouse Incident', x: 400, y: 220 },
  { id: 'node-evd1', label: 'EVD-IN-024 (CCTV)', type: 'EVIDENCE', subtitle: 'Camera 04 Frame', x: 250, y: 120 },
  { id: 'node-evd2', label: 'EVD-IN-025 (SUV Photo)', type: 'EVIDENCE', subtitle: 'TN 38 AB 1234', x: 550, y: 120 },
  { id: 'node-evd3', label: 'EVD-IN-026 (Scene)', type: 'EVIDENCE', subtitle: 'Tamper Seal C-409', x: 180, y: 320 },
  { id: 'node-evd4', label: 'EVD-IN-027 (Logsheet)', type: 'EVIDENCE', subtitle: 'Gate 2 Security Log', x: 620, y: 320 },
  { id: 'node-p1', label: 'Insp. K. Sundaram', type: 'PERSON', subtitle: 'Lead Investigator', x: 400, y: 60 },
  { id: 'node-p2', label: 'Arumugam Perumal', type: 'PERSON', subtitle: 'Manager (Witness)', x: 120, y: 200 },
  { id: 'node-p3', label: 'Priyadarshini Rajan', type: 'PERSON', subtitle: 'Guard (Reporting)', x: 680, y: 200 },
  { id: 'node-p4', label: 'Unknown SUV Driver', type: 'PERSON', subtitle: 'Person of Interest', x: 400, y: 380 },
  { id: 'node-loc1', label: 'Dock Door B', type: 'LOCATION', subtitle: 'Point of Breach', x: 280, y: 260 },
  { id: 'node-loc2', label: 'Gate 2 Checkpoint', type: 'LOCATION', subtitle: 'Perimeter Entry', x: 520, y: 260 },
  { id: 'node-veh', label: 'SUV TN 38 AB 1234', type: 'VEHICLE', subtitle: 'Dark Blue Vehicle', x: 400, y: 300 }
];

export const DEMO_GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', source: 'node-evd1', target: 'node-loc1', relationship: 'Located at', status: 'CONFIRMED', supportingEvidenceId: 'EVD-IN-2026-015-024' },
  { id: 'e2', source: 'node-evd2', target: 'node-veh', relationship: 'Appears in', status: 'CONFIRMED', supportingEvidenceId: 'EVD-IN-2026-015-025' },
  { id: 'e3', source: 'node-veh', target: 'node-p4', relationship: 'Associated with', status: 'SUSPECTED' },
  { id: 'e4', source: 'node-p2', target: 'node-evd1', relationship: 'Potentially conflicts with', status: 'DISCREPANT' },
  { id: 'e5', source: 'node-p3', target: 'node-evd2', relationship: 'Supports', status: 'CONFIRMED', supportingEvidenceId: 'EVD-IN-2026-015-025' },
  { id: 'e6', source: 'node-veh', target: 'node-loc1', relationship: 'Located at', status: 'CONFIRMED', supportingEvidenceId: 'EVD-IN-2026-015-024' },
  { id: 'e7', source: 'node-evd3', target: 'node-loc1', relationship: 'Appears in', status: 'CONFIRMED', supportingEvidenceId: 'EVD-IN-2026-015-026' },
  { id: 'e8', source: 'node-evd4', target: 'node-loc2', relationship: 'Located at', status: 'CONFIRMED', supportingEvidenceId: 'EVD-IN-2026-015-027' }
];

export const DEMO_LEADS: Lead[] = [
  {
    id: 'lead-001',
    caseId: 'case-2026-001',
    title: 'Trace Owner Registration for Vehicle TN 38 AB 1234',
    reason: 'Vehicle photo EVD-IN-2026-015-025 identifies license plate TN 38 AB 1234 registered in Coimbatore North (TN-38).',
    priority: 'CRITICAL',
    status: 'NEW',
    supportingEvidenceIds: ['evd-002'],
    confidence: 92,
    verificationAction: 'Query RTO Coimbatore North database mock for registered owner details.',
    createdAt: '08/09/2026 • 11:30 AM IST'
  },
  {
    id: 'lead-002',
    caseId: 'case-2026-001',
    title: 'Re-interview Arumugam Perumal Regarding Time Discrepancy',
    reason: 'Statement stmt-001 claims alarm occurred at 10:25 AM IST, conflicting with CCTV timestamp 10:18:42 AM IST.',
    priority: 'HIGH',
    status: 'REVIEWING',
    supportingEvidenceIds: ['evd-001'],
    confidence: 88,
    verificationAction: 'Confront manager with CAM-04 timestamp log and request clear timeline clarification.',
    createdAt: '08/09/2026 • 11:45 AM IST'
  },
  {
    id: 'lead-003',
    caseId: 'case-2026-001',
    title: 'Audit Consignment #C-409 Inventory in Saibaba Colony Bay',
    reason: 'Scene photo EVD-IN-2026-015-026 shows broken security seal on consignment crate.',
    priority: 'HIGH',
    status: 'VERIFIED',
    supportingEvidenceIds: ['evd-003'],
    confidence: 95,
    verificationAction: 'Conduct physical inventory audit against consignment manifest #MAN-8841.',
    createdAt: '08/09/2026 • 12:00 PM IST'
  }
];

export const DEMO_GAPS: EvidenceGap[] = [
  {
    id: 'gap-001',
    caseId: 'case-2026-001',
    type: 'UNKNOWN',
    title: 'Identity of Driver Operating SUV TN 38 AB 1234 Unconfirmed',
    description: 'CCTV CAM-04 captured vehicle profile but facial features were rendered unreadable due to window tint.',
    recommendedAction: 'Query adjacent municipal traffic cameras along Mettupalayam Highway exit corridor.',
    reason: 'Establishes positive identification of person operating vehicle during breach.',
    priority: 'HIGH'
  },
  {
    id: 'gap-002',
    caseId: 'case-2026-001',
    type: 'MISSING_CONTEXT',
    title: 'Interior CCTV Footage from Dock B Staging Bay',
    description: 'Internal camera CAM-05 was undergoing scheduled maintenance during event interval.',
    recommendedAction: 'Recover backup memory cache from CAM-05 local buffer device.',
    reason: 'Determines whether cargo was loaded into vehicle or removed on foot.',
    priority: 'MEDIUM'
  }
];

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-001',
    caseId: 'case-2026-001',
    timestamp: '08/09/2026 • 10:30 AM IST',
    user: 'Insp. K. Sundaram',
    action: 'CREATE_CASE',
    object: 'CASE #2026-001',
    details: 'Initiated investigation workspace for Coimbatore Warehouse Incident.'
  },
  {
    id: 'aud-002',
    caseId: 'case-2026-001',
    timestamp: '08/09/2026 • 10:32 AM IST',
    user: 'Insp. K. Sundaram',
    action: 'INGEST_EVIDENCE',
    object: 'EVD-IN-2026-015-024',
    details: 'Uploaded CCTV Camera 04 frame capture. Computed SHA-256 hash.'
  },
  {
    id: 'aud-003',
    caseId: 'case-2026-001',
    timestamp: '08/09/2026 • 10:35 AM IST',
    user: 'Hari AI System',
    action: 'AI_ANALYSIS_COMPLETED',
    object: 'EVD-IN-2026-015-024',
    details: 'Extracted scene objects, vehicle profile, and door breach mechanics. Assigned 86% confidence.'
  },
  {
    id: 'aud-004',
    caseId: 'case-2026-001',
    timestamp: '08/09/2026 • 11:20 AM IST',
    user: 'Insp. K. Sundaram',
    action: 'VERIFY_EVIDENCE',
    object: 'EVD-IN-2026-015-025',
    details: 'Human verified vehicle reconnaissance photo and plate TN 38 AB 1234.'
  }
];
