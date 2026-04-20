import { useState } from 'react';
import { LESSONS } from '../../data/lessons';
import type { ReactElement } from 'react';

export default function LessonPlans(): ReactElement {
  const [activeDay, setActiveDay] = useState(1);
  const lesson = LESSONS.find(l => l.day === activeDay);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-clipboard-list"></i> 차시별 강의안</h1>
          <p>7일간의 상세 강의 계획</p>
        </div>
      </div>
      <div className="container section">
        <div className="tabs">
          {LESSONS.map(l => (
            <button
              key={l.day}
              className={`tab-btn ${activeDay === l.day ? 'active' : ''}`}
              onClick={() => setActiveDay(l.day)}
            >
              Day {l.day}
            </button>
          ))}
        </div>

        {lesson && (
          <div className="lesson-detail">
            <div className="lesson-detail-header">
              <h1>Day {lesson.day}: {lesson.title}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>{lesson.description}</p>
            </div>

            <div className="lesson-objectives">
              <h3><i className="fas fa-bullseye"></i> 학습 목표</h3>
              <ul>
                {lesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
              </ul>
            </div>

            {lesson.content.map(block => (
              <div key={block.id} className="lesson-content-block">
                <h4>
                  <span className={`content-type-badge ${block.type}`}>{block.type}</span>
                  {block.title}
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{block.duration}</span>
                </h4>
                <p>{block.body}</p>
              </div>
            ))}

            <div className="card" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}>
              <h4 style={{ color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>
                <i className="fas fa-flask"></i> {lesson.labTitle}
              </h4>
              <p style={{ color: 'var(--text-secondary)' }}>{lesson.labDescription}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
