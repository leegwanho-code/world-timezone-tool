/**
 * timezone.js — 시간대 처리 순수 함수 모음
 * 외부 라이브러리 없이 Intl API만 사용
 */

/**
 * IANA 시간대 ID로 포맷된 시각 정보 반환
 * @param {string} timezone - IANA ID (예: "Asia/Seoul")
 * @param {Date} date
 * @returns {{ time: string, date: string, weekday: string, offset: string, offsetMinutes: number, isDST: boolean }}
 */
export function formatTimezone(timezone, date = new Date()) {
  if (!isValidTimezone(timezone)) {
    throw new Error(`Invalid timezone: ${timezone}`);
  }

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
  });

  const offsetMinutes = getOffsetMinutes(timezone, date);
  const offsetStr = formatOffset(offsetMinutes);

  return {
    time: timeFormatter.format(date),
    date: dateFormatter.format(date),
    weekday: weekdayFormatter.format(date),
    offset: offsetStr,
    offsetMinutes,
    isDST: isDST(timezone, date),
  };
}

/**
 * UTC 오프셋(분)을 "UTC+HH:MM" 문자열로 변환
 * @param {number} minutes
 * @returns {string}
 */
export function formatOffset(minutes) {
  const sign = minutes >= 0 ? '+' : '-';
  const abs = Math.abs(minutes);
  const h = String(Math.floor(abs / 60)).padStart(2, '0');
  const m = String(abs % 60).padStart(2, '0');
  return `UTC${sign}${h}:${m}`;
}

/**
 * 특정 날짜의 UTC 오프셋(분) 계산.
 * Intl.DateTimeFormat.formatToParts()를 사용해 환경 독립적으로 계산.
 * toLocaleString → new Date() 파싱 방식은 시스템 로케일에 따라 불안정하므로 사용하지 않음.
 * @param {string} timezone
 * @param {Date} date
 * @returns {number}
 */
export function getOffsetMinutes(timezone, date = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const p = Object.fromEntries(
    fmt.formatToParts(date).map(({ type, value }) => [type, value])
  );
  // hour12:false 에서 자정을 '24'로 반환하는 JS 엔진 대응
  const h = p.hour === '24' ? 0 : +p.hour;
  // 해당 시간대의 "벽시계 시각"을 UTC 기준 ms로 환산한 뒤 실제 UTC와 차이를 구함
  const wallMs = Date.UTC(+p.year, +p.month - 1, +p.day, h, +p.minute, +p.second);
  return Math.round((wallMs - date.getTime()) / 60000);
}

/**
 * 서머타임(DST) 적용 여부 판별.
 * 1월(겨울)과 7월(여름) 오프셋을 비교해서 현재가 다르면 DST 적용 중.
 * @param {string} timezone
 * @param {Date} date
 * @returns {boolean}
 */
export function isDST(timezone, date = new Date()) {
  const year = date.getFullYear();
  const jan = getOffsetMinutes(timezone, new Date(year, 0, 15));
  const jul = getOffsetMinutes(timezone, new Date(year, 6, 15));
  if (jan === jul) return false; // DST 없는 시간대 (서울, 도쿄 등)
  const current = getOffsetMinutes(timezone, date);
  // DST일 때 오프셋이 표준시보다 크므로, 현재가 min(jan, jul)이 아니면 DST
  return current !== Math.min(jan, jul);
}

/**
 * IANA 시간대 유효성 검사
 * @param {string} timezone
 * @returns {boolean}
 */
export function isValidTimezone(timezone) {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

/**
 * 두 시간대 간의 시차(시간) 반환
 * @param {string} tz1
 * @param {string} tz2
 * @param {Date} date
 * @returns {number} 양수면 tz1이 tz2보다 앞섬
 */
export function getHourDifference(tz1, tz2, date = new Date()) {
  const offset1 = getOffsetMinutes(tz1, date);
  const offset2 = getOffsetMinutes(tz2, date);
  return (offset1 - offset2) / 60;
}
