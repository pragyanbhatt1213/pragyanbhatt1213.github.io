import React, { useState } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface VtopPlusDiagramProps {
  className?: string;
}

export const VtopPlusDiagram: React.FC<VtopPlusDiagramProps> = ({ className = '' }) => {
  const [activeFlow, setActiveFlow] = useState<'online' | 'offline'>('online');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div className={`flex flex-col gap-6 w-full ${className}`}>
      {/* Top caption & flow toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] t-mono text-[var(--color-text-secondary)]">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)]" />
          ZERO-BACKEND CLIENT ARCHITECTURE & NATIVE COOKIE BRIDGE
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-text-muted)] text-[10px]">FLOW:</span>
          <button
            type="button"
            onClick={() => setActiveFlow('online')}
            className={`px-2.5 py-1 rounded t-mono text-[10px] tracking-wider transition-colors cursor-pointer ${
              activeFlow === 'online'
                ? 'bg-[var(--color-text-primary)] text-[var(--color-background)] font-medium'
                : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            ONLINE SYNC (COOKIE BRIDGE)
          </button>
          <button
            type="button"
            onClick={() => setActiveFlow('offline')}
            className={`px-2.5 py-1 rounded t-mono text-[10px] tracking-wider transition-colors cursor-pointer ${
              activeFlow === 'offline'
                ? 'bg-[var(--color-text-primary)] text-[var(--color-background)] font-medium'
                : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            OFFLINE READ (HIVE CACHE)
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative border border-[var(--color-border)] rounded-lg p-5 sm:p-7 bg-[var(--color-background-secondary)] overflow-x-auto">
        <svg
          viewBox="0 0 1000 250"
          className="w-full h-auto min-w-[700px] select-none"
          role="img"
          aria-label="VTOP Plus Zero Backend Architecture showing Flutter UI, Native CookieBridge, VIT ERP Server, HTML Parser, and Hive Local Cache."
        >
          {/* Group Labels */}
          <text x="10" y="24" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            CLIENT DEVICE (MOBILE)
          </text>
          <text x="640" y="24" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            CAMPUS INFRASTRUCTURE
          </text>

          {/* Connectors */}
          <g fill="none">
            {activeFlow === 'online' ? (
              <>
                {/* Online path */}
                <path d="M150 115 H210 M360 115 H430 M570 115 H680" stroke="var(--color-border-strong)" strokeWidth="1.2" />
                <path d="M750 155 V180 H360 V155" stroke="var(--color-text-primary)" strokeWidth="1.2" strokeDasharray="3 3" />
                {!reducedMotion && (
                  <g stroke="var(--color-text-primary)" strokeWidth="1.8" strokeDasharray="3 16" strokeLinecap="round" className="animate-flow">
                    <path d="M150 115 H210" />
                    <path d="M360 115 H430" />
                    <path d="M570 115 H680" />
                    <path d="M750 155 V180 H360 V155" />
                  </g>
                )}
              </>
            ) : (
              <>
                {/* Offline path */}
                <path d="M150 115 H210 M285 155 V190 H430" stroke="var(--color-border-strong)" strokeWidth="1.2" />
                <path d="M500 190 H285 V155" stroke="var(--color-text-primary)" strokeWidth="1.2" strokeDasharray="3 3" />
                {!reducedMotion && (
                  <g stroke="var(--color-text-primary)" strokeWidth="1.8" strokeDasharray="3 16" strokeLinecap="round" className="animate-flow">
                    <path d="M285 155 V190 H430" />
                    <path d="M430 190 H285 V155" />
                  </g>
                )}
              </>
            )}
          </g>

          {/* Node 1: Flutter UI */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Flutter Mobile UI: Timetable and Attendance Views"
            onMouseEnter={() => setHoveredNode('flutter')}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="10"
              y="75"
              width="140"
              height="80"
              rx="4"
              fill={hoveredNode === 'flutter' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={hoveredNode === 'flutter' ? 'var(--color-text-primary)' : 'var(--color-border)'}
            />
            <text x="24" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              Flutter Client UI
            </text>
            <text x="24" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Schedule · Attendance
            </text>
            <text x="24" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              Dart / Clean State
            </text>
          </g>

          {/* Node 2: Native CookieBridge */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Native CookieBridge: Kotlin & Swift MethodChannels"
            onMouseEnter={() => setHoveredNode('cookiebridge')}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="210"
              y="75"
              width="150"
              height="80"
              rx="4"
              fill={hoveredNode === 'cookiebridge' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={hoveredNode === 'cookiebridge' ? 'var(--color-text-primary)' : 'var(--color-border)'}
            />
            <text x="224" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              CookieBridge
            </text>
            <text x="224" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              HttpOnly Extractor
            </text>
            <text x="224" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              Kotlin & Swift Channel
            </text>
          </g>

          {/* Node 3: Client HTML Parser */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Client HTML Parser: Table and DOM extractor"
            onMouseEnter={() => setHoveredNode('parser')}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="430"
              y="75"
              width="140"
              height="80"
              rx="4"
              fill={hoveredNode === 'parser' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={hoveredNode === 'parser' ? 'var(--color-text-primary)' : 'var(--color-border)'}
            />
            <text x="444" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              HTML Parser
            </text>
            <text x="444" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              DOM Matrix Extract
            </text>
            <text x="444" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              Dart html package
            </text>
          </g>

          {/* Node 4: VIT ERP Server (External) */}
          <g
            tabIndex={0}
            role="button"
            aria-label="VIT ERP Server: Legacy university portal"
            onMouseEnter={() => setHoveredNode('server')}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="680"
              y="75"
              width="160"
              height="80"
              rx="4"
              fill={hoveredNode === 'server' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={hoveredNode === 'server' ? 'var(--color-text-primary)' : 'var(--color-border-strong)'}
              strokeDasharray="4 4"
            />
            <text x="694" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              VIT ERP (VTOP)
            </text>
            <text x="694" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Legacy Web Portal
            </text>
            <text x="694" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              Direct HTTPS Request
            </text>
          </g>

          {/* Node 5: Hive Local Cache (Bottom) */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Hive NoSQL Local Storage: Offline caching"
            onMouseEnter={() => setHoveredNode('hive')}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="430"
              y="170"
              width="140"
              height="60"
              rx="4"
              fill={activeFlow === 'offline' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={activeFlow === 'offline' ? 'var(--color-text-primary)' : 'var(--color-border)'}
            />
            <text x="444" y="196" fill="var(--color-text-primary)" fontSize="10.5" fontFamily="var(--font-mono)" fontWeight="600">
              Hive Database
            </text>
            <text x="444" y="213" fill="var(--color-text-secondary)" fontSize="9" fontFamily="var(--font-mono)">
              Local Offline NoSQL
            </text>
          </g>
        </svg>
      </div>

      {/* Dynamic Explanation Panel */}
      <div className="border border-[var(--color-border)] rounded-lg p-5 bg-[var(--color-surface)]">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
          <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.16em]">
            ARCHITECTURAL ADVANTAGE
          </span>
          <span className="t-mono text-[11px] text-[var(--color-text-secondary)] font-medium">
            ZERO CLOUD BACKEND · 100% CLIENT-SIDE PRIVACY
          </span>
        </div>

        <p className="mt-4 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-[65ch]">
          {activeFlow === 'online' ? (
            <>
              <strong>Online Authentication & Sync:</strong> Standard browsers protect credentials by marking session cookies with <code className="t-mono text-xs px-1.5 py-0.5 rounded bg-[var(--color-border)]">HttpOnly</code>, making them unreadable to JavaScript. VTOP Plus uses custom native platform channels (Kotlin on Android and Swift on iOS) to hook directly into the platform cookie managers, passing verified session tokens to Dart for direct university requests without intermediate server relays.
            </>
          ) : (
            <>
              <strong>Offline-First Resilience:</strong> Campus ERP portals frequently experience outages during exam registrations and attendance audits. VTOP Plus persists timetable matrices and attendance histories into an encrypted local <strong>Hive</strong> NoSQL database, allowing students to check schedules, room allocations, and attendance safety margins with zero network latency.
            </>
          )}
        </p>
      </div>
    </div>
  );
};
