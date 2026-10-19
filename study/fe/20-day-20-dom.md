# Day 20 · DOM

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-03-typescript-dom/day-20-dom.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] day-20-dom.md 끝까지 읽기
- [x] **curriculum 세 줄** — DOM Tree / Node vs Element / Query·Manipulation
- [x] **면접 Q** — childNodes vs children, getElementById vs querySelector
- [x] W4 수 — dailycare `HistoryPage` + `useJobList` **keepPreviousData**
- [x] 탭 전환 시 “빈 DOM 깜빡임” vs 이전 목록 유지 UX 연결
- [x] **차이·함정** — 잦은 DOM 조작 ↔ Reflow (Day 22)
- [x] **통과선** — 트리·선택자·조작 비용 + keepPreviousData 한 줄

## 정리

### 한 줄

DOM은 HTML을 트리로 올린 객체 모델이고, Node⊃Element로 탐색·조작하며, 잦은 변경은 Reflow/Repaint를 부르므로 **배칭·이전 데이터 유지**로 체감 깜빡임을 줄인다.

### 핵심

- **DOM Tree**: 파서가 만든 문서 객체. JS는 `document` API로 읽고 바꾼다.
- **Node vs Element**: Node는 텍스트·주석 포함 상위 개념. Element는 태그. `childNodes`(Node) vs `children`(Element만).
- **Query**: `getElementById`는 id 전용·빠름. `querySelector(All)`은 CSS 선택자·유연. `querySelectorAll`은 **정적** NodeList(이후 DOM 변경 미반영).
- **Manipulation**: create/append/remove, class·attribute. DocumentFragment로 삽입을 모아 비용을 줄인다.
- React 세계에서도 최종 커밋은 DOM. 목록이 통째로 비었다가 채워지면 사용자는 **빈 화면 깜빡임**으로 느낀다 — 데이터 계층에서 이전 결과를 붙잡는 이유가 DOM UX와 직결.

### 흐름

```
HTML 파싱 → DOM Tree
  → querySelector / getElementById 로 노드 확보
  → createElement / append / classList …
  → (비용) Layout/Paint 유발 가능 → Day 22
```

탭+목록 UX (dailycare):

```
URL ?tab=… → filter 변경 → queryKey 변경
  → keepPreviousData: 새 fetch 동안 이전 리스트 DOM 유지
  → 캐시 도착 후 교체 (빈 테이블 플래시 감소)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Node vs Element | 텍스트 포함 상위 vs 태그만 |
| childNodes vs children | NodeList(혼합) vs HTMLCollection(요소) |
| getElementById vs querySelector | id 특화 vs 선택자 일반 |
| live vs static 컬렉션 | HTMLCollection 일부 live / querySelectorAll static |
| React 리렌더 = DOM 전부 재생성? | 아님 — reconcile 후 필요한 노드만 패치 |

### 실무 연결

- **dailycare `HistoryPage` + `useJobList`**: `?tab=inprocess|complete`로 탭. filter마다 queryKey 분리 + **`keepPreviousData: true`** — 새 filter fetch 중 **이전 탭 목록을 그대로 보여** 빈 화면·깜빡임 감소.
- `isLoading`은 캐시 없을 때(또는 previous + fetching), `isError`는 **보여줄 캐시가 없을 때만** — 이전 DOM을 유지하며 흔들림을 숨기는 패턴.
- adjuster resume의 계층·anti-pattern 절과 맞닿음: 서버 상태(RQ)와 화면 깜빡임을 한 레이어에 섞지 말고, **캐시 정책으로 DOM 안정**을 산다.
- W4 수 토이: 탭 전환에 keepPreviousData(또는 v5 `placeholderData: keepPreviousData`) 적용.

### 면접 한 방

- **Q:** Node와 Element 차이와, 목록 탭 전환 시 깜빡임을 줄이려면?
- **답:** Node는 텍스트·주석까지, Element는 태그. children은 Element만. 탭마다 queryKey가 바뀌면 캐시가 비어 보여 빈 DOM이 잠깐 보일 수 있어, keepPreviousData로 이전 목록을 유지한 채 fetch하고, isError도 캐시 없을 때만 노출한다.

### 통과선 스크립트

1. DOM = 문서의 트리 객체 모델.
2. Node ⊃ Element, childNodes vs children.
3. id 조회 vs CSS 선택자.
4. 조작은 Reflow 비용 — 모아 바꾸기.
5. (회사) HistoryPage: filter별 key + keepPreviousData → 탭 전환 깜빡임 방지.
