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
  cctv: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"><rect width="800" height="450" fill="%230f141d"/><path d="M0 0h800v450H0z" fill="url(%23g1)" opacity="0.3"/><rect x="50" y="100" width="700" height="300" rx="8" stroke="%23334155" stroke-width="2" fill="%231a202c"/><rect x="120" y="160" width="220" height="180" fill="%232d3748" stroke="%234a5568"/><rect x="380" y="140" width="180" height="200" fill="%232b3648"/><path d="M600 220l50 30-50 30z" fill="%23e53e3e"/><text x="70" y="130" fill="%2300ffcc" font-family="monospace" font-size="16">CAM-04 | DOCK B NORTH | 2026-09-07 22:18:42 UTC</text><text x="70" y="380" fill="%23ef4444" font-family="monospace" font-size="14">[MOTION DETECTED - 88% CONFIDENCE]</text><circle cx="680" cy="80" r="12" fill="%23ef4444"><animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/></circle><text x="700" y="85" fill="%23ffffff" font-family="sans-serif" font-size="14" font-weight="bold">REC</text><line x1="50" y1="250" x2="750" y2="250" stroke="%2300ffcc" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/></svg>`,
  vehicle: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"><rect width="800" height="450" fill="%23090d16"/><rect x="100" y="180" width="600" height="180" rx="30" fill="%231e293b" stroke="%233b82f6" stroke-width="2"/><path d="M220 180 L320 100 L550 100 L620 180 Z" fill="%230f172a" stroke="%2364748b" stroke-width="2"/><circle cx="220" cy="360" r="45" fill="%23334155" stroke="%2394a3b8" stroke-width="6"/><circle cx="580" cy="360" r="45" fill="%23334155" stroke="%2394a3b8" stroke-width="6"/><rect x="650" y="240" width="40" height="20" fill="%23f59e0b" rx="4"/><rect x="360" y="280" width="120" height="30" fill="%23ffffff" rx="4" stroke="%23000000" stroke-width="2"/><text x="375" y="301" fill="%23000000" font-family="monospace" font-size="16" font-weight="bold">7XYZ994</text><text x="40" y="50" fill="%233b82f6" font-family="monospace" font-size="16">EVD-2026-001-002 | VEHICLE RECONNAISSANCE SCAN</text></svg>`,
  scene: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"><rect width="800" height="450" fill="%23111827"/><rect x="80" y="80" width="640" height="300" fill="%231f2937" stroke="%23374151" stroke-width="2"/><line x1="200" y1="80" x2="200" y2="380" stroke="%23ef4444" stroke-width="4" stroke-dasharray="6 6"/><rect x="350" y="200" width="180" height="120" fill="%23374151" stroke="%23f59e0b" stroke-width="2"/><text x="370" y="260" fill="%23f59e0b" font-family="sans-serif" font-size="14">CRATE #B-409</text><text x="370" y="280" fill="%23ef4444" font-family="sans-serif" font-size="12">TAMPER SEAL BROKEN</text><circle cx="200" cy="240" r="30" stroke="%23ef4444" stroke-width="2" fill="none"/><text x="100" y="420" fill="%239ca3af" font-family="monospace" font-size="14">SCENE PHOTOGRAPHY - LOADING DOCK OVERVIEW (POINT OF BREACH)</text></svg>`,
  document: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="none"><rect width="600" height="800" fill="%23f8fafc"/><rect x="40" y="40" width="520" height="720" fill="%23ffffff" stroke="%23cbd5e1" stroke-width="2" rx="4"/><text x="80" y="100" fill="%230f172a" font-family="sans-serif" font-size="20" font-weight="bold">WAREHOUSE SECURITY LOGSHEET</text><text x="80" y="130" fill="%2364748b" font-family="monospace" font-size="12">DATE: 2026-09-07 | SHIFT: NIGHT (22:00 - 06:00)</text><line x1="80" y1="150" x2="520" y2="150" stroke="%23e2e8f0" stroke-width="2"/><text x="80" y="190" fill="%23334155" font-family="sans-serif" font-size="14">22:05 - Gate 2 check-in: SUV (Lic: 7XYZ994) entered.</text><text x="80" y="230" fill="%23334155" font-family="sans-serif" font-size="14">22:14 - Cargo manifest validation approved by M. Vance.</text><text x="80" y="270" fill="%23dc2626" font-family="sans-serif" font-size="14" font-weight="bold">22:18 - ALARM TRIGGER: Dock Door B Force Disconnected.</text><text x="80" y="310" fill="%23334155" font-family="sans-serif" font-size="14">22:23 - Vehicle departed gate at elevated speed.</text><rect x="75" y="250" x2="450" y2="330" fill="none" stroke="%23ef4444" stroke-width="2" stroke-dasharray="4 4"/><text x="80" y="720" fill="%2394a3b8" font-family="monospace" font-size="11">SCAN PROVENANCE: ENHANCED PDF OCR COPIED TO VAULT</text></svg>`,
  audioWaveform: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200" viewBox="0 0 800 200" fill="none"><rect width="800" height="200" fill="%230f172a"/><path d="M20 100 L 40 80 L 60 120 L 80 40 L 100 160 L 120 70 L 140 130 L 160 30 L 180 170 L 200 90 L 220 110 L 240 50 L 260 150 L 280 80 L 300 120 L 320 20 L 340 180 L 360 90 L 380 110 L 400 60 L 420 140 L 440 80 L 460 120 L 480 40 L 500 160 L 520 70 L 540 130 L 560 30 L 580 170 L 600 90 L 620 110 L 640 50 L 660 150 L 680 80 L 700 120 L 720 90 L 740 110 L 760 100 L 780 100" stroke="%233b82f6" stroke-width="3" fill="none"/><line x1="0" y1="100" x2="800" y2="100" stroke="%23334155" stroke-width="1"/><text x="30" y="30" fill="%2360a5fa" font-family="monospace" font-size="14">AUDIO RECORDING - WITNESS DISPATCH CALL (02m 45s)</text></svg>`
};

