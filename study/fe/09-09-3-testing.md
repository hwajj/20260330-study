# 09-3 · 테스트 (단위 · RTL · E2E)

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-09-quality/09-3-testing.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] 테스트 피라미드 — 단위 많이 · E2E 적게
- [x] 단위 테스트 — 순수 함수·훅 (Vitest/Jest)
- [x] RTL — 사용자 관점, `getByRole` 우선
- [x] E2E — Playwright/Cypress 핵심 시나리오
- [x] MSW — 네트워크 계층 모킹
- [x] `getByRole` vs `getByTestId` 이유
- [x] 무엇을 단위 vs E2E로 나눌지
- [x] **통과선** — 피라미드 / RTL / MSW 30초

## 정리

### 한 줄

**피라미드**에 따라 로직은 빠른 단위·UI는 RTL(역할·라벨)·핵심 여정만 E2E로 두고, API는 **MSW**로 앱 코드 안 바꾸고 시나리오를 흔든다.

### 핵심

- **피라미드**: 아래(단위) 넓게 — cheap·fast·many. 위(E2E) 좁게 — slow·flaky 비용 큼. 중간 통합은 팀마다 비율 조정.
- **단위**: 순수 함수, reducer, 커스텀 훅( `@testing-library/react-hooks` / renderHook). 엣지·분기 많은 곳에 ROI 높음.
- **RTL 철학**: “구현 디테일”(state className, testId 남발) 대신 **사용자가 보는·하는 것**으로 assert. `getByRole`, `getByLabelText` 우선 → a11y도 같이 검증, 리팩터에 resilient.
- **E2E**: 로그인→핵심 업무→결제 등 **돈 되는 경로** 소수. 환경·데이터·시간 비용 큼.
- **MSW**: Service Worker(또는 node)에서 fetch 가로채기. 성공·404·500·지연을 테스트마다 선언 — axios/fetch wrapper 수정 없이.

### 흐름

```
기능 추가
  → 순수 로직? → unit (Vitest)
  → 컴포넌트? → RTL + MSW handler
  → 크리티컬 path? → E2E 1~2 spec
RTL query 순서: role → label → text → testId (최후)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| unit vs E2E | 빠른 분기 vs 전체 브라우저 |
| RTL vs Enzyme 스타일 | 행동 vs 내부 state |
| getByRole vs testId | 접근성·유지보수 vs 구현 고정 |
| MSW vs jest.mock axios | 네트워크 경계 vs 모듈 치환 |
| snapshot 남용 | 의미 없는 diff vs 행동 assert |

### 실무 연결

- backoffice-shared 패키지: 유틸·훅 unit, 앱: 목록 필터 RTL + MSW list API.
- 09-2 a11y와 연결: role 기반 query 실패 = 라벨/버튼 마크업 버그 신호.
- CI: unit+RTL on PR, E2E nightly 또는 release 전.

### 면접 한 방

- **Q:** RTL이 `getByTestId`보다 `getByRole`을 권하는 이유?
- **답:** 사용자는 testId를 모르고 버튼·라벨로 인지한다. role/label로 찾으면 접근성 결함을 early에 잡고, className·구조 리팩터에 테스트가 덜 깨진다.

### 통과선 스크립트

1. 피라미드 — 단위 많이, E2E 핵심만.
2. 단위 = 로직·훅; E2E = 사용자 여정.
3. RTL = 사용자 관점 query.
4. getByRole 우선 이유(a11y+안정).
5. MSW = 네트워크 가로채기, 다양한 응답.
6. testId는 최후 수단.
