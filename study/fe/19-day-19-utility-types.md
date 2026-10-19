# Day 19 · Utility Types

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-03-typescript-dom/day-19-utility-types.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] day-19-utility-types.md 끝까지 읽기
- [x] **curriculum 세 줄** — Partial/Required, Pick/Omit, Record/ReturnType
- [x] **면접 Q** — Pick vs Omit, 유틸=매핑 타입 구현
- [x] W4 화 열 — care `redux/store.ts` slice 조합·상태 타입
- [x] tab in URL + `useQuery(['list', tab])`와 Partial 필터 타입 연결
- [x] **차이·함정** — Record 인덱스, Readonly 얕음
- [x] **통과선** — 유틸 고르기 + care store slice 이름 감각

## 정리

### 한 줄

유틸리티 타입은 기존 타입을 **골라·빼고·느슨하게·읽기전용으로** 변형하는 제네릭 단축어이고, 대부분 `[K in keyof T]` 매핑으로 직접 구현 가능하다.

### 핵심

- **Partial\<T\> / Required\<T\>**: 전부 `?` / 전부 필수. 폼 초안·PATCH 바디·Redux 부분 업데이트에 Partial이 자주 온다.
- **Pick\<T,K\> / Omit\<T,K\>**: 남길 키가 적으면 Pick, 뺄 키가 적으면 Omit. 가독성이 기준.
- **Record\<K,V\>**: 키·값 맵. 슬라이스 이름→리듀서, id→엔티티 정규화에 씀. `Record<string,T>`는 없는 키도 `T`로 보여 **undefined 함정**.
- **Readonly\<T\>**: 프로퍼티 재할당 금지(얕음). 중첩 객체는 별도 DeepReadonly 사고.
- **ReturnType\<F\>**: 함수 반환 추출 — `createSlice`/`configureStore` 결과에서 `RootState` 뽑는 패턴과 같은 계열.
- 마법 아님: `type MyPartial<T> = { [K in keyof T]?: T[K] }` — Day 18 제네릭+keyof의 응용.

### 흐름

```
도메인 타입 T (User, AutoState, ListFilters)
  → Partial<T>     부분 패치 / setState
  → Pick / Omit    API DTO·폼 필드 축소
  → Record / Readonly  맵·불변 뷰
  → ReturnType     팩토리·슬라이스에서 타입 역추출
```

care store 감각:

```
configureStore({ reducer: { auto, … } })
  → RootState = ReturnType<typeof store.getState>
  → 슬라이스 state는 interface, 액션 payload는 Partial/Pick으로 좁힘
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Pick vs Omit | 남길 게 적을 때 vs 뺄 게 적을 때 |
| Partial vs `T \| undefined` | 각 필드 optional vs 객체 통째 optional |
| Record\<string,T\> | 인덱스 시그니처 — 없는 키도 T로 보임 |
| Readonly 얕음 | 안쪽 객체는 여전히 가변일 수 있음 |
| 유틸 vs 손정의 | DRY·의도 표현 vs 과도한 중첩 가독성 저하 |

### 실무 연결

- **care `src/app/redux/store.ts`**: CRA + Redux(+persist) 루트. 결제·위저드 등 **클라이언트 영속 상태**를 슬라이스로 묶고, RQ는 서버 캐시. W4 화 목표 — slice 이름 5개를 말할 수 있을 것.
- 토이: `?tab=`을 URL에 두고 `useQuery(['list', tab])` — 탭 문자열을 유니온/리터럴로 좁히고, 필터 갱신은 `Partial<Filters>`로 URL에만 부분 반영.
- `auto/auto.ts`의 카드·결제 상태 인터페이스는 다음 날(목) ICard와 이어짐 — 오늘은 store 조립·RootState 추출 감각.

### 면접 한 방

- **Q:** `Pick`과 `Omit`은 언제 나누고, 유틸리티 타입은 마법인가?
- **답:** 남길 키가 적으면 Pick, 제외할 키가 적으면 Omit이 읽기 쉽다. 마법 아니고 제네릭+매핑(`{ [K in keyof T]?: T[K] }` 같은 Partial)으로 구현 가능하다. `Record<string,T>`는 없는 키도 있는 것처럼 보이니 런타임 undefined를 염두에 둔다.

### 통과선 스크립트

1. 대표 유틸 6개 이름+한 줄 용도.
2. Pick/Omit 고르는 기준.
3. Partial = 매핑으로 직접 쓰기.
4. Record 인덱스 함정.
5. ReturnType으로 store/state 타입 뽑기.
6. (회사) care store = 클라이언트 슬라이스 조립, RQ와 역할 분리, slice 이름 말하기.
