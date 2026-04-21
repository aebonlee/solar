import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

interface BoardPost {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  comments: number;
}

const mockPosts: BoardPost[] = [
  { id: 5, title: 'Solar API 호출 시 토큰 제한 관련 질문', author: '김하늘', date: '2026-04-20', views: 42, comments: 3 },
  { id: 4, title: 'RAG 구현 시 청크 사이즈 최적화 팁 공유합니다', author: '이준호', date: '2026-04-19', views: 87, comments: 7 },
  { id: 3, title: '프로젝트 팀원 모집 - Track 2 AI 챗봇', author: '박서연', date: '2026-04-18', views: 56, comments: 5 },
  { id: 2, title: 'Embedding 모델 성능 비교 결과 공유', author: '최민수', date: '2026-04-17', views: 103, comments: 12 },
  { id: 1, title: '첫 번째 수업 후기 - Solar LLM 첫인상', author: '정다은', date: '2026-04-16', views: 134, comments: 15 },
];

export default function FreeBoard(): ReactElement {
  const { isLoggedIn } = useAuth();
  const [posts] = useState<BoardPost[]>(mockPosts);
  useAOS();

  return (
    <div className="container">
      <section className="section" data-aos="fade-up">
        <div className="section-header">
          <h1><i className="fas fa-comments"></i> 자유게시판</h1>
          <p>학습 경험을 공유하고 자유롭게 소통하는 공간입니다.</p>
        </div>

        {isLoggedIn && (
          <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
            <button className="btn btn-primary">
              <i className="fas fa-pen"></i> 글쓰기
            </button>
          </div>
        )}

        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>번호</th>
                <th>제목</th>
                <th style={{ width: '100px' }}>작성자</th>
                <th style={{ width: '110px' }}>작성일</th>
                <th style={{ width: '60px' }}>조회</th>
                <th style={{ width: '60px' }}>댓글</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} style={{ cursor: 'pointer' }}>
                  <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{post.id}</td>
                  <td><strong>{post.title}</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>{post.author}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{post.date}</td>
                  <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{post.views}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="badge badge-primary">{post.comments}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoggedIn && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
            <i className="fas fa-lock"></i> 글쓰기는 로그인 후 이용 가능합니다.
          </p>
        )}
      </section>
    </div>
  );
}
