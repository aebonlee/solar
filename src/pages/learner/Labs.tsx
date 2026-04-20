import { LESSONS } from '../../data/lessons';
import { CURRICULUM } from '../../data/curriculum';
import useAOS from '../../hooks/useAOS';
import type { ReactElement } from 'react';

export default function Labs(): ReactElement {
  useAOS();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-flask"></i> 실습실</h1>
          <p>각 차시별 실습 과제를 수행하세요</p>
        </div>
      </div>
      <div className="container section">
        <div className="labs-grid">
          {LESSONS.map((lesson, idx) => {
            const mod = CURRICULUM.find(m => m.day === lesson.day);
            return (
              <div key={lesson.day} className="lab-card" data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
                <div className="lab-card-header">
                  <div className="lab-card-icon" style={{ background: mod?.color || '#3B82F6' }}>
                    <i className={`fas ${mod?.icon || 'fa-flask'}`}></i>
                  </div>
                  <h3>{lesson.labTitle}</h3>
                </div>
                <p>{lesson.labDescription}</p>
                <div className="lab-card-footer">
                  <span className="lab-day-tag">Day {lesson.day}</span>
                  <button className="btn btn-primary">시작하기</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
