# Day 76 · 프로젝트 회고 ② — **완료**

SSOT 노트: [../76-day-76-project-retrospective-2.md](../76-day-76-project-retrospective-2.md)

## active 체크

- [x] Day 75 회고에 **기술 결정·부채·마이그레이션** 층 추가
- [x] Before/After 또는 지표 1개 — 추상 회고 금지
- [x] API·계약 변경 — BE와 버전·호환·롤아웃
- [x] 레거시와 병행 — strangler·feature flag·단계적 전환
- [x] 테스트·QA — 회귀를 막은 **구체 장치** 1개
- [x] 릴리즈·관측 — 배포 후 GA4/RUM/Sentry로 검증 (Week 14)
- [x] 트레이드오ff 표 — 선택지 A/B와 포기한 것
- [x] **통과선** — 결정 1건 2분 STAR 재료

## 정리

### 한 줄

회고 ②는 아키텍처 그림을 넘어 **한 가지 기술 결정**을 Before/After·지표·롤백 가능성과 묶어, “다른 선택은 뭐였고 왜 안 했는지”까지 말할 수 있게 다듬는다.

### 핵심

- **원문 보강(Week 15)**: 커리큘럼 본문은 키워드만 있으므로, Day 75 **경계·상태**에 **시간축**을 더한다 — 초기 구현 → 문제 발견 → 리팩터/마이그레이션 → 현재.
- **좋은 에피소드 조건**: (1) 본인 기여 구간이 분명 (2) **대안 2개**가 있었음 (3) 결과가 숫자·관측·CS 티켓으로 말 가능 (4) 실패·부분 성공도 포함 가능.
- **마이그레이션**: 한 번에 교체 vs **strangler** — 등록 리뉴얼·GA4 커스텀 이벤트 추가·React Query 전환처럼 **병행 기간**과 플래그/환경 분리(REAL only)를 말한다.
- **API·타입**: OpenAPI/공유 타입·어댑터 — BE 스키마 변경 시 FE **한 레이어**에서 흡수, feature 전역 수정 최소화.
- **품질**: E2E 한 경로·Storybook·계약 테스트·에러 boundary + Sentry — “테스트 많이”가 아니라 **어떤 회귀를 막았는지**.
- **관측 연결**: 배포 후 “느려졌다/에러 난다”를 **RUM p75·Sentry issue spike**로 확인했다는 한 줄이 신뢰도를 올린다.

### 흐름

```
에피소드 1개 선택 (예: 목록 Query 전환 · URL 필터 · 등록 트래킹)
  → Situation: 당시 pain (복제·race·퍼널 blind)
  → Options: A 유지 / B 부분 / C 구조 변경
  → Decision + tradeoff (일정·리스크·학습비용)
  → Action: PR 단위·플래그·롤아웃
  → Result: 번들·LCP·에러율·개발 속도·정성 1줄
  → Retrospect: 다음 프로젝트면 뭘 더 일찍 할지
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 회고 ① vs ② | 구조·경계 vs 결정·시간·지표 |
| 리팩터 vs rewrite | 점진 strangler vs 빅뱅 리스크 |
| “어려웠다” vs 근거 | 감정 vs Before/After |
| 팀 성과 vs 본인 기여 | we만 vs 내가 한 A·검증 B |
| 완벽 성공만 vs 학습 | 실패·롤백도 설득력 있음 |
| 기술 선택 vs 비즈니스 | INP vs 전환율 연결 한 줄 |

### 실무 연결

- regist **GA4 커스텀 이벤트** — pageview 한계 → 이벤트 레이어 추가(Week 14·care 노트).
- **useParamState** race — location merge + 배포 후 목록 필터 CS 감소(가설) 같은 Result 문장 템플릿.
- **QueryCache + loader 인가**(Day 36) — “API 한 번·UI gate” 결정 회고 예.

### 면접 한 방

- **Q:** 프로젝트에서 가장 어려운 기술 결정 한 가지와, 다른 선택지는 무엇이었나?
- **답:** (예) 목록 상태를 전역 store에서 URL+React Query로 옮겼다. 당시엔 store 유지(빠름) vs URL SSOT(공유·뒤로가기) vs 전면 rewrite가 있었고, 일정상 strangler로 feature부터 옮겼다. merge race는 location 기준으로 해결했고, 배포 후 Sentry/CS로 필터 유실 재발을 확인하지 않았다 — 다음엔 E2E 한 경로를 더 일찍 넣겠다.

### 통과선 스크립트

1. 회고 ② = **결정 1건** 깊게.
2. Before/After 또는 지표 1개 필수.
3. 대안 A/B + 포기 이유.
4. 마이그레이션·플래그·환경(REAL) 언급 가능.
5. 테스트/관측으로 **검증**했다.
6. 본인 Action 구체적으로.
7. Day 77~80 STAR·장애·성능·협업으로 **같은 에피소드 재사용** 가능.

## wrap 요약

- go 정리본: `study/fe/76-day-76-project-retrospective-2.md` 완료.
- 핵심: 기술 결정 Before/After·대안.
- 다음 start/go: `day-77-incident-experience` · 노트는 다음 go에서 생성.
- 막힌: —