export const DEMO_CASE: Case = {
  id: 'case-2026-001',
  caseNumber: 'CASE #2026-001',
  title: 'Warehouse Incident & Cargo Discrepancy',
  description: 'Investigation into unauthorized night access, breach of Dock B door, and high-value cargo displacement at Sector 4 Logistics Hub.',
  incidentDate: '2026-09-07 22:18:00',
  location: 'Sector 4 North Warehouse, Gate 2 & Dock B',
  priority: 'CRITICAL',
  status: 'ACTIVE',
  leadInvestigator: 'Inspector Marcus Vance',
  tags: ['Warehouse Breach', 'Cargo Displacement', 'CCTV Capture', 'Discrepancy'],
  createdAt: '2026-09-07 22:30:00',
  updatedAt: '2026-09-08 10:15:00',
};

export const DEMO_EVIDENCE: Evidence[] = [
  {
    id: 'evd-001',
    evidenceId: 'EVD-2026-001-001',
    caseId: 'case-2026-001',
    title: 'CCTV Camera 04 Dock B Frame',
    description: 'Frame capture showing dark vehicle positioned near Dock Door B during alarm trigger.',
    category: 'IMAGE',
    fileUrl: DEMO_MEDIA.cctv,
    originalUrl: DEMO_MEDIA.cctv,
    processedUrl: DEMO_MEDIA.cctv,
    hash: 'a8f5d72e9c13b48201a4e6f98c251d7e3401b2c4d5e6f7a8b9c0d1e2f3a4b5c6',
    status: 'VERIFIED',
    level: 1,
    capturedAt: '2026-09-07 22:18:42',
    deviceTime: '2026-09-07 22:18:42',
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
        author: 'Inspector M. Vance',
        timestamp: '2026-09-07 23:05:10',
        text: 'Vehicle license plate partially obscured by angle. Frame timestamp corresponds exactly with security system door alarm.'
      }
    ],
    tags: ['CCTV', 'Dock B', 'Vehicle', 'Alarm Trigger'],
    capturedBy: 'System Camera CAM-04'
  },
  {
    id: 'evd-002',
    evidenceId: 'EVD-2026-001-002',
    caseId: 'case-2026-001',
    title: 'Vehicle Reconnaissance Mobile Photo',
    description: 'Close-up capture of dark blue SUV license plate 7XYZ994 recorded near perimeter fence.',
    category: 'IMAGE',
    fileUrl: DEMO_MEDIA.vehicle,
    originalUrl: DEMO_MEDIA.vehicle,
    processedUrl: DEMO_MEDIA.vehicle,
    hash: 'b7e4c3d2a1098f7e6d5c4b3a210987654321fedcba9876543210abcdef123456',
    status: 'VERIFIED',
    level: 1,
    capturedAt: '2026-09-07 22:10:15',
    deviceTime: '2026-09-07 22:10:15',
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
        author: 'Officer E. Rostova',
        timestamp: '2026-09-07 22:15:00',
        text: 'Captured during perimeter patrol prior to main incident.'
      }
    ],
    tags: ['Vehicle', 'License Plate', 'Reconnaissance'],
    capturedBy: 'Officer E. Rostova'
  },
  {
    id: 'evd-003',
    evidenceId: 'EVD-2026-001-003',
    caseId: 'case-2026-001',
    title: 'Dock B Breach Scene Photo',
    description: 'Direct evidence photo showing broken security tamper seal on Crate #B-409 inside Loading Dock B.',
    category: 'IMAGE',
    fileUrl: DEMO_MEDIA.scene,
    originalUrl: DEMO_MEDIA.scene,
    processedUrl: DEMO_MEDIA.scene,
    hash: 'c1d2e3f4a5b6c7d8e9f0123456789abcdef0123456789abcdef0123456789abc',
    status: 'VERIFIED',
    level: 1,
    capturedAt: '2026-09-07 22:50:00',
    deviceTime: '2026-09-07 22:50:00',
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
    tags: ['Scene', 'Tamper Seal', 'Crate B-409'],
    capturedBy: 'Inspector M. Vance'
  },
  {
    id: 'evd-004',
    evidenceId: 'EVD-2026-001-004',
    caseId: 'case-2026-001',
    title: 'Security Gate Logsheet Document Scan',
    description: 'Scanned night shift security log sheet documenting gate check-ins and alarm events.',
    category: 'DOCUMENT',
    fileUrl: DEMO_MEDIA.document,
    originalUrl: DEMO_MEDIA.document,
    processedUrl: DEMO_MEDIA.document,
    hash: 'd9e8f7a6b5c4d3e2f109876543210fe9876543210fedcba98765432101234567',
    status: 'VERIFIED',
    level: 2,
    capturedAt: '2026-09-08 01:15:00',
    deviceTime: '2026-09-08 01:15:00',
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
    notes: [
      {
        id: 'n-3',
        author: 'Auditor A. Pendelton',
        timestamp: '2026-09-08 01:30:00',
        text: 'Page 1 scanned with automated perspective correction.'
      }
    ],
    tags: ['Document', 'Logsheet', 'OCR', 'Security Log'],
    capturedBy: 'Scanner App'
  },
  {
    id: 'evd-005',
    evidenceId: 'EVD-2026-001-005',
    caseId: 'case-2026-001',
    title: 'Witness Dispatch Call Audio',
    description: '911 Emergency dispatch call recording from shift supervisor reporting forced door alarm.',
    category: 'AUDIO',
    fileUrl: DEMO_MEDIA.audioWaveform,
    originalUrl: DEMO_MEDIA.audioWaveform,
    processedUrl: DEMO_MEDIA.audioWaveform,
    hash: 'e5f6a7b8c9d0e1f2013456789abcdef0123456789abcdef0123456789abcdef0',
    status: 'NEEDS_REVIEW',
    level: 2,
    capturedAt: '2026-09-07 22:20:12',
    deviceTime: '2026-09-07 22:20:12',
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
    tags: ['Audio', 'Dispatch Call', 'Witness Statement'],
    capturedBy: 'Dispatch System'
  }
];

