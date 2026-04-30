/**
 * 주요 도시 시간대 데이터
 * IANA timezone ID + 표시용 메타데이터
 * @type {Array<{city: string, country: string, timezone: string, region: string}>}
 */
export const TIMEZONES = [
  // Asia
  { city: "Seoul",       country: "South Korea", timezone: "Asia/Seoul",      region: "Asia" },
  { city: "Tokyo",       country: "Japan",       timezone: "Asia/Tokyo",      region: "Asia" },
  { city: "Beijing",     country: "China",        timezone: "Asia/Shanghai",   region: "Asia" },
  { city: "Shanghai",    country: "China",        timezone: "Asia/Shanghai",   region: "Asia" },
  { city: "Hong Kong",   country: "Hong Kong",   timezone: "Asia/Hong_Kong",  region: "Asia" },
  { city: "Singapore",   country: "Singapore",   timezone: "Asia/Singapore",  region: "Asia" },
  { city: "Bangkok",     country: "Thailand",    timezone: "Asia/Bangkok",    region: "Asia" },
  { city: "Jakarta",     country: "Indonesia",   timezone: "Asia/Jakarta",    region: "Asia" },
  { city: "Mumbai",      country: "India",       timezone: "Asia/Kolkata",    region: "Asia" },
  { city: "Delhi",       country: "India",       timezone: "Asia/Kolkata",    region: "Asia" },
  { city: "Karachi",     country: "Pakistan",    timezone: "Asia/Karachi",    region: "Asia" },
  { city: "Dhaka",       country: "Bangladesh",  timezone: "Asia/Dhaka",      region: "Asia" },
  { city: "Colombo",     country: "Sri Lanka",   timezone: "Asia/Colombo",    region: "Asia" },
  { city: "Kathmandu",   country: "Nepal",       timezone: "Asia/Kathmandu",  region: "Asia" },
  { city: "Almaty",      country: "Kazakhstan",  timezone: "Asia/Almaty",     region: "Asia" },
  { city: "Tashkent",    country: "Uzbekistan",  timezone: "Asia/Tashkent",   region: "Asia" },
  { city: "Dubai",       country: "UAE",         timezone: "Asia/Dubai",      region: "Middle East" },
  { city: "Riyadh",      country: "Saudi Arabia",timezone: "Asia/Riyadh",     region: "Middle East" },
  { city: "Tehran",      country: "Iran",        timezone: "Asia/Tehran",     region: "Middle East" },
  { city: "Istanbul",    country: "Turkey",      timezone: "Europe/Istanbul", region: "Middle East" },
  { city: "Tel Aviv",    country: "Israel",      timezone: "Asia/Jerusalem",  region: "Middle East" },

  // Europe
  { city: "London",      country: "UK",          timezone: "Europe/London",   region: "Europe" },
  { city: "Paris",       country: "France",      timezone: "Europe/Paris",    region: "Europe" },
  { city: "Berlin",      country: "Germany",     timezone: "Europe/Berlin",   region: "Europe" },
  { city: "Madrid",      country: "Spain",       timezone: "Europe/Madrid",   region: "Europe" },
  { city: "Rome",        country: "Italy",       timezone: "Europe/Rome",     region: "Europe" },
  { city: "Amsterdam",   country: "Netherlands", timezone: "Europe/Amsterdam",region: "Europe" },
  { city: "Brussels",    country: "Belgium",     timezone: "Europe/Brussels", region: "Europe" },
  { city: "Zurich",      country: "Switzerland", timezone: "Europe/Zurich",   region: "Europe" },
  { city: "Vienna",      country: "Austria",     timezone: "Europe/Vienna",   region: "Europe" },
  { city: "Warsaw",      country: "Poland",      timezone: "Europe/Warsaw",   region: "Europe" },
  { city: "Prague",      country: "Czech Rep.",  timezone: "Europe/Prague",   region: "Europe" },
  { city: "Stockholm",   country: "Sweden",      timezone: "Europe/Stockholm",region: "Europe" },
  { city: "Copenhagen",  country: "Denmark",     timezone: "Europe/Copenhagen",region: "Europe" },
  { city: "Helsinki",    country: "Finland",     timezone: "Europe/Helsinki", region: "Europe" },
  { city: "Oslo",        country: "Norway",      timezone: "Europe/Oslo",     region: "Europe" },
  { city: "Athens",      country: "Greece",      timezone: "Europe/Athens",   region: "Europe" },
  { city: "Bucharest",   country: "Romania",     timezone: "Europe/Bucharest",region: "Europe" },
  { city: "Kyiv",        country: "Ukraine",     timezone: "Europe/Kiev",     region: "Europe" },
  { city: "Moscow",      country: "Russia",      timezone: "Europe/Moscow",   region: "Europe" },
  { city: "Lisbon",      country: "Portugal",    timezone: "Europe/Lisbon",   region: "Europe" },

  // Americas
  { city: "New York",    country: "USA",         timezone: "America/New_York",   region: "Americas" },
  { city: "Los Angeles", country: "USA",         timezone: "America/Los_Angeles",region: "Americas" },
  { city: "Chicago",     country: "USA",         timezone: "America/Chicago",    region: "Americas" },
  { city: "Houston",     country: "USA",         timezone: "America/Chicago",    region: "Americas" },
  { city: "Phoenix",     country: "USA",         timezone: "America/Phoenix",    region: "Americas" },
  { city: "Denver",      country: "USA",         timezone: "America/Denver",     region: "Americas" },
  { city: "Seattle",     country: "USA",         timezone: "America/Los_Angeles",region: "Americas" },
  { city: "San Francisco",country:"USA",         timezone: "America/Los_Angeles",region: "Americas" },
  { city: "Toronto",     country: "Canada",      timezone: "America/Toronto",    region: "Americas" },
  { city: "Vancouver",   country: "Canada",      timezone: "America/Vancouver",  region: "Americas" },
  { city: "Montreal",    country: "Canada",      timezone: "America/Toronto",    region: "Americas" },
  { city: "Mexico City", country: "Mexico",      timezone: "America/Mexico_City",region: "Americas" },
  { city: "São Paulo",   country: "Brazil",      timezone: "America/Sao_Paulo",  region: "Americas" },
  { city: "Buenos Aires",country: "Argentina",   timezone: "America/Argentina/Buenos_Aires", region: "Americas" },
  { city: "Lima",        country: "Peru",        timezone: "America/Lima",       region: "Americas" },
  { city: "Bogotá",      country: "Colombia",    timezone: "America/Bogota",     region: "Americas" },
  { city: "Santiago",    country: "Chile",       timezone: "America/Santiago",   region: "Americas" },
  { city: "Caracas",     country: "Venezuela",   timezone: "America/Caracas",    region: "Americas" },

  // Africa & Oceania
  { city: "Cairo",       country: "Egypt",       timezone: "Africa/Cairo",       region: "Africa" },
  { city: "Lagos",       country: "Nigeria",     timezone: "Africa/Lagos",       region: "Africa" },
  { city: "Nairobi",     country: "Kenya",       timezone: "Africa/Nairobi",     region: "Africa" },
  { city: "Johannesburg",country: "South Africa",timezone: "Africa/Johannesburg",region: "Africa" },
  { city: "Casablanca",  country: "Morocco",     timezone: "Africa/Casablanca",  region: "Africa" },
  { city: "Sydney",      country: "Australia",   timezone: "Australia/Sydney",   region: "Oceania" },
  { city: "Melbourne",   country: "Australia",   timezone: "Australia/Melbourne",region: "Oceania" },
  { city: "Brisbane",    country: "Australia",   timezone: "Australia/Brisbane", region: "Oceania" },
  { city: "Perth",       country: "Australia",   timezone: "Australia/Perth",    region: "Oceania" },
  { city: "Auckland",    country: "New Zealand", timezone: "Pacific/Auckland",   region: "Oceania" },
  { city: "Honolulu",    country: "USA (Hawaii)",timezone: "Pacific/Honolulu",   region: "Oceania" },
];

/**
 * 도시명으로 시간대 검색
 * @param {string} query
 * @returns {Array}
 */
export function searchTimezones(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return TIMEZONES.filter(
    (tz) =>
      tz.city.toLowerCase().includes(q) ||
      tz.country.toLowerCase().includes(q) ||
      tz.timezone.toLowerCase().includes(q)
  ).slice(0, 8);
}
