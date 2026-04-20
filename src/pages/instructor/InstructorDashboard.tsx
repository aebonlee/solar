import { CURRICULUM } from '../../data/curriculum';
import { PROJECT_TRACKS } from '../../data/projects';
import type { ReactElement } from 'react';

export default function InstructorDashboard(): ReactElement {
  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <h1><i className="fas fa-chalkboard-teacher"></i> 교강사 대시보드</h1>
        <p>강의 운영 현황을 한눈에 확인하세요</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#3B82F6' }}>
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-card-info">
            <h3>18</h3>
            <p>수강생</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#10B981' }}>
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-card-info">
            <h3>{CURRICULUM.length}</h3>
            <p>차시 구성</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#F59E0B' }}>
            <i className="fas fa-project-diagram"></i>
          </div>
          <div className="stat-card-info">
            <h3>{PROJECT_TRACKS.length}</h3>
            <p>프로젝트 트랙</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#8B5CF6' }}>
            <i className="fas fa-tasks"></i>
          </div>
          <div className="stat-card-info">
            <h3>85%</h3>
            <p>평균 출석률</p>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <h3>프로젝트 진행 현황</h3>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>팀명</th>
              <th>프로젝트 트랙</th>
              <th>진행 상태</th>
              <th>진도율</th>
            </tr>
          </thead>
          <tbody>
            {[
              { team: 'Team Alpha', track: 'Smart Q&A 시스템', status: 'in-progress', progress: '70%' },
              { team: 'Team Beta', track: 'AI 상담 챗봇', status: 'in-progress', progress: '60%' },
              { team: 'Team Gamma', track: '콘텐츠 생성 에이전트', status: 'in-progress', progress: '45%' },
              { team: 'Team Delta', track: '데이터 분석 어시스턴트', status: 'pending', progress: '30%' },
            ].map(row => (
              <tr key={row.team}>
                <td><strong>{row.team}</strong></td>
                <td>{row.track}</td>
                <td><span className={`status-badge ${row.status}`}>{row.status === 'in-progress' ? '진행중' : '준비중'}</span></td>
                <td>{row.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
