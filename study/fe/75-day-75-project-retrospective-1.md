# Day 75 · 프로젝트 회고 ①

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-15-career/day-75-project-retrospective-1.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] 프로젝트 회고 — “무엇을”보다 **왜 그 결정**을 말한다
- [x] Feature 기반 폴더 — 라우트·API·UI 기능 단위 응집
- [x] 공용(`shared`/`ui`) vs feature 전용 경계
- [x] Composition — props·children·slots, 상속 암기 X
- [x] Layered/FSD — 교리 암기보다 **의존 방향** 한 줄
- [x] 상태 위치 — 서버(RQ) / URL / 클라이언트 UI (Day 37·08-2)
- [x] 실패 경험 — shared에 feature 로직이 섞인 커플링 풀기
- [x] **통과선** — 경계·의존·상태·Composition 3분

## 정리

### 한 줄

면접·회고에서는 폴더 트리 나열보다 **공용 vs feature 경계**, **shared ← feature 단방향 의존**, **상태 3분할**, **Composition으로 화면 조립**을 “왜 그랬는지”와 함께 3분 안에 말한다.

### 핵심

- **회고 목적**: 기능 목록이 아니라 **트레이드오프** — pages-only 초기 구조에서 API·폼이 복제됐을 때 feature로 모은 이유, 공용 컴포넌트를 **언제 올리고 내렸는지**.
- **Feature 응집**: 한 사용자 여정(등록·목록·승인)의 route, hook, API wrapper, UI를 **한 feature 아래** — 다른 feature가 필요하면 **shared contract**만 가져간다.
- **공용 경계**: design system/ui는 **시각·접근성·범용 interaction**만. variant가 **도메인 분기**를 먹기 시작하면 feature 전용으로 **내린다**.
- **의존 방향**: `shared → entities → features → pages`를 이름 외우기보다 **feature가 shared를 import하고, shared가 feature를 import하지 않는다**가 핵심.
- **상태 위치**: 서버 데이터는 React Query, 공유·복원 UI는 URL, 폼·모달·탭 임시는 로컬/Zustand — “왜 Redux에 목록 API를 넣지 않았나”에 답할 준비.
- **패턴 이름**: Observer는 이벤트/스토어, Adapter는 SDK 래핑처럼 **문제에서 역방향으로 이름** — GoF 목록 암기 답변은 약하다.
- **Day 76 재료**: 기술 부채·마이그레이션·테스트·릴리즈 한 건을 **숫자 또는 Before/After**로 골라 둔다.

### 흐름

```
회고 준비
  → 이 프로젝트에서 사용자 여정 1~2개 고르기
  → 각 여정: 폴더/feature 이름 + 의존 화살표(sketch)
  → 상태: API / URL / UI 각각 어디에 두었는지
  → 실패 1건: shared 비대화·복제·잘못된 전역 state
  → 조치: split feature · hook 추출 · URL SSOT
  → 3분 스크립트 연습 (면접 Q: 폴더 구조?)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| pages-by-route vs feature | 화면 복제 vs 기능 응집 |
| Atomic/FSD 암기 vs 의존 방향 | 레이어 이름 vs import 규칙 |
| 공용 ui vs feature 컴포넌트 | 재사용 vs 도메인 분기 |
| Composition vs inheritance | props/slots 조립 vs 클래스 상속 |
| “패턴 쓴다” vs “문제 해결” | 이름 나열 vs 구체 트레이드오ff |
| 폴더 설명 vs 회고 | tree vs 왜·대안·결과 |

### 실무 연결

- backoffice **feature 패키지**·`@backoffice-fe/hook`은 shared 계층 — feature 코드가 hook을 쓰고 hook이 특정 화면을 import하지 않는 그림.
- W8 URL-sync·`useParamState`는 **상태 위치** 회고 예시(목록 필터 = URL SSOT).
- adjuster **4층 인가**(Day 36)는 “경계” 회고와 같은 축 — loader·QueryCache·UI gate.

### 면접 한 방

- **Q:** 폴더 구조를 어떻게 잡았고, 공용 컴포넌트가 비대해지면 어떻게 하나?
- **답:** 기능 단위로 route·API·UI를 묶고, 진짜 공용만 shared/ui로 올렸다. pages만 기준으로 나누면 같은 API·폼이 복제되기 쉽다. 공용이 domain variant를 먹으면 feature로 내리고, shared에는 시각·a11y만 남긴다. 의존은 feature→shared 한 방향이다.

### 통과선 스크립트

1. 회고는 **왜** — 트레이드오ff 한 줄.
2. Feature 응집 — 한 여정의 코드가 같이 움직인다.
3. 공용 경계 — domain 분기가 ui에 들어가면 내린다.
4. 의존 방향 — shared가 feature를 모른다.
5. 상태 3분할 — RQ / URL / UI.
6. Composition — children·slots로 조립.
7. 실패 1건 + 어떻게 풀었는지.
8. Day 76으로 넘길 **숫자 있는** 에피소드 1개 고르기.
