import { useLanguage } from '../contexts/LanguageContext';
import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

export default function About(): ReactElement {
  const { t } = useLanguage();
  useAOS();

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="section" data-aos="fade-up">
        <div className="section-header">
          <h1><i className="fas fa-solar-panel"></i> Solar AI Learning Studio</h1>
          <p>{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Upstage Solar LLM 소개 */}
      <section id="features" className="section" data-aos="fade-up">
        <h2><i className="fas fa-sun"></i> 업스테이지 Solar LLM</h2>
        <div className="card" style={{ padding: '2rem' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            <strong>Solar</strong>는 업스테이지(Upstage)가 개발한 국산 대규모 언어모델(LLM)입니다.
            한국어와 영어에 최적화된 성능을 제공하며, 기업용 AI 솔루션의 핵심 엔진으로 활용됩니다.
          </p>
          <div className="grid grid-3" style={{ gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <i className="fas fa-brain" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.8rem', display: 'block' }}></i>
              <h4>Solar Mini / Pro</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                경량 모델부터 고성능 모델까지 용도에 맞는 선택 가능
              </p>
            </div>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <i className="fas fa-language" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.8rem', display: 'block' }}></i>
              <h4>한국어 최적화</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                한국어 이해·생성 능력에서 글로벌 LLM 대비 우수한 성능
              </p>
            </div>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <i className="fas fa-server" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '0.8rem', display: 'block' }}></i>
              <h4>API 제공</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                REST API를 통한 손쉬운 통합 및 서비스 개발
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solar 주요 기능 */}
      <section className="section" data-aos="fade-up">
        <h2><i className="fas fa-rocket"></i> Solar 주요 기능</h2>
        <div className="grid grid-2" style={{ gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4><i className="fas fa-comments" style={{ color: 'var(--accent)' }}></i> Chat / Completion</h4>
            <p style={{ color: 'var(--text-muted)' }}>자연어 대화 및 텍스트 생성, 요약, 번역 등 다양한 NLP 태스크 수행</p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4><i className="fas fa-vector-square" style={{ color: 'var(--accent)' }}></i> Embedding</h4>
            <p style={{ color: 'var(--text-muted)' }}>텍스트를 벡터로 변환하여 의미 기반 검색(RAG) 및 유사도 분석에 활용</p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4><i className="fas fa-file-lines" style={{ color: 'var(--accent)' }}></i> Document AI</h4>
            <p style={{ color: 'var(--text-muted)' }}>OCR + LLM 결합으로 문서 내용 인식, 추출, 분류 자동화</p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4><i className="fas fa-wand-magic-sparkles" style={{ color: 'var(--accent)' }}></i> Fine-tuning</h4>
            <p style={{ color: 'var(--text-muted)' }}>도메인 특화 데이터로 모델 미세 조정하여 맞춤형 AI 구축</p>
          </div>
        </div>
      </section>

      {/* 본 교육 과정 소개 */}
      <section id="course" className="section" data-aos="fade-up">
        <h2><i className="fas fa-graduation-cap"></i> 본 교육 과정</h2>
        <div className="card" style={{ padding: '2rem' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            본 과정은 업스테이지 Solar LLM을 활용하여 <strong>실무형 AI 서비스를 직접 개발</strong>하는
            7일(52시간) 집중 교육 프로그램입니다.
          </p>
          <div className="grid grid-4" style={{ gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>7일</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>교육 기간</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>52시간</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>총 교육 시간</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>4트랙</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>프로젝트</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>70%</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>실습 비율</div>
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 트랙 소개 */}
      <section className="section" data-aos="fade-up">
        <h2><i className="fas fa-diagram-project"></i> 프로젝트 트랙</h2>
        <div className="grid grid-2" style={{ gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #3B82F6' }}>
            <h4>Track 1: 스마트 Q&A 시스템</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Solar Embedding + RAG 기반 문서 질의응답 시스템 구축</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #10B981' }}>
            <h4>Track 2: AI 챗봇 서비스</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Solar Chat API 활용 도메인 특화 대화형 챗봇 개발</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #F59E0B' }}>
            <h4>Track 3: 콘텐츠 생성 에이전트</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Solar LLM 기반 자동 콘텐츠 생성·편집 AI 에이전트</p>
          </div>
          <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #8B5CF6' }}>
            <h4>Track 4: 데이터 분석기</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Solar + 데이터 파이프라인 연동 인사이트 추출 도구</p>
          </div>
        </div>
      </section>

      {/* 강사 정보 */}
      <section id="instructor" className="section" data-aos="fade-up">
        <h2><i className="fas fa-chalkboard-user"></i> 강사 소개</h2>
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>이애본 박사 (Ph.D)</h3>
          <ul style={{ lineHeight: '2', color: 'var(--text-muted)' }}>
            <li>한신대학교 AI·SW대학 겸임교수</li>
            <li>드림아이티비즈(DreamIT Biz) 대표</li>
            <li>AI·데이터 분야 전문 강사</li>
            <li>경기대학교 박사 (AI/교육공학)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
