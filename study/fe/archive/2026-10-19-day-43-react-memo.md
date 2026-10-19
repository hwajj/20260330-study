# Day 43 · React.memo & Profiler — **완료**

SSOT 노트: [../43-day-43-react-memo.md](../43-day-43-react-memo.md)

## active 체크

- [x] `React.memo` = props **얕은 비교**로 리렌더 스킵
- [x] 효과가 있는 경우 / 무의미한 경우 구분
- [x] 인라인 객체·함수 props가 memo를 깨는 이유
- [x] **React Profiler**로 전후 측정(추측 금지)
- [x] **실무:** nursing resume 불릿 — 성능·목록 최적화 말하기
- [x] memo vs RQ 캐시(서버) vs 브라우저 paint 혼동 금지
- [x] **통과선** — “측정 → 병목 → memo/callback 여부”

## 정리

### 한 줄

`React.memo`는 자식 props가 얕게 같으면 **리렌더를 건너뛰는** 최적화이고, Profiler로 이득을 확인하기 전에 뿌리면 복잡도만 늘어난다.

### 핵심

- 부모가 자주 리렌더되고, 자식이 **무겁고**, props가 **안정적**일 때 이득.
- `style={{}}`, `onClick={() => …}`, `data={{…}}`를 매번 새로 넘기면 memo는 항상 실패한다 → Day44/45와 세트.
- custom compare 함수는 가능하지만 비용·버그 위험. 기본은 얕은 비교.
- **Profiler**: commit 시간·렌더 횟수 전후 비교. “느린 목록”이 네트워크/메인 스레드/리렌더 중 무엇인지 먼저 가른다.
- resume에는 “memo 썼다”보다 **측정 근거·병목 제거** 스토리가 설득력 있다.

### 흐름

```
부모 setState → 자식 기본은 리렌더
memo(Child) + props 동일(참조) → Child 스킵
props 참조 변경 → Child 렌더
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| memo vs useMemo | 컴포넌트 리렌더 스킵 vs 값 메모 |
| 리렌더 스킵 vs DOM 안 바뀜 | VDOM 작업 감소 ≠ 항상 paint 0 |
| 추측 최적화 vs Profiler | 추측 금지 |
| 전체 페이지 memo | 보통 무의미, 경계 선택 |

### 실무 연결

- **`log/nursing-hospital/resume-*.md`**: 15분 설명용 불릿 2개. 예) URL-sync 리스트 파라미터 소유, Query 키 팩토리·테스트. 성능 이야기로 갈 때는 Profiler로 행 컴포넌트 리렌더를 본 뒤에야 memo를 언급.
- AI 거버넌스는 1분 — 본체는 **모듈 설명 가능**임.

### 면접 한 방

- **Q:** React.memo는 만능인가? 언제 쓰나?
- **답:** 아니다. props가 안정적이고 자식이 비쌀 때. 인라인 객체/함수면 깨진다. Profiler로 전후를 보고, useCallback/useMemo와 같이 쓴다.

### 통과선 스크립트

1. memo = 얕은 props 비교 스킵.
2. 깨지는 props 예 두 개.
3. Profiler로 근거.
4. nursing resume: 소유 모듈 + (선택) 측정 후 최적화.
5. 추측 memo 금지.

## wrap 요약

1. Day43 go — memo는 측정 후.
2. nursing resume 불릿.
3. 다음: day-44 · useMemo + 주말 테스트.

- **막힌:** —
- **다음 start:** `day-44-use-memo`
