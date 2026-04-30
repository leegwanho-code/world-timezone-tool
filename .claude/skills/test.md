# Skill: test

## 테스트 원칙
- 유틸 함수는 100% 커버리지 목표
- 컴포넌트는 happy path + 에러 케이스
- 외부 의존성(Date, Intl) 은 고정값으로 mock

## Jest 설정 확인
`package.json`의 `jest.testEnvironment`가 `jsdom`인지 확인.

## 테스트 파일 위치
```
tests/
├── utils/
│   ├── timezone.test.js
│   └── search.test.js
└── components/
    └── TimezoneCard.test.js
```

## 테스트 패턴
```js
// tests/utils/timezone.test.js
import { formatTimezone } from '../../src/utils/timezone.js';

describe('formatTimezone', () => {
  const FIXED_DATE = new Date('2024-01-15T12:00:00Z');

  test('서울 시간 정상 반환', () => {
    const result = formatTimezone('Asia/Seoul', FIXED_DATE);
    expect(result.time).toBe('21:00');
    expect(result.isDST).toBe(false);
  });

  test('존재하지 않는 시간대 에러 처리', () => {
    expect(() => formatTimezone('Invalid/Zone', FIXED_DATE))
      .toThrow('Invalid timezone');
  });
});
```

## 실행
```bash
npm test              # 전체 실행
npm test -- --watch   # watch 모드
npm test -- --coverage # 커버리지 리포트
```
