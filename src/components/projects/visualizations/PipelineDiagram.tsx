import React, { useState } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface PipelineDiagramProps {
  className?: string;
}

export const PipelineDiagram: React.FC<PipelineDiagramProps> = ({ className = '' }) => {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      {/* Top caption */}
      <div className="flex items-center justify-between text-[11px] t-mono text-[var(--color-text-secondary)]">
        <span>TWO-PHASE RETRIEVAL ARCHITECTURE</span>
        <span className="text-[var(--color-text-muted)]">
          {activeStage ? `STAGE: ${activeStage.toUpperCase()}` : 'HOVER STAGES TO INSPECT'}
        </span>
      </div>

      <div className="relative border border-[var(--color-border)] rounded-lg p-4 sm:p-6 bg-[var(--color-background-secondary)] overflow-x-auto">
        <svg
          viewBox="0 0 1000 290"
          className="w-full h-auto min-w-[700px] select-none"
          role="img"
          aria-label="RAG Architecture Pipeline with upper Ingestion Lane and lower Query Lane connected at Vector Store retrieval."
        >
          {/* Lane Labels */}
          <text x="0" y="24" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            INGESTION LANE (ASYNC OFFLINE)
          </text>
          <text x="0" y="194" fill="var(--color-text-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
            QUERY LANE (SYNCHRONOUS RUNTIME)
          </text>

          {/* Connectors */}
          <g fill="none">
            {/* Ingestion connectors */}
            <path d="M130 70 H190 M360 70 H430" stroke="var(--color-border-strong)" strokeWidth="1.2" strokeDasharray="3 4" />

            {/* Query connectors */}
            <path d="M130 240 H430 M580 240 H660 M830 240 H870" stroke="rgba(232, 229, 222, 0.45)" strokeWidth="1.2" />

            {/* Vertical connector: Vector Store down to Retriever */}
            <path d="M505 95 V215" stroke="var(--color-text-primary)" strokeWidth="1.2" strokeDasharray="2 3" />
          </g>

          {/* Animated Flow Dots */}
          {!reducedMotion && (
            <g fill="none" stroke="var(--color-text-primary)" strokeWidth="1.5" strokeDasharray="2 18" strokeLinecap="round" className="animate-flow">
              <path d="M130 240 H430" />
              <path d="M505 95 V215" />
              <path d="M580 240 H660" />
              <path d="M830 240 H870" />
            </g>
          )}

          {/* Upper Ingestion Nodes */}
          {/* Documents */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Documents: PDF, Markdown, Corpus files"
            onMouseEnter={() => setActiveStage('documents')}
            onMouseLeave={() => setActiveStage(null)}
            onFocus={() => setActiveStage('documents')}
            onBlur={() => setActiveStage(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="0"
              y="45"
              width="130"
              height="50"
              rx="3"
              fill={activeStage === 'documents' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke="var(--color-border-strong)"
              strokeDasharray="3 4"
            />
            <text x="14" y="67" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Documents
            </text>
            <text x="14" y="83" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Raw corpus files
            </text>
          </g>

          {/* Chunk & Embed */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Chunk and Embed: Recursive text tokenization and dense vectors"
            onMouseEnter={() => setActiveStage('chunking')}
            onMouseLeave={() => setActiveStage(null)}
            onFocus={() => setActiveStage('chunking')}
            onBlur={() => setActiveStage(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="190"
              y="45"
              width="170"
              height="50"
              rx="3"
              fill={activeStage === 'chunking' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke="var(--color-border-strong)"
              strokeDasharray="3 4"
            />
            <text x="204" y="67" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Chunk + Embed
            </text>
            <text x="204" y="83" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Semantic vector mapping
            </text>
          </g>

          {/* Vector Store */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Vector Store: Searchable dense index"
            onMouseEnter={() => setActiveStage('vector-store')}
            onMouseLeave={() => setActiveStage(null)}
            onFocus={() => setActiveStage('vector-store')}
            onBlur={() => setActiveStage(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="430"
              y="45"
              width="150"
              height="50"
              rx="3"
              fill={activeStage === 'vector-store' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke="var(--color-border-strong)"
            />
            <text x="444" y="67" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Vector Store
            </text>
            <text x="444" y="83" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              HNSW / Cosine Index
            </text>
          </g>

          {/* Lower Query Nodes */}
          {/* Question */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Question: User input query"
            onMouseEnter={() => setActiveStage('question')}
            onMouseLeave={() => setActiveStage(null)}
            onFocus={() => setActiveStage('question')}
            onBlur={() => setActiveStage(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="0"
              y="215"
              width="130"
              height="50"
              rx="3"
              fill={activeStage === 'question' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke="var(--color-border-strong)"
            />
            <text x="14" y="237" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Question
            </text>
            <text x="14" y="253" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              User prompt
            </text>
          </g>

          {/* Retrieve */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Retrieve: Top-K cosine similarity matching"
            onMouseEnter={() => setActiveStage('retrieve')}
            onMouseLeave={() => setActiveStage(null)}
            onFocus={() => setActiveStage('retrieve')}
            onBlur={() => setActiveStage(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="430"
              y="215"
              width="150"
              height="50"
              rx="3"
              fill={activeStage === 'retrieve' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke="var(--color-border-strong)"
            />
            <text x="444" y="237" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Retrieve
            </text>
            <text x="444" y="253" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Top-K Context Chunks
            </text>
          </g>

          {/* LLM */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Language Model: Grounded inference using context only"
            onMouseEnter={() => setActiveStage('llm')}
            onMouseLeave={() => setActiveStage(null)}
            onFocus={() => setActiveStage('llm')}
            onBlur={() => setActiveStage(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="660"
              y="215"
              width="170"
              height="50"
              rx="3"
              fill={activeStage === 'llm' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke="var(--color-border-strong)"
            />
            <text x="674" y="237" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              LLM Generator
            </text>
            <text x="674" y="253" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              Grounded in context
            </text>
          </g>

          {/* Answer */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Answer: Synthesized response with explicit source citations"
            onMouseEnter={() => setActiveStage('answer')}
            onMouseLeave={() => setActiveStage(null)}
            onFocus={() => setActiveStage('answer')}
            onBlur={() => setActiveStage(null)}
            className="cursor-pointer outline-none"
          >
            <rect
              x="870"
              y="215"
              width="130"
              height="50"
              rx="3"
              fill={activeStage === 'answer' ? 'var(--color-surface)' : 'var(--color-background)'}
              stroke="var(--color-border-strong)"
            />
            <text x="884" y="237" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-mono)">
              Answer
            </text>
            <text x="884" y="253" fill="var(--color-text-secondary)" fontSize="9.5" fontFamily="var(--font-mono)">
              With citations
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
