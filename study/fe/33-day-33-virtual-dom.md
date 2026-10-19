# Day 33 · Virtual DOM

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-05-react-rendering/day-33-virtual-dom.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Virtual DOM = **가벼운 UI 설명 객체** (실제 DOM 아님) 정의
- [x] VDOM이 빠른 이유(항상?) vs **불필요한 직접 DOM 조작 회피**로 말하기
- [x] VDOM ↔ Reconciliation ↔ Fiber 한 줄 연결
- [x] **W6 화** adjuster **QueryCache onError** — Forbidden/승인대기 분기
- [x] interview Q: Query vs Redux / 다층 인가에서 Query 층 역할
- [x] **차이·함정** — VDOM 만능론 / Query onError vs Error Boundary
- [x] **통과선** — VDOM 30초 + QueryCache onError 왜 Query인가

## 정리

### 한 줄

Virtual DOM은 화면을 **JS 객체 트리로 기술**해 React가 diff·커밋하게 하는 모델이고, adjuster에서는 **서버가 거절한 인가 부작용**을 UI 가드가 아니라 `QueryCache.onError`에서 받아 전역 분기한다.

### 핵심

- VDOM(또는 요소 트리): `{ type, props, children }` 수준의 **의도된 UI 스냅샷**. 브라우저 노드 API보다 다루기 쉽고, 프레임워크가 배치·재사용 전략을 쥐게 한다.
- “VDOM이 무조건 빠르다”는 과장. 이득은 **선언적 UI + 일관된 업데이트**에 가깝고, 잘못된 key·과도한 리렌더는 여전히 비싸다.
- 현대 React는 “순수 VDOM 스택”보다 **Fiber 단위 작업**으로 같은 아이디어를 구현한다(→ Day34). 말로는 “가상 트리로 맞춰 실제 DOM만 패치”.
- **QueryCache.onError**: 모든 Query 실패의 공통 훅. 403 Forbidden·승인대기 커스텀 에러를 여기서 분기 → 로그아웃/대기 화면 전환 등.
- 근거: “API가 거부한 시점”의 인가. loader/layout은 **네비게이션 전**, Query는 **데이터 요청 후 서버 최종 상태**.

### 흐름

```
JSX → 요소 트리(VDOM 계열)
  → reconcile / Fiber work
  → commit → 실제 DOM

useQuery fetch 실패
  → QueryCache.onError(err)
  → Forbidden? → 권한 없음 UX
  → 승인대기 에러? → 대기 플로우
  → 그 외 → 로컬/공통 처리
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| VDOM vs 실제 DOM | 설명용 객체 vs 브라우저 노드 |
| “직접 DOM이 항상 느림” | 미세 조작은 빠를 수 있음 — 복잡도·일관성이 이슈 |
| QueryCache.onError vs 컴포넌트 onError | 전역 정책 vs 화면 국소 |
| Query onError vs Error Boundary | 비동기 요청 실패 vs **렌더 throw** 경계 |

### 실무 연결

- **열:** `log/backoffice-adjuster-front/interview-*.md` + flashcard **B6**.
- resume 불릿: QueryCache에서 Forbidden/승인대기 — “데이터 계층의 인가 부작용”을 UI 가드와 분리.
- shared `useHmcError`(월)는 **mutation·코드 테이블**, QueryCache는 **조회 전역 인가 부작용** — 둘 다 “에러”지만 층이 다름.

### 면접 한 방

- **Q:** Virtual DOM이 뭐고, 왜 쓰나? / QueryCache 전역 onError는 왜 필요한가?
- **답:** UI를 JS 트리로 두고 diff 후 DOM만 패치해 선언적으로 맞춘다. 무조건 속도 마법이 아니라 업데이트 모델이다. 인가·승인 거부는 서버가 최종이므로 라우트 가드만으론 부족하고, Query 실패를 QueryCache에서 받아 전역 UX로 닫는다.

### 통과선 스크립트

1. VDOM = UI 스냅샷 객체.
2. 이득 = 선언적·일관된 패치 (만능 성능 X).
3. Fiber로 이어진다고 한 줄.
4. QueryCache.onError = 조회 실패 전역.
5. Forbidden/승인대기 = 서버 최종 인가.
6. Error Boundary와 한 문장 구분(금요 통과 축).
