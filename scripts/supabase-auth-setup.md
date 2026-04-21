# Supabase Auth 설정 가이드 (Google + Kakao)

## 1. Google OAuth 설정

### Google Cloud Console (https://console.cloud.google.com)
1. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
2. Application type: **Web application**
3. Authorized redirect URIs:
   ```
   https://hcmgdztsgjvzcyxyayaj.supabase.co/auth/v1/callback
   ```
4. Client ID와 Client Secret 복사

### Supabase Dashboard
1. Authentication → Providers → Google
2. Enable Google provider
3. Client ID: (위에서 복사한 값)
4. Client Secret: (위에서 복사한 값)

---

## 2. Kakao OAuth 설정

### Kakao Developers (https://developers.kakao.com)
1. 애플리케이션 추가
2. 앱 설정 → 플랫폼 → Web:
   ```
   https://solar.dreamitbiz.com
   http://localhost:5182
   ```
3. 카카오 로그인 → 활성화: ON
4. Redirect URI:
   ```
   https://hcmgdztsgjvzcyxyayaj.supabase.co/auth/v1/callback
   ```
5. 동의항목:
   - 닉네임 (필수)
   - 프로필 사진 (선택)
   - 카카오계정(이메일) (필수)
6. REST API 키 + Client Secret 복사

### Supabase Dashboard
1. Authentication → Providers → Kakao
2. Enable Kakao provider
3. Client ID: (REST API 키)
4. Client Secret: (보안 탭에서 생성)

---

## 3. Supabase Auth → URL Configuration

Supabase Dashboard → Authentication → URL Configuration:
- Site URL: `https://solar.dreamitbiz.com`
- Redirect URLs (추가):
  ```
  https://solar.dreamitbiz.com/**
  http://localhost:5182/**
  ```

---

## 4. 현재 프로젝트 코드 설정 확인

`src/utils/auth.ts`에서 이미 구현된 함수:
- `signInWithGoogle()` — Google OAuth
- `signInWithKakao()` — Kakao OAuth (scopes: profile_nickname, profile_image, account_email)
- `signInWithEmail()` — 이메일/비밀번호
- `signUp()` — 이메일 회원가입

`src/pages/Login.tsx`에서 버튼 연결 완료:
- "Google로 로그인" → `signInWithGoogle()`
- "Kakao로 로그인" → `signInWithKakao()`

---

## 5. 참고: Supabase Redirect URL 패턴

모든 OAuth 로그인은 아래 URL로 리다이렉트됨:
```
https://hcmgdztsgjvzcyxyayaj.supabase.co/auth/v1/callback
```

로그인 성공 후 원래 페이지로 복귀:
```javascript
options: { redirectTo: window.location.origin + window.location.pathname }
```
