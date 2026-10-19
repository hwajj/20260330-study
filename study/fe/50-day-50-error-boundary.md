# Day 50 · Error Boundary

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-07-react-state-error/day-50-error-boundary.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Error Boundary = 렌더 오류 격리 + fallback UI
- [x] `getDerivedStateFromError` vs `componentDidCatch`
- [x] 못 잡는 것: 이벤트·async·SSR 등
- [x] 배치 단위(페이지/위젯)로 나누는 이유
- [x] **실무:** W8 완료 — Query `onError` vs Boundary 역할 구분(W6 복습)
- [x] 클래스 구현 / 라이브러리 래핑
- [x] **통과선** — “전체 화이트스크린 막는법”

## 정리

### 한 줄

Error Boundary는 자식 **렌더/라이프사이클** 오류를 잡아 영역별 fallback을 보여주고, 이벤트·Promise 오류까지 자동으로 먹진 않는다.

### 핵심

- `getDerivedStateFromError`: fallback용 state. `componentDidCatch`: 로깅·모니터링.
- 기본 API는 클래스. 앱에서는 `react-error-boundary` 등으로 감싸는 경우가 많음.
- 루트 하나만 두면 한 위젯 오류가 전체 fallback. 목록/상세/결제 단위로 쪼갠다.
- **RQ onError / useHmcError**: 서버·비즈니스 에러 UI. Boundary: 예외로 컴포넌트가 throw한 경우. 둘 다 필요(W6 통과선 연장).
- W8 금: 손과제 demo + 모의 2회 중 방어 스토리에 “에러 격리” 한 줄.

### 흐름

```
Child render throw
  → nearest Error Boundary
  → getDerivedStateFromError → fallback
  → componentDidCatch → log
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Boundary vs try/catch | 선언적 트리 경계 vs 명령형 |
| Boundary vs Query onError | throw/render vs 요청 실패 콜백 |
| 이벤트 핸들러 에러 | Boundary 밖 → 직접 catch |
| 전역 1개 | 격리 실패에 가깝 |

### 실무 연결

- **W8 완료 체크**: STUDY-PLAN §10·다음 8주 여부. 기술 스토리로는 Boundary 범위 + nursing/list 에러 UI + adjuster QueryCache onError를 한 줄씩.
- 손과제에 Boundary를 목록 영역에만 씌워 “헤더는 살아 있음”을 보여주면 설득력↑.

### 면접 한 방

- **Q:** Error Boundary가 못 잡는 에러는? Query 에러랑 뭐가 다르나?
- **답:** 이벤트·async·SSR 등은 기본 Boundary 밖이다. Query 실패는 보통 throw가 아니라 상태/onError로 다룬다. Boundary는 렌더 중 예외 격리용이다.

### 통과선 스크립트

1. 역할: 격리+fallback.
2. 두 라이프사이클 역할.
3. 못 잡는 목록.
4. 범위 쪼개기.
5. onError와 병행.
6. W8 마무리 한 줄.
