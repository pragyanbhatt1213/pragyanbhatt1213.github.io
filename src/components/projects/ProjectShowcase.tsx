import React from 'react';
import { Project } from '../../types/project';
import { ProjectPreviewCard } from './ProjectPreviewCard';
import { Reveal } from '../ui/Reveal';

interface ProjectShowcaseProps {
  projects: Project[];
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 w-full">
      {projects.map((project) => (
        <Reveal key={project.id}>
          <ProjectPreviewCard project={project} />
        </Reveal>
      ))}
    </div>
  );
};
