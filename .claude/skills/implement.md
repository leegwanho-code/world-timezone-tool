# Skill: implement

## 언제 사용
새로운 기능 컴포넌트 또는 유틸 함수를 작성할 때.

## 절차
1. `src/utils/` — 순수 함수 먼저 작성 (UI 없음)
2. `tests/` — 해당 함수의 Jest 테스트 작성
3. `npm test` 실행 → 통과 확인
4. `src/components/` — UI 클래스 작성 (유틸 함수 import)
5. `public/index.html` — 컴포넌트 연결

## 컴포넌트 작성 패턴
```js
// src/components/TimezoneCard.js
export class TimezoneCard {
  /**
   * @param {string} timezone - IANA timezone ID (예: "Asia/Seoul")
   * @param {HTMLElement} container - 마운트할 DOM 요소
   */
  constructor(timezone, container) {
    this.timezone = timezone;
    this.container = container;
    this._el = null;
  }

  mount() {
    this._el = document.createElement('article');
    this._el.className = 'timezone-card';
    this._el.setAttribute('aria-label', this.timezone);
    this.container.appendChild(this._el);
    this._render();
  }

  update(date) {
    // 1초마다 호출됨
    this._render(date);
  }

  unmount() {
    this._el?.remove();
  }

  _render(date = new Date()) {
    // Intl.DateTimeFormat으로만 표시
  }
}
```

## 유틸 함수 작성 패턴
```js
// src/utils/timezone.js
/**
 * IANA 시간대 ID로 현재 시각 정보 반환
 * @param {string} timezone
 * @param {Date} date
 * @returns {{ time: string, date: string, weekday: string, offset: string, offsetMinutes: number, isDST: boolean }}
 */
export function formatTimezone(timezone, date = new Date()) {
  // 순수 함수: 같은 입력 → 같은 출력
}
```
