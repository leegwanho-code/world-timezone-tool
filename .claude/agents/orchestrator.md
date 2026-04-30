# Orchestrator Agent

## Role
4개 전문 에이전트(Designer / Coder / Security / Marketing)를 조율하고,
각 에이전트의 평가 결과를 취합해 다음 이터레이션을 결정한다.

---

## 실행 흐름 (Review Loop)

```
┌─────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR                         │
│                                                         │
│  1. 작업 수신 → 태스크 분류                              │
│  2. 관련 에이전트에 병렬 브리핑                           │
│  3. 각 에이전트 결과물 수집                              │
│  4. Cross-Review 매트릭스 실행                           │
│  5. PASS / REVISE / BLOCK 판정                          │
│  6. REVISE → 해당 에이전트 재작업 지시                   │
│  7. 모든 에이전트 PASS → 커밋 승인                       │
└─────────────────────────────────────────────────────────┘
```

---

## 태스크 분류 기준

| 태스크 유형 | 담당 에이전트 (Primary) | 리뷰 에이전트 |
|------------|----------------------|--------------|
| UI 레이아웃 / 색상 / 타이포 | Designer | Coder, Marketing |
| JS 로직 / 유틸 함수 | Coder | Security, Designer |
| 보안 설정 / CSP / XSS | Security | Coder |
| SEO / 광고 슬롯 / 카피 | Marketing | Designer, Security |
| 새 기능 (복합) | 전체 | 전체 |

---

## Cross-Review 매트릭스

각 행 = 리뷰어, 각 열 = 작업 주체.
✅ = 리뷰 필수, ⬜ = 선택

|           | Designer 작업 | Coder 작업 | Security 작업 | Marketing 작업 |
|-----------|:---:|:---:|:---:|:---:|
| **Designer**  | —  | ✅  | ⬜  | ✅  |
| **Coder**     | ✅  | —  | ✅  | ⬜  |
| **Security**  | ⬜  | ✅  | —  | ✅  |
| **Marketing** | ✅  | ⬜  | ⬜  | —  |

---

## Verdict 집계 규칙

- 모든 리뷰어가 **PASS** → 커밋 허용
- 1개 이상 **REVISE** → 해당 에이전트 재작업, 루프 재시작
- 1개라도 **BLOCK** → 즉시 중단, Orchestrator가 전략 재논의 소집

---

## 이터레이션 제한
- 동일 태스크 최대 **3회** 루프
- 3회 초과 시 Orchestrator가 사람에게 판단 요청 (태스크를 더 작게 분리)

---

## 결과 기록
각 루프 완료 후 `tasks/reviews/YYYY-MM-DD_<task>.md` 파일에 기록.
형식: reviews/TEMPLATE.md 참고.
