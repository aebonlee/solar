import { CURRICULUM, TOTAL_HOURS } from '../../data/curriculum';
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
        {/* 요약 카드 */}
        <div className="roadmap-summary" data-aos="fade-up">
          <div className="roadmap-summary-item">
            <div className="roadmap-summary-icon"><i className="fas fa-calendar-alt"></i></div>
            <div className="roadmap-summary-value">7</div>
            <div className="roadmap-summary-label">학습 일수</div>
          </div>
          <div className="roadmap-summary-item">
            <div className="roadmap-summary-icon"><i className="fas fa-clock"></i></div>
            <div className="roadmap-summary-value">{TOTAL_HOURS}</div>
            <div className="roadmap-summary-label">총 학습 시간</div>
          </div>
          <div className="roadmap-summary-item">
            <div className="roadmap-summary-icon"><i className="fas fa-layer-group"></i></div>
            <div className="roadmap-summary-value">{CURRICULUM.reduce((s, m) => s + m.topics.length, 0)}</div>
            <div className="roadmap-summary-label">총 토픽 수</div>
          </div>
          <div className="roadmap-summary-item">
            <div className="roadmap-summary-icon"><i className="fas fa-trophy"></i></div>
            <div className="roadmap-summary-value">AI</div>
            <div className="roadmap-summary-label">서비스 개발 역량</div>
          </div>
        </div>

        {/* 타임라인 */}
        <div className="roadmap-timeline">
          {CURRICULUM.map((mod, idx) => (
            <div key={mod.id} className="roadmap-item" data-aos="fade-up" data-aos-delay={`${idx * 80}`}>
              <div className="roadmap-dot" style={{ background: mod.color }}>
                <i className={`fas ${mod.icon}`}></i>
              </div>
              <div className="roadmap-card">
                <div className="roadmap-card-header">
                  <span className="roadmap-day-badge" style={{ background: mod.color }}>Day {mod.day}</span>
                  <span className="roadmap-hours-badge">
                    <i className="fas fa-clock"></i> {mod.hours}시간
                  </span>
                </div>
                <h3 className="roadmap-card-title">{mod.title}</h3>
                <p className="roadmap-card-title-en">{mod.titleEn}</p>
                <p className="roadmap-card-desc">{mod.description}</p>
                <div className="roadmap-topics">
                  {mod.topics.map(t => (
                    <span key={t} className="roadmap-topic-tag" style={{ borderColor: mod.color, color: mod.color }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="roadmap-progress-bar">
                  <div className="roadmap-progress-fill" style={{ width: `${(mod.hours / 8) * 100}%`, background: mod.color }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
