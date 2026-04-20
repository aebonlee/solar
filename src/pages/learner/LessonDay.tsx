import { useParams, Link } from 'react-router-dom';
import { LESSONS } from '../../data/lessons';
import type { ReactElement } from 'react';

export default function LessonDay(): ReactElement {
  const { day } = useParams<{ day: string }>();
  const dayNum = parseInt(day || '1', 10);
  const lesson = LESSONS.find(l => l.day === dayNum);

  if (!lesson) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <p>해당 차시를 찾을 수 없습니다.</p>
        <Link to="/learner/lessons" className="btn btn-primary" style={{ marginTop: '1rem' }}>목록으로</Link>
      </div>
    );
  }

  return (
    <div className="lesson-detail">
      <div className="lesson-detail-header">
        <Link to="/learner/lessons" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <i className="fas fa-arrow-left"></i> 차시별 학습 목록
        </Link>
        <h1 style={{ marginTop: '0.75rem' }}>Day {lesson.day}: {lesson.title}</h1>
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

      <div className="card" style={{ background: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent)' }}>
        <h4 style={{ color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>
          <i className="fas fa-flask"></i> {lesson.labTitle}
        </h4>
        <p style={{ color: 'var(--text-secondary)' }}>{lesson.labDescription}</p>
        <Link to="/learner/submissions" className="btn btn-accent" style={{ marginTop: '1rem' }}>
          <i className="fas fa-upload"></i> 과제 제출
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        {dayNum > 1 && (
          <Link to={`/learner/lessons/${dayNum - 1}`} className="btn btn-outline">
            <i className="fas fa-chevron-left"></i> Day {dayNum - 1}
          </Link>
        )}
        {dayNum < 7 && (
          <Link to={`/learner/lessons/${dayNum + 1}`} className="btn btn-primary" style={{ marginLeft: 'auto' }}>
            Day {dayNum + 1} <i className="fas fa-chevron-right"></i>
          </Link>
        )}
      </div>
    </div>
  );
}
