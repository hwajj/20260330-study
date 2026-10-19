# Day 41 · stale closure — **완료**

SSOT 노트: [../41-day-41-stale-closure.md](../41-day-41-stale-closure.md)

## active 체크

- [x] 클로저가 “생성 시점 변수”를 붙잡는 이유
- [x] Effect/`setInterval`/이벤트에서 stale이 터지는 재현 시나리오
- [x] 해결 패턴: deps 포함 · functional setState · ref · 최신 핸들러
- [x] **실무:** `list-page.md` 트리 vs `OrderListPage` — 어디서 상태가 닫히는지
- [x] 목록 필터 변경 후 이전 params로 fetch하는 bug 말하기
- [x] RQ는 key 변경으로 stale 요청을 구조적으로 줄임
- [x] **통과선** — stale 한 문장 + 고치는 一手

## 정리

### 한 줄

stale closure는 콜백이 **예전에 캡처한 props/state**로 계속 동작하는 현상이고, deps 누락·장기 살아 있는 구독에서 목록/필터 버그로 잘 드러난다.

### 핵심

- 매 렌더는 그 순간의 state 스냅샷을 가진다. 그 렌더에서 만든 함수는 **그 스냅샷**을 닫는다.
- `useEffect(() => { … count … }, [])` 안 타이머는 영원히 초기 `count`만 본다.
- 고침: (1) deps에 넣기 (2) `setCount(c => c+1)`처럼 **함수형 업데이트** (3) `ref.current = latest`로 읽기 (4) 이벤트는 매 렌더 최신 핸들러에 맡기기.
- 리스트 페이지에서 “에이전트 문서의 레이어”와 “실제 OrderList”를 대조하면, URL params·로컬 state·query 중 **어느 층이 SSOT인지** 안 맞을 때 stale/이중 소스가 난다.

### 흐름

```
render#1 (filter=A) → callback 캡처 A
filter→B, render#2
  그런데 callback이 deps 없이 살아 있음 → 여전히 A로 요청
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| stale vs 캐시 stale | 클로저 옛값 vs RQ 시간 지난 데이터 |
| functional setState | 이전 state 기반, 클로저 우회 |
| ref로 최신값 | 리렌더 유발 없이 최신 읽기 |
| 문서 트리 vs 구현 | 레이어 불일치 = 상태 닫히는 지점 혼선 |

### 실무 연결

- **`docs/@agents/list-page.md` vs OrderListPage**: 문서상 데이터/파라미터 흐름과 실제 페이지 훅 호출 순서를 대照. 필터가 URL(`useListParams`)인데 Effect가 로컬 초기값만 닫고 있으면 Day41 bug.
- 목록 요청은 **현재 params로 만든 queryKey**로만 가게 하면 stale 요청 표면이 줄어든다.

### 면접 한 방

- **Q:** stale closure가 뭐고 어떻게 고치나?
- **답:** 콜백이 과거 렌더의 state를 붙잡은 상태다. deps를 맞추거나 함수형 setState/ref로 최신을 읽고, 서버 목록은 queryKey에 필터를 넣어 “다른 입력=다른 구독”으로 만든다.

### 통과선 스크립트

1. 렌더마다 스냅샷·클로저.
2. `[]`+interval 대표 예.
3. 고침 3종(deps/functional/ref).
4. 리스트: 옛 filter로 fetch = stale.
5. list-page 문서 vs OrderList — SSOT 층 맞추기.

## wrap 요약

1. Day41 go — stale closure + list SSOT.
2. list-page vs OrderList.
3. 다음: day-42 · useRef + AGENTS Query.

- **막힌:** —
- **다음 start:** `day-42-use-ref`
