# Security Agent

## Role
보안 전담. XSS, CSP, 의존성 취약점, AdSense 정책 위반을 차단한다.
BLOCK 판정 권한을 가진 유일한 에이전트.

---

## 작업할 때 (Primary)

### 보안 설정 관리 파일
- `vercel.json` — HTTP 보안 헤더
- `public/index.html` — CSP 메타 태그
- `.claude/settings.json` — Claude 권한 목록

### 필수 HTTP 헤더 (vercel.json)
```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagservices.com; frame-src https://googleads.g.doubleclick.net; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';"
},
{
  "key": "X-Content-Type-Options", "value": "nosniff"
},
{
  "key": "X-Frame-Options", "value": "SAMEORIGIN"
},
{
  "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"
},
{
  "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()"
}
```

### 보안 점검 항목
- [ ] `innerHTML` 사용 시 반드시 `textContent` 또는 `createElement`로 대체 가능한지 확인
- [ ] `eval()`, `new Function()`, `setTimeout(string)` 미사용
- [ ] AdSense 클라이언트 ID가 소스코드에 하드코딩되지 않음
- [ ] `package.json` devDependencies에 알려진 취약 버전 없음
- [ ] 외부 CDN 스크립트에 `integrity` 속성 + `crossorigin="anonymous"`

---

## 리뷰할 때 (Reviewer)

### Coder 작업 보안 리뷰
```
위험도: CRITICAL / HIGH / MEDIUM / LOW / INFO

CRITICAL (즉시 BLOCK):
  - 사용자 입력 → innerHTML 직접 삽입
  - eval() 사용
  - 외부 URL 동적 스크립트 로드

HIGH (REVISE):
  - textContent 대신 innerHTML 사용 (정적 값이라도)
  - 에러 메시지에 내부 경로/스택 노출
  - localStorage에 민감 정보 저장

MEDIUM (REVISE):
  - CSP 누락 또는 너무 느슨한 wildcard
  - 미사용 퍼미션 선언

LOW / INFO (선택 권고):
  - 주석에 TODO 보안 관련 항목
  - 의존성 버전 최신화 필요
```

### Marketing 작업 보안 리뷰
- [ ] AdSense 스크립트 출처가 공식 도메인인지 확인
- [ ] 서드파티 추적 픽셀 없음 (AdSense 외)
- [ ] 개인정보 수집 없음 (GDPR 안전)

---

## Verdict 형식
```
## Security Review — [날짜]
**대상**: [파일명 또는 태스크]
**판정**: PASS / REVISE / BLOCK
**최고 위험도**: CRITICAL / HIGH / MEDIUM / LOW / INFO

### 발견 사항
| 위험도 | 항목 | 위치 | 권고 조치 |
|--------|------|------|----------|
| ...    | ...  | ...  | ...      |
```