export const DEMO_AI_ANALYSIS: Record<string, AIAnalysis> = {
  'evd-001': {
    id: 'ana-001',
    evidenceId: 'evd-001',
    caseId: 'case-2026-001',
    observedObjects: ['Dark SUV Vehicle', 'Loading Dock Door B', 'Emergency Strobe Light', 'Security Boundary Line'],
    sceneDetails: 'Low-light industrial exterior perimeter. Loading dock door B rendered partially open by approximately 45cm. Ground surface damp with fresh tire traction markings.',
    visibleText: ['CAM-04', 'DOCK B NORTH', '2026-09-07 22:18:42 UTC'],
    metadata: {
      'Camera Sensor': 'Sony Starvis 4K',
      'Focal Length': '4.2mm',
      'ISO': '3200',
      'Frame Rate': '30 fps',
      'File Compression': 'H.265'
    },
    inferences: [
      {
        id: 'inf-01',
        text: 'Vehicle profile matches a 2022-2024 Dark Metallic Blue Full-Size SUV.',
        confidence: 88,
        evidenceId: 'EVD-2026-001-001',
        level: 3,
        reasoningBasis: 'Visual feature extraction matches CAD model library of domestic full-size SUV chassis.',
        verificationStatus: 'REQUIRES_VERIFICATION'
      },
      {
        id: 'inf-02',
        text: 'The dock door was opened from the exterior using mechanical leverage.',
        confidence: 76,
        evidenceId: 'EVD-2026-001-001',
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
    generatedAt: '2026-09-07 22:25:00',
    modelName: 'Hari Vision OS v3.2-Forensic'
  },
  'evd-002': {
    id: 'ana-002',
    evidenceId: 'evd-002',
    caseId: 'case-2026-001',
    observedObjects: ['License Plate "7XYZ994"', 'SUV Rear Bumper', 'Exhaust Port', 'Tire Tread Pattern'],
    sceneDetails: 'Close-up high contrast vehicle photo. License plate clean and clearly legible under direct lighting.',
    visibleText: ['7XYZ994'],
    metadata: {
      'Camera': 'Mobile Optical 3x Lens',
      'Aperture': 'f/1.8',
      'GPS Coordinates': '37.7749 N, -122.4194 W'
    },
    inferences: [
      {
        id: 'inf-03',
        text: 'License Plate 7XYZ994 is registered to a dark blue commercial rental fleet vehicle.',
        confidence: 94,
        evidenceId: 'EVD-2026-002',
        level: 2,
        reasoningBasis: 'Direct OCR text query against state motor vehicle registration database mock.',
        verificationStatus: 'HUMAN_VERIFIED'
      }
    ],
    requiresVerification: [
      'Verify rental agreement holder details for plate 7XYZ994'
    ],
    confidenceScore: 94,
    generatedAt: '2026-09-07 22:20:00',
    modelName: 'Hari OCR & Entity Extractor'
  }
};

export const DEMO_PEOPLE: Person[] = [
  {
    id: 'p-001',
    caseId: 'case-2026-001',
    name: 'Inspector Marcus Vance',
    role: 'Other',
    phone: '+1 (555) 019-2831',
    email: 'm.vance@investigations.gov',
    notes: 'Lead Investigator assigned to Sector 4 incident.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    connectedEvidenceIds: ['evd-001', 'evd-003']
  },
  {
    id: 'p-002',
    caseId: 'case-2026-001',
    name: 'Arthur Pendelton',
    role: 'Witness',
    phone: '+1 (555) 014-9920',
    email: 'a.pendelton@logistics.corp',
    notes: 'Night Shift Warehouse Manager on duty during breach.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    connectedEvidenceIds: ['evd-004']
  },
  {
    id: 'p-003',
    caseId: 'case-2026-001',
    name: 'Elena Rostova',
    role: 'Reporting Party',
    phone: '+1 (555) 018-4411',
    email: 'e.rostova@security.org',
    notes: 'Perimeter Patrol Security Guard who discovered vehicle and raised alarm.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    connectedEvidenceIds: ['evd-002', 'evd-005']
  },
  {
    id: 'p-004',
    caseId: 'case-2026-001',
    name: 'Unknown SUV Driver',
    role: 'Person of Interest',
    notes: 'Individual observed operating SUV 7XYZ994 in vicinity of Dock B.',
    connectedEvidenceIds: ['evd-001', 'evd-002']
  }
];

export const DEMO_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-001',
    caseId: 'case-2026-001',
    name: 'Dock Door B, Sector 4 Warehouse',
    address: '104 Logistics Parkway, Building 4',
    description: 'Main loading bay door equipped with automated pressure sensors and security tamper locks.',
    connectedEvidenceIds: ['evd-001', 'evd-003']
  },
  {
    id: 'loc-002',
    caseId: 'case-2026-001',
    name: 'Perimeter Gate 2 Checkpoint',
    address: '104 Logistics Parkway, Gate 2',
    description: 'Vehicle entry checkpoint with license plate recognition scanner.',
    connectedEvidenceIds: ['evd-002', 'evd-004']
  }
];

