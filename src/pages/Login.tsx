import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle, signInWithKakao } from '../utils/auth';
import { useToast } from '../contexts/ToastContext';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { showToast('이메일과 비밀번호를 입력하세요.', 'warning'); return; }
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      showToast('로그인 성공!', 'success');
      navigate('/');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try { await signInWithGoogle(); } catch { showToast('Google 로그인 실패', 'error'); }
  };

  const handleKakao = async () => {
    try { await signInWithKakao(); } catch { showToast('Kakao 로그인 실패', 'error'); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>로그인</h1>
        <p className="auth-subtitle">Solar AI Learning Studio에 오신 것을 환영합니다</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이메일</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호 입력" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="auth-divider">또는</div>

        <div className="oauth-buttons">
          <button className="oauth-btn google" onClick={handleGoogle}>
            <i className="fab fa-google"></i> Google로 로그인
          </button>
          <button className="oauth-btn kakao" onClick={handleKakao}>
            <i className="fas fa-comment"></i> Kakao로 로그인
          </button>
        </div>

        <div className="auth-footer">
          <p>계정이 없으신가요? <Link to="/register">회원가입</Link></p>
          <p><Link to="/forgot-password">비밀번호를 잊으셨나요?</Link></p>
        </div>
      </div>
    </div>
  );
}
