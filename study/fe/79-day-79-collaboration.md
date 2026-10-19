# Day 79 · 협업

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-15-career/day-79-collaboration.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] 협업 스토리 — **역할·갈등·합의·결과**가 보이게
- [x] PM/디자인 — 요구 모호할 때 **질문·범위·MVP**
- [x] BE — API 계약·에러 형식·일정·호환
- [x] FE 동료 — PR 리뷰·코딩 규약·지식 공유
- [x] 문서·티켓 — 재현 steps·스크린·결정 log
- [x] 기술 설명 — 비개발에게 **비유·영향** 1줄
- [x] Day 75~78 에피소드에 **팀 맥락** 입히기
- [x] **통과선** — 협업 1건 2분

## 정리

### 한 줄

협업 경험은 “친화적이다”가 아니라 **요구가 흔들릴 때 범위를 고정했고**, **BE와 계약을 맞췄고**, **리뷰/문서로 팀 비용을 줄인** 구체 사건 1건을 말하는 것이다.

### 핵심

- **원문 보강**: 커리큘럼 키워드만 — 면접은 cross-functional **한 프로젝트** 안에서 FE가 **조율자**였던 순간.
- **PM/기획**: Figma vs 실제 API gap, edge case(빈 목록·권한·오프라인) — **질문 리스트**·acceptance criteria·“이번 스프린트 제외” 명시.
- **디자인**: 토큰·breakpoint·a11y — “디자인 그대로” vs **기술 제약**(INP·번들) 협의, design system 컴포넌트로 수렴.
- **BE**: OpenAPI/예시 payload·에러 code·pagination·idempotency — **breaking change** 일정과 FE adapter layer.
- **FE 팀**: PR 크기·review turnaround·pair on incident — **표준**(URL codec, Query key) 문서화.
- **CS/운영**: incident·릴리즈 노트·known issue — 사용자 영향 번역.
- **갈등**: 일정 vs 품질 — 데이터·prototype·RUM으로 **우선순위 합의** (감정 서술 최소).

### 흐름

```
요청 들어옴 (모호한 "등록 개선")
  → FE: user flow · API mock · risk list 작성
  → PM: scope cut · 우선순위
  → BE: contract freeze date
  → Design: component mapping to shared/ui
  → 개발 · PR · QA
  → 릴리즈 · CS FAQ · (선택) GA4 이벤트로 검증
  → 회고: what worked in comms
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 협업 vs 친화 | 프로세스·결과 vs 성격 |
| 슬랙 많이 vs effective | 메시지 vs decision log |
| “요구대로” vs pushback | blind build vs scope negotiation |
| BE blame vs joint debug | 500만 vs Network+payload |
| solo hero vs team | I did all vs my part + unblock |
| 문서 vs 구두 | onboarding cost |

### 실무 연결

- **GA4 이벤트 스키마** — PM step 이름 ↔ dev event name ↔ Looker 차트: 3자 alignment (`notes/2026-06-09_*`).
- **shared hook 패키지** — 팀 URL 규칙을 코드+리뷰로 고정.
- adjuster **인가 4층** — BE role API·FE loader·QA 시나리오 협업 (Day 36).

### 면접 한 방

- **Q:** 기획·디자인·백엔드와 의견이 갈렸을 때 어떻게 맞췄나?
- **답:** 등록 퍼널에서 step 정의가 URL·API·디자인 mock 간 어긋났다. FE가 flow diagram과 이벤트/필드 매트릭스를 만들어 PM과 scope를 “이번 릴리즈 3 step”으로 잘랐다. BE와는 pagination·error body를 문서로 freeze했고, 디자인은 shared Button/Modal로 맞춰 QA 시간을 줄였다. 릴리즈 후 GA4 퍼널로 기획 KPI를 같이 봤다.

### 통과선 스크립트

1. 프로젝트·역할 한 줄.
2. 갈등/모호함이 **무엇**이었는지.
3. 내가 한 **조율 행동**(문서·질문·mock).
4. 상대 역할(PM/BE/Design) 1줄씩.
5. 합의된 scope·일정.
6. 결과 — 출시·지표·CS.
7. 팀적으로 잘한 점 1 · 다음에 바꿀 점 1.
8. Day 80 STAR의 **S/T**에 팀 맥락 포함.
