import { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../utils/auth';
import { useToast } from '../contexts/ToastContext';
import type { ReactElement } from 'react';

export default function ForgotPassword(): ReactElement {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { showToast('이메일을 입력하세요.', 'warning'); return; }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      showToast('비밀번호 재설정 이메일을 전송했습니다.', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '전송에 실패했습니다.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>비밀번호 재설정</h1>
        <p className="auth-subtitle">가입한 이메일로 재설정 링크를 보내드립니다</p>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <i className="fas fa-envelope-circle-check" style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '1rem' }}></i>
            <p>이메일을 확인해주세요!</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>이메일</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '전송 중...' : '재설정 이메일 전송'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p><Link to="/login">로그인으로 돌아가기</Link></p>
        </div>
      </div>
    </div>
  );
}
