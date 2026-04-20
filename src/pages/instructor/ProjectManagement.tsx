import { PROJECT_TRACKS } from '../../data/projects';
import type { ReactElement } from 'react';

export default function ProjectManagement(): ReactElement {
  const teams = [
    { name: 'Team Alpha', track: 'smart-qa', members: ['김철수', '이영희', '박민수', '정수진'], progress: 70 },
    { name: 'Team Beta', track: 'ai-chatbot', members: ['홍길동', '강민준', '윤서연', '장도현'], progress: 60 },
    { name: 'Team Gamma', track: 'content-agent', members: ['최예은', '한지훈', '오하늘', '임재현'], progress: 45 },
    { name: 'Team Delta', track: 'data-analyzer', members: ['신동우', '백서진', '권다솜', '조민기'], progress: 30 },
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-project-diagram"></i> 프로젝트 운영</h1>
          <p>팀별 프로젝트 진행 현황과 관리</p>
        </div>
      </div>
      <div className="container section">
        <div className="projects-grid">
          {teams.map(team => {
            const track = PROJECT_TRACKS.find(t => t.id === team.track);
            return (
              <div key={team.name} className="project-card">
                <div className="project-card-header">
                  <div className="project-card-icon" style={{ background: track?.color || '#3B82F6' }}>
                    <i className={`fas ${track?.icon || 'fa-folder'}`}></i>
                  </div>
                  <div>
                    <h3>{team.name}</h3>
                    <span className="badge badge-primary">{track?.title}</span>
                  </div>
                </div>
                <p>팀원: {team.members.join(', ')}</p>
                <div className="progress-section" style={{ border: 'none', padding: 0, marginBottom: 0 }}>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${team.progress}%` }}></div>
                  </div>
                  <div className="progress-info">
                    <span>진행률</span>
                    <span>{team.progress}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
