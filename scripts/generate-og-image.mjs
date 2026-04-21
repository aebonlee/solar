/**
 * OG 이미지 생성 스크립트 (sharp)
 * 실행: node scripts/generate-og-image.mjs
 * 출력: public/og-image.png (1200x630)
 */
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '..', 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

// SVG로 OG 이미지 디자인 생성
const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0F1B2D"/>
      <stop offset="50%" style="stop-color:#1A2F4D"/>
      <stop offset="100%" style="stop-color:#0D1F35"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FBBF24"/>
      <stop offset="100%" style="stop-color:#F59E0B"/>
    </linearGradient>
    <radialGradient id="glow1" cx="20%" cy="50%">
      <stop offset="0%" style="stop-color:rgba(245,158,11,0.15)"/>
      <stop offset="100%" style="stop-color:transparent"/>
    </radialGradient>
    <radialGradient id="glow2" cx="80%" cy="30%">
      <stop offset="0%" style="stop-color:rgba(59,130,246,0.1)"/>
      <stop offset="100%" style="stop-color:transparent"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow1)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow2)"/>

  <!-- Decorative circles -->
  <circle cx="950" cy="120" r="200" fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.1)" stroke-width="1"/>
  <circle cx="1000" cy="150" r="140" fill="rgba(245,158,11,0.03)" stroke="rgba(245,158,11,0.08)" stroke-width="1"/>
  <circle cx="200" cy="500" r="150" fill="rgba(59,130,246,0.04)" stroke="rgba(59,130,246,0.08)" stroke-width="1"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="url(#accent)"/>

  <!-- Solar icon (circle with S) -->
  <circle cx="600" cy="180" r="55" fill="none" stroke="url(#accent)" stroke-width="3"/>
  <circle cx="600" cy="180" r="45" fill="rgba(245,158,11,0.1)"/>
  <text x="600" y="200" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#FBBF24" text-anchor="middle">S</text>

  <!-- Rays around icon -->
  <line x1="600" y1="115" x2="600" y2="105" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/>
  <line x1="600" y1="245" x2="600" y2="255" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/>
  <line x1="535" y1="180" x2="525" y2="180" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/>
  <line x1="665" y1="180" x2="675" y2="180" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/>
  <line x1="554" y1="134" x2="547" y2="127" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/>
  <line x1="646" y1="226" x2="653" y2="233" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/>
  <line x1="646" y1="134" x2="653" y2="127" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/>
  <line x1="554" y1="226" x2="547" y2="233" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/>

  <!-- Main title -->
  <text x="600" y="300" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Solar AI Learning Studio</text>

  <!-- Subtitle -->
  <text x="600" y="360" font-family="Arial, sans-serif" font-size="26" fill="rgba(255,255,255,0.8)" text-anchor="middle">국산 LLM Solar 기반 AI 서비스 개발 교육</text>

  <!-- Tags -->
  <rect x="290" y="400" width="120" height="34" rx="17" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.4)" stroke-width="1"/>
  <text x="350" y="422" font-family="Arial, sans-serif" font-size="14" fill="#93C5FD" text-anchor="middle">Prompt Eng.</text>

  <rect x="430" y="400" width="80" height="34" rx="17" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
  <text x="470" y="422" font-family="Arial, sans-serif" font-size="14" fill="#6EE7B7" text-anchor="middle">RAG</text>

  <rect x="530" y="400" width="100" height="34" rx="17" fill="rgba(245,158,11,0.2)" stroke="rgba(245,158,11,0.4)" stroke-width="1"/>
  <text x="580" y="422" font-family="Arial, sans-serif" font-size="14" fill="#FCD34D" text-anchor="middle">AI Chatbot</text>

  <rect x="650" y="400" width="110" height="34" rx="17" fill="rgba(139,92,246,0.2)" stroke="rgba(139,92,246,0.4)" stroke-width="1"/>
  <text x="705" y="422" font-family="Arial, sans-serif" font-size="14" fill="#C4B5FD" text-anchor="middle">AI Agent</text>

  <rect x="780" y="400" width="100" height="34" rx="17" fill="rgba(6,182,212,0.2)" stroke="rgba(6,182,212,0.4)" stroke-width="1"/>
  <text x="830" y="422" font-family="Arial, sans-serif" font-size="14" fill="#67E8F9" text-anchor="middle">Deploy</text>

  <!-- Stats bar -->
  <rect x="250" y="480" width="700" height="60" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="370" y="515" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#FBBF24" text-anchor="middle">7일</text>
  <text x="370" y="535" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.6)" text-anchor="middle">교육 기간</text>
  <text x="510" y="515" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#FBBF24" text-anchor="middle">52시간</text>
  <text x="510" y="535" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.6)" text-anchor="middle">총 교육 시간</text>
  <text x="660" y="515" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#FBBF24" text-anchor="middle">4트랙</text>
  <text x="660" y="535" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.6)" text-anchor="middle">프로젝트</text>
  <text x="810" y="515" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#FBBF24" text-anchor="middle">70%</text>
  <text x="810" y="535" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.6)" text-anchor="middle">실습 비율</text>

  <!-- Dividers in stats -->
  <line x1="440" y1="490" x2="440" y2="530" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="585" y1="490" x2="585" y2="530" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="735" y1="490" x2="735" y2="530" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

  <!-- Footer -->
  <text x="600" y="595" font-family="Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.4)" text-anchor="middle">solar.dreamitbiz.com | DreamIT Biz</text>

  <!-- Bottom accent line -->
  <rect x="0" y="${HEIGHT - 4}" width="${WIDTH}" height="4" fill="url(#accent)"/>
</svg>`;

async function generateOgImage() {
  try {
    await sharp(Buffer.from(svg))
      .png({ quality: 90 })
      .toFile(OUTPUT);
    console.log(`✅ OG 이미지 생성 완료: ${OUTPUT}`);
    console.log(`   크기: ${WIDTH}x${HEIGHT}px`);
  } catch (err) {
    console.error('❌ OG 이미지 생성 실패:', err.message);
    process.exit(1);
  }
}

generateOgImage();
