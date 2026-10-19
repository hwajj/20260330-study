# Day 42 · useRef

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-06-react-hooks/day-42-use-ref.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] ref = **리렌더 없이** 유지되는 가변 박스
- [x] DOM ref vs 값 보관 ref 두 용도
- [x] ref 변경은 렌더를 안 일으킴 ↔ state와 역할 분리
- [x] stale 회피·이전값 기억·AbortController 보관 패턴
- [x] **실무:** nursing AGENTS Query 패턴 — 요청 취소를 ref로?
- [x] uncontrolled input의 ref 읽기와의 연결(Day49 예고)
- [x] **통과선** — “언제 ref, 언제 state”

## 정리

### 한 줄

`useRef`는 렌더 간에 살아 있는 **가변 상자**로, DOM 핸들이나 “화면과 무관한 최신값·핸들”을 담을 때 쓰고, 바꾸어도 리렌더하지 않는다.

### 핵심

- `ref.current` 수정 ≠ setState. UI에 반영하려면 state/props가 바뀌어야 한다.
- DOM: `ref={el}`로 포커스·스크롤·측정. 레이아웃 읽기는 Effect/레이아웃 Effect 타이밍 주의.
- 값 ref: 최신 callback, 이전 props, interval id, **AbortController**, “이미 전송 중” 플래그.
- 초기화: `useRef(null)` 후 Effect에서 세팅, 또는 lazy init 패턴. 렌더 중 `current`를 읽/쓰며 분기를 만들면 버그 소지.
- Query 레이어에서는 컴포넌트 unmount 시 진행 중 요청을 끊거나,  Strict Mode 이중 mount에 대비해 컨트롤러를 ref에 두는 식이 흔하다.

### 흐름

```
render → 같은 ref 객체 재사용
이벤트/Effect → ref.current = x  (리렌더 없음)
필요 시 setState로 화면 갱신
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| ref vs state | 리렌더 X vs 리렌더 O |
| ref vs 클로저 변수 | 렌더 간 유지 vs 렌더마다 새로 |
| DOM ref vs 값 ref | 엘리먼트 vs 임의 뮤터블 |
| 렌더 중 current 분기 | 동시성·일관성 깨지기 쉬움 |

### 실무 연결

- **nursing AGENTS Query 패턴** + workflow 테스트: 목록 Query는 키·invalidate가 본체이고, ref는 **부가**(abort, 포커스 복귀, 스크롤 위치). Day42는 “Query 패턴 문서에서 부수 핸들을 어디에 두는지”를 ref 관점으로 읽는다.
- 테스트 red→green 때 타이머/구독이 있으면 ref+cleanup이 검증 포인트.

### 면접 한 방

- **Q:** useRef랑 useState 언제 갈라 쓰나?
- **답:** 화면에 보여야 하면 state. DOM 접근·최신값 보관·타이머 id처럼 리렌더 없이 유지할 값이면 ref. ref만 바꾸면 UI는 안 바뀐다.

### 통과선 스크립트

1. ref = 가변·리렌더 없음.
2. DOM / 값 두 용도.
3. stale 회피에 latest ref.
4. AbortController를 current에.
5. nursing Query: 키·캐시가 본게임, ref는 주변 장치.