export const DEMO_EVENTS: InvestigationEvent[] = [
  {
    id: 'evt-001',
    caseId: 'case-2026-001',
    timestamp: '2026-09-07 22:05:00',
    title: 'Vehicle Check-in at Gate 2',
    description: 'Dark SUV with license plate 7XYZ994 enters Sector 4 perimeter via Gate 2.',
    locationName: 'Perimeter Gate 2 Checkpoint',
    supportingEvidenceIds: ['evd-002', 'evd-004'],
    confidence: 98,
    verified: true
  },
  {
    id: 'evt-002',
    caseId: 'case-2026-001',
    timestamp: '2026-09-07 22:18:42',
    title: 'Dock Door B Forced Open Alarm',
    description: 'Security sensor triggers forced open alarm on Dock Door B. Motion detected by CAM-04.',
    locationName: 'Dock Door B, Sector 4 Warehouse',
    supportingEvidenceIds: ['evd-001'],
    confidence: 100,
    verified: true
  },
  {
    id: 'evt-003',
    caseId: 'case-2026-001',
    timestamp: '2026-09-07 22:20:12',
    title: 'Dispatch Call Placed by Officer Rostova',
    description: 'Emergency 911 dispatch notification initiated following alarm trigger.',
    locationName: 'Sector 4 Patrol Office',
    supportingEvidenceIds: ['evd-005'],
    confidence: 95,
    verified: true
  },
  {
    id: 'evt-004',
    caseId: 'case-2026-001',
    timestamp: '2026-09-07 22:23:00',
    title: 'Rapid Departure of SUV',
    description: 'Vehicle 7XYZ994 exits perimeter gate at elevated speed without clearance confirmation.',
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
    personName: 'Arthur Pendelton (Manager)',
    date: '2026-09-07 23:15:00',
    rawText: 'I was in the central control office reviewing inventory schedules when the Dock B alarm chimed at around 22:25. I did not hear any vehicle engines prior to the alarm. All dock doors were supposed to be secured at 22:00 sharp.',
    extractedEntities: {
      people: ['Arthur Pendelton'],
      locations: ['Central Control Office', 'Dock B'],
      times: ['22:25', '22:00'],
      claims: ['Alarm sounded at 22:25', 'No vehicle engine noise heard', 'Doors locked at 22:00'],
      objects: ['Inventory Schedules', 'Dock B Doors']
    },
    comparisons: [
      {
        id: 'comp-01',
        evidenceId: 'EVD-2026-001-001',
        evidenceTitle: 'CCTV Camera 04 Dock B Frame',
        status: 'DISCREPANCY',
        detail: 'Witness claimed alarm occurred at 22:25, but CCTV timestamp proves alarm triggered precisely at 22:18:42.'
      },
      {
        id: 'comp-02',
        evidenceId: 'EVD-2026-001-004',
        evidenceTitle: 'Security Gate Logsheet',
        status: 'SUPPORTED',
        detail: 'Confirms doors were scheduled for lockdown at 22:00.'
      }
    ]
  },
  {
    id: 'stmt-002',
    caseId: 'case-2026-001',
    personId: 'p-003',
    personName: 'Elena Rostova (Guard)',
    date: '2026-09-07 22:40:00',
    rawText: 'I was conducting routine perimeter checks when I spotted a dark SUV idling near Dock B around 22:10. I took a photo of the license plate 7XYZ994. Eight minutes later I heard the door latch snap and called dispatch immediately.',
    extractedEntities: {
      people: ['Elena Rostova'],
      locations: ['Perimeter Fence', 'Dock B'],
      times: ['22:10', '22:18'],
      claims: ['SUV idled near Dock B at 22:10', 'Heard door latch snap at 22:18', 'Called dispatch immediately'],
      objects: ['Dark SUV', 'License Plate 7XYZ994', 'Door Latch']
    },
    comparisons: [
      {
        id: 'comp-03',
        evidenceId: 'EVD-2026-001-002',
        evidenceTitle: 'Vehicle Reconnaissance Photo',
        status: 'SUPPORTED',
        detail: 'Photo EXIF timestamp confirms 22:10:15 capture time.'
      },
      {
        id: 'comp-04',
        evidenceId: 'EVD-2026-001-005',
        evidenceTitle: 'Witness Dispatch Call Audio',
        status: 'SUPPORTED',
        detail: 'Dispatch call audio timestamp matches call at 22:20:12.'
      }
    ]
  }
];

