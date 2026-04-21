/**
 * 7개 프로젝트 파이프라인 SVG 이미지 생성
 * 실행: node scripts/generate-pipeline-svgs.mjs
 * 출력: public/images/pipelines/pipeline-{1~7}.svg
 */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'public', 'images', 'pipelines');

const PROJECTS = [
  {
    id: 1,
    title: 'AI 동화책 제작',
    color: '#EC4899',
    steps: [
      { label: '입력 수집', desc: '나이/주제/소재', icon: '📝' },
      { label: '스토리 생성', desc: 'Solar Chat API', icon: '✨' },
      { label: '장면 분할', desc: '5~8장면 파싱', icon: '🎬' },
      { label: '삽화 프롬프트', desc: '이미지 설명 변환', icon: '🎨' },
      { label: '독후활동', desc: '질문/교훈 생성', icon: '📚' },
      { label: '동화 뷰어', desc: '최종 출력', icon: '📖' },
    ],
  },
  {
    id: 2,
    title: '문화재 AI 해설',
    color: '#F59E0B',
    steps: [
      { label: '데이터 수집', desc: '문화재청 API', icon: '🏛️' },
      { label: '텍스트 청킹', desc: '500토큰 분할', icon: '✂️' },
      { label: 'Embedding', desc: 'Solar 벡터화', icon: '🔢' },
      { label: 'RAG 검색', desc: '유사도 Top-5', icon: '🔍' },
      { label: '수준별 해설', desc: 'Solar Chat 생성', icon: '📝' },
      { label: '퀴즈 출력', desc: '자동 문제 생성', icon: '❓' },
    ],
  },
  {
    id: 3,
    title: '한국사 학습·시험',
    color: '#3B82F6',
    steps: [
      { label: '콘텐츠 구조화', desc: '7시대 30주제', icon: '📋' },
      { label: '수준별 설명', desc: 'Solar Chat 생성', icon: '📖' },
      { label: '문제 생성', desc: '4지선다/OX/연대순', icon: '✏️' },
      { label: '학습 세션', desc: '읽기 + 풀기', icon: '💻' },
      { label: '오답 분석', desc: '시대별 정답률', icon: '📊' },
      { label: '맞춤 복습', desc: '취약 시대 우선', icon: '🔄' },
    ],
  },
  {
    id: 4,
    title: '자격증 취약점 분석',
    color: '#10B981',
    steps: [
      { label: '진단 평가', desc: '20문제 테스트', icon: '🎯' },
      { label: '자동 채점', desc: '단원별 태깅', icon: '✅' },
      { label: '취약점 분석', desc: '정답률 Top-3', icon: '📉' },
      { label: '오답 해설', desc: 'Solar 원인 분석', icon: '💡' },
      { label: '학습 계획', desc: '3/5/7일 플랜', icon: '📅' },
      { label: '유사문제', desc: '반복 학습', icon: '🔄' },
    ],
  },
  {
    id: 5,
    title: '청년정책 챗봇',
    color: '#6366F1',
    steps: [
      { label: '정책 수집', desc: '200건+ 크롤링', icon: '📄' },
      { label: '구조화', desc: 'JSON 변환', icon: '🗂️' },
      { label: '벡터 인덱싱', desc: 'Solar Embedding', icon: '🔢' },
      { label: '프로파일 파악', desc: '대화형 조건 수집', icon: '💬' },
      { label: '정책 매칭', desc: 'RAG + 조건 필터', icon: '🎯' },
      { label: '쉬운말 안내', desc: 'Solar Chat 변환', icon: '📢' },
    ],
  },
  {
    id: 6,
    title: '자소서·면접 코치',
    color: '#8B5CF6',
    steps: [
      { label: '경험 수집', desc: '자유 기술 입력', icon: '📝' },
      { label: 'STAR 변환', desc: '구조화', icon: '⭐' },
      { label: '문항 매칭', desc: '직무/회사 연결', icon: '🔗' },
      { label: '자소서 생성', desc: '500~1000자', icon: '📄' },
      { label: '피드백', desc: '문장 개선 제안', icon: '✍️' },
      { label: '면접 준비', desc: 'Q&A 생성', icon: '🎤' },
    ],
  },
  {
    id: 7,
    title: '루틴 코치',
    color: '#14B8A6',
    steps: [
      { label: '감정 체크인', desc: '1~10점 + 키워드', icon: '😊' },
      { label: '상태 분석', desc: '추이 파악', icon: '📊' },
      { label: '루틴 추천', desc: '작은 한 걸음', icon: '🌱' },
      { label: '격려 메시지', desc: '비판단적 공감', icon: '💛' },
      { label: '루틴 수행', desc: '완료 체크', icon: '✅' },
      { label: '저녁 성찰', desc: '저널링 질문', icon: '🌙' },
    ],
  },
];

