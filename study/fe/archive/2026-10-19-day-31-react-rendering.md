# Day 31 · React Rendering — **완료**

SSOT 노트: [`../31-day-31-react-rendering.md`](../31-day-31-react-rendering.md)

## active 체크

- [x] React “render” = 컴포넌트 함수 실행 → UI 설명(엘리먼트 트리)
- [x] render ≠ 브라우저 Layout/Paint (Day03–04와 경계)
- [x] props/state/context 변경 → 리렌더 트리거
- [x] render 단계 vs commit(DOM 반영) 한 줄
- [x] 불필요 리렌더 ≠ 무조건 느림 / DOM 커밋이 비쌀 때
- [x] **주말** — W5 dailycare 방어 주간 복기 + Day32+ 예고
- [x] **면접 Q** — 리렌더란? / 브라우저 렌더와 차이
- [x] **통과선** — React render 파이프라인 30초 + 주말 한 줄

## 정리

### 한 줄

React Rendering은 **상태 변화로 컴포넌트 함수를 다시 돌려 UI 트리를 계산(render)** 하고, 필요할 때만 **DOM에 커밋**하는 과정이며, 브라우저 CRP의 Layout/Paint와는 **다른 층**이다.

### 핵심

- **Render(React)**: `Component(props,state)` → React 엘리먼트 트리(설명서). 순수하게 계산하는 단계로 보는 게 면접 기본.
- **Commit**: 계산 결과를 실제 DOM에 반영. 여기서야 브라우저 스타일/레이아웃이 따라올 수 있음.
- **트리거**: `setState`/훅 state, props 변경, context, 부모 리렌더(기본은 자식도 재실행).
- **기본 동작**: 부모 리렌더 → 자식 함수도 다시 호출(메모이제이션 없으면). “호출됨” ≠ “DOM이 전부 바뀜”(이어지는 Reconciliation/Day32).
- **비용**: JS 계산 비용 + commit 시 DOM 변이. 큰 리스트·레이아웃 thrash와 겹치면 Day04 이야기로 확장.
- Week5 지도: 31 render 입문 → 32 reconcile → 33 VDOM → 34 Fiber → 35 batch → 36 key → 37 Query.

### 흐름

```
이벤트/데이터
  → setState
  → React render phase (함수 컴포넌트 재실행, 트리 계산)
  → reconcile (다음 Day: 이전 트리와 diff)
  → commit → DOM
  → 브라우저 Style/Layout/Paint/Composite (필요 시)
```

주말(일) 복기:

```
W5 월~금 dailycare 방어 스토리
  + Week4 네트워크·렌더 전략 키워드
  → “회사 코드에서 state 바뀌면 뭐가 다시 도나?”로 Day31 연결
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| React render vs 브라우저 render | UI 트리 계산 vs CRP 픽셀 |
| 리렌더 vs Reflow | 함수 재실행 vs 기하 재계산 |
| render vs commit | 계산 vs DOM 반영 |
| 리렌더 횟수 vs 체감 | 호출 많아도 DOM diff가 작으면 괜찮을 수 있음 |
| CSR 첫 로드 vs 리렌더 | 번들·마운트 vs 이후 갱신 |

### 실무 연결

- dailycare: URL `?tab=`·Query 결과·Popup state 변경 → **해당 서브트리 리렌더**. `keepPreviousData`는 “로딩 중에도 이전 props/data로 그리기”.
- community: 소켓 이벤트 → 목록 행 state/Redux unread → Navbar·리스트 리렌더 범위가 갈림.
- adjuster(예고): Query 캐시 갱신 vs Redux persist — **무엇이 리렌더 트리거인지** 소유권 질문.
- 주말: 모의에서 “결제 성공 invalidate 후 어떤 컴포넌트가 다시 그려지나”를 render 언어로.

### 면접 한 방

- **Q:** React에서 리렌더란 무엇이고, 브라우저 렌더링과 어떻게 다른가?
- **답:** 리렌더는 주로 state/props 변화로 컴포넌트 함수가 다시 실행되어 UI 트리를 다시 계산하는 것이다. 그 결과가 DOM에 커밋된 뒤에야 브라우저가 스타일·레이아웃·페인트로 픽셀을 갱신할 수 있다. 리렌더가 많다고 항상 Reflow인 것은 아니고, 실제 DOM/스타일 변경 범위가 성능을 가른다.

### 통과선 스크립트

1. React render = 함수로 UI 설명 계산.
2. commit = DOM 반영.
3. 트리거: state/props/context/부모.
4. 리렌더 ≠ 곧 Layout.
5. Day32부터 diff·key·Fiber로 이어짐.
6. dailycare 탭·Query가 리렌더 입력.
7. invalidate → 새 데이터 → 다시 그림.
8. W5 주간 방어 스토리 한 줄 복기.
9. 주말 모의에 “왜 그 화면이 다시 도는지” 한 문장.
10. 다음: Reconciliation.

## wrap 요약

1. Day31 go — React render≠브라우저 CRP + W5 주말 복기.
2. Week5 입문 Day 완료.
3. 다음: day-32-reconciliation

- **막힌:** —
- **다음 start:** `day-32-reconciliation` · `study/fe/32-day-32-reconciliation.md` · (BATCH notes-only · plan/active 미갱신)