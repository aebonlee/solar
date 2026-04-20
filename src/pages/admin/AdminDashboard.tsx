import { useState, useEffect } from 'react';
import getSupabase from '../../utils/supabase';
import type { UserProfile } from '../../types';
import type { ReactElement } from 'react';

export default function AdminDashboard(): ReactElement {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const client = getSupabase();
      if (!client) { setLoading(false); return; }
      const { data } = await client
        .from('user_profiles')
        .select('*')
        .order('last_sign_in_at', { ascending: false })
        .limit(50);
      if (data) setUsers(data as UserProfile[]);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <h1><i className="fas fa-shield-halved"></i> 관리자 대시보드</h1>
        <p>회원 관리 및 시스템 현황</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#3B82F6' }}>
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-card-info">
            <h3>{users.length}</h3>
            <p>전체 회원</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#10B981' }}>
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-card-info">
            <h3>{users.filter(u => u.role === 'superadmin').length}</h3>
            <p>관리자</p>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <h3>회원 목록</h3>
        {loading ? (
          <div className="loading-page"><div className="loading-spinner" /></div>
        ) : users.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', padding: '2rem', textAlign: 'center' }}>
            등록된 회원이 없습니다. (Supabase 연결 필요)
          </p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>이름</th>
                <th>이메일</th>
                <th>역할</th>
                <th>로그인 방식</th>
                <th>마지막 접속</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td><strong>{user.display_name || user.name || '-'}</strong></td>
                  <td>{user.email}</td>
                  <td><span className={`badge ${user.role === 'superadmin' ? 'badge-accent' : 'badge-primary'}`}>{user.role}</span></td>
                  <td>{user.provider}</td>
                  <td>{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('ko-KR') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
