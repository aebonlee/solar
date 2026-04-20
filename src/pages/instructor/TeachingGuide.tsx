import type { ReactElement } from 'react';

export default function TeachingGuide(): ReactElement {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1><i className="fas fa-book-open"></i> 강의 운영 가이드</h1>
          <p>Solar AI Learning Studio 교강사 운영 안내</p>
        </div>
      </div>
      <div className="container section">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {[
            {
              title: '교육 개요',
              icon: 'fa-info-circle',
              content: '• 교육 기간: 7일 (총 52시간)\n• 교육 방식: 이론 30% + 실습 70%\n• 정원: 20명 (소수정예)\n• 수료 조건: 출석 80% + 팀 프로젝트 제출'
            },
            {
              title: '일일 수업 구성',
              icon: 'fa-clock',
              content: '• 09:00-10:00 이론 강의 (1시간)\n• 10:00-12:00 실습 (2시간)\n• 12:00-13:00 점심\n• 13:00-14:30 이론/실습 (1.5시간)\n• 14:30-17:00 프로젝트 작업 (2.5시간)\n• 17:00-18:00 리뷰/Q&A (1시간)'
            },
            {
              title: '평가 방법',
              icon: 'fa-star',
              content: '• 출석/참여: 20%\n• 일일 실습 과제: 30%\n• 팀 프로젝트: 40%\n• 동료 평가: 10%'
            },
            {
              title: '교수 전략',
              icon: 'fa-lightbulb',
              content: '• 라이브 코딩으로 시연 후 따라하기\n• 짝 프로그래밍 활용\n• 매 세션 후 5분 리플렉션\n• Slack 채널로 실시간 질의응답\n• 매일 과제 피드백 (24시간 내)'
            },
          ].map((section, i) => (
            <div key={i} className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                <i className={`fas ${section.icon}`}></i> {section.title}
              </h3>
              <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', lineHeight: '1.8' }}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
