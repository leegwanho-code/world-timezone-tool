import {
  formatTimezone,
  formatOffset,
  getOffsetMinutes,
  isValidTimezone,
  getHourDifference,
  isDST,
} from '../../src/utils/timezone.js';

// formatTimezone
describe('formatTimezone', () => {
  const FIXED = new Date('2024-01-15T12:00:00Z'); // 겨울, UTC 정오

  test('서울 반환값 구조 확인', () => {
    const r = formatTimezone('Asia/Seoul', FIXED);
    expect(r).toHaveProperty('time');
    expect(r).toHaveProperty('date');
    expect(r).toHaveProperty('weekday');
    expect(r).toHaveProperty('offset');
    expect(r).toHaveProperty('offsetMinutes');
    expect(r).toHaveProperty('isDST');
  });

  test('서울 오프셋은 +540분 (UTC+09:00)', () => {
    const r = formatTimezone('Asia/Seoul', FIXED);
    expect(r.offsetMinutes).toBe(540);
    expect(r.offset).toBe('UTC+09:00');
  });

  test('서울 isDST = false', () => {
    const r = formatTimezone('Asia/Seoul', FIXED);
    expect(r.isDST).toBe(false);
  });

  test('뉴욕 여름 isDST = true', () => {
    const summer = new Date('2024-07-01T12:00:00Z');
    const r = formatTimezone('America/New_York', summer);
    expect(r.isDST).toBe(true);
  });

  test('잘못된 시간대는 에러', () => {
    expect(() => formatTimezone('Invalid/Zone', FIXED)).toThrow('Invalid timezone');
  });

  test('빈 문자열 시간대는 에러', () => {
    expect(() => formatTimezone('', FIXED)).toThrow('Invalid timezone');
  });
});

// formatOffset
describe('formatOffset', () => {
  test('+09:00 포맷', () => {
    expect(formatOffset(540)).toBe('UTC+09:00');
  });
  test('-05:00 포맷', () => {
    expect(formatOffset(-300)).toBe('UTC-05:00');
  });
  test('UTC+00:00 포맷', () => {
    expect(formatOffset(0)).toBe('UTC+00:00');
  });
  test('30분 단위 오프셋 (인도 UTC+05:30)', () => {
    expect(formatOffset(330)).toBe('UTC+05:30');
  });
  test('음수 30분 단위 (UTC-09:30)', () => {
    expect(formatOffset(-570)).toBe('UTC-09:30');
  });
});

// getOffsetMinutes
describe('getOffsetMinutes', () => {
  const FIXED = new Date('2024-01-15T12:00:00Z');

  test('서울 = +540', () => {
    expect(getOffsetMinutes('Asia/Seoul', FIXED)).toBe(540);
  });
  test('UTC = 0', () => {
    expect(getOffsetMinutes('UTC', FIXED)).toBe(0);
  });
  test('뉴욕 겨울 = -300 (EST)', () => {
    expect(getOffsetMinutes('America/New_York', FIXED)).toBe(-300);
  });
  test('인도 = +330 (30분 단위)', () => {
    expect(getOffsetMinutes('Asia/Kolkata', FIXED)).toBe(330);
  });
});

// isValidTimezone
describe('isValidTimezone', () => {
  test('유효한 시간대', () => {
    expect(isValidTimezone('Asia/Seoul')).toBe(true);
    expect(isValidTimezone('America/New_York')).toBe(true);
    expect(isValidTimezone('UTC')).toBe(true);
  });
  test('잘못된 시간대', () => {
    expect(isValidTimezone('Invalid/Zone')).toBe(false);
    expect(isValidTimezone('')).toBe(false);
    expect(isValidTimezone('Seoul')).toBe(false);
  });
});

// isDST
describe('isDST', () => {
  test('서울 — DST 없음 (여름도 false)', () => {
    expect(isDST('Asia/Seoul', new Date('2024-07-01T12:00:00Z'))).toBe(false);
  });
  test('뉴욕 — 여름 DST 적용', () => {
    expect(isDST('America/New_York', new Date('2024-07-01T12:00:00Z'))).toBe(true);
  });
  test('뉴욕 — 겨울 DST 미적용', () => {
    expect(isDST('America/New_York', new Date('2024-01-15T12:00:00Z'))).toBe(false);
  });
  test('도쿄 — DST 없음', () => {
    expect(isDST('Asia/Tokyo', new Date('2024-07-01T12:00:00Z'))).toBe(false);
  });
});

// getHourDifference
describe('getHourDifference', () => {
  const WINTER = new Date('2024-01-15T12:00:00Z');
  const SUMMER = new Date('2024-07-01T12:00:00Z');

  test('서울과 런던 겨울 시차 = 9', () => {
    expect(getHourDifference('Asia/Seoul', 'Europe/London', WINTER)).toBe(9);
  });
  test('서울과 뉴욕 겨울 시차 = 14 (EST)', () => {
    expect(getHourDifference('Asia/Seoul', 'America/New_York', WINTER)).toBe(14);
  });
  test('같은 시간대 차이 = 0', () => {
    expect(getHourDifference('Asia/Seoul', 'Asia/Seoul', WINTER)).toBe(0);
  });
  test('뉴욕 여름 DST 반영 — 런던과 차이 = -5 (EDT)', () => {
    expect(getHourDifference('America/New_York', 'Europe/London', SUMMER)).toBe(-5);
  });
});
