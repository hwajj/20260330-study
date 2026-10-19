# Day 32 · Reconciliation

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-05-react-rendering/day-32-reconciliation.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] day-32-reconciliation.md + Reconciliation 정의·휴리스틱 정리
- [x] **같은 레벨·같은 type** 비교 → 갱신 / type 다르면 교체 말하기
- [x] 리스트에서 key가 reconciliation에 미치는 영향 한 줄
- [x] **W6 월** `useHmcError` Example 1 — mutation `onError` 팩토리 흐름
- [x] error code table 3개 → `onErrorConsumed`에서 invalidate 연결 상상
- [x] **차이·함정** — reconcile vs commit / UI 에러 vs HMC 코드
- [x] **통과선** — Reconciliation 30초 + useHmcError 3분 골격

## 정리

### 한 줄

Reconciliation은 **이전 트리와 새 트리를 같은 자리에서 맞춰** 최소 DOM 작업을 고르는 단계이고, 회사에서는 mutation 실패 시 `useHmcError`가 **에러 코드→메시지→소비 후 부작용(invalidate)** 을 같은 자리(onError)에 맞춘다.

### 핵심

- React는 매 렌더마다 실제 DOM을 처음부터 다시 만들지 않는다. **가상 트리(또는 Fiber)끼리 diff** 해서 insert/update/delete만 커밋한다.
- 휴리스틱: **같은 깊이·같은 위치**에서 type(요소/컴포넌트 종류)이 같으면 props만 갱신, type이 바뀌면 **서브트리 통째 교체**(언마운트→마운트).
- 자식 목록은 **key**로 “같은 항”을 추적한다. key가 없거나 index면 순서 변경 시 **잘못된 재사용**이 난다(→ Day36).
- Reconciliation ≠ 브라우저 Layout. reconcile 결과가 **DOM 커밋**된 뒤에야 CRP(Layout/Paint)가 돈다.
- `useHmcError(globalTable, errorHandler)` → `createErrorMessage()` 팩토리. `useMutation({ onError: createErrorMessage().onErrorConsumed(...) })` 패턴이 Example 1.
- 코드 테이블에 없는 코드는 `ERROR_MESSAGE_FALLBACK_KEY`로 폴백. `onErrorConsumed(code)`에서 특정 코드만 `invalidate(ticketQuery…)` 같은 **데이터 재맞춤**.

### 흐름

```
setState / props 변경
  → render (새 요소 트리)
  → reconcile (prev ↔ next, key·type 기준)
  → commit (DOM 패치)

mutation 실패
  → onError(err)
  → useHmcError: hmcErrorCode + messageTable 병합
  → errorHandler(모달 등) → onErrorConsumed → (선택) invalidate
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Reconciliation vs Commit | “무엇을 바꿀지 고름” vs “DOM에 반영” |
| type 변경 vs props 변경 | 서브트리 파괴·재생 vs 같은 인스턴스 갱신 |
| throw (Error Boundary) vs mutation onError | 렌더 트리 크래시 경계 vs **요청 실패 콜백** |
| 전역 toast만 vs useHmcError | 메시지 일관성·코드별 부작용을 테이블+체이닝으로 고정 |

### 실무 연결

- **열 파일:** `packages/service/.../useHmcError/useHmcError.tsx` — Example 1이 월 통과 코어.
- 결제·티켓 등 **도메인 코드(`DMN-ADJUSTER-…`)** 를 UI 문구와 분리해 두고, 소비 후에만 캐시 무효화 → “에러 UI”와 “목록 재동기화” 순서 명확.
- 금요 통과선 중 **useHmcError 3분**의 입구 Day.

### 면접 한 방

- **Q:** Reconciliation이 뭐고, key가 왜 중요한가?
- **답:** 이전·새 UI 트리를 맞춰 최소 업데이트를 고르는 과정이다. 같은 type이면 갱신, 다르면 교체. 리스트는 key로 항 신원을 고정해 순서 변경·삽입 시 잘못 재사용하는 비용을 줄인다. DOM을 매번 갈아끼우지 않는 이유이기도 하다.

### 통과선 스크립트

1. “diff해서 최소 DOM” 한 문장.
2. type 같음/다름 → 갱신/교체.
3. key = 리스트 identity.
4. reconcile 후 commit → 브라우저 레이아웃은 그다음.
5. useHmcError: table + handler 팩토리 → mutation onError.
6. onErrorConsumed에서 코드별 invalidate 예 한 줄.
7. Error Boundary와 역할 분리 한 줄(금요 예고).