function generatePipelineSVG(project) {
  const W = 900;
  const H = 280;
  const stepW = 120;
  const stepH = 90;
  const gap = 18;
  const startX = 30;
  const startY = 80;
  const arrowLen = gap;

  const steps = project.steps;
  const totalW = steps.length * stepW + (steps.length - 1) * gap;
  const offsetX = (W - totalW) / 2;

  let stepsHtml = '';
  let arrowsHtml = '';

  steps.forEach((step, i) => {
    const x = offsetX + i * (stepW + gap);
    const y = startY;

    // Step box
    stepsHtml += `
    <g>
      <rect x="${x}" y="${y}" width="${stepW}" height="${stepH}" rx="10"
            fill="${project.color}10" stroke="${project.color}" stroke-width="2"/>
      <text x="${x + stepW / 2}" y="${y + 20}" text-anchor="middle"
            font-size="16">${step.icon}</text>
      <text x="${x + stepW / 2}" y="${y + 42}" text-anchor="middle"
            font-family="sans-serif" font-size="11" font-weight="bold" fill="#1a1a2e">${step.label}</text>
      <text x="${x + stepW / 2}" y="${y + 60}" text-anchor="middle"
            font-family="sans-serif" font-size="9" fill="#666">${step.desc}</text>
      <circle cx="${x + stepW / 2}" cy="${y + stepH + 16}" r="10"
              fill="${project.color}" opacity="0.9"/>
      <text x="${x + stepW / 2}" y="${y + stepH + 20}" text-anchor="middle"
            font-family="sans-serif" font-size="9" font-weight="bold" fill="#fff">${i + 1}</text>
    </g>`;

    // Arrow
    if (i < steps.length - 1) {
      const ax = x + stepW + 2;
      const ay = y + stepH / 2;
      arrowsHtml += `
      <line x1="${ax}" y1="${ay}" x2="${ax + arrowLen - 4}" y2="${ay}"
            stroke="${project.color}" stroke-width="2" stroke-dasharray="4,2"/>
      <polygon points="${ax + arrowLen - 4},${ay - 4} ${ax + arrowLen + 2},${ay} ${ax + arrowLen - 4},${ay + 4}"
               fill="${project.color}"/>`;
    }
  });

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg${project.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fafbfc"/>
      <stop offset="100%" style="stop-color:#f0f4f8"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" rx="16" fill="url(#bg${project.id})"/>
  <rect width="${W}" height="4" fill="${project.color}" rx="2"/>
  <text x="${W / 2}" y="40" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1a1a2e">
    ${project.title} — 데이터 파이프라인
  </text>
  <text x="${W / 2}" y="58" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">
    Solar LLM 기반 6단계 처리 흐름
  </text>
  ${arrowsHtml}
  ${stepsHtml}
  <line x1="${offsetX}" y1="${startY + stepH + 16}" x2="${offsetX + totalW}" y2="${startY + stepH + 16}"
        stroke="${project.color}" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.3"/>
</svg>`;
}

// Generate all 7
PROJECTS.forEach(project => {
  const svg = generatePipelineSVG(project);
  const filePath = join(OUTPUT_DIR, `pipeline-${project.id}.svg`);
  writeFileSync(filePath, svg, 'utf-8');
  console.log(`✅ Generated: pipeline-${project.id}.svg (${project.title})`);
});

console.log(`\n🎉 7개 파이프라인 SVG 생성 완료! → public/images/pipelines/`);
