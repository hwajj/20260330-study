# Day 0.3 — React 기초 (Day 0.7·0.9 선행)

> **커리큘럼:** [Day 0 입문](./README.md) · **이 문서:** Day 0.3  
> **선행:** [Day 0.2 TypeScript](./day-0.2-typescript-core.md) · **다음:** [Day 0.4 HTTP/JWT](./day-0.4-http-rest-jwt-basics.md)

`packages/hook`·`packages/component`를 읽기 전, **컴포넌트·state·effect·렌더** 감각을 맞추는 문서입니다.

---

## 목차

1. [컴포넌트와 props](#1-컴포넌트와-props)
2. [state와 이벤트](#2-state와-이벤트)
3. [useEffect와 부수 효과](#3-useeffect와-부수-효과)
4. [렌더·리렌더 직관](#4-렌더리렌더-직관)
5. [Day 0.7·0.9와의 연결](#5-day-0709와의-연결)
6. [정리·확장 학습](#6-정리확장-학습)

---

## 1. 컴포넌트와 props

### 1.1 함수 컴포넌트

```tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
};

function Button({ label, onClick }: ButtonProps) {
  return <button type="button" onClick={onClick}>{label}</button>;
}
```

- **props**는 부모 → 자식 **단방향** 데이터.
- **이유:** 데이터 흐름이 예측 가능해지고, 디버깅 시 “누가 이 값을 넘겼는지” 추적이 쉽습니다.

### 1.2 children·합성

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <section className="card">{children}</section>;
}
```

Modal·Layout 패턴( Day 0.9 )의 기초가 **children 합성**입니다.

---

## 2. state와 이벤트

### 2.1 useState

```tsx
const [count, setCount] = useState(0);
```

- state가 바뀌면 **해당 컴포넌트가 다시 렌더**됩니다.
- `setCount(c => c + 1)` — 이전 state 기준 업데이트(연속 클릭·배치에 안전).

### 2.2 제어 컴포넌트(폼)

```tsx
const [email, setEmail] = useState('');
<input value={email} onChange={(e) => setEmail(e.target.value)} />
```

Day 0.6 **Validator**는 “값 + 검증 규칙”을 나누는 층입니다. UI state는 React, 규칙은 `packages/form`.

---

## 3. useEffect와 부수 효과

```tsx
useEffect(() => {
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id); // cleanup
}, [deps]);
```

| 개념 | 설명 |
|------|------|
| **부수 효과** | 렌더 결과와 별개로 DOM·구독·API 호출 |
| **deps** | 바뀔 때만 effect 재실행 |
| **cleanup** | 언마운트·deps 변경 전 정리 |

**함정:** deps 누락 → stale closure(옛 state 참조).  
**학습 대상 레포:** `useEffectEvent`(Day 0.7)는 “항상 최신 핸들러”를 effect deps 없이 쓰려는 패턴입니다. (React 19에서 실험 API로 제공되며, 레포·버전에 따라 polyfill/자체 구현일 수 있다.)

---

## 4. 렌더·리렌더 직관

```
props/state 변경 → React가 diff → DOM 패치
```

- **같은 부모 아래 형제**는 각자 state가 있으면 **독립** 리렌더.
- **Context·전역 store**는 구독 범위에 따라 리렌더 범위가 넓어짐 → Day 0.7 `createAtomicContext`·selector.

**왜 중요한가:** “클릭할 때마다 전체 페이지가 도는지”는 대부분 **state 위치·구독 범위** 문제입니다. ([notes: 서버/클라이언트 state](../notes/2026-05-28_concepts-server-client-state.md))

---

## 5. Day 0.7·0.9와의 연결

| Day 0.3 개념 | 이후 문서 |
|--------------|-----------|
| state·이벤트 | 0.6 Form, 0.7 URL state(`useParamState`) |
| effect·cleanup | 0.4 AbortSignal, 0.7 `useGlobalEvent` |
| 합성·children | 0.9 Modal·Input |
| 리렌더 | 0.7 selector, 0.9 lazy·Suspense |

HTTP·토큰(0.4)은 **React 밖** 레이어이지만, 401·로딩 UI는 결국 **컴포넌트**에서 보여 줍니다.

---

## 6. 정리·확장 학습

### 6.1 정리

| 주제 | 요약 |
|------|------|
| props | 부모 → 자식, 단방향 |
| useState | UI state, 변경 시 리렌더 |
| useEffect | 구독·API·타이머 + cleanup |
| 렌더 | state/props 변경이 트리거 |

### 6.2 확장 학습

- **useReducer** — 복잡한 state 전이
- **React 19 / Compiler** — 자동 메모이제이션 논의
- **서버 컴포넌트** — “어디서 state를 둘지” 분할 (notes와 연계)

---

## 커리큘럼 네비게이션

| 이전 | 목차 | 다음 |
|------|------|------|
| [Day 0.2 TypeScript](./day-0.2-typescript-core.md) | [Day 0 README](./README.md) | [Day 0.4 HTTP/JWT](./day-0.4-http-rest-jwt-basics.md) |
