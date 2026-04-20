import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CURRICULUM } from '../../data/curriculum';
import type { ReactElement } from 'react';

export default function LearnerDashboard(): ReactElement {
  const { profile } = useAuth();

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <h1><i className="fas fa-graduation-cap"></i> 학습 대시보드</h1>
        <p>{profile?.display_name || '학습자'}님, 오늘도 화이팅!</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#3B82F6' }}>
            <i className="fas fa-book"></i>
          </div>
          <div className="stat-card-info">
            <h3>3/7</h3>
            <p>완료 차시</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#10B981' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-card-info">
            <h3>5</h3>
            <p>제출 과제</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#F59E0B' }}>
            <i className="fas fa-star"></i>
          </div>
          <div className="stat-card-info">
            <h3>88</h3>
            <p>평균 점수</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#8B5CF6' }}>
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-card-info">
            <h3>24h</h3>
            <p>학습 시간</p>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <h3>전체 진도율</h3>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: '43%' }}></div>
        </div>
        <div className="progress-info">
          <span>Day 1~3 완료</span>
          <span>43%</span>
        </div>
      </div>

      <div className="progress-section">
        <h3>다음 학습</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius)', background: CURRICULUM[3].color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem' }}>
            <i className={`fas ${CURRICULUM[3].icon}`}></i>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Day {CURRICULUM[3].day}: {CURRICULUM[3].title}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{CURRICULUM[3].description}</p>
          </div>
          <Link to={`/learner/lessons/${CURRICULUM[3].day}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            학습하기
          </Link>
        </div>
      </div>
    </div>
  );
}
