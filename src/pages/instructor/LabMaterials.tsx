import { RESOURCES } from '../../data/resources';
import type { ReactElement } from 'react';

export default function LabMaterials(): ReactElement {
  const labResources = RESOURCES.filter(r => r.type === 'code' || r.category === '템플릿');

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-flask"></i> 실습자료 관리</h1>
          <p>실습에 필요한 코드, 템플릿, 데이터를 관리합니다</p>
        </div>
      </div>
      <div className="container section">
        <div className="labs-grid">
          {labResources.map(res => (
            <div key={res.id} className="lab-card">
              <div className="lab-card-header">
                <div className="lab-card-icon" style={{ background: res.type === 'code' ? '#10B981' : '#8B5CF6' }}>
                  <i className={`fas ${res.icon}`}></i>
                </div>
                <h3>{res.title}</h3>
              </div>
              <p>{res.description}</p>
              <div className="lab-card-footer">
                <span className="lab-day-tag">{res.day ? `Day ${res.day}` : '공통'}</span>
                <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  <i className="fas fa-download"></i> 다운로드
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
