import { useParams } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';
import { PROJECT_DATA } from '../../data/projectDetails';
import type { ReactElement } from 'react';

const SLUG_MAP: Record<string, number> = {
  '1-storybook': 1,
  '2-heritage': 2,
  '3-history': 3,
  '4-certification': 4,
  '5-youth-policy': 5,
  '6-interview': 6,
  '7-routine': 7,
};

export default function ProjectPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const projectId = slug ? SLUG_MAP[slug] : undefined;
  const project = projectId ? PROJECT_DATA.find(p => p.id === projectId) : undefined;

  if (!project) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>프로젝트를 찾을 수 없습니다</h2>
        <p style={{ color: 'var(--text-muted)' }}>올바른 프로젝트 경로를 확인해주세요.</p>
      </div>
    );
  }

  return <ProjectDetail project={project} />;
}
