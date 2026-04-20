import { PROJECT_TRACKS } from '../data/projects';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

export default function ProjectGallery(): ReactElement {
  useAOS();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-images"></i> 프로젝트 갤러리</h1>
          <p>Solar LLM 기반 AI 서비스 프로젝트 트랙 소개</p>
        </div>
      </div>
      <div className="container section">
        <div className="gallery-grid">
          {PROJECT_TRACKS.map((track, idx) => (
            <div key={track.id} className="gallery-card" data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
              <div className="gallery-card-img" style={{ background: `linear-gradient(135deg, ${track.color}, ${track.color}99)` }}>
                <i className={`fas ${track.icon}`}></i>
              </div>
              <div className="gallery-card-body">
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <div className="project-skills" style={{ marginTop: '0.75rem' }}>
                  {track.skills.map(s => <span key={s}>{s}</span>)}
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <span className={`difficulty-badge ${track.difficulty}`}>
                    {track.difficulty === 'beginner' ? '입문' : track.difficulty === 'intermediate' ? '중급' : '고급'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
