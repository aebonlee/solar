import useAOS from '../hooks/useAOS';
import type { ReactElement } from 'react';

interface ProjectInfo {
  id: number;
  title: string;
  overview: string;
  targetUsers: string;
  features: string;
  solarUsage: string;
  expansion: string;
  color: string;
  icon: string;
}

const projects: ProjectInfo[] = [
  {
    id: 1,
    title: '한국형 AI 동화책 제작 앱',
    overview: '한국적 소재와 아이의 나이, 주제를 입력하면 맞춤형 동화책을 생성하는 앱',
    targetUsers: '유아·초등학생, 학부모, 교사, 도서관 교육 담당자',
    features: '동화 생성, 장면 구성, 삽화 프롬프트, 독후활동 질문 생성',
    solarUsage: '한국적 소재 기반 이야기 생성, 연령별 문장 조정, 교훈 정리',
    expansion: 'K-콘텐츠, 아동교육, 다문화 한국문화 교육으로 확장 가능',
    color: '#EC4899',
    icon: 'fa-book-open-reader',
  },
  {
    id: 2,
    title: '문화재 AI 해설 앱',
    overview: '한국 문화재와 국가유산을 학습자 수준에 맞게 쉽게 설명하고 퀴즈를 제공하는 앱',
    targetUsers: '초중고생, 가족 관람객, 외국인 학습자, 문화해설 교육생',
    features: '문화재 쉬운 설명, 핵심 키워드, 관찰 포인트, 퀴즈, 탐방 미션',
    solarUsage: '문화재 설명 재구성, 수준별 해설, 퀴즈 생성',
    expansion: '지역 관광, 문화유산 교육, 공공데이터 활용 서비스로 확장 가능',
    color: '#F59E0B',
    icon: 'fa-landmark',
  },
  {
    id: 3,
    title: '나이대별 한국사 학습·시험 앱',
    overview: '초등·중등·고등·성인 수준에 맞게 한국사를 설명하고 문제풀이를 제공하는 앱',
    targetUsers: '학생, 한국사능력검정시험 준비생, 성인 학습자',
    features: '수준별 한국사 설명, 시대별 문제풀이, 오답해설, 취약 시대 분석',
    solarUsage: '학습자 수준별 설명, 문제 생성, 오답해설, 학습 리포트',
    expansion: '한국사능력검정시험 대비, 맞춤형 역사학습 서비스로 확장 가능',
    color: '#3B82F6',
    icon: 'fa-scroll',
  },
  {
    id: 4,
    title: '자격증 취약점 분석 학습 앱',
    overview: '자격증 준비생의 문제풀이 결과를 분석하여 취약 단원과 보충학습을 추천하는 앱',
    targetUsers: 'SQLD, 컴활, 정보처리기능사, 한국사, 직업상담사 등 자격증 준비생',
    features: '진단평가, 자동채점, 단원별 정답률 분석, 취약점 리포트, 유사문제 생성',
    solarUsage: '취약점 설명, 보충학습 계획, 오답 원인 분석, 격려형 피드백',
    expansion: '취업 준비생 대상 맞춤형 자격학습 서비스로 확장 가능',
    color: '#10B981',
    icon: 'fa-certificate',
  },
  {
    id: 5,
    title: '청년지원정책 안내 챗봇',
    overview: '쉬었음 청년과 자립준비청년이 자신에게 맞는 지원정책을 쉽게 찾도록 돕는 챗봇',
    targetUsers: '쉬었음 청년, 자립준비청년, 취업준비생',
    features: '정책 요약, 자격조건 안내, 제출서류 안내, 신청절차 설명',
    solarUsage: '정책문서 기반 질의응답, 쉬운 설명, 신청 절차 정리',
    expansion: '사회문제 해결형 AI 서비스로 확장 가능',
    color: '#6366F1',
    icon: 'fa-building-columns',
  },
  {
    id: 6,
    title: 'AI 자기소개서·면접 코치',
    overview: '청년 구직자의 경험을 자기소개서 문장과 면접 답변으로 구조화하는 앱',
    targetUsers: '취업준비생, 진로전환 희망자',
    features: '경험 정리, 자기소개서 문장 생성, 면접 예상질문, 답변 피드백',
    solarUsage: '경험 구조화, 문장 개선, 예상질문 생성, 답변 코칭',
    expansion: '취업지원형 AI 서비스로 확장 가능',
    color: '#8B5CF6',
    icon: 'fa-user-tie',
  },
  {
    id: 7,
    title: '회복탄력성 루틴 코치',
    overview: '쉬었음 청년의 감정 상태와 생활 패턴을 바탕으로 회복 루틴을 제안하는 AI 코치',
    targetUsers: '쉬었음 청년, 자립준비청년, 진로 불안 청년',
    features: '감정 체크인, 오늘의 루틴 추천, 자기돌봄 질문, 격려 메시지',
    solarUsage: '정서적 문장 생성, 루틴 추천, 자기성찰 질문 생성',
    expansion: '청년 회복지원, 정서지원, 생활관리 서비스로 확장 가능',
    color: '#14B8A6',
    icon: 'fa-heart-pulse',
  },
];

export default function ProjectShowcase(): ReactElement {
  useAOS();

  return (
    <div className="container">
      <section className="section" data-aos="fade-up">
        <div className="section-header">
          <h1><i className="fas fa-diagram-project"></i> Solar AI 프로젝트</h1>
          <p>업스테이지 Solar LLM을 활용한 7가지 실전 프로젝트</p>
        </div>

        <div className="project-showcase-grid">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="card project-showcase-card"
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              style={{ borderTop: `4px solid ${project.color}` }}
            >
              <div className="project-showcase-header">
                <div className="project-showcase-icon" style={{ background: `${project.color}20`, color: project.color }}>
                  <i className={`fas ${project.icon}`}></i>
                </div>
                <div>
                  <span className="badge" style={{ background: `${project.color}20`, color: project.color }}>
                    Project {project.id}
                  </span>
                  <h3>{project.title}</h3>
                </div>
              </div>

              <p className="project-showcase-overview">{project.overview}</p>

              <div className="project-showcase-details">
                <div className="project-detail-row">
                  <span className="project-detail-label"><i className="fas fa-users"></i> 주요 사용자</span>
                  <span className="project-detail-value">{project.targetUsers}</span>
                </div>
                <div className="project-detail-row">
                  <span className="project-detail-label"><i className="fas fa-gear"></i> 핵심 기능</span>
                  <span className="project-detail-value">{project.features}</span>
                </div>
                <div className="project-detail-row">
                  <span className="project-detail-label"><i className="fas fa-sun"></i> Solar 활용</span>
                  <span className="project-detail-value">{project.solarUsage}</span>
                </div>
                <div className="project-detail-row">
                  <span className="project-detail-label"><i className="fas fa-rocket"></i> 대회 확장성</span>
                  <span className="project-detail-value">{project.expansion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
