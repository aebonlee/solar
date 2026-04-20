import { Link } from 'react-router-dom';
import type { ReactElement } from 'react';

export default function NotFound(): ReactElement {
  return (
    <div className="auth-page" style={{ textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: '5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>404</div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text)' }}>페이지를 찾을 수 없습니다</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <Link to="/" className="btn btn-primary">
          <i className="fas fa-home"></i> 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
