# Day 49 · Controlled Component — **완료**

SSOT 노트: [../49-day-49-controlled-component.md](../49-day-49-controlled-component.md)

## active 체크

- [x] Controlled = React state가 input SSOT (`value`+`onChange`)
- [x] Uncontrolled = DOM 관리 + `ref`/`defaultValue`
- [x] `value` vs `defaultValue` / controlled↔uncontrolled 경고
- [x] 실시간 validation·제출 활성과의 연결
- [x] **실무:** 모의 45m #2 — 필터 input을 URL-controlled로 말하기
- [x] 큰 폼 단점·대안(uncontrolled, form lib)
- [x] **통과선** — 목록 검색창이 controlled인 이유

## 정리

### 한 줄

Controlled Component는 **입력값의 원본을 React state(또는 URL)에 두고** `value`/`onChange`로 DOM과 동기화하는 방식이다.

### 핵심

- `onChange`에서 state를 안 바꾸면 `value`가 고정되어 입력이 먹통처럼 보인다.
- Uncontrolled는 제출 시점에 ref로 읽기. 코드는 짧을 수 있으나 실시간 연동·검증이 약하다.
- `value={undefined}`→나중에 문자열로 바뀌면 controlled 전환 경고. 초기 `''` 등으로 일관.
- 리스트 필터를 URL에 두면 **URL이 SSOT인 controlled**에 가깝다(`useListParams` setter = onChange).
- 폼이 거대하면 리렌더·필드 수가 부담 → 필드 분리, debounce, RHF 등.

### 흐름

```
keystroke → onChange → setState/URL → re-render → value={state}
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Controlled vs Uncontrolled | state SSOT vs DOM SSOT |
| value vs defaultValue | 지속 제어 vs 초기값만 |
| 로컬 state vs URL | 화면 전용 vs 공유·뒤로가기 |
| 매 키 리렌더 | debounce·분리로 완화 |

### 실무 연결

- **모의 45m #2**: adjuster·dailycare 약점 보강과 함께, “검색어/탭을 controlled로 URL에 둔 이유”를 30초에 말한다. W8 손과제 URL-sync 토이가 바로 데모.

### 면접 한 방

- **Q:** Controlled와 Uncontrolled 차이? 왜 Controlled를 쓰나?
- **답:** Controlled는 React(또는 URL)가 값의 원본이라 검증·조건부 UI·동기화가 쉽다. Uncontrolled는 DOM이 들고 ref로 읽는다. 전환 시 value 일관성이 중요하다.

### 통과선 스크립트

1. value+onChange = controlled.
2. defaultValue/ref = uncontrolled.
3. SSOT 한 줄.
4. URL 필터 = controlled의 변형.
5. 모의 #2에서 한 문장 넣기.

## wrap 요약

1. Day49 go — value/onChange SSOT.
2. 모의 45m #2 · URL controlled.
3. 다음: day-50 · Error Boundary · W8 완료.

- **막힌:** —
- **다음 start:** `day-50-error-boundary`
