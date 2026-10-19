# Day 11 · Hoisting / TDZ — **완료**

SSOT 노트: [`../11-day-11-hoisting-tdz.md`](../11-day-11-hoisting-tdz.md)

## active 체크

- [x] day-11-hoisting-tdz.md 끝까지 읽기
- [x] Hoisting = Execution Context 생성 시 선언 처리로 말하기
- [x] `var` / `let` / `const` 선언·초기화·선언 전 접근 표로 구분
- [x] TDZ 정의 + `let`/`const`도 Hoisting된다는 정정 답
- [x] Function Declaration vs Expression (`undefined` / `ReferenceError` / `TypeError`) 코드 추적
- [x] 원문 문제 1~5 결과 입으로 맞추기
- [x] **§4-A 월** care `payment.tsx` createPayment~paymentApi 구간과 선언 순서·스코프 감각 연결
- [x] **통과선** — 세 에러 구분 + «위로 올라간다» 금지 스크립트

## 정리

### 한 줄

Hoisting은 코드가 물리적으로 올라가는 게 아니라 **Execution Context가 만들어질 때 선언이 먼저 등록**되는 것이고, `var`는 `undefined`로 초기화되지만 `let`/`const`는 **TDZ**라서 초기화 전 접근이 `ReferenceError`다.

### 핵심

- **선언(Declaration) vs 초기화(Initialization)**: 스코프에 이름이 생기는 시점과 값이 붙는 시점을 분리해서 본다. Hoisting 이슈는 대부분 이 틈에서 난다.
- **`var`**: 선언+초기화(`undefined`)가 실행 전에 끝난다 → 선언 전 접근 = `undefined`. 재할당 가능.
- **`let` / `const`**: 선언은 Hoisting되지만 선언문 도달 전까지 TDZ → 접근 = `ReferenceError`. `const`는 재할당 불가·선언과 동시에 초기화 필수.
- **틀린 말**: «`let`/`const`는 Hoisting 안 됨». **맞는 말**: 선언은 처리되지만 TDZ 때문에 못 씀.
- **함수**: Declaration은 본체까지 사용 가능 상태로 등록 → 선언 전 호출 OK. Expression은 변수 규칙 따름 — `const`면 ReferenceError, `var`면 `undefined` 호출 → **TypeError**.
- Day8~10 흐름: EC → Lexical Environment → Scope/Closure → **실행 전 선언이 어떤 상태인가**(Day11).

### 흐름

```
Execution Context 생성
  → 선언 등록 (Hoisting)
  → var: undefined 초기화 / let·const: TDZ
  → 코드 실행 (선언문 도달 시 let·const 초기화)
  → 이후 접근 가능
```

함수 표현식 함정:

```
hello() 먼저
  var hello = fn   → hello === undefined → TypeError
  const hello = fn → TDZ → ReferenceError
function hello(){} → 호출 가능
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| «코드가 위로» vs EC 등록 | 물리 이동 ❌ · 선언 선처리 ⭕ |
| `var` 선언 전 vs `let` 선언 전 | `undefined` vs `ReferenceError` |
| Declaration vs Expression | 본체까지 준비 vs 변수 초기화 규칙을 따름 |
| `var` Expression 호출 vs `const` Expression 호출 | TypeError vs ReferenceError |
| TDZ 없음? | `let`/`const` 스코프 시작~초기화 사이가 TDZ |

### 실무 연결

- **§4-A 월 · care 결제**: `care/.../payment/payment.tsx` **createPayment ~ paymentApi** (플랜 L163–197 근처). 주문 생성 → `orderId` 받는 **sequence**에서 콜백·헬퍼가 `const`/`let`으로 잡히면, «위에서 쓰려다 TDZ»보다 **선언 순서·초기화 후 호출**이 안전한 패턴이다. 결제 핸들러를 Function Expression으로 두면 선언 전 바인딩 호출 시 Declaration과 에러 종류가 달라진다.
- FE 공통: 모듈 스코프 상단 `const api = …` 전에 호출하는 초기화 코드, 순환 import로 아직 초기화 안 된 export 접근 → TDZ/`undefined` 증상과 같은 계열로 디버깅한다.

### 면접 한 방

- **Q:** `let`/`const`는 Hoisting 안 되나요? TDZ는 뭐죠?
- **답:** 둘 다 선언은 Hoisting됩니다. 다만 선언문에 도달해 초기화되기 전까지 TDZ에 있어서 접근하면 `ReferenceError`입니다. `var`는 처음부터 `undefined`로 초기화돼서 선언 전에 읽으면 `undefined`가 나옵니다. «코드가 위로 올라간다»보다 Execution Context 생성 시 선언 처리로 말하는 게 정확합니다.

### 통과선 스크립트

1. Hoisting = EC 생성 때 선언 등록이지, 소스 줄이 이동하는 게 아니다.
2. `var`: 선언→`undefined` 초기화→실행 / `let`·`const`: 선언→TDZ→초기화→실행.
3. «`let`은 Hoisting 안 됨»은 오답 — TDZ 때문에 못 쓰는 것.
4. Declaration은 선언 전 호출 가능, Expression은 변수 규칙.
5. `var` Expression 조기 호출 = TypeError, `const` Expression = ReferenceError.
6. 코드 보면 먼저 «실행 전 상태가 뭐지?»를 그린다.
7. (회사) care `createPayment`→`paymentApi` 구간도 콜백·헬퍼 **초기화 후** 호출로 읽는다.

## wrap 요약

1. Day11 go — Hoisting/TDZ + `undefined`/`ReferenceError`/`TypeError` 구분.
2. W3 월 · care createPayment~paymentApi 실무 연결.
3. 다음: day-12-this-bind · 화 · generalPayment SHA256.

- **막힌:** —
- **다음 start:** `day-12-this-bind` · `study/fe/12-day-12-this-bind.md`
