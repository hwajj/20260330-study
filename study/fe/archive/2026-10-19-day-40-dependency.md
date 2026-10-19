# Day 40 · dependency array — **완료**

SSOT 노트: [../40-day-40-dependency.md](../40-day-40-dependency.md)

## active 체크

- [x] deps = Effect/memo/callback이 **다시 돌 조건**임을 말하기
- [x] 참조 안정성: 객체·배열·인라인 함수가 deps를 깨는 이유
- [x] exhaustive-deps 경고를 “무시”하면 생기는 stale 연결
- [x] **실무:** `orderQueries.list` queryKey 팩토리 = **서버 캐시 deps**
- [x] queryKey 누락 필드 → 잘못된 캐시 히트
- [x] 원시값·직렬화 가능한 키만 넣는 습관
- [x] **통과선** — Effect deps vs RQ queryKey 한 호흡에 비유

## 정리

### 한 줄

dependency array는 “이 값이 바뀌면 **이 로직을 다시 맞춰라**”는 선언이고, React Query의 **queryKey**는 같은 사고를 서버 캐시에 적용한 것이다.

### 핵심

- Effect deps는 **Object.is**로 비교한다. `{ page: 1 }`를 매 렌더 새로 만들면 내용이 같아도 Effect가 매번 돈다.
- “deps에서 빼기”로 경고를 끄면 **오래된 클로저**로 직행(Day41). 빼야 한다면 설계를 바꾸고(ref, 이벤트 핸들러, key 분리), 무단 생략은 금지에 가깝다.
- 함수·객체를 deps에 넣어야 하면 `useCallback`/`useMemo`로 **참조를 안정**시키거나, deps를 원시 필드로 쪼갠다.
- **queryKey 팩토리**(`orderQueries.list(params)`)는 `['orders', 'list', params]`처럼 **캐시를 구분하는 deps**다. 필터·페이지가 키에 없으면 다른 목록이 같은 캐시를 본다.

### 흐름

```
params 변경
  → queryKey 변경 → RQ refetch/캐시 분리
  → (Effect라면) deps 변경 → cleanup → Effect 재실행
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 값 같음 vs 참조 같음 | 내용 동일해도 새 객체면 deps 변경 |
| Effect deps vs queryKey | 동기화 재실행 vs 캐시 슬롯 식별 |
| 키에 함수 넣기 | 직렬화·비교 불안정 → 피함 |
| “일단 []” | mount만 돌리고 최신 props 무시 → bug |

### 실무 연결

- **`nursing-hospital/src/lib/api/@queries/` · `orderQueries.list`**: list용 queryKey를 손으로 쓸 수 있어야 한다. `useListParams`가 만든 params가 키에 **빠짐없이** 들어가는지가 Day40 핵심. invalidate 시에도 같은 팩토리로 prefix 무효화한다.
- care/결제 화면의 `useQuery(['list', tab])` 패턴과 동일: **탭·필터 = deps/키**.

### 면접 한 방

- **Q:** dependency를 빼도 되나? queryKey랑 뭐가 닮았나?
- **답:** 빼면 최신 값을 못 보는 stale이 난다. 경고를 끄는 게 아니라 참조를 안정시키거나 로직 위치를 바꾼다. RQ queryKey도 “이 입력이 바뀌면 다른 데이터”라는 같은 deps 사고다.

### 통과선 스크립트

1. deps = 재실행·재계산 조건, Object.is.
2. 인라인 객체/함수가 매번 깨는 이유.
3. 생략 = stale 예약.
4. queryKey = 서버 상태 deps.
5. `orderQueries.list`에 params 필드가 키에 들어가야 하는 이유 한 줄.

## wrap 요약

1. Day40 go — deps = queryKey 사고.
2. orderQueries.list params 키.
3. 다음: day-41 · stale closure + list-page 대照.

- **막힌:** —
- **다음 start:** `day-41-stale-closure`