export const DEMO_GRAPH_NODES: GraphNode[] = [
  { id: 'node-case', label: 'CASE #2026-001', type: 'EVENT', subtitle: 'Warehouse Incident', x: 400, y: 220 },
  { id: 'node-evd1', label: 'EVD-001 (CCTV)', type: 'EVIDENCE', subtitle: 'Camera 04 Frame', x: 250, y: 120 },
  { id: 'node-evd2', label: 'EVD-002 (SUV Photo)', type: 'EVIDENCE', subtitle: 'Plate 7XYZ994', x: 550, y: 120 },
  { id: 'node-evd3', label: 'EVD-003 (Scene)', type: 'EVIDENCE', subtitle: 'Tamper Seal Crate B-409', x: 180, y: 320 },
  { id: 'node-evd4', label: 'EVD-004 (Logsheet)', type: 'EVIDENCE', subtitle: 'Gate 2 Security Log', x: 620, y: 320 },
  { id: 'node-p1', label: 'Insp. Marcus Vance', type: 'PERSON', subtitle: 'Lead Investigator', x: 400, y: 60 },
  { id: 'node-p2', label: 'Arthur Pendelton', type: 'PERSON', subtitle: 'Manager (Witness)', x: 120, y: 200 },
  { id: 'node-p3', label: 'Elena Rostova', type: 'PERSON', subtitle: 'Guard (Reporting)', x: 680, y: 200 },
  { id: 'node-p4', label: 'Unknown SUV Driver', type: 'PERSON', subtitle: 'Person of Interest', x: 400, y: 380 },
  { id: 'node-loc1', label: 'Dock Door B', type: 'LOCATION', subtitle: 'Point of Breach', x: 280, y: 260 },
  { id: 'node-loc2', label: 'Gate 2 Checkpoint', type: 'LOCATION', subtitle: 'Perimeter Entry', x: 520, y: 260 },
  { id: 'node-veh', label: 'SUV 7XYZ994', type: 'VEHICLE', subtitle: 'Dark Blue Fleet Vehicle', x: 400, y: 300 }
];

