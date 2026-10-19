# Day 48 · Custom Hook

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-07-react-state-error/day-48-custom-hook.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Custom Hook = 로직 재사용(`use` 접두), UI 재사용 아님
- [x] 호출마다 **상태 격리**(공유≠로직 공유)
- [x] 일반 함수와 차이(Hook 규칙)
- [x] 과도한 추상화 경계
- [x] **실무:** 모의 45m #1 — `useListParams`/`useParamState`를 훅 설계로 설명
- [x] 컴포넌트에서 Effect·state 덩어리 추출 기준
- [x] **통과선** — “훅은 상태 안 공유” 면접 문장

## 정리

### 한 줄

Custom Hook은 Hook을 조합해 **상태·이펙트 로직을 재사용**하는 함수이고, 같은 훅을 여러 컴포넌트에서 써도 **상태는 각자**다.

### 핵심

- 이름 `use*`, 최상위에서만 다른 Hook 호출(규칙 동일).
- 컴포넌트 = UI 재사용, 훅 = 동작 재사용. UI가 달라도 같은 구독/폼 로직이면 훅.
- 상태 공유가 필요하면 Context/스토어/URL — 훅만으로는 안 됨.
- 추출 신호: 같은 Effect+state가 2곳+, 테스트하고 싶은 순수에 가까운 흐름, 컴포넌트가 읽기 어려움.
- 반대로 한두 줄 래핑·파라미터 폭발 훅은 해가 된다.

### 흐름

```
useListParams() in PageA → stateA / URL sync A
useListParams() in PageB → stateB / URL sync B
로직 공유, 메모리 상태 비공유 (URL이 SSOT면 "공유"는 주소창)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 훅 vs 일반 함수 | Hook 사용 가능 vs 불가 |
| 로직 공유 vs 상태 공유 | 전자만 훅의 기본 |
| 훅 vs 컴포넌트 | 로직 vs UI |
| God hook | 의존·옵션 폭발 → 쪼개기 |

### 실무 연결

- **모의 45m #1**: `useListParams`를 “왜 훅으로 뺏는지 / 테스트 지점 / URL SSOT”로 설명한다. log 3종 질문 리스트로 회사 스토리와 연결.
- `useParamState` diff表(W7 월)를 한 장으로 말할 수 있으면 Day48 통과에 가깝다.

### 면접 한 방

- **Q:** 커스텀 훅 쓰면 상태가 공유되나?
- **답:** 아니다. 로직만 공유하고 호출마다 독립 state다. 공유하려면 Context·스토어·URL 같은 외부 SSOT가 필요하다.

### 통과선 스크립트

1. 훅 정의·`use` 접두.
2. UI vs 로직.
3. 상태 비공유.
4. 추출 기준·과도 추상화.
5. 모의: useListParams 30초 설명.
