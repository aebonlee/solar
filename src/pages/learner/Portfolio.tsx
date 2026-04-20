import { useAuth } from '../../contexts/AuthContext';
import { CURRICULUM } from '../../data/curriculum';
import type { ReactElement } from 'react';

export default function Portfolio(): ReactElement {
  const { profile } = useAuth();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-briefcase"></i> 나의 포트폴리오</h1>
          <p>학습 여정과 프로젝트 결과를 정리하세요</p>
        </div>
      </div>
      <div className="container section">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Profile summary */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div className="profile-avatar" style={{ width: '56px', height: '56px', fontSize: '1.3rem' }}>
                {profile?.name?.[0] || 'U'}
              </div>
              <div>
                <h3>{profile?.display_name || profile?.name || '학습자'}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Solar AI Learning Studio 수료 과정</p>
              </div>
            </div>
          </div>

          {/* Learning progress */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
              <i className="fas fa-chart-line"></i> 학습 진행 현황
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {CURRICULUM.map(mod => (
                <div key={mod.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem' }}>
                    <i className={`fas ${mod.icon}`}></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Day {mod.day}: {mod.title}</div>
                    <div className="progress-bar-container" style={{ height: '6px', marginTop: '0.3rem' }}>
                      <div className="progress-bar-fill" style={{ width: mod.day <= 3 ? '100%' : mod.day === 4 ? '40%' : '0%' }}></div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {mod.day <= 3 ? '완료' : mod.day === 4 ? '진행중' : '미시작'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
              <i className="fas fa-tools"></i> 습득 기술
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Solar API', 'Prompt Engineering', 'RAG', 'Vector DB', 'Python', 'React', 'Streaming'].map(skill => (
                <span key={skill} className="badge badge-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Project */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
              <i className="fas fa-folder-open"></i> 프로젝트
            </h3>
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' }}>
              <i className="fas fa-plus-circle" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}></i>
              <p>프로젝트가 완료되면 여기에 표시됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
