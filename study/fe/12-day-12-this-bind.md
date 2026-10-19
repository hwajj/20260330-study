# Day 12 · this / bind / call / apply

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-02-js-advanced/day-12-this-bind.md` (키워드 골격 · Q/목표는 작성 예정 → 표준 JS this 규칙으로 정리) · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] day-12-this-bind.md 키워드(this / bind / call / apply) 기준 규칙 정리
- [x] **호출 방식**이 this를 정한다는 한 문장 고정
- [x] 메서드·일반 함수·화살표·`new`·명시적 바인딩 우선순위 말하기
- [x] `call` / `apply` / `bind` 차이 (즉시 호출 vs 새 함수)
- [x] 이벤트·콜백에서 this 유실 → bind / 화살표 대응
- [x] **§4-A 화** care `generalPayment` + SHA256/`P_SIGNATURE` 조합과 «컨텍스트·인자 고정» 감각 연결
- [x] **통과선** — this 결정 트리 30초

## 정리

### 한 줄

`this`는 함수가 **정의된 위치**가 아니라 **어떻게 호출되느냐**로 정해지고, `call`/`apply`는 즉시 호출하며 this(와 인자)를 넘기고, `bind`는 this를 고정한 **새 함수**를 만든다.

### 핵심

- **기본 규칙(비엄격)**: 객체의 메서드로 호출(`obj.fn()`) → `this === obj`. 단독 호출(`fn()`) → 전역(`window`/`globalThis`). 엄격 모드 단독 호출 → `undefined`.
- **화살표 함수**: 자신만의 this 없음 → **렉시컬**로 바깥 this를 물려받음. `call`/`bind`로 this를 바꿔도 화살표 this는 안 바뀐다.
- **`new`**: 생성자 호출이면 새 인스턴스가 this.
- **명시적 바인딩**: `fn.call(thisArg, a, b)` / `fn.apply(thisArg, [a, b])` — 지금 실행. `fn.bind(thisArg, …)` — this·일부 인자를 묶은 함수 반환(부분 적용).
- **우선순위 감각**: `new` > 명시적 bind/call/apply > 메서드 호출 > 기본. (화살표는 «바인딩 대상»이 아니라 렉시컬.)
- 콜백에 `obj.method`만 넘기면 메서드 호출이 깨져 this 유실 → `bind`, 화살표 래퍼, 또는 클래스 필드 화살표로 고정.

### 흐름

```
호출 형태 확인
  → new Fn()           ? this = 새 객체
  → fn.call/apply/bind ? this = 넘긴 thisArg (화살표 제외)
  → obj.fn()           ? this = obj
  → fn()               ? 전역 or undefined(strict)
  → () => {}           ? 정의 시점 바깥 this
```

`call` vs `apply` vs `bind`:

```
call(this, a, b)     → 즉시, 인자 나열
apply(this, [a, b])  → 즉시, 인자 배열
bind(this, a)        → 나중에 호출할 함수 반환
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 정의 위치 vs 호출 방식 | this는 호출이 결정 (화살표만 렉시컬) |
| `call`/`apply` vs `bind` | 지금 실행 vs 묶인 함수 |
| `call` vs `apply` | 인자 나열 vs 배열 |
| 일반 함수 콜백 vs 화살표 콜백 | this 유실 가능 vs 바깥 this 유지 |
| `bind` 여러 번 | 이미 bound된 함수에 다시 bind해도 보통 첫 this 유지 |

### 실무 연결

- **§4-A 화 · care 결제**: `payment.tsx` **generalPayment** + `P_SIGNATURE` — `sha256(mkey=…&P_AMT=…&P_OID=…&P_TIMESTAMP=…)` 조합(`constants/utils.ts` sha256 등과 대조). 서명 필드·금액·OID를 **인자로 고정해** 넘기는 패턴은 `bind`/부분 적용과 같은 «컨텍스트·입력 고정» 감각이다. 클래스 컴포넌트 레거시면 제출 핸들러 `this` 유실이 바로 터지고, 함수형+화살표면 렉시컬로 안정적이다.
- React: 인라인 `onClick={() => this.handle()}`(클래스) / 함수 컴포넌트는 this 이슈가 거의 없고 **클로저·최신 props**가 더 자주 이슈.

### 면접 한 방

- **Q:** `this`는 어떻게 정해지고, `bind`와 `call` 차이는?
- **답:** this는 호출 방식으로 정해집니다. 메서드면 수신 객체, 단독이면 전역/undefined, `new`면 인스턴스, 화살표는 렉시컬입니다. `call`/`apply`는 this를 지정해 **바로** 실행하고, `bind`는 this를 고정한 **새 함수**를 돌려줍니다.

### 통과선 스크립트

1. this = 정의 위치가 아니라 호출 형태.
2. 메서드 / 단독 / new / 화살표 네 갈래.
3. call·apply = 즉시, bind = 새 함수.
4. 콜백에 메서드 참조만 넘기면 this 유실.
5. 화살표는 bind로 this 안 바뀜.
6. (회사) generalPayment 서명 필드는 «고정된 입력으로 해시» — bind와 같은 고정 감각으로 말한다.
