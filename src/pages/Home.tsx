import { Link } from 'react-router-dom';
import { CURRICULUM, TOTAL_HOURS } from '../data/curriculum';
import { PROJECT_TRACKS } from '../data/projects';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

export default function Home(): ReactElement {
  useAOS();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${12 + Math.random() * 8}s`,
              }}
            />
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-solar-panel"></i>
            Powered by Upstage Solar LLM
          </div>
          <h1 className="hero-title">
            Solar AI <span>Learning Studio</span>
          </h1>
          <p className="hero-subtitle">
            국산 대규모 언어모델 Solar를 활용한 AI 서비스 개발 실무 교육<br/>
            프롬프트 엔지니어링부터 RAG, 챗봇, AI 에이전트까지
          </p>
          <div className="hero-cta">
            <Link to="/course-intro" className="btn btn-accent">
              <i className="fas fa-play"></i> 과정 소개 보기
            </Link>
            <Link to="/login" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>
              <i className="fas fa-user-plus"></i> 수강 신청
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">7일</div>
              <div className="hero-stat-label">교육 기간</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">{TOTAL_HOURS}시간</div>
              <div className="hero-stat-label">총 교육 시간</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">4개</div>
              <div className="hero-stat-label">프로젝트 트랙</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">100%</div>
              <div className="hero-stat-label">실무 중심</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="section-title">왜 Solar AI Studio인가?</h2>
          <p className="section-subtitle">국산 LLM 기반 AI 서비스 개발의 모든 것을 배웁니다</p>
        </div>
        <div className="features-grid">
          {[
            { icon: 'fa-brain', color: '#3B82F6', title: '국산 LLM Solar', desc: 'Upstage의 Solar 10.7B를 활용한 한국어 특화 AI 서비스 개발' },
            { icon: 'fa-code', color: '#10B981', title: '실무 중심 커리큘럼', desc: '이론 30% + 실습 70%로 현장에서 바로 활용 가능한 역량 확보' },
            { icon: 'fa-project-diagram', color: '#8B5CF6', title: '팀 프로젝트', desc: '4개 트랙 중 선택하여 실제 AI 서비스를 처음부터 끝까지 개발' },
            { icon: 'fa-database', color: '#F59E0B', title: 'RAG 시스템 구축', desc: '벡터 DB와 Solar를 결합한 검색 증강 생성 파이프라인 구축' },
            { icon: 'fa-robot', color: '#EF4444', title: 'AI 에이전트', desc: 'Function Calling을 활용한 자율 AI 에이전트 시스템 개발' },
            { icon: 'fa-cloud-arrow-up', color: '#0891B2', title: '배포와 운영', desc: 'Docker 컨테이너화부터 클라우드 배포, 모니터링까지' },
          ].map((feat, idx) => (
            <div key={idx} className="feature-card" data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
              <div className="feature-icon" style={{ background: feat.color }}>
                <i className={`fas ${feat.icon}`}></i>
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum Timeline */}
      <section className="home-curriculum">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>커리큘럼 타임라인</h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>7일간의 체계적인 AI 서비스 개발 여정</p>
          <div className="curriculum-timeline">
            {CURRICULUM.map((mod, idx) => (
              <div key={mod.id} className="timeline-item" data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
                <div className="timeline-dot" style={{ background: mod.color }}></div>
                <h4><i className={`fas ${mod.icon}`} style={{ color: mod.color, marginRight: '0.5rem' }}></i>Day {mod.day}: {mod.title}</h4>
                <p>{mod.description}</p>
                <div className="timeline-meta">
                  <span><i className="fas fa-clock"></i> {mod.hours}시간</span>
                  <span><i className="fas fa-list"></i> {mod.topics.length}개 주제</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Tracks */}
      <section className="home-projects">
        <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="section-title">프로젝트 트랙</h2>
          <p className="section-subtitle">4개 트랙 중 선택하여 실제 AI 서비스를 개발합니다</p>
        </div>
        <div className="project-tracks-grid">
          {PROJECT_TRACKS.map((track, idx) => (
            <div key={track.id} className="project-track-card" data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
              <div className="project-track-icon" style={{ background: track.color }}>
                <i className={`fas ${track.icon}`}></i>
              </div>
              <div className="project-track-info">
                <h4>{track.title}</h4>
                <p>{track.description.substring(0, 80)}...</p>
                <div className="project-track-skills">
                  {track.skills.slice(0, 4).map(s => <span key={s}>{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats">
        <div className="stats-grid">
          <div className="stat-item" data-aos="zoom-in">
            <h3>{TOTAL_HOURS}h</h3>
            <p>총 교육 시간</p>
          </div>
          <div className="stat-item" data-aos="zoom-in" data-aos-delay="100">
            <h3>7일</h3>
            <p>집중 교육</p>
          </div>
          <div className="stat-item" data-aos="zoom-in" data-aos-delay="200">
            <h3>4개</h3>
            <p>프로젝트 트랙</p>
          </div>
          <div className="stat-item" data-aos="zoom-in" data-aos-delay="300">
            <h3>70%</h3>
            <p>실습 비율</p>
          </div>
        </div>
      </section>
    </>
  );
}
