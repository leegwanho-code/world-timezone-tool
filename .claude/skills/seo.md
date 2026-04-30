# Skill: seo

## 목표 키워드
- Primary: "world time zone comparison", "time zone converter"
- Secondary: "meeting time planner", "international time", "UTC offset"
- 롱테일: "best time for meeting New York London Tokyo"

## SEO 체크리스트 (index.html 수정 시)
- [ ] `<title>` 60자 이내, 키워드 포함
- [ ] `<meta name="description">` 150자 이내
- [ ] `<meta property="og:*">` (소셜 공유용)
- [ ] `<link rel="canonical">` 절대 URL
- [ ] JSON-LD `WebApplication` 스키마
- [ ] `<html lang="en">`
- [ ] 이미지 `alt` 속성 (로고 등)

## 권장 title/description
```html
<title>World Time Zone Comparison — Compare Any City Times Instantly</title>
<meta name="description"
  content="Compare time zones across multiple cities simultaneously. 
  Find the best meeting time for international teams. 
  Free, fast, no signup required.">
```

## JSON-LD 스키마
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "World Timezone Comparison",
  "url": "https://worldtimezone.tools",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0" }
}
</script>
```

## AdSense 슬롯 배치 원칙
- 콘텐츠 위 상단 배너: 728×90 (데스크톱), 320×50 (모바일)
- 도시 카드 사이: 네이티브 인피드
- 페이지 하단: 300×250 사각형
- **절대 금지**: 팝업, 자동재생 미디어 광고 (AdSense 정책 위반)
