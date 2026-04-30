# Tasks — Progress

## 상태 범례
- ✅ 완료
- 🔄 진행 중
- ⏳ 대기
- ❌ 블로킹

---

## Phase 1: 하네스 구조 설정 ✅
- [x] CLAUDE.md 작성
- [x] .claude/settings.json (권한 설정)
- [x] .claude/agents/ (orchestrator, designer, coder, security, marketing)
- [x] .claude/skills/ (implement, test, seo)
- [x] src/data/timezones.js (70+ 도시)
- [x] src/utils/timezone.js (순수 함수)
- [x] tests/utils/timezone.test.js

## Phase 2: 핵심 UI 구현 ✅
- [x] index.html (루트 위치, SEO 메타, AdSense 플레이스홀더)
- [x] style.css (CSS 변수, 다크모드, 반응형 그리드)
- [x] src/components/TimezoneCard.js
- [x] src/components/SearchBox.js
- [x] src/components/MeetingSlider.js

## Phase 3: 기능 연결 ✅
- [x] src/app.js (메인 진입점, 1초 타이머)
- [x] 도시 추가/삭제 로직
- [x] 회의 시간 슬라이더 연동
- [x] localStorage 도시 목록 저장

## Phase 4: 광고 & 배포 ⏳
- [ ] AdSense 클라이언트 ID 삽입 (`__ADSENSE_CLIENT__` → 실제 ID로 교체)
- [ ] 광고 슬롯 ID 삽입 (`__AD_SLOT_BANNER__`, `__AD_SLOT_INFEED__`, `__AD_SLOT_RECT__`)
- [ ] Vercel 배포 및 도메인 연결
- [ ] Google Search Console 등록
- [ ] Lighthouse 점수 측정 (목표: Performance ≥ 90)

---

## 서빙 구조 변경 사항 (2026-04-30)
- `vercel.json`에서 `outputDirectory: "public"` 제거 → 프로젝트 루트에서 서빙
- `index.html`을 프로젝트 루트에 배치 (URL: `/`)
- `style.css`를 프로젝트 루트에 배치
- `src/app.js`가 `src/utils/`, `src/data/`, `src/components/`를 직접 import
- 코드 중복 없음, 테스트는 기존 `src/` 경로 그대로 유지
- 개발 서버: `npm run dev` → `npx serve .` (루트에서 실행)

## 완료된 추가 작업 (2026-04-30)
- CSS 버그 수정: 잘못된 `selector, @media` 조합
- MeetingSlider keydown 버그 수정 (이전 값 노출 문제)
- FOUC 방지: `<head>` 인라인 스크립트로 저장된 테마 즉시 적용
- SEO 스킬 적용: title/description/JSON-LD 업데이트
- robots.txt + sitemap.xml 생성
- SVG favicon 생성
- 광고 슬롯 CLS 방지 (min-height + contain: layout)
- package.json test 스크립트 Windows 호환 경로로 수정
- npm test: **25개 전부 통과** ✅

## 미해결 사항
- AdSense 클라이언트 ID: 미정 (승인 후 삽입)
- 도메인: 미정

## 다음 세션 시작 지점
Phase 4 — `npm run dev`로 브라우저 확인 → AdSense 승인 후 Vercel 배포
