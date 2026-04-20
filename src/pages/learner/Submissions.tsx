import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import type { ReactElement } from 'react';

export default function Submissions(): ReactElement {
  const { showToast } = useToast();
  const [selectedDay, setSelectedDay] = useState(1);
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) { showToast('과제 내용을 입력하세요.', 'warning'); return; }
    showToast(`Day ${selectedDay} 과제가 제출되었습니다!`, 'success');
    setContent('');
  };

  const submissions = [
    { day: 1, title: 'Solar API 첫 호출', status: 'graded', score: 90 },
    { day: 2, title: '프롬프트 엔지니어링 워크숍', status: 'graded', score: 85 },
    { day: 3, title: '사내 문서 Q&A 시스템', status: 'completed', score: undefined },
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-upload"></i> 과제 제출</h1>
          <p>실습 과제를 제출하고 피드백을 확인하세요</p>
        </div>
      </div>
      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Submission form */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
              <i className="fas fa-paper-plane"></i> 새 과제 제출
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label>차시 선택</label>
                <select
                  value={selectedDay}
                  onChange={e => setSelectedDay(Number(e.target.value))}
                  style={{ padding: '0.75rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.95rem' }}
                >
                  {[1,2,3,4,5,6,7].map(d => <option key={d} value={d}>Day {d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>과제 내용</label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="실습 결과를 요약하여 작성하세요..."
                  rows={6}
                  style={{ padding: '0.75rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '0.95rem', resize: 'vertical' }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-upload"></i> 제출하기
              </button>
            </form>
          </div>

          {/* Submission history */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
              <i className="fas fa-history"></i> 제출 내역
            </h3>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>차시</th>
                  <th>과제명</th>
                  <th>상태</th>
                  <th>점수</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(s => (
                  <tr key={s.day}>
                    <td>Day {s.day}</td>
                    <td>{s.title}</td>
                    <td><span className={`status-badge ${s.status}`}>{s.status === 'graded' ? '채점완료' : '제출완료'}</span></td>
                    <td>{s.score ? `${s.score}점` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
