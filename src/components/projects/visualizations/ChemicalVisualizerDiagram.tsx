import React, { useState } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface ChemicalVisualizerDiagramProps {
  className?: string;
}

interface NodeDetail {
  id: string;
  title: string;
  role: string;
  technology: string;
  description: string;
  metrics: string;
}

const NODE_DETAILS: Record<string, NodeDetail> = {
  ingest: {
    id: 'ingest',
    title: 'Data Ingestion & Validation',
    role: 'Input Layer',
    technology: 'Django REST Framework / Python',
    description: 'Accepts chemical equipment parameter logs in CSV and JSON formats. Validates schema integrity, timestamp consistency, and equipment sensor ranges before processing.',
    metrics: 'Validates multi-sensor telemetry rows',
  },
  iqr: {
    id: 'iqr',
    title: 'IQR Outlier Detection Engine',
    role: 'Statistical Processing',
    technology: 'NumPy / Pandas',
    description: 'Calculates non-parametric quartiles Q1 (25th) and Q3 (75th). Flags sensor readings outside the boundary [Q1 - 1.5*IQR, Q3 + 1.5*IQR] to identify pressure spikes and temperature deviations.',
    metrics: 'Robust against severe non-Gaussian data skew',
  },
  scoring: {
    id: 'scoring',
    title: 'Equipment Health Scoring',
    role: 'Composite Index Algorithm',
    technology: 'Python / PostgreSQL',
    description: 'Weighs sensor anomaly density, operational variance, and historical baseline thresholds to produce a deterministic 0-100 equipment health index.',
    metrics: '0-100 Composite Reliability Metric',
  },
  reporting: {
    id: 'reporting',
    title: 'Multi-Format Export Engine',
    role: 'Artifact Generation',
    technology: 'ReportLab (PDF) / openpyxl (Excel)',
    description: 'Compiles aggregated statistical summaries, outlier frequency graphs, and equipment health status into downloadable audit-ready PDF reports and structured Excel spreadsheets.',
    metrics: 'Audit-ready PDF & XLSX reports',
  },
  clients: {
    id: 'clients',
    title: 'Dual-Client Presentation Layer',
    role: 'Visualization Interface',
    technology: 'React 19 (Web) + PyQt5 (Desktop)',
    description: 'Provides flexible operational access via a responsive web dashboard for plant monitoring and a standalone PyQt5 desktop client for air-gapped field workstations.',
    metrics: 'Synchronized Web + Native Desktop UI',
  },
};

