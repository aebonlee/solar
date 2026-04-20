import { Link } from 'react-router-dom';
import { LESSONS } from '../../data/lessons';
import { CURRICULUM } from '../../data/curriculum';
import useAOS from '../../hooks/useAOS';
import type { ReactElement } from 'react';

export default function DailyLessons(): ReactElement {
  useAOS();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-calendar-days"></i> 차시별 학습</h1>
          <p>7일간의 학습 콘텐츠에 접근하세요</p>
        </div>
      </div>
      <div className="container section">
        <div className="lessons-grid">
          {LESSONS.map((lesson, idx) => {
            const mod = CURRICULUM.find(m => m.day === lesson.day);
            return (
              <div key={lesson.day} className="lesson-card" data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
                <span className="lesson-day-badge">
                  <i className={`fas ${mod?.icon || 'fa-book'}`} style={{ color: mod?.color }}></i>
                  Day {lesson.day}
                </span>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                <div className="lesson-topics">
                  {lesson.objectives.slice(0, 2).map((obj, i) => (
                    <span key={i}>{obj.substring(0, 20)}...</span>
                  ))}
                </div>
                <div className="lesson-card-footer">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {lesson.content.length}개 세션 | {mod?.hours}시간
                  </span>
                  <Link to={`/learner/lessons/${lesson.day}`} className="btn btn-primary">
                    학습하기
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
