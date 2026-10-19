# Day 17 · Type Inference & Type System — **완료**

SSOT 노트: [`../17-day-17-type-inference.md`](../17-day-17-type-inference.md)

## active 체크

- [x] day-17-type-inference.md 키워드·질문·목표 읽기
- [x] 추론에 맡길 곳 vs 명시할 곳(공개 API) 구분
- [x] `interface` vs `type` 역할 차이
- [x] Union / Intersection / Literal 조합으로 도메인 타입 스케치
- [x] 판별 유니온(discriminated union)으로 안전한 분기
- [x] **§4-A 주말 polish** — 결제 diff·1분 스토리·타입 모델 다듬기
- [x] **통과선** — 추론+유니온 분기 30초

## 정리

### 한 줄

TS는 많은 곳을 **추론**하지만 공개 API는 명시하고, `interface`/`type`·유니온·교집합·리터럴을 조합해 도메인을 모델링한 뒤 **좁히기(판별 유니온)** 로 분기한다.

### 핵심

- **Type Inference**: `let x = 3` → `number`. 지역 변수·초기화 있는 값은 추론에 맡겨 간결하게.
- **명시가 이득인 곳**: 함수 파라미터·반환, 내보내기 타입, 복잡한 객체 리터럴의 **의도 문서화**.
- **Interface**: 객체 구조, `extends`, **선언 병합(declaration merging)**.
- **Type Alias**: 유니온·튜플·원시 별칭·조건부 타입 등 **표현력**. 객체도 가능하나 병합은 interface 쪽.
- **Union `|`**: 하나. **Intersection `&`**: 모두 만족. **Literal**: `'GET' | 'POST'`, `true` 등 값 자체.
- **안전한 Union**: `typeof` / `in` / 공통 discriminant 필드(`kind: 'ci' | 'real'`)로 분기 — exhaustive 시 `never` 체크.

### 흐름

```
값/이벤트 관측
  → 리터럴·유니온으로 상태 집합 정의
  → interface/type으로 페이로드 형태
  → switch(discriminant) 로 narrowing
  → 남은 분기 never로 컴파일 타임 검증
```

결제 도메인 스케치 예:

```ts
type PayEnv = 'CI' | 'QA' | 'REAL';
type PayPath =
  | { kind: 'redirect'; env: 'CI' | 'QA'; orderId: string }
  | { kind: 'pg'; env: 'REAL'; orderId: string; signature: string }
  | { kind: 'easy'; bridge: 'android' | 'ios' };
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| interface vs type | 병합·객체 확장 vs 유니온·조합 표현 |
| 추론 vs 명시 | 내부 간결 vs 경계 계약 |
| Union vs Intersection | 또는 vs 그리고 |
| 넓히기(widening) | `let x = 'a'`가 `string`이 될 수 있음 — `as const`/리터럴 주석으로 고정 |
| 단언(`as`) 남용 | 컴파일만 통과, 런타임 거짓말 |

### 실무 연결

- **§4-A 주말 polish**: W3 목표 — care PG **5단계** 암기, dailycare diff 1p, 결제 한 줄 스토리 녹음. polish 때 위 `PayPath`처럼 **환경·경로를 판별 유니온**으로 적어두면 «CI redirect / REAL PG / easyPayment» 분기가 코드·면접 답 모두에서 같은 구조를 갖는다. invalidate 성공 이벤트도 `code: 200` 리터럴 체크로 좁힌다.
- React props·API 응답 타입에 union+discriminant 패턴이 그대로 쓰인다.

### 면접 한 방

- **Q:** interface와 type 차이? 추론 있는데 왜 명시하나요?
- **답:** interface는 선언 병합과 객체 확장에 강하고, type은 유니온·튜플 등 조합에 유리합니다. 추론은 지역 변수에 맡기고, 함수의 공개 파라미터·반환은 명시해 의도를 고정하고 호출부 실수를 막습니다. Union은 discriminant로 좁혀 씁니다.

### 통과선 스크립트

1. 추론 맡김 vs 경계 명시.
2. interface = 객체/병합, type = 유니온·조합.
3. `|` / `&` / 리터럴 한 예.
4. 판별 유니온으로 분기, 끝은 never.
5. (주말) CI·REAL·easy를 kind 유니온으로 스토리 다듬기.
6. W3 금요 통과: 5단계 + diff 3행을 타입 스케치와 같이 복기.

## wrap 요약

1. Day17 go — 추론·interface/type·판별 유니온.
2. W3 일 · weekend polish (결제 스토리·diff·PayPath).
3. 배치 끝 — 플랜/active는 사용자 지시로 미수정.

- **막힌:** —
- **다음 start:** (배치 완료) 다음 FE Day는 플랜 커서 기준 · W4 진입 시 `STUDY-PLAN-8W` §4-B 동기화
