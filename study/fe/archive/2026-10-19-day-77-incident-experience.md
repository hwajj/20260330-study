# Day 77 · 장애 경험 — **완료**

SSOT 노트: [../77-day-77-incident-experience.md](../77-day-77-incident-experience.md)

## active 체크

- [x] 장애 스토리 — **탐지 → 완화 → 근본 원인 → 재발 방지**
- [x] FE 관점 incident — JS throw·white screen·API 5xx·CDN·캐시
- [x] Error Boundary·Sentry·RUM으로 **탐지 경로** 말하기
- [x] 롤백 vs hotfix — 판단 기준·시간축
- [x] 커뮤니케이션 — PM/CS/BE 동기화 한 줄
- [x] 포스트모템 — blameless·action item 2개
- [x] Day 76 결정과 연결 — 배포·관측이 있었/없었을 때
- [x] **통과선** — 장애 1건 2분 (STAR S/T 위주)

## 정리

### 한 줄

장애 경험은 **언제·누가·어떻게 알았는지**, **사용자 영향 범위**, **FE에서 한 완화/수정**, **재발 방지(action item)** 를 blameless하게 2분 안에 말하는 연습이다.

### 핵심

- **원문 보강**: 커리큘럼은 키워드만 — FE는 **런타임 에러·hydration mismatch·잘못된 배포 asset·API 계약 깨짐·CORS/캐시**가 흔한 incident 축.
- **탐지**: 사용자 CS → Sentry spike → RUM 급격한 이탈 → 배포 직후 상관 — “우연히 발견”보다 **알람/대시보드**가 설득력 있다.
- **완화**: feature flag off, CDN 이전 버전, Error Boundary fallback, API read-only — **전체 rollback** vs **국소 hotfix** 트레이드오ff.
- **FE 디버깅**: minify stack → **소스맵+release**(Day 14-2), reproduce staging, bisect 배포.
- **근본 원인**: null 가정·optional chaining 누락·타입 drift·환경 변수·third-party — “human error” 한 줄로 끝내지 않고 **시스템적으로 왜 통과했는지**(리뷰·테스트 gap).
- **재발 방지**: E2E 한 경로, contract test, Sentry alert rule, 배포 checklist REAL only analytics — **측정 가능한** action 2개.
- **협업**: BE 장애 vs FE 장애 구분, **status 한 줄** 공유, incident 종료 후 포스트모템 문서.

### 흐름

```
Incident timeline
  T0 배포/변경
  T1 탐지 (Sentry/CS/RUM)
  T2 완화 (rollback/flag/fallback)
  T3 root cause (stack·API·config)
  T4 fix forward + 검증
  T5 postmortem — action items · owner · due
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 버그 vs incident | 1명 vs 다수·매출·SLA |
| hotfix vs proper fix | 당장 복구 vs 근본 |
| rollback vs forward fix | 속도 vs 데이터 migration |
| FE vs BE 원인 | UI throw vs 500 — 증거로 말함 |
| “제 잘못” vs blameless | 책임 vs 시스템 개선 |
| 장애 vs near-miss | 실제 영향 vs 알람만 — 둘 다 OK |

### 실무 연결

- **Sentry + source map** 없으면 incident MTTR가 늘어난다 — Week 14-2와 한 세트.
- **Error Boundary**(Day 50) — white screen 전체 vs 영역 fallback.
- **REAL only GA4** — staging에서 재현 안 되는 “운영만 터짐” 패턴 설명.

### 면접 한 방

- **Q:** 프론트에서 겪은 장애(또는 near-miss)를 시간 순으로 말해 달라.
- **답:** 배포 직후 Sentry에서 특정 route에서 TypeError spike가 났다. CS도 동시에 접수됐다. 우선 이전 release로 rollback했고, 소스맵으로 특정 optional 필드 가정이 깨진 commit을 찾았다. hotfix 후 staging 재현 케이스를 E2E에 추가했고, 같은 패턴 alert를 걸었다. BE 500이 아니라 FE throw였음을 Network 탭으로 분리했다.

### 통과선 스크립트

1. 영향 — 누구·어떤 화면·얼마나.
2. 탐지 — Sentry/CS/RUM/배포 상관.
3. 완화 — rollback/flag/fallback.
4. 원인 — stack·release·재현.
5. 수정 — hotfix + proper fix.
6. 재발 방지 — action 2개(테스트·알람·프로세스).
7. 협업 — BE/PM/CS 한 줄.
8. blameless 톤.

## wrap 요약

- go 정리본: `study/fe/77-day-77-incident-experience.md` 완료.
- 핵심: 탐지·완화·재발방지 2분.
- 다음 start/go: `day-78-performance-improvement` · 노트는 다음 go에서 생성.
- 막힌: —
