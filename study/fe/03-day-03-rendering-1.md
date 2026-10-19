# Day 03 · 브라우저 렌더링(1)

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-01-web-js/day-03-rendering-1.md` (스텁) · 본문 보강: 같은 폴더 `day-04-rendering-2.md`에 옮겨 둔 Day3 CRP 내용 · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Day03 키워드(DOM·CSSOM·Render Tree) + CRP 본문 읽고 정리
- [x] **curriculum 세 줄** — 뭔지 / 네트워크 Day02와의 경계 / FE·실무 연결
- [x] **면접 Q 요지** — 브라우저 렌더링 과정 + `display:none` vs `visibility:hidden`
- [x] **주말 Promise** — 렌더·파싱을 막는 sync script와 async 로딩을 Promise/async와 한 줄 연결
- [x] **차이·함정** — DOM⊃Render Tree 아님, CSSOM 블로킹, script 파싱 중단
- [x] **통과선 말하기** — HTML→DOM, CSS→CSSOM, 결합→Render Tree→(Layout→Paint→Composite 이름만)

오늘 코드 리딩 건너뜀 — W1 **일** (주말 리딩·복습 / 회사 열 파일 없음)

## 정리

### 한 줄

브라우저는 HTML→**DOM**, CSS→**CSSOM**을 만든 뒤 둘을 합쳐 **Render Tree**를 만들고, 이어서 Layout → Paint → Composite로 픽셀을 그린다. Day03은 그 앞단(트리 만들기)에 집중한다.

### 핵심

- **DOM**: HTML을 파싱한 **객체 트리**. JS로 조회·수정 가능. DOM에 있다고 해서 전부 화면에 나오는 것은 아님.
- **CSSOM**: CSS를 파싱한 스타일 객체 모델. 어떤 규칙이 어떤 노드에 적용될지 계산의 재료.
- **Render Tree**: **실제로 그릴 노드**만. DOM ∩ “보이는 스타일”에 가깝다. `display: none`은 DOM에는 있어도 Render Tree에서 **빠진다**. `visibility: hidden`은 자리를 차지하므로 Render Tree에 **남는다**.
- **Critical Rendering Path (CRP)**: HTML 응답 이후 첫 화면까지의 핵심 파이프라인. 성능·면접 단골.
- **JS와 파싱**: 일반 `<script src>`는 HTML 파싱을 **멈추고** 받아 실행할 수 있다 → 첫 페인트 지연. `defer`/`async`로 완화. CSS도 CSSOM이 준비되기 전 렌더를 막는 경우가 많다(렌더 블로킹 리소스).
- Day02(네트워크)와 이음매: HTML 바이트가 오기 **시작**하면 파싱이 돌아가고, 그 결과가 여기 DOM 구축이다.

### 흐름

```
HTML 바이트
  → HTML Parsing → DOM
CSS 바이트
  → CSS Parsing  → CSSOM
DOM + CSSOM → Render Tree
  → Layout(위치·크기) → Paint(그리기) → Composite(층 합치기)  ← Day04에서 깊게
```

한 줄 암기: **HTML→DOM, CSS→CSSOM, 둘 합쳐 Render Tree, 그다음 Layout→Paint→Composite.**

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| DOM vs Render Tree | DOM=문서 구조 전체 / Render Tree=그릴 것만 |
| `display:none` vs `visibility:hidden` | 전자는 트리에서 제외·공간 없음 / 후자는 공간 유지·트리에 포함 |
| 네트워크 끝 → 렌더 시작? | Day02와 동일하게 **아님**. HTML 수신과 파싱이 겹침 |
| script 기본 vs defer | 기본은 파싱 중단 가능 / defer는 문서 파싱 후·순서 보장에 가깝게 실행 |
| Virtual DOM (React) | **브라우저 DOM 위 추상**. Day03 CRP와 층이 다름 — “느린 DOM 조작을 묶어서”가 VDOM 요지 |

### 실무 연결

- React/SPA도 결국 **브라우저 DOM·스타일·레이아웃**을 건드린다. 큰 리스트 리렌더·인라인 스타일 폭주는 Layout/Paint 비용으로 이어진다(세부 Day04).
- `index.html`의 스크립트 위치·`defer`, Critical CSS, 폰트/CSS 워터폴이 **첫 화면 CRP**를 좌우한다.
- DevTools Performance / Rendering에서 “Layout / Paint” 구간이 바로 CRP 뒷단이다.
- **(주말 Promise)** `async` 함수·`fetch().then`은 JS 실행 모델 이야기이고, `<script defer>`는 **로딩·파싱 스케줄** 이야기다. 둘 다 “나중에 이어가기”지만 층이 다르다 — 혼동하지 말 것.

### 면접 한 방

- **Q:** 브라우저 렌더링 과정을 설명해 보세요. (`display:none`도 한 줄)
- **답:** HTML을 파싱해 DOM, CSS를 파싱해 CSSOM을 만들고 결합해 Render Tree를 만든다. 이후 Layout으로 기하를 잡고 Paint로 그리고 Composite로 합친다. `display:none`은 Render Tree에 안 들어가고, `visibility:hidden`은 공간은 차지한 채 트리에 남는다. 일반 script는 HTML 파싱을 막을 수 있어 `defer`/`async`를 쓴다.

### 통과선 스크립트

1. Day02에서 HTTP로 HTML을 받기 시작하면 파싱이 열린다고 연결한다.
2. HTML→DOM, CSS→CSSOM을 말한다.
3. 둘을 합쳐 Render Tree — “화면에 필요한 노드만”이라고 말한다.
4. `display:none` vs `visibility:hidden`을 대비한다.
5. CRP 전체 이름 순서: Render Tree → Layout → Paint → Composite (뒷단은 Day04에서 깊게).
6. sync script가 파싱을 막을 수 있고 defer/async로 줄인다고 한 줄.
7. React VDOM은 이 파이프라인 **앞의 앱 전략**이지, CRP를 대체하지 않는다고 선을 긋는다.

archive: [`archive/2026-10-19-day-03-rendering-1.md`](./archive/2026-10-19-day-03-rendering-1.md)
