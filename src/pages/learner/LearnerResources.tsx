import { useState } from 'react';
import { RESOURCES } from '../../data/resources';
import type { ReactElement } from 'react';

export default function LearnerResources(): ReactElement {
  const [dayFilter, setDayFilter] = useState<number | null>(null);

  const filtered = dayFilter ? RESOURCES.filter(r => r.day === dayFilter) : RESOURCES;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-book-open"></i> 학습 자료실</h1>
          <p>차시별 학습 자료를 다운로드하세요</p>
        </div>
      </div>
      <div className="container resources-page">
        <div className="resources-filter">
          <button className={`filter-btn ${dayFilter === null ? 'active' : ''}`} onClick={() => setDayFilter(null)}>전체</button>
          {[1, 2, 3, 4, 5, 6, 7].map(d => (
            <button key={d} className={`filter-btn ${dayFilter === d ? 'active' : ''}`} onClick={() => setDayFilter(d)}>
              Day {d}
            </button>
          ))}
        </div>
        <div className="resources-grid">
          {filtered.map(res => (
            <div key={res.id} className="resource-card">
              <div className={`resource-icon ${res.type}`}>
                <i className={`fas ${res.icon}`}></i>
              </div>
              <div className="resource-info">
                <h4>{res.title}</h4>
                <p>{res.description}</p>
                <span className="resource-category">{res.day ? `Day ${res.day}` : '공통'} | {res.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
