# Day 35 · Batching

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-05-react-rendering/day-35-batching.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Batching = **여러 setState를 한 렌더로 묶음** 정의
- [x] React 18 automatic batching — 이벤트·Promise·timeout 포함 감각
- [x] 묶이면 좋은 점 / `flushSync`가 필요한 예외 한 줄
- [x] **W6 목** `Validator.checkAll` — configs·ignoreWhen·결과 API
- [x] Zod 없이 2필드 Validator 토이 설계 머릿속 완성
- [x] **차이·함정** — batch vs debounce / checkAll vs 필드 단위 blur
- [x] **통과선** — Batching 30초 + checkAll 반환 말하기

## 정리

### 한 줄

Batching은 연속 상태 갱신을 **한 번의 reconcile**로 묶어 렌더 폭주를 막고, 폼에서는 `Validator.checkAll(form)`이 필드 규칙을 **한 패스**로 모아 `isValid`·에러 목록을 돌려준다.

### 핵심

- 같은 이벤트 핸들러 안 `setA`; `setB` → 예전에도 대부분 1렌더. 18+는 **async 콜백 안**에서도 기본 배치.
- 이득: 중간 상태 UI 노출 감소, Fiber 작업 횟수↓. 비용: “매 set마다 그리겠다”는 가정이 깨짐 → 필요 시 `flushSync`.
- batch ≠ debounce/throttle. batch는 **React 스케줄러가 업데이트를 합침**, debounce는 **의도적으로 시간 지연**.
- `Validator` (`packages/form/.../Validator.ts`): configs 엔트리 순회 → `ignoreWhen`이면 스킵 → `isValid` false면 `{ key, errorMessage }` push.
- 반환: `isValid`, `getFirstError()`, `getAllErrors()`, `isErrorOf(field)`. configs는 **`satisfies`** 로 키·메시지 타입 고정(노트 `2026-05-29_async-validator-types`).

### 흐름

```
click → setX; setY; setZ
  → (batched) 한 scheduleRender
  → 한 reconcile/commit

submit / blur-all
  → validator.checkAll(form[, ctx])
  → reduce fields → errors[]
  → isValid? submit : 첫 에러 표시
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Automatic batching vs 구버전 | 18은 Promise/timeout도 기본 배치 |
| batch vs `flushSync` | 합침 vs **강제 즉시 커밋**(측정·포커스 등) |
| checkAll vs 단일 필드 validate | 전체 스냅샷 vs 점진 검증 UX |
| `satisfies` 없이 configs | `key`가 `string`으로 넓어짐 |

### 실무 연결

- **열 파일:** `packages/form/src/Validator/Validator.ts` — `checkAll`이 목 코어.
- React batch로 폼 `errors`+`touched`+`submitting`을 같이 set해도 렌더 1회에 가깝게 유지.
- AsyncValidator는 같은 모양의 async `checkAll`(중복 이메일 등) — 동기 Validator와 **결과 shape**를 맞추는 게 UX 포인트.

### 면접 한 방

- **Q:** React batching이 뭔가요? / 폼 검증은 어떻게 묶나요?
- **답:** 여러 상태 업데이트를 한 렌더로 합쳐 중간 페인트를 줄인다. 18은 이벤트 밖도 기본. 폼은 Validator configs로 필드 규칙을 선언하고 checkAll이 한 번에 유효성·에러 목록을 준다.

### 통과선 스크립트

1. batch = 여러 setState → 한 렌더.
2. 18 automatic batching 한 줄.
3. flushSync는 예외.
4. checkAll: ignore → isValid → errors.
5. getFirstError / getAllErrors.
6. satisfies로 키 타입 고정.
