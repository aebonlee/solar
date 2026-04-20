import { useAuth } from '../contexts/AuthContext';
import type { ReactElement } from 'react';

export default function MyPage(): ReactElement {
  const { user, profile } = useAuth();

  return (
    <div className="mypage">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="profile-info">
            <h2>{profile?.display_name || profile?.name || '사용자'}</h2>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-detail-item">
            <label>이메일</label>
            <p>{profile?.email || user?.email || '-'}</p>
          </div>
          <div className="profile-detail-item">
            <label>이름</label>
            <p>{profile?.name || '-'}</p>
          </div>
          <div className="profile-detail-item">
            <label>로그인 방식</label>
            <p>{profile?.provider || 'email'}</p>
          </div>
          <div className="profile-detail-item">
            <label>역할</label>
            <p>{profile?.role || 'member'}</p>
          </div>
          <div className="profile-detail-item">
            <label>가입 사이트</label>
            <p>{profile?.signup_domain || '-'}</p>
          </div>
          <div className="profile-detail-item">
            <label>마지막 로그인</label>
            <p>{profile?.last_sign_in_at ? new Date(profile.last_sign_in_at).toLocaleDateString('ko-KR') : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
