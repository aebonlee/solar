import { CURRICULUM, TOTAL_HOURS } from '../data/curriculum';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

export default function CourseIntro(): ReactElement {
  useAOS();

  return (
    <div className="course-intro">
      <div className="container">
        <div className="course-overview">
          {/* Hero Card */}
          <div className="course-hero-section" data-aos="fade-up">
            <h1>국산 LLM Solar 기반 AI 서비스 개발 교육</h1>
            <p>
              Upstage의 Solar LLM을 활용하여 프롬프트 엔지니어링, RAG 시스템, AI 챗봇,
              AI 에이전트까지 AI 서비스 개발의 전 과정을 실무 중심으로 학습합니다.
            </p>
            <div className="course-info-grid">
              <div className="course-info-item">
                <i className="fas fa-calendar-days"></i>
                <h4>교육 기간</h4>
                <p>7일 (52시간)</p>
              </div>
              <div className="course-info-item">
                <i className="fas fa-users"></i>
                <h4>정원</h4>
                <p>20명 (소수정예)</p>
              </div>
              <div className="course-info-item">
                <i className="fas fa-laptop-code"></i>
                <h4>실습 비율</h4>
                <p>70% 이상</p>
              </div>
            </div>
          </div>

          {/* Objectives */}
          <div className="course-objectives" data-aos="fade-up">
            <h2>교육 목표</h2>
            <div className="objectives-list">
              {[
                'Solar LLM의 특성을 이해하고 API를 활용할 수 있다',
                '효과적인 프롬프트를 설계하고 최적화할 수 있다',
                'RAG 시스템을 설계하고 구축할 수 있다',
                'AI 챗봇 서비스를 풀스택으로 개발할 수 있다',
                'Function Calling을 활용한 AI 에이전트를 구현할 수 있다',
                'AI 서비스를 배포하고 운영할 수 있다',
              ].map((obj, i) => (
                <div key={i} className="objective-item">
                  <i className="fas fa-check-circle"></i>
                  <p>{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target */}
          <div className="course-target" data-aos="fade-up">
            <h2>교육 대상</h2>
            <ul className="target-list">
              <li>AI 서비스 개발에 관심 있는 개발자</li>
              <li>LLM 기반 프로젝트를 시작하려는 팀 리더</li>
              <li>국산 LLM 활용 방안을 모색하는 기획자</li>
              <li>프롬프트 엔지니어링을 체계적으로 배우려는 분</li>
              <li>RAG/챗봇/에이전트 개발 경험을 쌓으려는 분</li>
            </ul>
          </div>

          {/* Curriculum */}
          <div data-aos="fade-up">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.5rem' }}>
              커리큘럼 (총 {TOTAL_HOURS}시간)
            </h2>
            <div className="curriculum-timeline">
              {CURRICULUM.map((mod) => (
                <div key={mod.id} className="timeline-item">
                  <div className="timeline-dot" style={{ background: mod.color }}></div>
                  <h4>
                    <i className={`fas ${mod.icon}`} style={{ color: mod.color, marginRight: '0.5rem' }}></i>
                    Day {mod.day}: {mod.title}
                  </h4>
                  <p>{mod.description}</p>
                  <div className="timeline-meta">
                    <span><i className="fas fa-clock"></i> {mod.hours}시간</span>
                  </div>
                  <div className="lesson-topics" style={{ marginTop: '0.5rem' }}>
                    {mod.topics.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
