import React, { useState } from 'react';
import { InvestigationProvider, useInvestigation } from './context/InvestigationContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { AIPanelDrawer } from './components/layout/AIPanelDrawer';
import { EvidenceCameraModal } from './components/camera/EvidenceCameraModal';
import { CommandCenter } from './components/command-center/CommandCenter';
import { NewCaseModal } from './components/command-center/NewCaseModal';
import { EvidenceVault } from './components/evidence/EvidenceVault';
import { ConnectionGraph } from './components/graph/ConnectionGraph';
import { InvestigationTimeline } from './components/timeline/InvestigationTimeline';
import { StatementIntelligence } from './components/statements/StatementIntelligence';
import { HariAIAnalyst } from './components/ai/HariAIAnalyst';
import { LeadManager } from './components/ai/LeadManager';
import { EvidenceGapIntelligence } from './components/ai/EvidenceGapIntelligence';
import { ReportStudio } from './components/reports/ReportStudio';
import { AuditLogView } from './components/security/AuditLogView';
import { AboutModal } from './components/about/AboutModal';
import { Bot, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useInvestigation();
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Top Header */}
      <Header onOpenNewCase={() => setIsNewCaseOpen(true)} />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Desktop Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Main Workspace Container */}
        <main className="flex-1 p-4 md:p-6 mb-16 lg:mb-0 overflow-y-auto">
          {(activeTab === 'command' || activeTab === 'cases') && (
            <CommandCenter onOpenNewCase={() => setIsNewCaseOpen(true)} />
          )}

          {activeTab === 'evidence' && <EvidenceVault />}

          {activeTab === 'graph' && <ConnectionGraph />}

          {activeTab === 'timeline' && <InvestigationTimeline />}

          {activeTab === 'statements' && <StatementIntelligence />}

          {activeTab === 'ai' && <HariAIAnalyst />}

          {activeTab === 'leads' && <LeadManager />}

          {activeTab === 'gaps' && <EvidenceGapIntelligence />}

          {activeTab === 'reports' && <ReportStudio />}

          {activeTab === 'security' && <AuditLogView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Dedicated Camera Full-Screen Workspace Modal */}
      <EvidenceCameraModal />

      {/* Floating AI Assistant Trigger Button */}
      {!isAIPanelOpen && (
        <button
          onClick={() => setIsAIPanelOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-6 z-40 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 transition active:scale-95 shadow-blue-900/50"
        >
          <Bot className="w-5 h-5 animate-spin-slow" />
          <span>HARI AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Expandable Right AI Panel Drawer */}
      <AIPanelDrawer isOpen={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />

      {/* New Case Wizard Modal */}
      <NewCaseModal isOpen={isNewCaseOpen} onClose={() => setIsNewCaseOpen(false)} />

      {/* About Modal */}
      <AboutModal />
    </div>
  );
};

export default function App() {
  return (
    <InvestigationProvider>
      <MainContent />
    </InvestigationProvider>
  );
}
