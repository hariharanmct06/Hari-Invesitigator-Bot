export type EvidenceLevel = 1 | 2 | 3 | 4 | 5;

export type CasePriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type CaseStatus = 'ACTIVE' | 'PENDING' | 'CLOSED' | 'ARCHIVED';

export interface IndianAddress {
  country: string; // Default: 'India'
  state: string; // e.g. 'Tamil Nadu'
  district: string; // e.g. 'Coimbatore'
  city: string; // e.g. 'Coimbatore'
  locality: string; // e.g. 'Saibaba Colony'
  street?: string;
  building?: string;
  pinCode: string; // e.g. '641011'
}

export interface Case {
  id: string;
  caseNumber: string; // e.g. "CASE #2026-001"
  title: string;
  description: string;
  incidentDate: string; // e.g. "08/09/2026 • 10:18 AM IST"
  location: string;
  address?: IndianAddress;
  priority: CasePriority;
  status: CaseStatus;
  leadInvestigator: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type EvidenceCategory = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'CARD';
export type EvidenceStatus = 'VERIFIED' | 'NEEDS_REVIEW' | 'UNVERIFIED' | 'DISMISSED';

export interface QualityMetrics {
  lighting: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  blur: 'NONE' | 'SLIGHT' | 'HIGH';
  tiltAngle: number;
  focusStable: boolean;
  score: number; // 0 - 100
}

export interface EvidenceNote {
  id: string;
  author: string;
  timestamp: string;
  text: string;
}

export interface Evidence {
  id: string;
  evidenceId: string; // e.g. "EVD-IN-2026-015-024"
  caseId: string;
  title: string;
  description: string;
  category: EvidenceCategory;
  fileUrl: string;
  originalUrl?: string;
  processedUrl?: string;
  hash: string; // SHA-256 checksum
  status: EvidenceStatus;
  level: EvidenceLevel;
  capturedAt: string; // IST
  deviceTime: string;
  resolution?: string;
  fileSize?: string;
  mimeType?: string;
  qualityMetrics?: QualityMetrics;
  notes: EvidenceNote[];
  tags: string[];
  capturedBy: string;
}

export interface AIInferenceItem {
  id: string;
  text: string;
  confidence: number;
  evidenceId?: string;
  level: EvidenceLevel;
  reasoningBasis: string;
  verificationStatus: 'HUMAN_VERIFIED' | 'REQUIRES_VERIFICATION' | 'UNVERIFIED';
}

export interface AIAnalysis {
  id: string;
  evidenceId: string;
  caseId: string;
  observedObjects: string[];
  sceneDetails: string;
  visibleText: string[];
  metadata: Record<string, string>;
  inferences: AIInferenceItem[];
  requiresVerification: string[];
  confidenceScore: number;
  generatedAt: string;
  modelName: string;
}

export type PersonRole = 'Witness' | 'Reporting Party' | 'Person of Interest' | 'Unknown Individual' | 'Other';

export interface Person {
  id: string;
  caseId: string;
  name: string;
  role: PersonRole;
  phone?: string; // +91 98765 43210
  email?: string;
  notes: string;
  photoUrl?: string;
  connectedEvidenceIds: string[];
}

export interface LocationItem {
  id: string;
  caseId: string;
  name: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  description: string;
  connectedEvidenceIds: string[];
}

export interface InvestigationEvent {
  id: string;
  caseId: string;
  timestamp: string; // IST
  title: string;
  description: string;
  locationName?: string;
  supportingEvidenceIds: string[];
  confidence: number;
  verified: boolean;
  isAiSuggested?: boolean;
}

export interface StatementComparison {
  id: string;
  evidenceId: string;
  evidenceTitle: string;
  status: 'SUPPORTED' | 'DISCREPANCY' | 'CANNOT_VERIFY';
  detail: string;
}

export interface Statement {
  id: string;
  caseId: string;
  personId: string;
  personName: string;
  date: string;
  rawText: string;
  extractedEntities: {
    people: string[];
    locations: string[];
    times: string[];
    claims: string[];
    objects: string[];
  };
  comparisons: StatementComparison[];
}

export type NodeType = 'PERSON' | 'EVIDENCE' | 'LOCATION' | 'VEHICLE' | 'EVENT' | 'STATEMENT';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  subtitle: string;
  x: number;
  y: number;
  details?: string;
  status?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: 'Associated with' | 'Appears in' | 'Located at' | 'Mentioned in' | 'Supports' | 'Potentially conflicts with';
  status: 'CONFIRMED' | 'SUSPECTED' | 'DISCREPANT';
  supportingEvidenceId?: string;
}

export type LeadPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type LeadStatus = 'NEW' | 'REVIEWING' | 'VERIFIED' | 'DISMISSED' | 'COMPLETED';

export interface Lead {
  id: string;
  caseId: string;
  title: string;
  reason: string;
  priority: LeadPriority;
  status: LeadStatus;
  supportingEvidenceIds: string[];
  confidence: number;
  verificationAction: string;
  createdAt: string;
}

export interface EvidenceGap {
  id: string;
  caseId: string;
  type: 'KNOWN' | 'UNKNOWN' | 'MISSING_CONTEXT';
  title: string;
  description: string;
  recommendedAction: string;
  reason: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface AuditLog {
  id: string;
  caseId: string;
  timestamp: string;
  user: string;
  action: string;
  object: string;
  details: string;
}

export type CameraMode = 
  | 'PHOTO' 
  | 'VIDEO' 
  | 'DOCUMENT' 
  | 'ID_CARD' 
  | 'MULTI_SHOT' 
  | 'PANORAMA' 
  | 'BURST' 
  | 'AUDIO';

export interface OfflineQueueItem {
  id: string;
  timestamp: string;
  type: string;
  payload: any;
  status: 'QUEUED' | 'SYNCING' | 'FAILED';
}
