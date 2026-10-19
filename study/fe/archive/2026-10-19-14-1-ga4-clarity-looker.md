# 14-1 · GA4 · Clarity · Looker — **완료**

SSOT 노트: [`../14-14-1-ga4-clarity-looker.md`](../14-14-1-ga4-clarity-looker.md)

## active 체크

- [x] GA4 이벤트 모델 — pageview + 커스텀 이벤트로 퍼널
- [x] SPA에서 pathname pageview만으로 퍼널이 안 보이는 이유
- [x] `?step=` 하위 단계·다음 클릭·이탈을 이벤트로 설계
- [x] GA4(정량 KPI) vs Clarity(녹화·히트맵) 역할 분리
- [x] Looker Studio — GA4 소스 경영 대시보드(FE repo 어드민 아님)
- [x] 추적 3층: pageview / Clarity / (레거시) page_code
- [x] REAL 환경만 수집 — 로컬·CI에서 KPI 안 보이는 이유
- [x] **통과선** — SPA 퍼널 / GA4·Clarity / Looker 30초

## 정리

### 한 줄

SPA 퍼널은 **기획 단계·클릭·이탈**을 pathname pageview와 1:1로 맞출 수 없어 **커스텀 이벤트**가 필요하고, **GA4+Looker**는 숫자·경영 KPI, **Clarity**는 이탈 구간 **왜**를 보는 정성 도구다.

### 핵심

- **GA4**: pageview(기본) + **커스텀 이벤트**(이름·파라미터)로 퍼널·완료율·단계 간 시간을 집계. 이벤트 스키마가 없으면 “숫자는 쌓이는데 질문에 답이 없다”.
- **pageview 함정**: `useLocation` + pathname만 보내면 같은 pathname에서 `?step=1→2` 전환·“다음” 클릭·탭 닫기 이탈은 **자동으로 안 잡힌다**. 단계마다 pathname이 바뀌는 단순 라우팅만 있으면 pageview만으로도 **부분적** 가능.
- **설계 패턴**: 라우트 진입은 `step_view`, 버튼은 `nav(action=next|back)`, 플로우 이탈은 `abandon(last_step=…)` — URL query를 **의도적으로** 이벤트 파라미터(`detail_step`)로 올린다.
- **Clarity**: init + `identify(userId)`로 세션 녹화·히트맵. **전사 평균 잔존율·p75 시간** 같은 KPI용이 아니라, GA4에서 이탈 step을 찾은 뒤 **해당 URL 리플레이**로 막힌 UX를 본다.
- **Looker Studio**: GA4 속성을 데이터 소스로 연결해 퍼널·주간 추이·PDF 공유. **수집은 care 코드, 집계는 GA4, 차트는 Looker** — monorepo에 `GET /analytics` 없으면 React 어드민 대시보드는 비용만 커진다.
- **환경**: `SERVER_TYPE === 'REAL'`일 때만 GA4·Clarity 초기화 — dev/staging에서 KPI가 비는 건 정상(데이터 오염 방지).

### 흐름

```
[수집 — care REAL]
  라우트 변경 → GA4Tracker pathname pageview (기본 커버)
  등록 위저드 → regist_step_view / regist_nav / regist_abandon (퍼널 해상도)
  앱 시작 → Clarity init · 로그인 후 identify

[KPI — GA4 + Looker]
  이벤트 적재 → 퍼널 탐색·이탈률·완료율 차트 → 경영 링크/PDF

[원인 — Clarity]
  Looker/GA4에서 이탈 많은 step → Clarity 필터(같은 URL) → 리플레이·히트맵
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| pageview vs 커스텀 이벤트 | “주소 바뀜” vs “기획 단계·행동” |
| pathname vs full URL in page | query step을 pageview 키에 넣 vs 이벤트 파라미터(유지보수는 후자 유리) |
| GA4 vs Clarity | 집계 KPI vs 샘플 세션 정성 |
| Looker vs 사내 React 대시보드 | GA4 연동 BI vs 조회 API·권한·캐시 직접 구축 |
| GA4 vs 소켓 page_code | Google 집계 vs 내부 코드 수동 전송(조회 API 없으면 경영 불가) |
| “추적 켰다” vs “퍼널 답한다” | pageview 1건 쌓임 vs 단계별 잔존 설계 완료 |

### 실무 연결

- `GA4Tracker`: pathname만 `ReactGA.send({ pageview })` — query step 미반영 (`notes/2026-06-10_spa-pageview-limits.md`).
- `RegistRenewalTracker` + `regist_*`: 퍼널용 커스텀 레이어 (`notes/2026-06-09_care-regist-ga4-analytics.md`, `2026-06-09_spa-page-tracking-layers.md`).
- GA4 퍼널 이탈 → Clarity 리플레이 워크플로 (`notes/2026-06-09_ga4-vs-clarity-roles.md`).
- 경영 보고서는 lookerstudio.google.com + GA4 속성 (`notes/2026-06-09_looker-ga4-exec-dashboard.md`).

### 면접 한 방

- **Q:** SPA에서 pageview만으로 퍼널을 못 보는 이유는? GA4와 Clarity는 어떻게 나누나?
- **답:** 라우팅으로 pathname은 같고 `?step`·버튼 클릭·이탈만 바뀌면 자동 pageview는 “한 페이지 방문”처럼 보인다. 퍼널은 기획 단계 이름을 **커스텀 이벤트**로 보내야 한다. GA4+Looker로 이탈·완료율 같은 **숫자**를 보고, Clarity로 그 step에서 사용자가 **무엇을 했는지** 녹화로 확인한다.

### 통과선 스크립트

1. GA4 = pageview + 커스텀 이벤트로 퍼널·KPI.
2. SPA 함정: pathname만 · query step · 클릭/이탈 미수집.
3. 이벤트 설계: step_view / nav / abandon + 파라미터.
4. Clarity = 정성(리플레이), KPI 아님.
5. Looker = GA4 소스 경영 대시보드, FE repo 어드민 아님.
6. REAL만 수집 — 로컬에서 안 보이는 이유.
7. 워크플로: GA4 이탈 step → Clarity 원인.

## wrap 요약

- go 정리본: `study/fe/14-14-1-ga4-clarity-looker.md` 완료.
- 핵심: SPA 퍼널은 커스텀 이벤트, GA4+Looker=KPI, Clarity=리플레이.
- 다음 start/go: `14-2-monitoring-rum-sentry` · 노트는 다음 go에서 생성.
- 막힌: —
