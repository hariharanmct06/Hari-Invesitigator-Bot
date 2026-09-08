import React, { createContext, useContext, useState, useEffect } from 'react';
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
  AuditLog,
  OfflineQueueItem
} from '../types/investigation';
import {
  DEMO_CASE,
  DEMO_EVIDENCE,
  DEMO_AI_ANALYSIS,
  DEMO_PEOPLE,
  DEMO_LOCATIONS,
  DEMO_EVENTS,
  DEMO_STATEMENTS,
  DEMO_GRAPH_NODES,
  DEMO_GRAPH_EDGES,
  DEMO_LEADS,
  DEMO_GAPS,
  DEMO_AUDIT_LOGS
} from '../data/demoData';

interface InvestigationContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  cases: Case[];
  currentCase: Case;
  setCurrentCase: (c: Case) => void;
  addCase: (c: Case) => void;
  
  evidence: Evidence[];
  selectedEvidence: Evidence | null;
  setSelectedEvidence: (e: Evidence | null) => void;
  addEvidence: (e: Evidence, analysis?: AIAnalysis) => void;
  verifyEvidence: (id: string) => void;
  
  aiAnalyses: Record<string, AIAnalysis>;
  
  people: Person[];
  locations: LocationItem[];
  events: InvestigationEvent[];
  addEvent: (evt: InvestigationEvent) => void;
  
  statements: Statement[];
  
  nodes: GraphNode[];
  edges: GraphEdge[];
  addNode: (node: GraphNode) => void;
  addEdge: (edge: GraphEdge) => void;
  
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  
  gaps: EvidenceGap[];
  auditLogs: AuditLog[];
  addAuditLog: (action: string, object: string, details: string) => void;
  
  isCameraOpen: boolean;
  openCamera: () => void;
  closeCamera: () => void;
  
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  
  offlineQueue: OfflineQueueItem[];
  isOnline: boolean;
  resetDemoData: () => void;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('hari_theme') as 'dark' | 'light') || 'dark';
  });
  
  const [activeTab, setActiveTab] = useState<string>('command');
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  const [cases, setCases] = useState<Case[]>(() => {
    const saved = localStorage.getItem('hari_cases');
    return saved ? JSON.parse(saved) : [DEMO_CASE];
  });
  
  const [currentCase, setCurrentCase] = useState<Case>(cases[0] || DEMO_CASE);
  
  const [evidence, setEvidence] = useState<Evidence[]>(() => {
    const saved = localStorage.getItem('hari_evidence');
    return saved ? JSON.parse(saved) : DEMO_EVIDENCE;
  });
  
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  
  const [aiAnalyses, setAiAnalyses] = useState<Record<string, AIAnalysis>>(() => {
    const saved = localStorage.getItem('hari_analyses');
    return saved ? JSON.parse(saved) : DEMO_AI_ANALYSIS;
  });
  
  const [people, setPeople] = useState<Person[]>(DEMO_PEOPLE);
  const [locations, setLocations] = useState<LocationItem[]>(DEMO_LOCATIONS);
  const [events, setEvents] = useState<InvestigationEvent[]>(DEMO_EVENTS);
  const [statements, setStatements] = useState<Statement[]>(DEMO_STATEMENTS);
  const [nodes, setNodes] = useState<GraphNode[]>(DEMO_GRAPH_NODES);
  const [edges, setEdges] = useState<GraphEdge[]>(DEMO_GRAPH_EDGES);
  const [leads, setLeads] = useState<Lead[]>(DEMO_LEADS);
  const [gaps, setGaps] = useState<EvidenceGap[]>(DEMO_GAPS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(DEMO_AUDIT_LOGS);
  const [offlineQueue, setOfflineQueue] = useState<OfflineQueueItem[]>([]);

  // Apply theme class to root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
    localStorage.setItem('hari_theme', theme);
  }, [theme]);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('hari_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('hari_evidence', JSON.stringify(evidence));
  }, [evidence]);

  useEffect(() => {
    localStorage.setItem('hari_analyses', JSON.stringify(aiAnalyses));
  }, [aiAnalyses]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addCase = (c: Case) => {
    setCases(prev => [c, ...prev]);
    setCurrentCase(c);
    addAuditLog('CREATE_CASE', c.caseNumber, `Created new case ${c.title}`);
  };

  const addEvidence = (newE: Evidence, newAnalysis?: AIAnalysis) => {
    setEvidence(prev => [newE, ...prev]);
    if (newAnalysis) {
      setAiAnalyses(prev => ({ ...prev, [newE.id]: newAnalysis }));
    }
    
    // Auto add node to graph
    const newNode: GraphNode = {
      id: `node-${newE.id}`,
      label: newE.evidenceId,
      type: 'EVIDENCE',
      subtitle: newE.title,
      x: 300 + Math.random() * 200,
      y: 150 + Math.random() * 200
    };
    setNodes(prev => [...prev, newNode]);

    addAuditLog('INGEST_EVIDENCE', newE.evidenceId, `Ingested ${newE.category} evidence. Hash: ${newE.hash.substring(0, 12)}...`);

    // If offline, add to queue
    if (!navigator.onLine) {
      const queueItem: OfflineQueueItem = {
        id: `q-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'EVIDENCE_UPLOAD',
        payload: newE,
        status: 'QUEUED'
      };
      setOfflineQueue(prev => [...prev, queueItem]);
    }
  };

  const verifyEvidence = (id: string) => {
    setEvidence(prev =>
      prev.map(e => (e.id === id ? { ...e, status: 'VERIFIED' as const } : e))
    );
    const item = evidence.find(e => e.id === id);
    if (item) {
      addAuditLog('VERIFY_EVIDENCE', item.evidenceId, 'Human Investigator verified evidence validity and provenance.');
    }
  };

  const addEvent = (evt: InvestigationEvent) => {
    setEvents(prev => [...prev, evt]);
    addAuditLog('CREATE_EVENT', evt.title, `Added timeline event at ${evt.timestamp}`);
  };

  const addNode = (node: GraphNode) => {
    setNodes(prev => [...prev, node]);
  };

  const addEdge = (edge: GraphEdge) => {
    setEdges(prev => [...prev, edge]);
  };

  const addLead = (lead: Lead) => {
    setLeads(prev => [lead, ...prev]);
    addAuditLog('CREATE_LEAD', lead.title, `Generated investigation lead with ${lead.priority} priority`);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    addAuditLog('UPDATE_LEAD', id, `Updated lead status to ${status}`);
  };

  const addAuditLog = (action: string, object: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      caseId: currentCase.id,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Insp. M. Vance',
      action,
      object,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);

  const resetDemoData = () => {
    setCases([DEMO_CASE]);
    setCurrentCase(DEMO_CASE);
    setEvidence(DEMO_EVIDENCE);
    setAiAnalyses(DEMO_AI_ANALYSIS);
    setPeople(DEMO_PEOPLE);
    setLocations(DEMO_LOCATIONS);
    setEvents(DEMO_EVENTS);
    setStatements(DEMO_STATEMENTS);
    setNodes(DEMO_GRAPH_NODES);
    setEdges(DEMO_GRAPH_EDGES);
    setLeads(DEMO_LEADS);
    setGaps(DEMO_GAPS);
    setAuditLogs(DEMO_AUDIT_LOGS);
    localStorage.clear();
  };

  return (
    <InvestigationContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        cases,
        currentCase,
        setCurrentCase,
        addCase,
        evidence,
        selectedEvidence,
        setSelectedEvidence,
        addEvidence,
        verifyEvidence,
        aiAnalyses,
        people,
        locations,
        events,
        addEvent,
        statements,
        nodes,
        edges,
        addNode,
        addEdge,
        leads,
        addLead,
        updateLeadStatus,
        gaps,
        auditLogs,
        addAuditLog,
        isCameraOpen,
        openCamera,
        closeCamera,
        isAboutOpen,
        setIsAboutOpen,
        offlineQueue,
        isOnline,
        resetDemoData
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
};

export const useInvestigation = () => {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
};
