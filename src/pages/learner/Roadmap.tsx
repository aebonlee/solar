import { CURRICULUM } from '../../data/curriculum';
import useAOS from '../../hooks/useAOS';
import type { ReactElement } from 'react';

export default function Roadmap(): ReactElement {
  useAOS();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-route"></i> 과정 로드맵</h1>
          <p>7일간의 AI 서비스 개발 학습 여정</p>
        </div>
      </div>
      <div className="container roadmap-page">
        <div className="roadmap-timeline">
          {CURRICULUM.map((mod, idx) => (
            <div key={mod.id} className="roadmap-item" data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
              <div className="roadmap-dot" style={{ background: mod.color }}>
                <i className={`fas ${mod.icon}`}></i>
              </div>
              <div className="roadmap-content">
                <h3>Day {mod.day}: {mod.title}</h3>
                <p>{mod.description}</p>
                <div className="roadmap-topics">
                  {mod.topics.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className="roadmap-hours">
                  <i className="fas fa-clock"></i> {mod.hours}시간
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
