import { useState } from 'react';
import { NOTICES } from '../data/notices';
import type { ReactElement } from 'react';

export default function Notices(): ReactElement {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const sorted = [...NOTICES].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-bullhorn"></i> 공지사항</h1>
          <p>과정 안내 및 업데이트 소식</p>
        </div>
      </div>
      <div className="container notices-page">
        <div className="notices-list">
          {sorted.map(notice => (
            <div
              key={notice.id}
              className={`notice-item ${notice.pinned ? 'pinned' : ''}`}
              onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)}
            >
              <div className="notice-header">
                <span className={`notice-category ${notice.category}`}>
                  {notice.category === 'announcement' ? '공지' : notice.category === 'update' ? '업데이트' : '이벤트'}
                </span>
                {notice.pinned && <span className="notice-pin"><i className="fas fa-thumbtack"></i></span>}
                <span className="notice-date">{notice.date}</span>
              </div>
              <h3>{notice.title}</h3>
              {expandedId === notice.id ? (
                <p style={{ WebkitLineClamp: 'unset' }}>{notice.content}</p>
              ) : (
                <p>{notice.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
