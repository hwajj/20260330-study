# Day 10 · Scope Chain / Closure

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-02-js-advanced/day-10-scope-closure.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] day-10-scope-closure.md 끝까지 읽기
- [x] Scope · Lexical Scope · Scope Chain · Variable Lookup 연결
- [x] **Closure** — 조건 2가지 + “값 복사”가 아님(LE 참조 유지)
- [x] 데이터 은닉·팩토리·React stale closure 한 줄씩
- [x] Closure ≠ 자동 메모리 누수 · GC와 참조
- [x] **주말 복습** — Day08 EC → Day09 LE → Day10 Scope/Closure 한 사다리
- [x] W2 hook 주말 — 연속 update·이중 hook을 클로저/스냅샷 관점으로 복기
- [x] **통과선** — “이 코드가 뭘 찍나” + Closure 정의 30초

## 정리

### 한 줄

**Scope Chain**은 식별자를 못 찾으면 상위 LE로 올라가는 사다리이고, **Closure**는 그 상위 환경에 대한 접근을 **함수가 살아 있는 동안 유지**하는 현상이다.

### 핵심

- **Scope**: 변수에 접근 가능한 범위. JS는 **Lexical Scope**(선언 위치).
- **Scope Chain**: 현재 → outer → … → global 탐색. Day09 LE 체인의 변수 탐색 이름.
- **Closure 조건**: (1) 내부 함수가 외부 변수(자유 변수)를 참조 (2) 외부 실행이 끝난 뒤에도 내부 함수가 살아 있음.
- **복사 아님**: `count`를 복사해 두는 게 아니라 **같은 outer LE**를 가리킨다. `increase`/`getCount`가 한 `count`를 공유하는 이유.
- **실무**: 모듈형 은닉, `multiplyBy(n)` 팩토리, React 핸들러가 **그 렌더의 props/state**를 닫음 → dependency·함수형 setState로 **stale closure** 방지.
- **GC**: 클로저 참조가 끊기면(`fn=null`) 관련 환경은 회수 가능. 클로저 자체=누수는 아님. 불필요하게 큰 객체를 닫아 두면 오래 잡는 게 문제.

### 흐름

```
Day8  EC: "지금 실행하는 환경"
  ↓
Day9  LE: "변수 + 어디로 갈지"
  ↓
Day10 Scope Chain: "못 찾으면 위로"
  ↓
     Closure: "그 위를 함수가 계속 붙잡음"
```

추적 문제:

```js
let x = "global";
function outer() {
  let x = "outer";
  return function inner() { console.log(x); };
}
const fn = outer();
x = "changed";
fn(); // "outer" — 선언 위치의 x, 전역 재할당과 무관
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Scope vs Closure | 접근 범위 vs 그 범위를 **유지하는** 함수·현상 |
| 값 기억 vs LE 참조 | 면접에서 “복사”라고 하면 감점 위험 → 참조 유지 |
| stale closure | 예전 렌더 값을 닫은 핸들러/effect |
| 클로저 vs 메모리 누수 | 참조가 남아야 유지 · 끊으면 GC 가능 |
| `updateParam`의 location 스냅샷 | 클로저로 낡은 `params`만 믿으면 연속 업데이트 유실 → **동기 진실(href)** 재읽기 |

### 실무 연결

- **React**: `useEffect(() => { … count }, [])`는 마운트 시점 `count`를 닫을 수 있음 → deps 또는 ref/함수형 업데이트.
- **`useParamState` 주말 복기**:
  - `setParams` 콜백의 `prev`와 실제 URL이 어긋나는 것은 “닫힌 예전 search 상태”에 가깝고, **`document.location.href`로 최신 체인을 다시 읽음**.
  - 이중 hook 연속 `setParam1`/`setParam2`도 같은 이슈의 스펙화.
- W1–W2 주말: HTTP·렌더·캐시·저장소(소유 **무엇**) + EC/LE/Closure(런타임 **어떻게 값을 붙잡나**)를 면접에서 층만 섞지 않기.

### 면접 한 방

- **Q:** Closure란 무엇인가요? 메모리 누수를 만드나요?
- **답:** 함수가 선언될 때의 Lexical Environment(바깥 변수)에 계속 접근할 수 있는 현상입니다. 값을 복사하는 게 아니라 그 환경을 참조합니다. 참조가 남아 있는 동안만 메모리가 유지되고, 참조를 끊으면 GC 대상이 될 수 있어 클로저 자체가 곧 누수는 아닙니다. React에서는 오래된 state를 닫은 stale closure를 deps로 관리합니다.

### 통과선 스크립트

1. Lexical Scope = 선언 위치.
2. Scope Chain = 위로 탐색.
3. Closure = 바깥 LE 유지 + 조건 2개.
4. 복사 아님 · 공유 LE 예(`increase`/`getCount`).
5. `fn()`이 `"outer"`를 찍는 이유.
6. React stale · GC 한 줄.
7. (주말) `useParamState` 연속 업데이트 = 낡은 스냅샷 금지.
