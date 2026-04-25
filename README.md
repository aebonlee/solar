# Solar - 업스테이지 Solar AI 학습 플랫폼

> 업스테이지 Solar AI의 활용법을 체계적으로 학습할 수 있는 교육 사이트

**[https://solar.dreamitbiz.com](https://solar.dreamitbiz.com)**

---

## 프로젝트 소개

Solar는 업스테이지(Upstage)의 Solar AI 모델 활용에 필요한 핵심 개념과 실습을 제공하는 웹 기반 교육 플랫폼입니다. 교수자와 학습자 대시보드를 분리하여 체계적인 교육 관리가 가능합니다.

## 주요 기능

### 학습자
- **로드맵**: 단계별 학습 경로 안내
- **일일 학습**: 매일 진행하는 구조화된 레슨
- **실습(Labs)**: 실전 AI 활용 실습
- **프로젝트**: 프로젝트 기반 학습 및 포트폴리오
- **제출/평가**: 과제 제출 및 결과 확인

### 교수자
- **교수자 대시보드**: 학습 관리 통합 뷰
- **수업 계획**: 차시별 수업 설계
- **실습 자료**: 실습 자료 관리
- **프로젝트 관리**: 학습자 프로젝트 현황 관리
- **평가**: 학습자 성과 평가

### 공통
- **커뮤니티**: 자유 게시판
- **프로젝트 갤러리/쇼케이스**: 학습 성과물 전시
- **공지사항**: 사이트 공지
- **관리자 대시보드**: 사이트 전체 관리 (관리자 전용)

## 기술 스택

- **프레임워크:** React 19 + TypeScript
- **빌드 도구:** Vite 7
- **라우팅:** React Router DOM 7
- **백엔드:** Supabase (Auth, Database, Storage)
- **배포:** GitHub Pages

## 주요 컴포넌트

| 컴포넌트 | 설명 |
|----------|------|
| `AuthGuard` | 인증 필요 페이지 접근 제어 |
| `AdminGuard` | 관리자 전용 페이지 접근 제어 |
| `ProfileCompleteModal` | 회원가입 후 프로필 정보 입력 모달 |
| `PaymentNudgePopup` | 라이선스 미보유 사용자 결제 안내 팝업 |

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# GitHub Pages 배포
npx gh-pages -d dist
```

## 변경 이력

최신 변경사항은 [CHANGELOG.md](./CHANGELOG.md)를 참고하세요.

| 날짜 | 내용 |
|------|------|
| 2026-04-25 | ProfileCompleteModal 신규 구현, PaymentNudgePopup 연동 개선 |

---

## License / 라이선스

**저작권 (c) 2025-2026 드림아이티비즈(DreamIT Biz). 모든 권리 보유.**

본 소프트웨어는 저작권법 및 지적재산권법에 의해 보호되는 독점 소프트웨어입니다. 본 프로젝트는 소프트웨어 저작권 등록이 완료되어 법적 보호를 받습니다.

- 본 소프트웨어의 무단 복제, 수정, 배포 또는 사용은 엄격히 금지됩니다.
- 저작권자의 사전 서면 허가 없이 본 소프트웨어의 어떠한 부분도 복제하거나 전송할 수 없습니다.
- 본 소프트웨어는 DreamIT Biz(https://www.dreamitbiz.com) 교육 플랫폼의 일부로 제공됩니다.

라이선스 문의: aebon@dreamitbiz.com

---

**Copyright (c) 2025-2026 DreamIT Biz (Ph.D Aebon Lee). All Rights Reserved.**

This software is proprietary and protected under applicable copyright and intellectual property laws. This project has been registered for software copyright protection.

- Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.
- No part of this software may be reproduced or transmitted in any form without prior written permission from the copyright holder.
- This software is provided as part of the DreamIT Biz (https://www.dreamitbiz.com) educational platform.

For licensing inquiries, contact: aebon@dreamitbiz.com

---

**Designed & Developed by Ph.D Aebon Lee**

DreamIT Biz | https://www.dreamitbiz.com
