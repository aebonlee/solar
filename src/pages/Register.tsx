import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../utils/auth';
import { useToast } from '../contexts/ToastContext';
import type { ReactElement } from 'react';

export default function Register(): ReactElement {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { showToast('모든 필드를 입력하세요.', 'warning'); return; }
    if (password !== confirmPassword) { showToast('비밀번호가 일치하지 않습니다.', 'warning'); return; }
    if (password.length < 6) { showToast('비밀번호는 6자 이상이어야 합니다.', 'warning'); return; }

    setLoading(true);
    try {
      await signUp(email, password, name);
      showToast('회원가입 성공! 이메일 확인 후 로그인하세요.', 'success');
      navigate('/login');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>회원가입</h1>
        <p className="auth-subtitle">Solar AI Learning Studio에 참여하세요</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이름</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="홍길동" />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="6자 이상" />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="비밀번호 재입력" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="auth-footer">
          <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
        </div>
      </div>
    </div>
  );
}
