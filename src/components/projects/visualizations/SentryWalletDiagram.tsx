import React, { useState } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface SentryWalletDiagramProps {
  className?: string;
}

export const SentryWalletDiagram: React.FC<SentryWalletDiagramProps> = ({ className = '' }) => {
  const [activeMode, setActiveMode] = useState<'auth' | 'transaction'>('transaction');
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div className={`flex flex-col gap-6 w-full ${className}`}>
      {/* Top caption & mode toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] t-mono text-[var(--color-text-secondary)]">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)]" />
          WEB3 WALLET SECURITY BOUNDARY & TRANSACTION LIFECYCLE
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-text-muted)] text-[10px]">MODE:</span>
          <button
            type="button"
            onClick={() => setActiveMode('transaction')}
            className={`px-2.5 py-1 rounded t-mono text-[10px] tracking-wider transition-colors cursor-pointer ${
              activeMode === 'transaction'
                ? 'bg-[var(--color-text-primary)] text-[var(--color-background)] font-medium'
                : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            TRANSACTION SIGNING
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('auth')}
            className={`px-2.5 py-1 rounded t-mono text-[10px] tracking-wider transition-colors cursor-pointer ${
              activeMode === 'auth'
                ? 'bg-[var(--color-text-primary)] text-[var(--color-background)] font-medium'
                : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            SUPABASE AUTH SESSION
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative border border-[var(--color-border)] rounded-lg p-5 sm:p-7 bg-[var(--color-background-secondary)] overflow-x-auto">
        <svg
          viewBox="0 0 1000 240"
          className="w-full h-auto min-w-[700px] select-none"
          role="img"
          aria-label="SentryWallet Architecture showing dApp Client, SentryWallet UI, Supabase Auth Boundary, Transaction Review Sandbox, and Broadcast RPC."
        >
          {/* Group Labels */}
          <text x="10" y="24" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            DAPP & USER
          </text>
          <text x="360" y="24" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            WALLET APPLICATION RUNTIME
          </text>
          <text x="740" y="24" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            SECURITY & RPC BOUNDARY
          </text>

          {/* Connectors */}
          <g fill="none">
            <path d="M150 115 H210 M360 115 H420 M570 115 H630 M780 115 H830" stroke="var(--color-border-strong)" strokeWidth="1.2" />
            {!reducedMotion && (
              <g stroke="var(--color-text-primary)" strokeWidth="1.8" strokeDasharray="3 16" strokeLinecap="round" className="animate-flow">
                <path d="M150 115 H210" />
                <path d="M360 115 H420" />
                <path d="M570 115 H630" />
                <path d="M780 115 H830" />
              </g>
            )}
          </g>

          {/* Node 1: dApp Interface */}
          <g
            tabIndex={0}
            role="button"
            aria-label="dApp / Browser Client"
            onClick={() => setActiveStep(1)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="10"
              y="75"
              width="140"
              height="80"
              rx="4"
              fill={activeStep === 1 ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={activeStep === 1 ? 'var(--color-text-primary)' : 'var(--color-border)'}
            />
            <text x="24" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              dApp / Client
            </text>
            <text x="24" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Connect Provider
            </text>
            <text x="24" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              window.ethereum req
            </text>
          </g>

          {/* Node 2: SentryWallet UI */}
          <g
            tabIndex={0}
            role="button"
            aria-label="SentryWallet Interface"
            onClick={() => setActiveStep(2)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="210"
              y="75"
              width="150"
              height="80"
              rx="4"
              fill={activeStep === 2 ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={activeStep === 2 ? 'var(--color-text-primary)' : 'var(--color-border)'}
            />
            <text x="224" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              Wallet UI Layer
            </text>
            <text x="224" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              MetaMask-Inspired
            </text>
            <text x="224" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              React 19 + Tailwind
            </text>
          </g>

          {/* Node 3: Supabase Auth / Session */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Supabase Auth and Session Storage"
            onClick={() => setActiveStep(3)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="420"
              y="75"
              width="150"
              height="80"
              rx="4"
              fill={activeStep === 3 ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={activeStep === 3 ? 'var(--color-text-primary)' : 'var(--color-border)'}
            />
            <text x="434" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              Auth & Session
            </text>
            <text x="434" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Google OAuth Provider
            </text>
            <text x="434" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              Supabase v2 Client
            </text>
          </g>

          {/* Node 4: Transaction Inspector */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Transaction Inspection Sandbox"
            onClick={() => setActiveStep(4)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="630"
              y="75"
              width="150"
              height="80"
              rx="4"
              fill={activeStep === 4 ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={activeStep === 4 ? 'var(--color-text-primary)' : 'var(--color-border)'}
            />
            <text x="644" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              Tx Inspection
            </text>
            <text x="644" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Gas & Param Review
            </text>
            <text x="644" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              Payload Decoding
            </text>
          </g>

          {/* Node 5: Signing & Broadcast */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Signing and Network RPC"
            onClick={() => setActiveStep(5)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="830"
              y="75"
              width="160"
              height="80"
              rx="4"
              fill={activeStep === 5 ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke={activeStep === 5 ? 'var(--color-text-primary)' : 'var(--color-border)'}
            />
            <text x="844" y="104" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              Sign & Broadcast
            </text>
            <text x="844" y="122" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Non-Custodial Key
            </text>
            <text x="844" y="139" fill="var(--color-text-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              Simulated RPC Flow
            </text>
          </g>
        </svg>
      </div>

      {/* Explanation Box */}
      <div className="border border-[var(--color-border)] rounded-lg p-5 bg-[var(--color-surface)]">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
          <span className="t-mono text-[10px] text-[var(--color-text-muted)] tracking-[0.16em]">
            SYSTEM BOUNDARY & STATE ISOLATION
          </span>
          <span className="t-mono text-[11px] text-[var(--color-text-secondary)] font-medium">
            CLIENT-SIDE WEB3 EXPERIMENT
          </span>
        </div>

        <p className="mt-4 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-[65ch]">
          {activeMode === 'transaction' ? (
            <>
              <strong>Transaction Verification Protocol:</strong> SentryWallet decouples transaction receipt from execution. When a dApp initiates a transaction request, the parameters (recipient contract, ETH/token value, gas limits, and raw call data) are decoded into human-readable prompts within a dedicated modal sandbox, preventing deceptive contract calls before the user confirms.
            </>
          ) : (
            <>
              <strong>Supabase Authentication & Multi-Page State:</strong> Session tokens are securely managed via Supabase auth services with Google OAuth integration. Navigation state across dashboard, activity records, and transfer panels is orchestrated by React Router 7 and animated smoothly via Framer Motion.
            </>
          )}
        </p>
      </div>
    </div>
  );
};
