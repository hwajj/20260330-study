# Day 04 · 브라우저 렌더링(2)

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-01-web-js/day-04-rendering-2.md` (파일에 Day3 CRP가 들어 있음 → **Day4 범위는 원문 하단 가이드**: Layout/Reflow·Paint/Repaint·Composite·`transform`/`opacity`) · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Day03 CRP 뒷단 — Layout / Paint / Composite 역할 구분
- [x] **reflow vs repaint vs composite-only** 차이 정리
- [x] `width`/`top` 등과 `transform`/`opacity`가 성능에 다른 이유
- [x] **면접 Q** — “레이아웃 쓰래싱·합성만 바꾸는 CSS” 말하기
- [x] **useParamState boolean 기본값** — `useParamState.spec.ts` L44~ 읽기
- [x] URL 상태 변경 ↔ 리렌더/레이아웃 비용 한 줄 연결
- [x] **통과선** — CRP 전체 + “어떤 변경이 비싼지” 30초

## 정리

### 한 줄

Render Tree 다음 **Layout(기하) → Paint(픽셀) → Composite(층 합치기)** 이고, 어떤 CSS/DOM 변경이냐에 따라 **셋 다 / Paint만 / Composite만** 다시 도는지가 성능의 핵심이다.

### 핵심

- **Layout (Reflow)**: 각 박스의 **위치·크기** 계산. 문서 흐름·폰트·박스 모델에 민감. 한 노드 변경이 조상·형제로 **전파**될 수 있어 비싸다.
- **Paint (Repaint)**: 레이아웃 결과 위에 **색·테두리·그림자·텍스트** 등을 그리는 단계. 기하가 안 바뀌어도 색만 바뀌면 paint는 다시 할 수 있다.
- **Composite**: 레이어(층)를 GPU 쪽에서 **합쳐** 최종 프레임. `transform`·`opacity` 등 **합성 전용** 속성은 레이아웃/페인트를 건너뛰고 층만 움직일 수 있다(브라우저·층 촉진 조건에 따름).
- **레이아웃 쓰래싱**: JS에서 `height` 읽기 → 쓰기 → 다시 읽기를 **번갈아** 하면, 브라우저가 강제 동기 레이아웃을 반복한다. 읽고 쓸 때는 **읽기 묶음 / 쓰기 묶음**으로 나누는 게 기본.
- Day03과의 경계: Day03 = DOM·CSSOM·Render Tree(무얼 그릴지). Day04 = **어떻게 기하·픽셀·층으로 올리는지** + 무엇이 비싼지.

### 흐름

```
Render Tree
  → Layout   (geometry / reflow)
  → Paint    (pixels / repaint)
  → Composite (layers → screen)
```

변경 비용 스펙트럼(대략):

```
DOM 구조·width/height/top/left/font-size …
  → Layout + Paint + Composite   (가장 비쌈)

color / background-color / box-shadow …
  → Paint + Composite            (중간)

transform / opacity (합성 레이어일 때)
  → Composite only               (상대적으로 쌈)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Reflow vs Repaint | 기하 재계산 vs 다시 칠하기 |
| Repaint vs Composite-only | 픽셀 다시 그림 vs 이미 그린 층만 움직임 |
| `visibility:hidden` vs `opacity:0` | 둘 다 “안 보이지만” 레이어·히트테스트·비용 모델이 다름(hidden은 레이아웃 공간 유지) |
| `display:none` | Render Tree 제외 → 레이아웃에서 빠짐(Day03) — 토글 시 큰 레이아웃 비용 가능 |
| React 리렌더 = Reflow? | **아님**. VDOM reconcile 후 실제 DOM/스타일이 바뀌어야 Layout/Paint가 돈다 |

### 실무 연결

- **애니메이션**: `top`/`left` 대신 `transform: translate` — 합성 쪽으로 밀어 프레임 드롭을 줄이는 패턴.
- 큰 테이블·가상 스크롤·모달 오픈 시 DevTools Performance에서 **Layout / Paint** 막대가 길어지면 Day04 이야기다.
- **`useParamState.spec.ts` L44~** (`boolean` 기본값):
  - `Param.boolean()` → URL에 없으면 `get`이 **`null`**
  - `Param.boolean(true|false)` → 기본값 `true`/`false`
  - 요지: 쿼리 문자열 ↔ 타입 있는 상태. URL이 바뀌면 라우터·구독 컴포넌트가 **다시 그리고**, 잘못된 기본값/파싱은 불필요한 리렌더·조건부 UI 토글(레이아웃)로 이어질 수 있다. W2는 이 hook을 깊게 파고, Day04는 “상태가 바뀌면 **브라우저 파이프라인 어디까지** 도는지” 감각을 붙인다.

### 면접 한 방

- **Q:** 레이아웃·페인트·합성은 뭐가 다르고, 애니메에 `transform`을 쓰라는 이유는?
- **답:** Layout은 위치·크기, Paint는 픽셀, Composite는 층 합성이다. `width`/`top` 변경은 레이아웃부터 다시 타기 쉽고, `transform`/`opacity`는 조건이 맞으면 합성만으로 끝나 메인 스레드·레이아웃 비용을 줄일 수 있다. JS에서 스타일 읽기·쓰기를 섞으면 강제 동기 레이아웃(쓰래싱)이 난다.

### 통과선 스크립트

1. Day03: DOM+CSSOM→Render Tree까지 한 줄.
2. Day04: Layout → Paint → Composite 각각 한 단어로.
3. 비싼 변경 예(`width`) vs 싼 변경 예(`transform`) 대비.
4. 레이아웃 쓰래싱 = 읽기/쓰기 교차로 강제 레이아웃.
5. React 리렌더 ≠ 곧 Reflow — DOM 커밋 이후 이야기.
6. (회사) `useParamState` boolean 기본값: 없음=`null`, 명시 기본값=그 값 — URL 상태가 UI·리렌더의 입력이라고 한 줄.

archive: [`archive/2026-10-19-day-04-rendering-2.md`](./archive/2026-10-19-day-04-rendering-2.md)
