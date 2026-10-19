# Day 13 · Prototype / Prototype Chain — **완료**

SSOT 노트: [`../13-day-13-prototype.md`](../13-day-13-prototype.md)

## active 체크

- [x] day-13-prototype.md 키워드(Prototype / Prototype Chain) 기준 정리
- [x] 인스턴스 → `[[Prototype]]` → 생성자 `.prototype` 연결 그림
- [x] 속성 조회: own → prototype chain → `undefined`
- [x] `__proto__` vs `prototype` vs `Object.getPrototypeOf` 구분
- [x] `class` 문법이 프로토타입 설탕임을 한 줄로
- [x] **§4-A 수** REAL vs TEST 키 분기 + dailycare `PaymentPage` diff 감각 연결
- [x] **통과선** — 체인 탐색 + class/prototype 관계 30초

## 정리

### 한 줄

객체는 자기 own 속성에 없으면 **`[[Prototype]]` 체인**을 따라 올라가며 찾고, 생성자 함수의 `.prototype`이 그 인스턴스들의 공유 원형이 된다(`class`도 같은 모델의 문법 설탕).

### 핵심

- **Prototype**: 인스턴스들이 **공유**하는 객체. 메서드를 여기 두면 메모리·동작이 한곳에서 관리된다.
- **Prototype Chain**: `obj` → 그 `[[Prototype]]` → … → `Object.prototype` → `null`. 읽기는 체인을 타고, **쓰기는 보통 own에 생성**(쉐도잉).
- **`Fn.prototype`**: `new Fn()`으로 만든 객체의 `[[Prototype]]`이 가리키는 대상. `Fn.prototype.constructor`는 보통 `Fn`.
- **접근 API**: 레거시 `obj.__proto__`, 표준 `Object.getPrototypeOf` / `Object.setPrototypeOf`(성능·가독성 주의), `Object.create(proto)`.
- **`class` / `extends`**: 내부적으로 prototype 연결. 인스턴스 메서드는 `Ctor.prototype`에, static은 생성자 함수 자체에.
- `instanceof` ≈ 체인을 따라가며 `Ctor.prototype`이 있는지 확인(환경·Realm에 따라 함정 가능).

### 흐름

```
const o = new Foo()
o.x 조회
  → o own?
  → Foo.prototype?
  → Object.prototype?
  → null → undefined
```

상속:

```
Child.prototype → Parent.prototype → Object.prototype → null
(class Child extends Parent 와 동일한 골격)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| `obj.prototype` vs `Fn.prototype` | 일반 객체엔 보통 없음 · 함수(생성자)에 있음 |
| `__proto__` vs `.prototype` | 인스턴스 쪽 링크 vs 생성자가 제공하는 원형 |
| 읽기 vs 쓰기 | 체인을 탐 vs own에 씀(상위 안 바꿈) |
| own vs inherited | `hasOwnProperty` / `Object.hasOwn`로 구분 |
| `class` ≠ 새 객체 모델 | 프로토타입 위에 얹은 문법 |

### 실무 연결

- **§4-A 수 · REAL vs TEST / dailycare PaymentPage**: care는 환경·키 분기(REAL merchant·키 vs TEST/`wphtest200`), dailycare log(`resume-2026-08-31-2308.md`) **PaymentPage**는 `getServerType`·`isRealPaymentEnvironment`로 CI/QA는 redirect, REAL만 Welcome PG 폼. «공통 PG 제출 원형 + 환경별 분기»는 **공유 프로토콜(원형) vs 인스턴스(환경) 설정**에 비유해 말할 수 있다. diff 표: 중복주문 ref · 키/merchant · CI redirect.
- 라이브러리: 배열 메서드가 `Array.prototype`에 있는 이유, polyfill이 prototype을 패치하는 이유, `Object.create(null)`로 체인 없는 딕셔너리.

### 면접 한 방

- **Q:** 프로토타입 체인이 뭐고, `prototype`과 `__proto__` 차이는?
- **답:** 속성 조회 시 own에 없으면 `[[Prototype]]`을 따라가는 연결이 프로토타입 체인입니다. 생성자 `Fn.prototype`은 `new Fn()` 인스턴스의 원형이고, `__proto__`/`getPrototypeOf`는 그 인스턴스가 실제로 가리키는 링크입니다. `class`도 이 구조를 보기 좋게 쓴 것입니다.

### 통과선 스크립트

1. 조회 = own → 체인 → null.
2. 메서드 공유 = `Ctor.prototype`에 둔다.
3. `.prototype`(함수) vs `[[Prototype]]`(객체 링크) 구분.
4. 쓰기는 own 쉐도잉이 기본.
5. class/extends = prototype 연결 설탕.
6. (회사) REAL/TEST·PaymentPage = 공유 PG 규칙 + 환경별 인스턴스 설정으로 한 줄.

## wrap 요약

1. Day13 go — Prototype Chain + class 설탕.
2. W3 수 · REAL/TEST 키 · dailycare PaymentPage diff.
3. 다음: day-14-review · 목 · result invalidate / ordering ref.

- **막힌:** —
- **다음 start:** `day-14-review` · `study/fe/14-day-14-review.md`
