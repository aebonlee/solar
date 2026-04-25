# Changelog

## [2026-04-25] ProfileCompleteModal 신규 구현 및 PaymentNudgePopup 연동

### 수정 내용

#### 1. ProfileCompleteModal 신규 생성
- 회원가입 후 이름/전화번호 입력 모달 구현
- 이름(필수) + 전화번호(선택) 입력 폼
- 전화번호 자동 포맷팅 (010-xxxx-xxxx)
- `updateProfile()` 유틸 함수를 활용한 프로필 저장
- "나중에 입력하기" 스킵 기능 제공

#### 2. AuthContext 프로필 완료 로직 추가
- `needsProfileCompletion` 상태 도입: 로그인 + 프로필 존재 + 이름 미입력 시 모달 표시
- 기존 `refreshProfile` 함수 활용하여 모달 완료 후 프로필 갱신

#### 3. PaymentNudgePopup 조건 개선
- 프로필 입력 완료 후에만 결제 팝업 표시 (`!needsProfileCompletion` 조건 추가)
- 프로필 모달과 결제 팝업이 동시에 표시되지 않도록 방지

### 수정 파일
| 파일 | 변경 |
|------|------|
| `src/components/ProfileCompleteModal.tsx` | 신규 — 프로필 완료 모달 컴포넌트 |
| `src/contexts/AuthContext.tsx` | ProfileCompleteModal import, needsProfileCompletion 로직, JSX 렌더 추가 |

### 빌드 확인
- `npm run build` 성공
- GitHub Pages 배포 완료 (commit: `3325f17`)
