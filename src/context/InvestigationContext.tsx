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
import { Language, LOCALIZATION, Translations } from '../data/localization';

interface InvestigationContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  
  dataSaver: boolean;
  setDataSaver: (active: boolean) => void;
  toggleDataSaver: () => void;
  
  isDemoMode: boolean;
  enterDemoMode: () => void;
  exitDemoMode: () => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  cases: Case[];
  currentCase: Case | null;
  setCurrentCase: (c: Case | null) => void;
  addCase: (c: Case) => void;
  
  evidence: Evidence[];
  selectedEvidence: Evidence | null;
  setSelectedEvidence: (e: Evidence | null) => void;
  addEvidence: (e: Evidence, analysis?: AIAnalysis) => void;
  verifyEvidence: (id: string) => void;
  
  aiAnalyses: Record<string, AIAnalysis>;
  
  people: Person[];
  addPerson: (p: Person) => void;

  locations: LocationItem[];
  addLocation: (loc: LocationItem) => void;

  events: InvestigationEvent[];
  addEvent: (evt: InvestigationEvent) => void;
  
  statements: Statement[];
  addStatement: (stmt: Statement) => void;
  
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

  isEmergencyModalOpen: boolean;
  openEmergencyModal: () => void;
  closeEmergencyModal: () => void;
  
  offlineQueue: OfflineQueueItem[];
  isOnline: boolean;
  resetDemoData: () => void;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('hari_theme') as 'dark' | 'light') || 'dark';
  });
  
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('hari_lang') as Language) || 'EN';
  });

  const [dataSaver, setDataSaverState] = useState<boolean>(() => {
    return localStorage.getItem('hari_data_saver') === 'true';
  });

  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true';
  });
  
  const [activeTab, setActiveTab] = useState<string>('command');
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  // Cases state (GENUINELY EMPTY DEFAULT FOR REAL WORKSPACE)
  const [cases, setCases] = useState<Case[]>(() => {
    if (localStorage.getItem('hari_demo_mode') === 'true') return [DEMO_CASE];
    const saved = localStorage.getItem('hari_real_cases');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentCase, setCurrentCase] = useState<Case | null>(cases[0] || null);
  
  // Evidence state (GENUINELY EMPTY DEFAULT)
  const [evidence, setEvidence] = useState<Evidence[]>(() => {
    if (localStorage.getItem('hari_demo_mode') === 'true') return DEMO_EVIDENCE;
    const saved = localStorage.getItem('hari_real_evidence');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  
  const [aiAnalyses, setAiAnalyses] = useState<Record<string, AIAnalysis>>(() => {
    if (localStorage.getItem('hari_demo_mode') === 'true') return DEMO_AI_ANALYSIS;
    const saved = localStorage.getItem('hari_real_analyses');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [people, setPeople] = useState<Person[]>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true' ? DEMO_PEOPLE : [];
  });

  const [locations, setLocations] = useState<LocationItem[]>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true' ? DEMO_LOCATIONS : [];
  });

  const [events, setEvents] = useState<InvestigationEvent[]>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true' ? DEMO_EVENTS : [];
  });

  const [statements, setStatements] = useState<Statement[]>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true' ? DEMO_STATEMENTS : [];
  });

  const [nodes, setNodes] = useState<GraphNode[]>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true' ? DEMO_GRAPH_NODES : [];
  });

  const [edges, setEdges] = useState<GraphEdge[]>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true' ? DEMO_GRAPH_EDGES : [];
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true' ? DEMO_LEADS : [];
  });

  const [gaps, setGaps] = useState<EvidenceGap[]>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true' ? DEMO_GAPS : [];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    return localStorage.getItem('hari_demo_mode') === 'true' ? DEMO_AUDIT_LOGS : [];
  });

  const [offlineQueue, setOfflineQueue] = useState<OfflineQueueItem[]>([]);

  // Apply theme
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

  // Save real state to localStorage when not in Demo mode
  useEffect(() => {
    if (!isDemoMode) {
      localStorage.setItem('hari_real_cases', JSON.stringify(cases));
    }
  }, [cases, isDemoMode]);

  useEffect(() => {
    if (!isDemoMode) {
      localStorage.setItem('hari_real_evidence', JSON.stringify(evidence));
    }
  }, [evidence, isDemoMode]);

  useEffect(() => {
    if (!isDemoMode) {
      localStorage.setItem('hari_real_analyses', JSON.stringify(aiAnalyses));
    }
  }, [aiAnalyses, isDemoMode]);

  const enterDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem('hari_demo_mode', 'true');
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
    setActiveTab('command');
  };

  const exitDemoMode = () => {
    setIsDemoMode(false);
    localStorage.setItem('hari_demo_mode', 'false');
    const savedCases = localStorage.getItem('hari_real_cases');
    const realCases: Case[] = savedCases ? JSON.parse(savedCases) : [];
    setCases(realCases);
    setCurrentCase(realCases[0] || null);

    const savedEvd = localStorage.getItem('hari_real_evidence');
    setEvidence(savedEvd ? JSON.parse(savedEvd) : []);

    const savedAna = localStorage.getItem('hari_real_analyses');
    setAiAnalyses(savedAna ? JSON.parse(savedAna) : {});

    setPeople([]);
    setLocations([]);
    setEvents([]);
    setStatements([]);
    setNodes([]);
    setEdges([]);
    setLeads([]);
    setGaps([]);
    setAuditLogs([]);
    setActiveTab('command');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('hari_lang', lang);
  };

  const setDataSaver = (active: boolean) => {
    setDataSaverState(active);
    localStorage.setItem('hari_data_saver', String(active));
  };

  const toggleDataSaver = () => {
    setDataSaver(!dataSaver);
  };

  const t = (key: keyof Translations): string => {
    const dict = LOCALIZATION[language] || LOCALIZATION.EN;
    return dict[key] || LOCALIZATION.EN[key] || '';
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addCase = (c: Case) => {
    setCases(prev => [c, ...prev]);
    setCurrentCase(c);
    addAuditLog('CREATE_CASE', c.caseNumber, `Created case ${c.title}`);
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
  };

  const verifyEvidence = (id: string) => {
    setEvidence(prev =>
      prev.map(e => (e.id === id ? { ...e, status: 'HUMAN_VERIFIED' as const } : e))
    );
    const item = evidence.find(e => e.id === id);
    if (item) {
      addAuditLog('VERIFY_EVIDENCE', item.evidenceId, 'Human Investigator verified evidence validity.');
    }
  };

  const addPerson = (p: Person) => {
    setPeople(prev => [...prev, p]);
    addAuditLog('ADD_PERSON', p.name, `Added person (${p.role})`);
  };

  const addLocation = (loc: LocationItem) => {
    setLocations(prev => [...prev, loc]);
    addAuditLog('ADD_LOCATION', loc.name, `Added location record`);
  };

  const addEvent = (evt: InvestigationEvent) => {
    setEvents(prev => [...prev, evt]);
    addAuditLog('CREATE_EVENT', evt.title, `Added timeline event at ${evt.timestamp}`);
  };

  const addStatement = (stmt: Statement) => {
    setStatements(prev => [...prev, stmt]);
    addAuditLog('ADD_STATEMENT', stmt.personName, `Added statement testimony`);
  };

  const addNode = (node: GraphNode) => {
    setNodes(prev => [...prev, node]);
  };

  const addEdge = (edge: GraphEdge) => {
    setEdges(prev => [...prev, edge]);
  };

  const addLead = (lead: Lead) => {
    setLeads(prev => [lead, ...prev]);
    addAuditLog('CREATE_LEAD', lead.title, `Generated investigation lead`);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    addAuditLog('UPDATE_LEAD', id, `Updated lead status to ${status}`);
  };

  const addAuditLog = (action: string, object: string, details: string) => {
    if (!currentCase) return;
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      caseId: currentCase.id,
      timestamp: new Date().toLocaleDateString() + ' • ' + new Date().toLocaleTimeString() + ' IST',
      user: 'Investigator',
      action,
      object,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);

  const openEmergencyModal = () => setIsEmergencyModalOpen(true);
  const closeEmergencyModal = () => setIsEmergencyModalOpen(false);

  const resetDemoData = () => {
    if (isDemoMode) {
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
    } else {
      setCases([]);
      setCurrentCase(null);
      setEvidence([]);
      setAiAnalyses({});
      setPeople([]);
      setLocations([]);
      setEvents([]);
      setStatements([]);
      setNodes([]);
      setEdges([]);
      setLeads([]);
      setGaps([]);
      setAuditLogs([]);
      localStorage.removeItem('hari_real_cases');
      localStorage.removeItem('hari_real_evidence');
      localStorage.removeItem('hari_real_analyses');
    }
  };

  return (
    <InvestigationContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        dataSaver,
        setDataSaver,
        toggleDataSaver,
        isDemoMode,
        enterDemoMode,
        exitDemoMode,
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
        addPerson,
        locations,
        addLocation,
        events,
        addEvent,
        statements,
        addStatement,
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
        isEmergencyModalOpen,
        openEmergencyModal,
        closeEmergencyModal,
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
