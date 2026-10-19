# Day 38 · useState — **완료**

SSOT 노트: [../38-day-38-use-state.md](../38-day-38-use-state.md)

## active 체크

- [x] useState = **컴포넌트 로컬 UI 상태** + setter로 리렌더 스케줄
- [x] 함수형 업데이트 `setS(s => …)` — 클로저·배치와 연결
- [x] lazy init `useState(() => heavy)` vs 매 렌더 heavy 호출 함정
- [x] 서버 상태(RQ) vs useState — 소유권 한 줄 (W6 복습)
- [x] **주말** — W6 에러·인가 파이프를 useState 모달/에러문구 관점에서 복기
- [x] **차이·함정** — state vs ref / 객체 state 불변 갱신
- [x] **통과선** — useState 30초 + “에러 메시지는 어디에 두나”

## 정리

### 한 줄

`useState`는 **이 화면만의 일시 상태**를 들고 setter가 리렌더를 예약하며, HMC 에러 문구·모달 open 같은 **소비된 에러 UI**도 결국 로컬 state(또는 모달 스토어)에 올라간다 — 서버 캐시(RQ)와 자리를 섞지 않는 것이 핵심이다.

### 핵심

- `const [v, setV] = useState(init)` — init은 **첫 마운트만**. 이후 렌더는 저장된 state.
- 같은 이벤트에서 여러 set → Day35 batching으로 한 렌더에 가깝게.
- 이전 값 의존 시 `setV(prev => next)` — 배치·비동기 후 클로저 stale 방지.
- lazy init: `useState(() => createInitial())` — 비싼 초기값 계산을 1회만.
- 객체/배열은 **새 참조**로 넣어야 변경 감지. 직접 mutate 후 set 같은 참조 → 스킵될 수 있음.
- **두지 말 것:** 서버 목록 전체를 useState에 복사해 fetch 재발명 — RQ queryKey 캐시가 담당.
- useHmcError Example 3: `onErrorConsumed`에서 `setErrorMessage(content)` — **에러 문자열은 로컬 state**.

### 흐름

```
event → setState(updater)
  → schedule render (batched)
  → Fiber reconcile → commit → UI

mutation onError
  → useHmcError → handler(모달) 또는 setErrorMessage
  → (로컬 state) 메시지 표시
  → RQ 캐시는 invalidate할 때만 갱신
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| useState vs useRef | 바꾸면 리렌더 vs **리렌더 없이** 박스만 |
| useState vs React Query | 클라 UI/초안 vs **서버 소스 오브 트루스** |
| 즉시 init vs lazy init | 매 렌더 함수 실행 비용 vs 마운트 1회 |
| 모달 전역 vs 페이지 state | 제품 패턴에 따름 — 둘 다 “서버 캐시”는 아님 |

### 실무 연결

- **주말:** 새 열 파일 강제 없음 — W6 월~금(useHmcError·QueryCache·invalidate·Validator·4층 STAR)을 **“상태는 어디에 있나?”** 로만 다시 훑기.
- Example 2 모달 / Example 3 `useState('')` 에러문구 = useState Day와 직접 접점.
- Validator `checkAll` 결과도 보통 `errors` local state에 넣음(목).

### 면접 한 방

- **Q:** useState는 언제 쓰고, 서버 데이터는?
- **답:** 토글·입력·에러문구·모달처럼 화면 로컬에 쓴다. 서버가 진실인 목록·상세는 React Query. setter는 리렌더를 예약하고, 이전 값 기반이면 함수형 업데이트를 쓴다.

### 통과선 스크립트

1. useState = 로컬 UI 상태.
2. setter → 리렌더(배치 가능).
3. 함수형 업데이트·lazy init.
4. 객체는 불변으로.
5. 서버 상태 ≠ useState.
6. HMC 메시지는 소비 후 로컬/모달 state.
7. W6 파이프 한 줄로 복기 후 Week7로.

## wrap 요약

1. Day38 go — useState + W6 Sun weekend.
2. 노트·archive만 (플랜/active 미수정).
3. 다음: day-39-use-effect.

- **막힌:** —
- **다음 start:** day-39-use-effect · study/fe/39-day-39-use-effect.md
