# Day 16 · TypeScript Basic

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-03-typescript-dom/day-16-typescript-basic.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] day-16-typescript-basic.md 키워드·질문·목표 읽기
- [x] Static typing이 잡는 시점(컴파일) vs 런타임 한 줄
- [x] Primitive / Object / Array / Tuple 시그니처 손으로 쓰기
- [x] `any` vs `unknown` vs `never` 구분
- [x] Enum vs `as const`+유니온 대안
- [x] **§4-A 주말** care·dailycare **결제 한 줄 스토리**를 타입 관점(주문·금액·환경)으로 다듬기
- [x] **통과선** — 기본 타입 + any 남용 금지 30초

## 정리

### 한 줄

TypeScript는 **컴파일 타임**에 타입을 검사해 런타임 전에 실수를 줄이고, 기본기는 primitive·객체 구조·배열/튜플·`any`/`unknown`/`never`를 구분해 시그니처를 쓰는 것이다.

### 핵심

- **Static Typing**: 실행 전 검사. 브라우저엔 결국 JS가 나가지만, 개발·CI에서 계약을 강제한다.
- **Primitive**: `string` `number` `boolean` `null` `undefined` `symbol` `bigint`.
- **Object Type**: `{ name: string; age: number }`처럼 프로퍼티 계약을 명시.
- **Array vs Tuple**: `number[]`는 길이 자유·요소 동종 감각, `[string, number]`는 **길이·순서·위치별 타입** 고정.
- **Enum**: 이름 있는 상수 집합 — **런타임 객체**가 생긴다. 번들·트리셰이킹 부담 시 `as const` 객체 + 리터럴 유니온이 대안.
- **`any`**: 검사 포기. **`unknown`**: 안전한 any — narrowing 전에 사용 불가. **`never`**: 도달 불가·값 없음(throw, 무한루프, exhaustive check 잔여).

### 흐름

```
도메인 값 정하기 (주문 id, 금액, 환경)
  → primitive / object / union 으로 시그니처
  → 외부 입력(JSON·query)은 unknown → narrowing
  → 함수 파라미터·반환에 명시 (공개 API)
  → 내부 지역 변수는 추론에 위임 가능 (Day17)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| `any` vs `unknown` | 전부 허용 vs 좁히기 전 금지 |
| Array vs Tuple | 가변 길이 동종 vs 고정 슬롯 |
| Enum vs `as const` | 런타임 객체 vs 리터럴 유니온(종종 더 가벼움) |
| `null` vs `undefined` | «없음» 표현이 팀 컨벤션에 따름 — 섞이면 optional chaining 필수 |
| TS 통과 = 런타임 안전? | 타입 단언·any·외부 JSON은 여전히 깨질 수 있음 |

### 실무 연결

- **§4-A 주말 · weekend payment story**: care → 주문 API → (REAL) SHA256·PG 폼 / (앱) easyPayment → result → invalidate. 스토리를 녹음·메모할 때 `orderId: string`, `amount: number`, `env: 'CI' | 'QA' | 'REAL'` 같은 **기본 타입·리터럴**로 입출력을 박아 두면 Day16이 곧 결제 도메인 모델 초안이 된다. dailycare `PaymentPage` query `code`·`jobId`·`amount`도 파싱 전 `unknown`/`string` → 좁히기 패턴과 맞다.
- 공개 함수에 `any` 남발 금지; PG 콜백·브리지 페이로드는 `unknown` 후 가드.

### 면접 한 방

- **Q:** `any`와 `unknown` 차이는? `never`는 언제?
- **답:** `any`는 타입 검사를 꺼서 무엇에든 할당·호출이 되고, `unknown`은 사용 전 typeof/`in` 등으로 좁혀야 해서 더 안전합니다. `never`는 정상 반환이 없는 함수나 유니온을 모두 분기한 뒤 남는 타입(exhaustive check)에 씁니다.

### 통과선 스크립트

1. TS = 컴파일 타임 계약, 런타임은 JS.
2. primitive·객체·배열·튜플 한 예씩.
3. any 금지에 가깝게, 외부 값은 unknown.
4. never = 도달 불가·완전 분기.
5. Enum 대신 as const+유니온도 후보.
6. (주말) 결제 스토리 입력을 string/number/환경 리터럴로 말해 본다.