export const DEMO_GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', source: 'node-evd1', target: 'node-loc1', relationship: 'Located at', status: 'CONFIRMED', supportingEvidenceId: 'EVD-2026-001-001' },
  { id: 'e2', source: 'node-evd2', target: 'node-veh', relationship: 'Appears in', status: 'CONFIRMED', supportingEvidenceId: 'EVD-2026-001-002' },
  { id: 'e3', source: 'node-veh', target: 'node-p4', relationship: 'Associated with', status: 'SUSPECTED' },
  { id: 'e4', source: 'node-p2', target: 'node-evd1', relationship: 'Potentially conflicts with', status: 'DISCREPANT' },
  { id: 'e5', source: 'node-p3', target: 'node-evd2', relationship: 'Supports', status: 'CONFIRMED', supportingEvidenceId: 'EVD-2026-001-002' },
  { id: 'e6', source: 'node-veh', target: 'node-loc1', relationship: 'Located at', status: 'CONFIRMED', supportingEvidenceId: 'EVD-2026-001-001' },
  { id: 'e7', source: 'node-evd3', target: 'node-loc1', relationship: 'Appears in', status: 'CONFIRMED', supportingEvidenceId: 'EVD-2026-001-003' },
  { id: 'e8', source: 'node-evd4', target: 'node-loc2', relationship: 'Located at', status: 'CONFIRMED', supportingEvidenceId: 'EVD-2026-001-004' }
];

