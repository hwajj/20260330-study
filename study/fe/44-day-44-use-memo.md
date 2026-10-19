# Day 44 · useMemo

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-06-react-hooks/day-44-use-memo.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] `useMemo` = deps 같을 때 **계산 결과 재사용**
- [x] 비싼 계산 vs 참조 안정화(두 동기) 구분
- [x] 남용 시 가독성·deps 비용만 증가
- [x] memo 자식에 넘기는 객체/배열 안정화와 연결
- [x] **주말:** nursing 모듈 **테스트 1개** — 순수 계산/직렬화를 memo 후보로 보기
- [x] RQ `select`와 역할 겹침 인지
- [x] **통과선** — “왜 memo했는지” 한 줄

## 정리

### 한 줄

`useMemo`는 deps가 같으면 **이전 계산값(참조)을 재사용**해, 비싼 연산 반복이나 불필요한 하위 리렌더를 줄인다.

### 핵심

- 동기 1: 필터/정렬/파생 테이블처럼 **CPU 비싼** 순수 계산.
- 동기 2: `{...}` / `[...]`를 자식·memo·Effect deps에 넣을 때 **참조 유지**.
- 단순 숫자 파생·싼 map은 렌더 중 계산이 더 읽기 쉽다. “일단 useMemo”는 Day43과 같이 측정·이유가 있을 때.
- deps 설계는 Day40과 동일. 빠진 deps = 잘못된 캐시(stale 결과).
- 서버 데이터 파생은 RQ `select`로 캐시 옆에서 다루는 경우도 많다 — 클라이언트 전용 조립만 `useMemo`.

### 흐름

```
deps 동일 → 캐시된 value 반환
deps 변경 → factory 재실행 → 새 value
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| useMemo vs useCallback | 값 캐시 vs 함수 캐시(`useCallback(fn)=useMemo(()=>fn)`) |
| useMemo vs memo | 값 vs 컴포넌트 |
| 참조 안정 vs 성능 | 종종 참조가 목적 |
| 테스트와 순수함수 | factory는 순수해야 예측 가능 |

### 실무 연결

- **주말 테스트 1개**(AI 힌트만): `useListParams` 직렬화·기본값·쿼리 문자열 조립 같은 **순수 구간**을 테스트하기 좋게 두고, 필요하면 그 결과를 `useMemo`로 감싸는 그림을 그린다. 테스트가 green이면 “계산이 순수하다”는 증명이기도 하다.

### 면접 한 방

- **Q:** useMemo를 언제 쓰나?
- **답:** 계산이 비싸거나, 같은 참조를 하위 memo/Effect에 유지해야 할 때. deps를 정확히 쓰고, 싸구려 연산에 도배하지 않는다.

### 통과선 스크립트

1. useMemo = deps 기준 값 재사용.
2. 비싼 계산 / 참조 안정 두 이유.
3. deps 누락 = 옛 결과.
4. useCallback과의 관계 한 줄.
5. 주말: 순수 로직 테스트가 먼저, memo는 이유 있을 때.
