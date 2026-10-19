# Day 39 · useEffect

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-06-react-hooks/day-39-use-effect.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] useEffect = **렌더 후 동기화**(DOM·구독·네트워크) 역할 말하기
- [x] mount / update / unmount 타이밍과 cleanup 순서
- [x] `[]` · deps · 없음(매 렌더) 세 패턴 구분
- [x] Effect 안에서 setState → 추가 렌더 루프 함정
- [x] **실무:** `useListParams` — URL↔필터 상태가 Effect/구독으로 어떻게 맞는지 한 줄
- [x] RQ `useQuery`가 Effect 직접 쓰기와 역할 분담
- [x] **통과선** — “언제 Effect를 쓰고 언제 렌더 중 계산으로 끝내는가”

## 정리

### 한 줄

`useEffect`는 **화면이 그려진 뒤** 바깥 세계(DOM·구독·타이머·fetch)와 React 상태를 **맞추는** 훅이고, deps·cleanup으로 “언제 다시/언제 끊을지”를 정한다.

### 핵심

- 렌더 중에는 순수하게 UI를 계산하고, **부수 효과는 Effect**로 미룬다(Strict Mode 개발 환경에선 mount→cleanup→mount로 이중 실행될 수 있음).
- **cleanup**은 다음 Effect 실행 직전 + unmount 때. 구독·타이머·AbortController는 여기서 끊는다.
- Effect는 “데이터가 바뀌었으니 다시 맞춰라”이지, **이벤트 핸들러 대체물이 아니다**. 버튼 클릭 fetch는 보통 핸들러(+ mutation)가 맞다.
- 파생값은 Effect+setState보다 **렌더 중 계산**이 우선. Effect로 상태를 복제하면 이중 소스·깜빡임이 난다.
- 목록 URL 파라미터처럼 “외부 SSOT ↔ 로컬 뷰”를 맞출 때 Effect/구독 패턴이 자주 나온다 → nursing `useListParams`가 그 축.

### 흐름

```
render(commit) → useEffect 실행
  → (deps 변경 시) 이전 cleanup → 새 Effect
  → unmount 시 마지막 cleanup
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Effect vs 이벤트 핸들러 | 동기화 vs 사용자 의도 1회 |
| Effect setState vs 파생 계산 | 복제·루프 위험 vs 렌더에서 계산 |
| `[]` vs deps | mount 1회 vs 지정 값 변경 시 |
| 직접 fetch Effect vs RQ | 수동 abort/캐시 vs queryKey·캐시·재시도 |

### 실무 연결

- **`nursing-hospital/src/hooks/useListParams.ts`**: 리스트 필터·페이지 등을 URL(또는 라우터 파라미터)과 맞추는 훅. Effect/구독으로 “주소창이 SSOT”이 되게 동기화하면, 공유 링크·뒤로가기가 목록 상태를 복원한다. Day39 관점: **언제 sync Effect가 돌고, cleanup이 필요한가**.
- 서버 목록 자체는 RQ가 담당하고, `useListParams`는 **키에 넣을 파라미터 조립·URL 동기** 쪽에 가깝다.

### 면접 한 방

- **Q:** useEffect는 언제 쓰고, 남용하면 뭐가 깨지나?
- **답:** 렌더 후 외부와 동기화할 때 쓴다. 파생값을 Effect+setState로 복제하거나 클릭 fetch를 Effect에 넣으면 타이밍·이중 fetch·무한 루프가 난다. deps와 cleanup으로 구독 수명을 관리하고, 서버 데이터는 RQ 같은 도구에 맡기는 편이 안전하다.

### 통과선 스크립트

1. Effect = commit 이후 동기화.
2. cleanup 시점 두 가지(다음 Effect 전 / unmount).
3. `[]` / deps / 생략 의미.
4. 파생값은 렌더 계산 우선.
5. 클릭 동작 ≠ Effect.
6. nursing: `useListParams`가 URL↔리스트 입력 동기화 축이라고 한 줄.
