# World Timezone Comparison Tool — CLAUDE.md

## Project Overview
전 세계 시간대를 비교하는 정적 웹 도구.
Google AdSense 광고 수익을 목적으로 하며, 무료 호스팅(Vercel/Netlify)에 배포한다.
외부 API 없이 브라우저 내장 `Intl` API만 사용한다.

## Tech Stack
- **언어**: Vanilla HTML / CSS / JavaScript (ES2020+)
- **빌드 도구**: 없음 (순수 정적 파일)
- **테스트**: Jest + jsdom
- **호스팅**: Vercel (vercel.json 포함)
- **광고**: Google AdSense (스크립트 슬롯만 삽입, 실제 ID는 .env.local)

## Directory Structure
```
world-timezone-tool/
├── CLAUDE.md                  ← 이 파일 (항상 먼저 읽을 것)
├── .claude/
│   ├── settings.json          ← 권한 허용/거부 목록
│   ├── agents/
│   │   ├── orchestrator.md    ← 루프 조율 / 판정
│   │   ├── designer.md        ← UI/UX 작업 + 리뷰
│   │   ├── coder.md           ← 구현/테스트 + 리뷰
│   │   ├── security.md        ← 보안 전담 + BLOCK 권한
│   │   └── marketing.md       ← SEO/AdSense + 리뷰
│   └── skills/
│       ├── implement.md       ← 기능 구현 스킬
│       ├── test.md            ← 테스트 작성 스킬
│       └── seo.md             ← SEO 최적화 스킬
├── src/
│   ├── components/            ← UI 컴포넌트 (순수 JS 클래스)
│   ├── utils/                 ← 순수 함수 유틸리티
│   └── data/
│       └── timezones.js       ← 세계 시간대 데이터
├── public/
│   └── index.html             ← 진입점
├── tests/                     ← Jest 테스트
├── vercel.json                ← 배포 설정
└── package.json
```

## Core Rules (반드시 준수)

### DO
- `Intl.DateTimeFormat`으로 시간 표시 (외부 라이브러리 금지)
- 모든 함수는 순수 함수로 작성 → 테스트 가능하게
- CSS 변수(`--color-*`, `--spacing-*`)로 테마 관리
- 시맨틱 HTML (`<time>`, `<section>`, `aria-label` 등)
- 모바일 퍼스트 반응형 (`min-width` 미디어 쿼리)
- 변경 후 반드시 `npm test` 실행

### DON'T
- `moment.js`, `date-fns` 등 외부 날짜 라이브러리 설치 금지
- `document.write()` 사용 금지
- 인라인 스타일 (`style=""`) 직접 작성 금지 — CSS 클래스 사용
  - 예외: AdSense `<ins>` 태그의 `style="display:block"` (서드파티 필수 속성)
- `eval()`, `innerHTML`에 사용자 입력 직접 삽입 금지
- AdSense ID 하드코딩 금지 — `public/index.html`의 `__ADSENSE_CLIENT__` 플레이스홀더를 배포 전 수동 교체

## Key Features (구현 목표)
1. **도시 추가/삭제**: 검색창으로 도시 추가, 최대 6개 동시 표시
2. **실시간 업데이트**: 1초마다 현재 시각 갱신
3. **회의 시간 슬라이더**: 한 도시 시간을 바꾸면 나머지 자동 연동
4. **DST 표시**: 서머타임 적용 여부 배지
5. **다크모드**: `prefers-color-scheme` 자동 감지 + 수동 토글
6. **광고 슬롯**: 상단 배너(728×90 PC / 320×50 모바일), 인피드(카드 3개 이후), 하단 사각형(300×250)

## Verification Contract
모든 PR/커밋 전 아래 조건을 충족해야 한다:
- [ ] `npm test` — 전체 통과
- [ ] Lighthouse Performance ≥ 90
- [ ] 키보드만으로 도시 추가/삭제 가능 (접근성)
- [ ] Chrome/Firefox/Safari 최신 버전 동작 확인

## Agent Team Structure

이 프로젝트는 5개 에이전트가 협업하는 Review Loop로 운영된다.

```
                    ┌─────────────────┐
                    │  ORCHESTRATOR   │
                    │  (조율 / 판정)   │
                    └────────┬────────┘
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐
    │  DESIGNER   │  │   CODER     │  │    SECURITY     │
    │ UI/UX/접근성│  │ 구현/테스트 │  │ XSS/CSP/정책    │
    └──────┬──────┘  └──────┬──────┘  └────────┬────────┘
           │                │                  │
           └────────────────┼──────────────────┘
                            ▼
                    ┌─────────────────┐
                    │   MARKETING     │
                    │ SEO/AdSense/카피│
                    └─────────────────┘
```

### 각 에이전트가 서로 평가하는 방향
- **Designer** → Coder 결과물(HTML/CSS), Marketing 광고 배치 평가
- **Coder** → Designer CSS 검증, Security 헤더 문법 검토
- **Security** → Coder XSS/보안 검토, Marketing AdSense 도메인 확인
- **Marketing** → Designer 레이아웃 수익화 관점 평가, Security CSP 광고 영향 확인

### 에이전트 파일 위치
- `.claude/agents/orchestrator.md` — 루프 조율
- `.claude/agents/designer.md`
- `.claude/agents/coder.md`
- `.claude/agents/security.md`
- `.claude/agents/marketing.md`

### 리뷰 결과 기록
`tasks/reviews/YYYY-MM-DD_<태스크>.md` (템플릿: `tasks/reviews/TEMPLATE.md`)

---

## Context Loading Order
Claude가 작업 시작 시 읽어야 할 파일 순서:
1. `CLAUDE.md` (이 파일) — 항상
2. `.claude/agents/orchestrator.md` — 에이전트 역할 분담 확인
3. 담당 에이전트 파일 (`.claude/agents/<role>.md`)
4. 해당 작업의 skill 파일 (`.claude/skills/`)
5. 수정 대상 소스 파일
6. 관련 테스트 파일

## Session Handoff
장기 세션 중단 시 아래 정보를 `tasks/progress.md`에 기록:
- 완료된 기능
- 현재 작업 중인 파일
- 다음에 해야 할 일
- 미해결 버그/결정 사항
