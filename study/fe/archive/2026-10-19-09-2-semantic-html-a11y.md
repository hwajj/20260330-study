# 09-2 · 시맨틱 HTML & 접근성 — **완료**

SSOT 노트: [`../09-09-2-semantic-html-a11y.md`](../09-09-2-semantic-html-a11y.md)

## active 체크

- [x] 시맨틱 태그 — `header/nav/main/article/button` 구조
- [x] ARIA — 네이티브 우선, `role`·`aria-*` 보강
- [x] 키보드 — Tab 순서, focus, `:focus-visible`
- [x] 스크린 리더 — `label`, `aria-label`, `alt`
- [x] WCAG 명도 대비(contrast)
- [x] `<div onClick>` vs `<button>` 함정
- [x] SEO와 a11y 같은 뿌리
- [x] **통과선** — 시맨틱 / ARIA / 키보드 30초

## 정리

### 한 줄

**의미 있는 HTML**로 구조·키보드·스크린 리더 기본을 채우고, 부족할 때만 ARIA로 보강하며, 대비·라벨까지 맞추면 SEO와 접근성이 같은 마크업에서 같이 이긴다.

### 핵심

- **시맨틱 태그**: `header`, `nav`, `main`, `article`, `section`, `button` 등은 역할이 내장돼 크롤러·보조기기·팀원 모두 구조를 읽는다.
- **`<button>` vs `<div onClick>`**: button은 Tab 포커스, Enter/Space, implicit role 기본. div는 tabindex·키 핸들러·role을 전부 수동 — 누락 시 a11y·RTL 테스트 모두 깨짐.
- **ARIA 첫 규칙**: 네이티브로 표현 가능하면 ARIA 쓰지 않는다. 잘못된 ARIA는 없느니만 못함(`aria-label`만 달고 실제 동작 없음 등).
- **키보드**: 논리적 Tab 순서, 모달 focus trap, `:focus-visible`로 마우스 클릭과 키보드 포커스 구분.
- **스크린 리더**: 폼은 `<label htmlFor>`, 아이콘 버튼은 접근 가능 이름, 이미지는 의미 있는 `alt`(장식은 빈 alt).
- **명도 대비**: WCAG AA(일반 텍스트 4.5:1 등) — 디자인 토큰·테마에서 early check.

### 흐름

```
UI 설계
  → 인터랙션? → button/a (네이티브)
  → 페이지 뼈대 → main 1개, nav landmark
  → 폼 → label 연결, 에러 aria-live
  → 커스텀 위젯만 → role + keyboard spec + ARIA
  → 색만으로 상태 전달 금지 → 텍스트·아이콘+label
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| semantic vs div soup | 구조·기본 a11y vs 전부 수동 |
| ARIA vs native | 보강 vs 대체 (대체 금지) |
| focus vs focus-visible | 클릭 링 vs 키보드 링 |
| alt 장식 vs 정보 | `alt=""` vs 설명 문장 |
| a11y vs SEO | 같은 시맨틱 이득 |

### 실무 연결

- 디자인 시스템 Button/Link 컴포넌트 — 내부 `<button>`/`<a>` 고정.
- RTL `getByRole('button', { name })` — 라벨 없는 아이콘 버튼이 테스트·a11y 동시 실패.
- Day 3 DOM·렌더링과 연결: 의미 있는 트리 = 유지보수 + 검색.

### 면접 한 방

- **Q:** `<div onClick>` 대신 `<button>`을 써야 하는 이유?
- **답:** button은 키보드 포커스·Enter/Space·스크린 리더 역할이 기본이다. div는 전부 직접 구현해야 하고 빠진 한 가지가 접근성 결함이다. ARIA는 네이티브로 못 할 때만 보강한다.

### 통과선 스크립트

1. 시맨틱 = 구조 + SEO + a11y 기본.
2. button/a 우선, div 클릭 안티패턴.
3. ARIA 첫 규칙 — native first.
4. label·alt·accessible name.
5. 키보드·`:focus-visible`.
6. WCAG contrast 한 줄.

## wrap 요약

- go 정리본: `study/fe/09-09-2-semantic-html-a11y.md` 완료.
- 핵심: native HTML first, ARIA 보강, 키보드·대비.
- 다음 start/go: `09-3-testing` · 노트는 다음 go에서 생성.
- 막힌: —
