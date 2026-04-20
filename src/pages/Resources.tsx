import { useState } from 'react';
import { RESOURCES } from '../data/resources';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

const CATEGORIES = ['전체', '가이드', '코드', '템플릿', '참고자료', '영상'];

export default function Resources(): ReactElement {
  useAOS();
  const [filter, setFilter] = useState('전체');

  const filtered = filter === '전체' ? RESOURCES : RESOURCES.filter(r => r.category === filter);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-folder-open"></i> 자료실</h1>
          <p>학습에 필요한 가이드, 코드, 참고자료를 다운로드하세요</p>
        </div>
      </div>
      <div className="container resources-page">
        <div className="resources-filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="resources-grid">
          {filtered.map((res, idx) => (
            <div key={res.id} className="resource-card" data-aos="fade-up" data-aos-delay={`${idx * 50}`}>
              <div className={`resource-icon ${res.type}`}>
                <i className={`fas ${res.icon}`}></i>
              </div>
              <div className="resource-info">
                <h4>{res.title}</h4>
                <p>{res.description}</p>
                <span className="resource-category">
                  {res.day ? `Day ${res.day}` : ''} {res.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
