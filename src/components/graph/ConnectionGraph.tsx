import React, { useState, useRef } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { GraphNode, GraphEdge, NodeType } from '../../types/investigation';
import {
  GitFork,
  ZoomIn,
  ZoomOut,
  Maximize,
  User,
  HardDrive,
  MapPin,
  Car,
  Calendar,
  MessageSquareQuote,
  X,
  Search,
  Filter
} from 'lucide-react';

export const ConnectionGraph: React.FC = () => {
  const { nodes, edges, currentCase } = useInvestigation();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'PERSON': return User;
      case 'EVIDENCE': return HardDrive;
      case 'LOCATION': return MapPin;
      case 'VEHICLE': return Car;
      case 'EVENT': return Calendar;
      case 'STATEMENT': return MessageSquareQuote;
    }
  };

  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case 'PERSON': return 'border-purple-500 bg-purple-950/80 text-purple-300';
      case 'EVIDENCE': return 'border-blue-500 bg-blue-950/80 text-blue-300';
      case 'LOCATION': return 'border-emerald-500 bg-emerald-950/80 text-emerald-300';
      case 'VEHICLE': return 'border-amber-500 bg-amber-950/80 text-amber-300';
      case 'EVENT': return 'border-red-500 bg-red-950/80 text-red-300';
      case 'STATEMENT': return 'border-teal-500 bg-teal-950/80 text-teal-300';
    }
  };

  const filteredNodes = nodes.filter(n => {
    if (filterType !== 'ALL' && n.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return n.label.toLowerCase().includes(q) || n.subtitle.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <GitFork className="w-5 h-5 text-blue-400" /> CONNECTION INTELLIGENCE GRAPH
          </h2>
          <p className="text-xs text-slate-400">
            Interactive entity relationship mapping for {currentCase.caseNumber}. Neutral entity stance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search node..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-2.5 py-1 text-xs text-white focus:outline-none"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-2.5 py-1 focus:outline-none"
          >
            <option value="ALL">All Nodes</option>
            <option value="PERSON">Persons</option>
            <option value="EVIDENCE">Evidence</option>
            <option value="LOCATION">Locations</option>
            <option value="VEHICLE">Vehicles</option>
            <option value="EVENT">Events</option>
          </select>

          {/* Zoom Controls */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setZoomLevel(z => Math.max(0.6, z - 0.1))}
              className="p-1 text-slate-400 hover:text-white"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold text-blue-400 px-1.5">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(z => Math.min(1.6, z + 0.1))}
              className="p-1 text-slate-400 hover:text-white"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-slate-400 hover:text-white border-l border-slate-800 ml-1 pl-1.5"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Graph Canvas & Context Drawer Container */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl h-[550px] overflow-hidden shadow-2xl flex items-center justify-center">
        {/* SVG Render Canvas */}
        <div
          className="w-full h-full transition-transform duration-150"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg className="w-full h-full">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="22"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#475569" />
              </marker>
            </defs>

            {/* Render Edges */}
            {edges.map(edge => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const isDiscrepant = edge.status === 'DISCREPANT';

              return (
                <g key={edge.id}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isDiscrepant ? '#ef4444' : '#334155'}
                    strokeWidth={isDiscrepant ? 2 : 1.5}
                    strokeDasharray={isDiscrepant ? '4 4' : undefined}
                    markerEnd="url(#arrowhead)"
                  />
                  {/* Relationship Label Pill */}
                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2 - 6}
                    fill={isDiscrepant ? '#fca5a5' : '#94a3b8'}
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="bg-slate-900 px-1"
                  >
                    {edge.relationship}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes */}
            {filteredNodes.map(n => {
              const Icon = getNodeIcon(n.type);
              const colorClass = getNodeColor(n.type);
              const isSelected = selectedNode?.id === n.id;

              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x - 70}, ${n.y - 25})`}
                  onClick={() => setSelectedNode(n)}
                  className="cursor-pointer group"
                >
                  <rect
                    width="140"
                    height="50"
                    rx="12"
                    fill="#0f172a"
                    stroke={isSelected ? '#3b82f6' : '#334155'}
                    strokeWidth={isSelected ? '3' : '1.5'}
                    className="group-hover:stroke-blue-400 transition"
                  />
                  <foreignObject width="140" height="50">
                    <div className="w-full h-full p-2 flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg border text-xs shrink-0 ${colorClass}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-[11px] font-bold text-slate-100 truncate">{n.label}</h4>
                        <p className="text-[9px] text-slate-400 truncate">{n.subtitle}</p>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Context Drawer */}
        {selectedNode && (
          <div className="absolute top-4 right-4 z-20 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3 animate-in fade-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">
                {selectedNode.type} ENTITY DETAIL
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{selectedNode.label}</h3>
              <p className="text-xs text-slate-400">{selectedNode.subtitle}</p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">CONNECTED RELATIONSHIPS</span>
              {edges
                .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                .map(e => (
                  <div key={e.id} className="text-[11px] flex items-center justify-between">
                    <span className="text-slate-400">• {e.relationship}</span>
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
                      e.status === 'CONFIRMED' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                    }`}>
                      {e.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
