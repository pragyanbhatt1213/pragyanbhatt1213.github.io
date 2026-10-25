import React, { useState } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface FlowDiagramProps {
  className?: string;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ className = '' }) => {
  const [activePath, setActivePath] = useState<'redirect' | 'create'>('redirect');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const handleNodeInteraction = (nodeId: string | null) => {
    setHoveredNode(nodeId);
  };

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      {/* Path toggle segmented control */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1 border border-[var(--color-border)] p-1 rounded-sm bg-[var(--color-background)]">
          <button
            type="button"
            onClick={() => setActivePath('redirect')}
            aria-pressed={activePath === 'redirect'}
            className={`px-3 py-1 text-[10.5px] t-mono tracking-[0.14em] transition-colors cursor-pointer ${
              activePath === 'redirect'
                ? 'bg-[var(--color-border-strong)] text-[var(--color-text-primary)] font-medium'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            GET /:slug (Redirect Flow)
          </button>
          <button
            type="button"
            onClick={() => setActivePath('create')}
            aria-pressed={activePath === 'create'}
            className={`px-3 py-1 text-[10.5px] t-mono tracking-[0.14em] transition-colors cursor-pointer ${
              activePath === 'create'
                ? 'bg-[var(--color-border-strong)] text-[var(--color-text-primary)] font-medium'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            POST /shorten (Create Flow)
          </button>
        </div>

        <span className="t-mono text-[10px] text-[var(--color-text-muted)] hidden sm:inline">
          {hoveredNode
            ? `INSPECTING: ${hoveredNode.toUpperCase()}`
            : 'HOVER OR TAB TO INSPECT NODES'}
        </span>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative border border-[var(--color-border)] rounded-lg p-4 sm:p-6 bg-[var(--color-background-secondary)] overflow-x-auto">
        <svg
          viewBox="0 0 760 270"
          className="w-full h-auto min-w-[620px] select-none"
          role="img"
          aria-label="LinkForge Architecture Diagram: Client sends request to Go and Fiber API, which queries Redis cache and PostgreSQL store before issuing a 301 redirect and asynchronous click tracking."
        >
          <defs>
            <marker
              id="arrow-solid"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--color-text-primary)" />
            </marker>
            <marker
              id="arrow-muted"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--color-border-strong)" />
            </marker>
          </defs>

          {/* Connectors / Edges */}
          <g>
            {/* Client to API */}
            <path
              d="M130 125 H210"
              fill="none"
              stroke={
                activePath === 'create'
                  ? 'var(--color-text-primary)'
                  : 'rgba(232,229,222,0.4)'
              }
              strokeWidth="1.2"
              strokeDasharray={activePath === 'create' ? '4 4' : undefined}
              markerEnd="url(#arrow-solid)"
            />

            {/* API to Redis */}
            <path
              d="M340 118 C390 118 390 65 430 65"
              fill="none"
              stroke={activePath === 'redirect' ? 'var(--color-text-primary)' : 'var(--color-border)'}
              strokeWidth="1.2"
              markerEnd="url(#arrow-solid)"
            />

            {/* API to PostgreSQL */}
            <path
              d="M340 132 C390 132 390 175 430 175"
              fill="none"
              stroke={
                activePath === 'create'
                  ? 'var(--color-text-primary)'
                  : 'rgba(232,229,222,0.3)'
              }
              strokeWidth="1.2"
              strokeDasharray={activePath === 'create' ? '4 4' : '3 4'}
              markerEnd="url(#arrow-muted)"
            />

            {/* Redis to Redirect (Cache hit) */}
            <path
              d="M560 65 C600 65 590 118 630 118"
              fill="none"
              stroke={activePath === 'redirect' ? 'var(--color-text-primary)' : 'var(--color-border)'}
              strokeWidth="1.2"
              markerEnd="url(#arrow-solid)"
            />

            {/* PostgreSQL to Redirect (Cache miss) */}
            <path
              d="M600 175 C620 175 610 132 630 132"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />

            {/* API to Async Click Tracking */}
            <path
              d="M275 150 V210"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1.2"
              strokeDasharray="2 4"
            />

            {/* Redis Miss backfill to PG */}
            <path
              d="M495 90 V150"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </g>

          {/* Animated Flow Particles */}
          {!reducedMotion && (
            <g
              fill="none"
              stroke="var(--color-text-primary)"
              strokeWidth="1.6"
              strokeDasharray="3 16"
              strokeLinecap="round"
              className="animate-flow"
              style={{
                strokeDashoffset: activePath === 'redirect' ? 0 : 32,
              }}
            >
              <path d="M130 125 H210" />
              {activePath === 'redirect' && (
                <>
                  <path d="M340 118 C390 118 390 65 430 65" />
                  <path d="M560 65 C600 65 590 118 630 118" />
                </>
              )}
              {activePath === 'create' && (
                <path d="M340 132 C390 132 390 175 430 175" />
              )}
            </g>
          )}

          {/* Path annotations */}
          <text x="140" y="112" fill="var(--color-text-muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.12em">
            {activePath === 'create' ? 'POST /shorten' : 'GET /:slug'}
          </text>
          <text x="350" y="42" fill="var(--color-text-muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.12em">
            CACHE CHECK
          </text>
          <text x="502" y="124" fill="var(--color-text-muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.12em">
            MISS REFILL
          </text>
          <text x="282" y="185" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.12em">
            ASYNC TRACK
          </text>

          {/* Nodes */}
          {/* 1. Client Node */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Client: Shorten URL or follow redirect"
            onMouseEnter={() => handleNodeInteraction('client')}
            onMouseLeave={() => handleNodeInteraction(null)}
            onFocus={() => handleNodeInteraction('client')}
            onBlur={() => handleNodeInteraction(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="0"
              y="100"
              width="130"
              height="50"
              rx="3"
              fill={hoveredNode === 'client' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={hoveredNode === 'client' ? 'var(--color-text-primary)' : 'var(--color-border-strong)'}
              strokeWidth="1"
            />
            <text x="14" y="122" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Client
            </text>
            <text x="14" y="138" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Browser / SDK
            </text>
          </g>

          {/* 2. API Node */}
          <g
            tabIndex={0}
            role="button"
            aria-label="API: Go and Fiber high-performance routing"
            onMouseEnter={() => handleNodeInteraction('api')}
            onMouseLeave={() => handleNodeInteraction(null)}
            onFocus={() => handleNodeInteraction('api')}
            onBlur={() => handleNodeInteraction(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="210"
              y="100"
              width="130"
              height="50"
              rx="3"
              fill={hoveredNode === 'api' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={hoveredNode === 'api' ? 'var(--color-text-primary)' : 'var(--color-border-strong)'}
              strokeWidth="1"
            />
            <text x="224" y="122" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              API
            </text>
            <text x="224" y="138" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Go + Fiber
            </text>
          </g>

          {/* 3. Redis Cache Node */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Redis Cache: In-memory hash lookup"
            onMouseEnter={() => handleNodeInteraction('redis')}
            onMouseLeave={() => handleNodeInteraction(null)}
            onFocus={() => handleNodeInteraction('redis')}
            onBlur={() => handleNodeInteraction(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="430"
              y="40"
              width="130"
              height="50"
              rx="3"
              fill={hoveredNode === 'redis' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={hoveredNode === 'redis' ? 'var(--color-text-primary)' : 'var(--color-border-strong)'}
              strokeWidth="1"
            />
            <text x="444" y="62" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Redis
            </text>
            <text x="444" y="78" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Cache lookup
            </text>
          </g>

          {/* 4. PostgreSQL Node */}
          <g
            tabIndex={0}
            role="button"
            aria-label="PostgreSQL: Persistent storage and analytical records"
            onMouseEnter={() => handleNodeInteraction('postgres')}
            onMouseLeave={() => handleNodeInteraction(null)}
            onFocus={() => handleNodeInteraction('postgres')}
            onBlur={() => handleNodeInteraction(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="430"
              y="150"
              width="170"
              height="50"
              rx="3"
              fill={hoveredNode === 'postgres' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={hoveredNode === 'postgres' ? 'var(--color-text-primary)' : 'var(--color-border-strong)'}
              strokeWidth="1"
            />
            <text x="444" y="172" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              PostgreSQL
            </text>
            <text x="444" y="188" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Persistent store
            </text>
          </g>

          {/* 5. Redirect Response Node */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Redirect Response: 301 Moved Permanently header"
            onMouseEnter={() => handleNodeInteraction('redirect')}
            onMouseLeave={() => handleNodeInteraction(null)}
            onFocus={() => handleNodeInteraction('redirect')}
            onBlur={() => handleNodeInteraction(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="630"
              y="95"
              width="130"
              height="60"
              rx="3"
              fill={hoveredNode === 'redirect' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={hoveredNode === 'redirect' ? 'var(--color-text-primary)' : 'var(--color-border-strong)'}
              strokeWidth="1"
            />
            <text x="644" y="120" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Redirect
            </text>
            <text x="644" y="136" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              301 / 302 Header
            </text>
          </g>

          {/* 6. Click Tracking Node */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Click Tracking: Asynchronous telemetry logger"
            onMouseEnter={() => handleNodeInteraction('tracking')}
            onMouseLeave={() => handleNodeInteraction(null)}
            onFocus={() => handleNodeInteraction('tracking')}
            onBlur={() => handleNodeInteraction(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="210"
              y="210"
              width="130"
              height="44"
              rx="3"
              fill={hoveredNode === 'tracking' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke="var(--color-border)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
            <text x="224" y="230" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Tracking
            </text>
            <text x="224" y="244" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Click events
            </text>
          </g>
        </svg>

        {/* Accessible hidden narrative for screen readers */}
        <ol className="sr-only">
          <li>Client sends either GET /:slug for redirection or POST /shorten to create a link.</li>
          <li>API built with Go and Fiber receives and validates the request.</li>
          <li>On redirect, API checks Redis in-memory cache; if missed, falls back to PostgreSQL.</li>
          <li>API returns HTTP 301/302 Location redirect header to client.</li>
          <li>Asynchronously, click timestamp and user-agent are logged to tracking worker.</li>
        </ol>
      </div>
    </div>
  );
};
