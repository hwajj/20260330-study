# 10-2 · ESLint & Prettier — **완료**

SSOT 노트: [`../10-10-2-eslint-prettier.md`](../10-10-2-eslint-prettier.md)

## active 체크

- [x] ESLint — 품질·버그 패턴 린트
- [x] Prettier — 포맷 통일, 역할 분리
- [x] `eslint-config-prettier` — 포맷 규칙 충돌 제거
- [x] format on save — `.vscode/settings.json`
- [x] pre-commit — husky + lint-staged
- [x] 저장 시 포맷 안 먹는 원인
- [x] 팀 일관성 — 레포 설정 커밋
- [x] **통과선** — ESLint vs Prettier / 파이프라인 30초

## 정리

### 한 줄

**ESLint는 버그·패턴, Prettier는 보이는 스타일**을 담당하고, 포맷 규칙은 Prettier에 넘긴 뒤 **에디터 저장 → pre-commit**까지 한 파이프라인으로 팀 일관성을 강제한다.

### 핵심

- **ESLint**: unused vars, hooks rules, import order, a11y plugin 등 **“이 코드 위험/ smell”** — 규칙 기반·자동 fix 일부.
- **Prettier**: 줄바꿈·들여쓰기·따옴표 — **의견 없는 포맷터**. diff noise 제거.
- **충돌 제거**: ESLint의 formatting 규칙과 Prettier가 싸우면 저장 시 되돌아감 → `eslint-config-prettier`로 ESLint 쪽 포맷 규칙 off, `eslint-plugin-prettier`는 선택(Prettier를 ESLint 경유 실행).
- **format on save**: `"editor.defaultFormatter"`, `"editor.formatOnSave"`, 언어별 Prettier 지정. ESLint fix on save는 별 토글 — **순서·역할 명시**.
- **husky + lint-staged**: 커밋 직전 staged 파일만 lint/format — CI 전에 로컬에서 걸러 “스타일만 고친 커밋”·규칙 위반 방지.

### 흐름

```
개발: 타이핑
  → save → Prettier format (+ optional ESLint --fix)
커밋: git commit
  → husky pre-commit → lint-staged (eslint + prettier --check/write)
CI: eslint . + prettier --check (이중 안전망)
설정: .eslintrc · prettier.config · .vscode/settings.json 레포 커밋
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| ESLint vs Prettier | 품질 vs 스타일 |
| prettier vs eslint --fix | 포맷 전담 vs 규칙 fix |
| 전역 vs 프로젝트 ESLint | cwd·extends 경로 혼선 |
| format on save 실패 | defaultFormatter 미지정·확장 충돌 |
| CI only | 로컬 훅 없으면 late feedback |

### 실무 연결

- `notes/2026-07-10_eslint-prettier-save-pipeline.md` — save 파이프라인 정렬.
- `notes/2026-07-10_VSCode-Prettier-ESLint-정리.md` — 에디터 설정.
- backoffice-shared: 패키지별 eslint extends, 모노레포 root prettier(10-4).

### 면접 한 방

- **Q:** ESLint와 Prettier 역할, 팀 일관성은?
- **답:** ESLint는 버그 날 만한 패턴, Prettier는 스타일. 겹치는 규칙은 eslint-config-prettier로 끈다. 설정을 레포에 두고 husky lint-staged로 커밋 시 자동 검사한다.

### 통과선 스크립트

1. ESLint = 품질, Prettier = 포맷.
2. eslint-config-prettier로 충돌 제거.
3. format on save 설정 포인트.
4. husky + lint-staged 역할.
5. 저장 안 될 때 점검( formatter · 충돌 ).
6. 설정 파일 레포 커밋 = 팀 SSOT.

## wrap 요약

- go 정리본: `study/fe/10-10-2-eslint-prettier.md` 완료.
- 핵심: ESLint/Prettier 분리, save·pre-commit 파이프라인.
- 다음 start/go: `10-3-node-version-env` · 노트는 다음 go에서 생성.
- 막힌: —