export const ChemicalVisualizerDiagram: React.FC<ChemicalVisualizerDiagramProps> = ({ className = '' }) => {
  const [selectedNode, setSelectedNode] = useState<string>('iqr');
  const reducedMotion = useReducedMotion();
  const detail = NODE_DETAILS[selectedNode] || NODE_DETAILS.iqr;

  return (
    <div className={`flex flex-col gap-6 w-full ${className}`}>
      {/* Top caption */}
      <div className="flex items-center justify-between text-[11px] t-mono text-[var(--color-text-secondary)]">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)]" />
          CHEMICAL TELEMETRY & STATISTICAL ANALYSIS PIPELINE
        </span>
        <span className="text-[var(--color-text-muted)]">
          CLICK ANY NODE TO INSPECT SUBSYSTEM
        </span>
      </div>

      {/* SVG Pipeline Canvas */}
      <div className="relative border border-[var(--color-border)] rounded-lg p-5 sm:p-7 bg-[var(--color-background-secondary)] overflow-x-auto">
        <svg
          viewBox="0 0 1000 240"
          className="w-full h-auto min-w-[700px] select-none"
          role="img"
          aria-label="Chemical Equipment Visualizer Pipeline showing Data Ingestion, IQR Outlier Detection, Health Scoring, Export Engine, and Dual Clients."
        >
          {/* Section Banners */}
          <text x="10" y="24" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            INGESTION & CLEANING
          </text>
          <text x="360" y="24" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            STATISTICAL ENGINE
          </text>
          <text x="740" y="24" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            OUTPUT & CLIENTS
          </text>

          {/* Connection Lines */}
          <g fill="none">
            {/* Horizontal flow line */}
            <path d="M150 115 H210 M360 115 H420 M570 115 H630 M780 115 H830" stroke="var(--color-border-strong)" strokeWidth="1.2" />
            {/* Split from Reporting to Dual Clients */}
            <path d="M780 115 H830" stroke="var(--color-text-primary)" strokeWidth="1.2" strokeDasharray="3 3" />
          </g>

          {/* Animated data pulses */}
          {!reducedMotion && (
            <g fill="none" stroke="var(--color-text-primary)" strokeWidth="1.8" strokeDasharray="3 20" strokeLinecap="round" className="animate-flow">
              <path d="M150 115 H210" />
              <path d="M360 115 H420" />
              <path d="M570 115 H630" />
              <path d="M780 115 H830" />
            </g>
          )}

          {/* Node 1: Ingestion */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Data Ingestion: CSV/JSON upload with validation"
            onClick={() => setSelectedNode('ingest')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedNode('ingest')}
            className="cursor-pointer outline-none"
          >
            <rect
              x="10"
              y="75"
              width="140"
              height="80"
              rx="4"
              fill={selectedNode === 'ingest' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={selectedNode === 'ingest' ? 'var(--color-text-primary)' : 'var(--color-border)'}
              strokeWidth={selectedNode === 'ingest' ? '1.8' : '1'}
            />
            <text x="24" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              Data Ingestion
            </text>
            <text x="24" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              CSV · JSON · Sensor
            </text>
            <text x="24" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              Django REST API
            </text>
          </g>

          {/* Node 2: IQR Outlier Detection */}
          <g
            tabIndex={0}
            role="button"
            aria-label="IQR Outlier Detection: NumPy/Pandas calculation"
            onClick={() => setSelectedNode('iqr')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedNode('iqr')}
            className="cursor-pointer outline-none"
          >
            <rect
              x="210"
              y="75"
              width="150"
              height="80"
              rx="4"
              fill={selectedNode === 'iqr' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={selectedNode === 'iqr' ? 'var(--color-text-primary)' : 'var(--color-border)'}
              strokeWidth={selectedNode === 'iqr' ? '1.8' : '1'}
            />
            <text x="224" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              IQR Anomaly Filter
            </text>
            <text x="224" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Q1 / Q3 Quartiles
            </text>
            <text x="224" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              NumPy / Pandas
            </text>
          </g>

          {/* Node 3: Health Scoring */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Equipment Health Scoring: 0-100 index calculation"
            onClick={() => setSelectedNode('scoring')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedNode('scoring')}
            className="cursor-pointer outline-none"
          >
            <rect
              x="420"
              y="75"
              width="150"
              height="80"
              rx="4"
              fill={selectedNode === 'scoring' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={selectedNode === 'scoring' ? 'var(--color-text-primary)' : 'var(--color-border)'}
              strokeWidth={selectedNode === 'scoring' ? '1.8' : '1'}
            />
            <text x="434" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              Health Scoring
            </text>
            <text x="434" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              0–100 Index Engine
            </text>
            <text x="434" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              Multi-Metric Weighting
            </text>
          </g>

          {/* Node 4: Export Engine */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Reporting Engine: PDF and Excel generator"
            onClick={() => setSelectedNode('reporting')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedNode('reporting')}
            className="cursor-pointer outline-none"
          >
            <rect
              x="630"
              y="75"
              width="150"
              height="80"
              rx="4"
              fill={selectedNode === 'reporting' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={selectedNode === 'reporting' ? 'var(--color-text-primary)' : 'var(--color-border)'}
              strokeWidth={selectedNode === 'reporting' ? '1.8' : '1'}
            />
            <text x="644" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              Report Engine
            </text>
            <text x="644" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              ReportLab & openpyxl
            </text>
            <text x="644" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              PDF / Excel Export
            </text>
          </g>

          {/* Node 5: Dual Presentation */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Dual Clients: React 19 Web and PyQt5 Desktop"
            onClick={() => setSelectedNode('clients')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedNode('clients')}
            className="cursor-pointer outline-none"
          >
            <rect
              x="830"
              y="75"
              width="160"
              height="80"
              rx="4"
              fill={selectedNode === 'clients' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={selectedNode === 'clients' ? 'var(--color-text-primary)' : 'var(--color-border)'}
              strokeWidth={selectedNode === 'clients' ? '1.8' : '1'}
            />
            <text x="844" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              Dual Clients
            </text>
            <text x="844" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              React 19 (Web)
            </text>
            <text x="844" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              PyQt5 (Desktop)
            </text>
          </g>
        </svg>
      </div>

      {/* Inspector Details Box */}
      <div className="border border-[var(--color-border)] rounded-lg p-5 bg-[var(--color-surface)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.16em]">
              SUBSYSTEM SPECIFICATION
            </span>
            <span className="t-mono text-[10px] px-2 py-0.5 rounded bg-[var(--color-border)] text-[var(--color-text-primary)]">
              {detail.role.toUpperCase()}
            </span>
          </div>
          <span className="t-mono text-[11px] text-[var(--color-text-secondary)] font-medium">
            TECH: {detail.technology}
          </span>
        </div>

        <div className="mt-4">
          <h4 className="font-serif text-xl sm:text-2xl text-[var(--color-text-primary)] font-normal">
            {detail.title}
          </h4>
          <p className="mt-2 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-[65ch]">
            {detail.description}
          </p>
          <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs t-mono">
            <span className="text-[var(--color-text-muted)]">KEY METRIC / CAPABILITY:</span>
            <span className="text-[var(--color-text-primary)]">{detail.metrics}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
