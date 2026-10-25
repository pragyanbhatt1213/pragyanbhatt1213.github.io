export type ProjectStatus = 'in-progress' | 'completed' | 'prototype' | 'archived';

export interface DiagramNode {
  id: string;
  label: string;
  subLabel?: string;
  role?: string;
  annotation?: string;
  verified?: boolean;
}

export interface DiagramEdge {
  from: string;
  to: string;
  style: 'solid' | 'dashed' | 'dotted';
  label?: string;
  verified?: boolean;
}

export interface NestedLayer {
  id: string;
  label: string;
  subLabel?: string;
  items?: string[];
  explanation?: string;
  verified?: boolean;
}

export interface PipelineLane {
  id: string;
  label: string;
  style: 'solid' | 'dashed' | 'dotted';
  nodes: DiagramNode[];
  verified?: boolean;
}

export type VisualizationSpec =
  | {
      type: 'flow';
      nodes: DiagramNode[];
      edges: DiagramEdge[];
      paths: Record<string, string[]>;
    }
  | {
      type: 'nested';
      layers: NestedLayer[];
      side?: DiagramNode[];
      lifecycle?: string[];
    }
  | {
      type: 'pipeline';
      lanes: PipelineLane[];
    };

export interface CaseStudySection {
  id: string;
  title: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
}

export interface Project {
  id: string;
  slug: string;
  number: string; // '01'
  title: string;
  shortDescription: string; // one sentence
  overview: string;
  technologies: string[];
  status?: ProjectStatus;
  featured: boolean;
  published: boolean;
  repoUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  caseStudyPath?: string;
  highlights?: string[];
  visualization: VisualizationSpec;
  caseStudy: CaseStudySection[];
  related: string[];
  placeholder?: boolean;
  verified: boolean;
}
