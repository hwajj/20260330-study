# 09-1 · CSS 레이아웃 & 아키텍처

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-09-quality/09-1-css-layout-architecture.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Flexbox vs Grid — 1차원 vs 2차원 배치
- [x] Cascade·명시도(Specificity) — 규칙 충돌·`!important` 원인
- [x] BEM / CSS Modules / CSS-in-JS — 스코핑 전략
- [x] render-blocking CSS — CSSOM·Critical CSS
- [x] 다중 CSS 세트 충돌 — 레거시+신규 오염
- [x] 반응형 — Grid 안 Flex 조합
- [x] **통과선** — Flex/Grid / blocking / 스코핑 30초

## 정리

### 한 줄

레이아웃은 **Flex(한 축)·Grid(행+열)**로 나누고, 유지보수는 **스코핑으로 전역 cascade 전쟁을 막으며**, 성능은 **render-blocking CSS**와 레거시 CSS 공존 충돌을 진단한다.

### 핵심

- **Flexbox**: 한 방향(행 또는 열) 정렬·분배·`flex-grow/shrink`. 툴바·카드 내부·한 줄 나열.
- **Grid**: 행+열 2차원. 페이지 골격·갤러리. 실무에선 Grid 영역 안에 Flex를 자주 중첩.
- **Cascade·명시도**: 같은 속성 충돌 시 specificity·순서·`!important`로 승자 결정. 깊은 셀렉터·전역 클래스 남발 → `!important` 남용 악순환.
- **스코핑**: BEM(네이밍), CSS Modules(빌드 시 해시), CSS-in-JS(컴포넌트 바인딩) — 목적은 **클래스 충돌·전역 오염 방지**.
- **render-blocking**: `<head>` CSS는 CSSOM 완성 전 렌더 지연. Critical CSS 인라인·나머지 지연 로드로 FCP 완화.
- **다중 CSS 세트**: SPA 리뉴얼·마이크로 프론트에서 레거시+신규 동시 로드 시 specificity 전쟁·예기치 않은 inherit.

### 흐름

```
페이지 골격 → Grid (areas / template)
  → 영역 내부 → Flex (정렬·균등 분배)
스타일 작성 → Modules/BEM으로 스코프
  → 얕은 셀렉터 · !important 회피
성능 → above-the-fold CSS 우선
  → non-critical async/defer 로드
레거시 공존 → 로드 순서·네임스페이스·겹침 감사
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Flex vs Grid | 1축 분배 vs 2차원 격자 |
| float vs Flex | 레거시 vs 현대 1차원 레이아웃 |
| Modules vs BEM | 해시 스코프 vs 네이밍 규약 |
| blocking vs async CSS | 초기 렌더 vs 지연 스타일 |
| specificity vs 스코핑 | 싸움 vs 애초에 충돌 제거 |

### 실무 연결

- `notes/2026-06-11_spa-css-next-renewal.md` — SPA 리뉴얼 시 CSS 공존·분리.
- `notes/2026-07-02_basicSwiper-opacity-desktop-clipping.md` — 레이아웃·overflow·opacity 클리pping 이슈.
- backoffice: 공통 UI kit + 앱 CSS Modules — 전역 reset과 컴포넌트 스코프 정합.

### 면접 한 방

- **Q:** Flex와 Grid를 언제 나눠 쓰나?
- **답:** 한 축으로 아이템을 늘리고 정렬하면 Flex, 행과 열을 동시에 배치하면 Grid. 실무는 Grid 골격 + Flex 내부가 흔하다. CSS는 render-blocking이라 Critical 분리, 명시도 전쟁은 Modules/BEM 같은 스코핑으로 예방한다.

### 통과선 스크립트

1. Flex 1차원, Grid 2차원 + 중첩 패턴.
2. cascade·specificity가 충돌을 결정.
3. BEM/Modules/CSS-in-JS = 스코핑.
4. CSSOM → render-blocking 의미.
5. 레거시+신규 CSS 공존 리스크.
6. Critical vs deferred CSS 한 줄.
