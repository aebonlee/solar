import useAOS from '../../hooks/useAOS';
import type { ReactElement } from 'react';

export interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  overview: string;
  targetUsers: string[];
  objectives: string[];
  architecture: {
    description: string;
    components: { name: string; description: string; tech: string }[];
    diagram: string;
  };
  pipeline: {
    steps: { step: number; title: string; description: string; tools: string }[];
  };
  solarApi: {
    description: string;
    endpoints: { name: string; purpose: string; example: string }[];
  };
  prompts: {
    description: string;
    examples: { title: string; prompt: string; note: string }[];
  };
  implementation: {
    frontend: { description: string; pages: string[]; stack: string };
    backend: { description: string; apis: string[]; stack: string };
    database: { tables: { name: string; fields: string }[] };
  };
  deployment: {
    steps: string[];
    infra: string;
  };
  expansion: string[];
}

interface Props {
  project: ProjectData;
}

export default function ProjectDetail({ project }: Props): ReactElement {
  useAOS();

  return (
    <div className="project-detail">
      {/* Header */}
      <section className="project-detail-hero" data-aos="fade-up" style={{ borderLeftColor: project.color }}>
        <div className="project-detail-badge" style={{ background: `${project.color}15`, color: project.color }}>
          <i className={`fas ${project.icon}`}></i> Project {project.id}
        </div>
        <h1>{project.title}</h1>
        <p className="project-detail-subtitle">{project.subtitle}</p>
      </section>

      {/* 프로젝트 개요 */}
      <section className="project-section" data-aos="fade-up">
        <h2><i className="fas fa-circle-info"></i> 프로젝트 개요</h2>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ lineHeight: '1.8', marginBottom: '1.5rem' }}>{project.overview}</p>
          <div className="project-meta-grid">
            <div>
              <h4><i className="fas fa-users"></i> 주요 대상</h4>
              <ul>{project.targetUsers.map((u, i) => <li key={i}>{u}</li>)}</ul>
            </div>
            <div>
              <h4><i className="fas fa-bullseye"></i> 학습 목표</h4>
              <ul>{project.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* 시스템 아키텍처 */}
      <section className="project-section" data-aos="fade-up">
        <h2><i className="fas fa-sitemap"></i> 시스템 아키텍처</h2>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>{project.architecture.description}</p>
          <div className="architecture-diagram">
            <pre>{project.architecture.diagram}</pre>
          </div>
          <div className="architecture-components">
            {project.architecture.components.map((comp, i) => (
              <div key={i} className="arch-component">
                <h4>{comp.name}</h4>
                <p>{comp.description}</p>
                <span className="tech-badge">{comp.tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 데이터 파이프라인 */}
      <section className="project-section" data-aos="fade-up">
        <h2><i className="fas fa-arrows-spin"></i> 데이터 파이프라인</h2>
        <div className="pipeline-steps">
          {project.pipeline.steps.map((step) => (
            <div key={step.step} className="pipeline-step card">
              <div className="pipeline-step-number" style={{ background: project.color }}>{step.step}</div>
              <div className="pipeline-step-content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                <span className="tech-badge">{step.tools}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Solar API 활용 */}
      <section className="project-section" data-aos="fade-up">
        <h2><i className="fas fa-sun"></i> Solar API 활용</h2>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>{project.solarApi.description}</p>
          {project.solarApi.endpoints.map((ep, i) => (
            <div key={i} className="api-endpoint">
              <h4><i className="fas fa-plug"></i> {ep.name}</h4>
              <p>{ep.purpose}</p>
              <div className="code-block"><code>{ep.example}</code></div>
            </div>
          ))}
        </div>
      </section>

      {/* 프롬프트 엔지니어링 */}
      <section className="project-section" data-aos="fade-up">
        <h2><i className="fas fa-wand-magic-sparkles"></i> 프롬프트 엔지니어링</h2>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>{project.prompts.description}</p>
          {project.prompts.examples.map((ex, i) => (
            <div key={i} className="prompt-example">
              <h4>{ex.title}</h4>
              <div className="prompt-block"><pre>{ex.prompt}</pre></div>
              <p className="prompt-note"><i className="fas fa-lightbulb"></i> {ex.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 구현 가이드 */}
      <section className="project-section" data-aos="fade-up">
        <h2><i className="fas fa-code"></i> 구현 가이드</h2>
        <div className="implementation-grid">
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3><i className="fas fa-display" style={{ color: '#3B82F6' }}></i> 프론트엔드</h3>
            <p>{project.implementation.frontend.description}</p>
            <p className="tech-badge">{project.implementation.frontend.stack}</p>
            <h4>주요 페이지</h4>
            <ul>{project.implementation.frontend.pages.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3><i className="fas fa-server" style={{ color: '#10B981' }}></i> 백엔드</h3>
            <p>{project.implementation.backend.description}</p>
            <p className="tech-badge">{project.implementation.backend.stack}</p>
            <h4>API 엔드포인트</h4>
            <ul>{project.implementation.backend.apis.map((a, i) => <li key={i}>{a}</li>)}</ul>
          </div>
        </div>
        <div className="card" style={{ padding: '1.5rem', marginTop: '1rem' }}>
          <h3><i className="fas fa-database" style={{ color: '#8B5CF6' }}></i> 데이터베이스</h3>
          <div className="db-tables">
            {project.implementation.database.tables.map((t, i) => (
              <div key={i} className="db-table">
                <h4>{t.name}</h4>
                <code>{t.fields}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 배포 */}
      <section className="project-section" data-aos="fade-up">
        <h2><i className="fas fa-cloud-arrow-up"></i> 배포 계획</h2>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p className="tech-badge" style={{ marginBottom: '1rem' }}>{project.deployment.infra}</p>
          <ol className="deployment-steps">
            {project.deployment.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
      </section>

      {/* 확장 가능성 */}
      <section className="project-section" data-aos="fade-up">
        <h2><i className="fas fa-rocket"></i> 확장 가능성</h2>
        <div className="card" style={{ padding: '1.5rem' }}>
          <ul className="expansion-list">
            {project.expansion.map((e, i) => (
              <li key={i}><i className="fas fa-check-circle" style={{ color: project.color }}></i> {e}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
