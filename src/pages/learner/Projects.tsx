import { PROJECT_TRACKS } from '../../data/projects';
import useAOS from '../../hooks/useAOS';
import type { ReactElement } from 'react';

export default function Projects(): ReactElement {
  useAOS();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-project-diagram"></i> 프로젝트실</h1>
          <p>4개 트랙 중 하나를 선택하여 팀 프로젝트를 진행하세요</p>
        </div>
      </div>
      <div className="container section">
        <div className="projects-grid">
          {PROJECT_TRACKS.map((track, idx) => (
            <div key={track.id} className="project-card" data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
              <div className="project-card-header">
                <div className="project-card-icon" style={{ background: track.color }}>
                  <i className={`fas ${track.icon}`}></i>
                </div>
                <div>
                  <h3>{track.title}</h3>
                  <span className={`difficulty-badge ${track.difficulty}`}>
                    {track.difficulty === 'beginner' ? '입문' : track.difficulty === 'intermediate' ? '중급' : '고급'}
                  </span>
                </div>
              </div>
              <p>{track.description}</p>
              <div className="project-skills">
                {track.skills.map(s => <span key={s}>{s}</span>)}
              </div>
              <div className="project-deliverables">
                <h4>산출물</h4>
                <ul>
                  {track.deliverables.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
