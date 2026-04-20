import type { ReactElement } from 'react';

const RUBRIC = [
  { category: '기술 구현', weight: 40, criteria: ['API 활용도', '코드 품질', '에러 처리', '성능 최적화'] },
  { category: '서비스 완성도', weight: 30, criteria: ['기능 완성도', 'UI/UX 품질', '문서화', '테스트'] },
  { category: '발표', weight: 20, criteria: ['구성력', '전달력', '시연 완성도', 'Q&A 대응'] },
  { category: '팀워크', weight: 10, criteria: ['역할 분담', '소통', '기여도', '협업 도구 활용'] },
];

export default function Evaluation(): ReactElement {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-clipboard-check"></i> 평가 관리</h1>
          <p>프로젝트 평가 루브릭 및 채점 기준</p>
        </div>
      </div>
      <div className="container section">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--primary)' }}>
            프로젝트 평가 루브릭 (100점 만점)
          </h2>

          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {RUBRIC.map(section => (
              <div key={section.category} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{section.category}</h3>
                  <span className="badge badge-accent">{section.weight}%</span>
                </div>
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>평가 항목</th>
                      <th>우수 (5)</th>
                      <th>양호 (3)</th>
                      <th>미흡 (1)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.criteria.map(c => (
                      <tr key={c}>
                        <td><strong>{c}</strong></td>
                        <td style={{ color: 'var(--success)' }}>기대 이상의 수준</td>
                        <td style={{ color: 'var(--warning)' }}>기본 요구사항 충족</td>
                        <td style={{ color: 'var(--error)' }}>개선 필요</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '2rem', background: 'var(--bg-secondary)' }}>
            <h3 style={{ marginBottom: '0.75rem', color: 'var(--primary)' }}>
              <i className="fas fa-info-circle"></i> 평가 안내
            </h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <li>교강사 평가 (80%) + 동료 평가 (20%)</li>
              <li>동료 평가는 무기명으로 진행됩니다</li>
              <li>최종 점수는 7일차 발표 후 3일 이내 공개됩니다</li>
              <li>상위 팀에게 Upstage API 크레딧이 지급됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
