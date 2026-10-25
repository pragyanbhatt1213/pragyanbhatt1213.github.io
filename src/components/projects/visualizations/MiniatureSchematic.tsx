import React, { useState } from 'react';

interface MiniatureSchematicProps {
  slug: string;
  isHovered?: boolean;
}

export const MiniatureSchematic: React.FC<MiniatureSchematicProps> = ({ slug, isHovered = false }) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  // 01: Chemical Equipment Visualizer
  if (slug === 'chemical-equipment-visualizer') {
    return (
      <div
        className="w-full h-full min-h-[170px] sm:min-h-[190px] p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden select-none"
        onMouseEnter={() => setInternalHover(true)}
        onMouseLeave={() => setInternalHover(false)}
      >
        <div className="flex items-center justify-between text-[10px] t-mono tracking-[0.14em] text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2.5">
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                active ? 'bg-[var(--color-text-primary)]' : 'bg-[var(--color-text-muted)]'
              }`}
            />
            TELEMETRY DISPERSION / IQR
          </span>
          <span className="text-[var(--color-text-secondary)]">
            {active ? 'HEALTH INDEX: 94/100' : 'STATUS: OPTIMAL'}
          </span>
        </div>

        {/* Statistical Quartile Circuit */}
        <div className="relative py-3 flex items-center justify-between gap-2 sm:gap-3">
          <div
            className={`border px-3 py-2 rounded text-center transition-all duration-300 ${
              active
                ? 'border-[var(--color-text-primary)] bg-[var(--color-background)] shadow-[0_0_12px_rgba(232,229,222,0.08)]'
                : 'border-[var(--color-border)] bg-[var(--color-background-secondary)]'
            }`}
          >
            <span className="block t-mono text-[9px] text-[var(--color-text-muted)]">SENSOR STREAM</span>
            <span className="t-mono text-[11px] font-medium text-[var(--color-text-primary)]">CSV/JSON</span>
          </div>

          <div className="flex-1 relative h-[1px] bg-[var(--color-border-strong)] min-w-[20px]">
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] transition-all ${
                active ? 'left-full -translate-x-full duration-700' : 'left-0 duration-300 opacity-40'
              }`}
            />
          </div>

          <div
            className={`border px-3 py-2 rounded text-center transition-all duration-300 ${
              active
                ? 'border-[var(--color-text-primary)] bg-[var(--color-background)]'
                : 'border-[var(--color-border)] bg-[var(--color-background-secondary)]'
            }`}
          >
            <span className="block t-mono text-[9px] text-[var(--color-text-muted)]">IQR BOUNDS</span>
            <span className="t-mono text-[11px] font-medium text-[var(--color-text-primary)]">Q1 - 1.5·IQR</span>
          </div>

          <div className="flex-1 relative h-[1px] bg-[var(--color-border-strong)] min-w-[20px]" />

          <div className="flex flex-col gap-2 min-w-[110px]">
            <div className="border border-[var(--color-border)] px-2.5 py-1 rounded bg-[var(--color-background)] flex justify-between items-center text-[10px] t-mono">
              <span className="text-[var(--color-text-primary)]">REACT 19</span>
              <span className="text-[var(--color-text-muted)] text-[8.5px]">WEB</span>
            </div>
            <div className="border border-[var(--color-border)] px-2.5 py-1 rounded bg-[var(--color-background-secondary)] flex justify-between items-center text-[10px] t-mono opacity-80">
              <span className="text-[var(--color-text-secondary)]">PYQT5</span>
              <span className="text-[var(--color-text-muted)] text-[8.5px]">DESKTOP</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[9.5px] t-mono text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
          <span>ALGORITHM: NON-PARAMETRIC IQR</span>
          <span className="text-[var(--color-text-secondary)]">PDF & EXCEL EXPORT ENGINE</span>
        </div>
      </div>
    );
  }

  // 02: VTOP Plus
  if (slug === 'vtop-plus') {
    return (
      <div
        className="w-full h-full min-h-[170px] sm:min-h-[190px] p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden select-none"
        onMouseEnter={() => setInternalHover(true)}
        onMouseLeave={() => setInternalHover(false)}
      >
        <div className="flex items-center justify-between text-[10px] t-mono tracking-[0.14em] text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2.5">
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                active ? 'bg-[var(--color-text-primary)]' : 'bg-[var(--color-text-muted)]'
              }`}
            />
            NATIVE COOKIE BRIDGE / OFFLINE FIRST
          </span>
          <span className="text-[var(--color-text-secondary)]">
            {active ? 'ZERO-BACKEND DIRECT' : 'STANDBY'}
          </span>
        </div>

        {/* Headless & Hive Schematic */}
        <div className="relative py-3 flex items-center justify-between gap-3">
          <div
            className={`border px-3 py-2 rounded text-center transition-all duration-300 ${
              active
                ? 'border-[var(--color-text-primary)] bg-[var(--color-background)] shadow-[0_0_12px_rgba(232,229,222,0.08)]'
                : 'border-[var(--color-border)] bg-[var(--color-background-secondary)]'
            }`}
          >
            <span className="block t-mono text-[9px] text-[var(--color-text-muted)]">FLUTTER UI</span>
            <span className="t-mono text-[11px] font-medium text-[var(--color-text-primary)]">CLIENT</span>
          </div>

          <div className="flex-1 relative h-[1px] bg-[var(--color-border-strong)] min-w-[20px]">
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] transition-all ${
                active ? 'left-full -translate-x-full duration-700' : 'left-0 duration-300 opacity-40'
              }`}
            />
          </div>

          <div
            className={`border px-3 py-1.5 rounded text-center transition-all duration-300 ${
              active
                ? 'border-[var(--color-text-primary)] bg-[var(--color-background)]'
                : 'border-[var(--color-border)] bg-[var(--color-background-secondary)]'
            }`}
          >
            <span className="block t-mono text-[8.5px] text-[var(--color-text-muted)]">KOTLIN / SWIFT</span>
            <span className="t-mono text-[10.5px] text-[var(--color-text-primary)]">COOKIE BRIDGE</span>
          </div>

          <div className="flex-1 relative h-[1px] bg-[var(--color-border-strong)] min-w-[20px]" />

          <div className="flex flex-col gap-2 min-w-[110px]">
            <div className="border border-[var(--color-border)] px-2.5 py-1 rounded bg-[var(--color-background)] flex justify-between items-center text-[10px] t-mono">
              <span className="text-[var(--color-text-primary)]">VTOP ERP</span>
              <span className="text-[var(--color-text-muted)] text-[8.5px]">DIRECT</span>
            </div>
            <div className="border border-[var(--color-border)] px-2.5 py-1 rounded bg-[var(--color-background-secondary)] flex justify-between items-center text-[10px] t-mono">
              <span className="text-[var(--color-text-secondary)]">HIVE DB</span>
              <span className="text-[var(--color-text-muted)] text-[8.5px]">OFFLINE</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[9.5px] t-mono text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
          <span>SECURITY: HTTPONLY CAPTURE</span>
          <span className="text-[var(--color-text-secondary)]">ATTENDANCE MARGIN CALCULATOR</span>
        </div>
      </div>
    );
  }

  // 03: SentryWallet
  if (slug === 'sentry-wallet') {
    return (
      <div
        className="w-full h-full min-h-[170px] sm:min-h-[190px] p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden select-none"
        onMouseEnter={() => setInternalHover(true)}
        onMouseLeave={() => setInternalHover(false)}
      >
        <div className="flex items-center justify-between text-[10px] t-mono tracking-[0.14em] text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2.5">
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                active ? 'bg-[var(--color-text-primary)]' : 'bg-[var(--color-text-muted)]'
              }`}
            />
            TRANSACTION SECURITY & SESSION MANAGEMENT
          </span>
          <span className="text-[var(--color-text-secondary)]">
            {active ? 'SIGNING: VERIFIED' : 'IDLE'}
          </span>
        </div>

        {/* Transaction Lifecycle */}
        <div className="relative py-3 flex items-center justify-between gap-3">
          <div
            className={`border px-3 py-2 rounded text-center transition-all duration-300 ${
              active
                ? 'border-[var(--color-text-primary)] bg-[var(--color-background)] shadow-[0_0_12px_rgba(232,229,222,0.08)]'
                : 'border-[var(--color-border)] bg-[var(--color-background-secondary)]'
            }`}
          >
            <span className="block t-mono text-[9px] text-[var(--color-text-muted)]">dAPP</span>
            <span className="t-mono text-[11px] font-medium text-[var(--color-text-primary)]">PAYLOAD</span>
          </div>

          <div className="flex-1 relative h-[1px] bg-[var(--color-border-strong)] min-w-[20px]">
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] transition-all ${
                active ? 'left-full -translate-x-full duration-700' : 'left-0 duration-300 opacity-40'
              }`}
            />
          </div>

          <div
            className={`border px-3 py-1.5 rounded text-center transition-all duration-300 ${
              active
                ? 'border-[var(--color-text-primary)] bg-[var(--color-background)]'
                : 'border-[var(--color-border)] bg-[var(--color-background-secondary)]'
            }`}
          >
            <span className="block t-mono text-[8.5px] text-[var(--color-text-muted)]">SUPABASE</span>
            <span className="t-mono text-[10.5px] text-[var(--color-text-primary)]">SESSION AUTH</span>
          </div>

          <div className="flex-1 relative h-[1px] bg-[var(--color-border-strong)] min-w-[20px]" />

          <div className="border border-[var(--color-border)] px-3 py-2 rounded text-center bg-[var(--color-background)]">
            <span className="block t-mono text-[9px] text-[var(--color-text-muted)]">SANDBOX</span>
            <span className="t-mono text-[10.5px] text-[var(--color-text-primary)]">SIGN INTENT</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[9.5px] t-mono text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
          <span>AUTH: SUPABASE GOOGLE OAUTH</span>
          <span className="text-[var(--color-text-secondary)]">NON-CUSTODIAL UI INTERACTION</span>
        </div>
      </div>
    );
  }

  // 04: LinkForge
  if (slug === 'linkforge') {
    return (
      <div
        className="w-full h-full min-h-[170px] sm:min-h-[190px] p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden select-none"
        onMouseEnter={() => setInternalHover(true)}
        onMouseLeave={() => setInternalHover(false)}
      >
        <div className="flex items-center justify-between text-[10px] t-mono tracking-[0.14em] text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2.5">
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                active ? 'bg-[var(--color-text-primary)]' : 'bg-[var(--color-text-muted)]'
              }`}
            />
            CACHE-ASIDE READ-THROUGH
          </span>
          <span className="text-[var(--color-text-secondary)]">
            {active ? 'LATENCY: 1.86ms (p95)' : 'STANDBY'}
          </span>
        </div>

        {/* Schematic Circuit */}
        <div className="relative py-3 flex items-center justify-between gap-2 sm:gap-4">
          <div
            className={`border px-3 py-2 rounded text-center transition-all duration-300 ${
              active
                ? 'border-[var(--color-text-primary)] bg-[var(--color-background)] shadow-[0_0_12px_rgba(232,229,222,0.1)]'
                : 'border-[var(--color-border)] bg-[var(--color-background-secondary)]'
            }`}
          >
            <span className="block t-mono text-[9px] text-[var(--color-text-muted)]">ORIGIN</span>
            <span className="t-mono text-[11px] font-medium text-[var(--color-text-primary)]">CLIENT</span>
          </div>

          <div className="flex-1 relative h-[1px] bg-[var(--color-border-strong)] min-w-[20px]">
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] transition-all ${
                active ? 'left-full -translate-x-full duration-700' : 'left-0 duration-300 opacity-40'
              }`}
            />
          </div>

          <div
            className={`border px-3 py-2 rounded text-center transition-all duration-300 ${
              active
                ? 'border-[var(--color-text-primary)] bg-[var(--color-background)]'
                : 'border-[var(--color-border)] bg-[var(--color-background-secondary)]'
            }`}
          >
            <span className="block t-mono text-[9px] text-[var(--color-text-muted)]">GO FIBER</span>
            <span className="t-mono text-[11px] font-medium text-[var(--color-text-primary)]">ROUTER</span>
          </div>

          <div className="flex flex-col gap-2 min-w-[120px]">
            <div
              className={`border px-2.5 py-1.5 rounded flex items-center justify-between text-left transition-all duration-300 ${
                active
                  ? 'border-[var(--color-text-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)]'
                  : 'border-[var(--color-border)] bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)]'
              }`}
            >
              <div>
                <span className="block t-mono text-[8.5px] text-[var(--color-text-muted)]">IN-MEMORY</span>
                <span className="t-mono text-[10px]">REDIS (CACHE)</span>
              </div>
              <span className="t-mono text-[8.5px] text-[var(--color-text-muted)]">HIT</span>
            </div>

            <div className="border border-[var(--color-border)] px-2.5 py-1.5 rounded flex items-center justify-between text-left bg-[var(--color-background-secondary)] opacity-60">
              <div>
                <span className="block t-mono text-[8.5px] text-[var(--color-text-muted)]">PERSISTENT</span>
                <span className="t-mono text-[10px] text-[var(--color-text-muted)]">POSTGRESQL</span>
              </div>
              <span className="t-mono text-[8.5px] text-[var(--color-text-muted)]">MISS</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[9.5px] t-mono text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
          <span>ATOMIC SETNX COLLISION GUARD</span>
          <span className="text-[var(--color-text-secondary)]">ASYNC GOROUTINE WORKER POOL</span>
        </div>
      </div>
    );
  }

  // 02: Heritage RAG Bot
  if (slug === 'heritage-rag-bot' || slug === 'rag-qa') {
    return (
      <div
        className="w-full h-full min-h-[170px] sm:min-h-[190px] p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden select-none"
        onMouseEnter={() => setInternalHover(true)}
        onMouseLeave={() => setInternalHover(false)}
      >
        <div className="flex items-center justify-between text-[10px] t-mono tracking-[0.14em] text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2.5">
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                active ? 'bg-[var(--color-text-primary)]' : 'bg-[var(--color-text-muted)]'
              }`}
            />
            DUAL PIPELINE / RETRIEVAL
          </span>
          <span className="text-[var(--color-text-secondary)]">
            {active ? 'LLAMA 3.3 70B TURBO' : 'TOP-3 HNSW'}
          </span>
        </div>

        {/* Dual Lane Pipeline */}
        <div className="relative py-2.5 flex flex-col gap-2">
          {/* Lane 1: Ingestion */}
          <div className="flex items-center justify-between gap-2 border border-dashed border-[var(--color-border)] p-1.5 rounded bg-[var(--color-background-secondary)]/50">
            <span className="t-mono text-[9px] text-[var(--color-text-muted)]">DOC CHUNKS</span>
            <span className="t-mono text-[8.5px] text-[var(--color-border-strong)]">─── 384-d ───&gt;</span>
            <span className="t-mono text-[9px] text-[var(--color-text-secondary)]">LOCAL CPU EMBED</span>
            <span className="t-mono text-[8.5px] text-[var(--color-border-strong)]">───&gt;</span>
            <span className="t-mono text-[9px] text-[var(--color-text-primary)]">CHROMADB HNSW</span>
          </div>

          {/* Lane 2: Query & Grounding */}
          <div
            className={`flex items-center justify-between gap-2 border p-1.5 rounded transition-all duration-300 ${
              active
                ? 'border-[var(--color-text-primary)] bg-[var(--color-background)] shadow-[0_0_12px_rgba(232,229,222,0.06)]'
                : 'border-[var(--color-border)] bg-[var(--color-background-secondary)]'
            }`}
          >
            <span className="t-mono text-[9px] text-[var(--color-text-primary)] font-medium">USER QUERY</span>
            <span
              className={`t-mono text-[8.5px] transition-colors ${
                active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-border-strong)]'
              }`}
            >
              ─── k=3 ───&gt;
            </span>
            <span className="t-mono text-[9px] text-[var(--color-text-secondary)]">GROUNDING PROMPT</span>
            <span className="t-mono text-[8.5px] text-[var(--color-border-strong)]">───&gt;</span>
            <span className="t-mono text-[9px] text-[var(--color-text-primary)]">VERIFIED ANSWER</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[9.5px] t-mono text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
          <span>ZERO-TOKEN COST CPU EMBEDDINGS</span>
          <span className="text-[var(--color-text-secondary)]">LANGCHAIN BUFFER MEMORY</span>
        </div>
      </div>
    );
  }

  // Fallback schematic
  return (
    <div className="w-full h-full min-h-[170px] p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 flex flex-col justify-between">
      <div className="flex items-center justify-between text-[10px] t-mono text-[var(--color-text-muted)] border-b border-[var(--color-border)] pb-2">
        <span>SYSTEM SCHEMATIC</span>
        <span>STATUS: VERIFIED</span>
      </div>
      <div className="py-4 text-center">
        <span className="t-mono text-xs text-[var(--color-text-secondary)]">
          ENGINEERING ARCHITECTURE
        </span>
      </div>
      <div className="t-mono text-[9.5px] text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-2">
        PORTFOLIO PROJECT
      </div>
    </div>
  );
};