export const DEMO_LEADS: Lead[] = [
  {
    id: 'lead-001',
    caseId: 'case-2026-001',
    title: 'Trace Commercial Rental Agreement for Plate 7XYZ994',
    reason: 'Vehicle photo EVD-002 identifies license plate registered to dark blue rental SUV.',
    priority: 'CRITICAL',
    status: 'NEW',
    supportingEvidenceIds: ['evd-002'],
    confidence: 92,
    verificationAction: 'Issue subpoena to Fleet Rental Corp for driver identity and credit card records.',
    createdAt: '2026-09-07 23:30:00'
  },
  {
    id: 'lead-002',
    caseId: 'case-2026-001',
    title: 'Re-interview Arthur Pendelton Regarding Time Discrepancy',
    reason: 'Statement stmt-001 claims alarm occurred at 22:25, conflicting with CCTV timestamp 22:18:42.',
    priority: 'HIGH',
    status: 'REVIEWING',
    supportingEvidenceIds: ['evd-001'],
    confidence: 88,
    verificationAction: 'Confront manager with CAM-04 timestamp log and request clear timeline clarification.',
    createdAt: '2026-09-08 00:15:00'
  },
  {
    id: 'lead-003',
    caseId: 'case-2026-001',
    title: 'Forensic Audit of Crate #B-409 Contents',
    reason: 'Scene photo EVD-003 shows broken security seal on high-value consignment crate.',
    priority: 'HIGH',
    status: 'VERIFIED',
    supportingEvidenceIds: ['evd-003'],
    confidence: 95,
    verificationAction: 'Conduct physical inventory audit against manifest #MAN-8841.',
    createdAt: '2026-09-08 02:00:00'
  }
];

export const DEMO_GAPS: EvidenceGap[] = [
  {
    id: 'gap-001',
    caseId: 'case-2026-001',
    type: 'UNKNOWN',
    title: 'Identity of SUV Driver Unconfirmed',
    description: 'CCTV CAM-04 captured vehicle profile but facial features were rendered unreadable due to window tint.',
    recommendedAction: 'Query adjacent municipal highway traffic cameras along Route 9 exit corridor between 22:20 and 22:35.',
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
    timestamp: '2026-09-07 22:30:00',
    user: 'Insp. M. Vance',
    action: 'CREATE_CASE',
    object: 'CASE #2026-001',
    details: 'Initiated investigation workspace for Warehouse Incident.'
  },
  {
    id: 'aud-002',
    caseId: 'case-2026-001',
    timestamp: '2026-09-07 22:32:15',
    user: 'Insp. M. Vance',
    action: 'INGEST_EVIDENCE',
    object: 'EVD-2026-001-001',
    details: 'Uploaded CCTV Camera 04 frame capture. Computed SHA-256 hash.'
  },
  {
    id: 'aud-003',
    caseId: 'case-2026-001',
    timestamp: '2026-09-07 22:35:00',
    user: 'Hari AI System',
    action: 'AI_ANALYSIS_COMPLETED',
    object: 'EVD-2026-001-001',
    details: 'Extracted scene objects, vehicle profile, and door breach mechanics. Assigned 86% confidence.'
  },
  {
    id: 'aud-004',
    caseId: 'case-2026-001',
    timestamp: '2026-09-08 00:20:00',
    user: 'Insp. M. Vance',
    action: 'VERIFY_EVIDENCE',
    object: 'EVD-2026-001-002',
    details: 'Human verified vehicle reconnaissance photo and plate numbers.'
  }
];
