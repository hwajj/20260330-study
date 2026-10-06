# Colleague — SHARED S01

다른 PC: **`20260330-study` pull** → 이 파일 + 노트. 코드: **`backoffice-shared`**.

**노트:** [`study/colleague/01-shared-s01.md`](../../../study/colleague/01-shared-s01.md)

**세션 키:** `colleague-S01`  
**커밋 범위:** `3c1e4ce` .. `7d15571`  
**한 줄 목표:** 모노레포·service·useParamState가 “앱에 뭘 약속하는지” 뼈대만 잡기

## 채팅 명령 (복붙)

| 할 일 | 채팅에 입력 |
|--------|-------------|
| 이어하기 | `colleague-commit-study-start` |
| 덩어리 끝 | `chunk-wrap 1 — 배운 한 줄` 또는 `/chunk 1` |
| 세션 끝 | `colleague-commit-study-wrap` |
| 스킬 선택 | `@colleague-chunk-wrap` |

덩어리 정의: `.cursor/skills/colleague-commit-study/session-chunks.md` § SHARED S01

## 실행 체크리스트 (덩어리)

**0 — README**
- [ ] `backoffice-shared/README.md` §1~§3
- [ ] 브랜치 `feature/{pkg}@{ver}` 의미 한 줄 메모

**1 — hook 패키지 템플릿**
- [ ] 루트 `package.json` @ git `7d15571` **또는** `pnpm-workspace.yaml` + `demo`/`build:a`
- [ ] `.changeset/config.json` 훑기
- [ ] `packages/hook/package.json` → `vite.config.ts` → `src/index.ts`

**2 — type**
- [ ] `packages/type/src/index.ts` → typeGuards/*

**3 — service (순서 고정)**
- [ ] `packages/service/README.md`
- [ ] `src/apiTypes.ts`
- [ ] `src/adapter/unpackResponse.ts`
- [ ] `HttpClientService/HttpClientService.ts`
- [ ] `JwtAuthService/abstracts.ts` → `JwtAuthService.ts`
- [ ] `utils/FormDataBuilder.ts` (필요 시만)

**4 — useParamState**
- [ ] `useParamState/types.ts` → `const.ts` → `utils.ts` → `useParamState.ts`

**5 — demo (선택)**
- [ ] `demo/src/App.tsx`, `demo/tsconfig.app.json` paths

## 다음에 할 일

- **다음 덩어리:** 0번부터 첫 ☐ 찾아서 진행 (완료한 덩어리는 [x]로 바꿀 것)
- 덩어리 끝: `colleague-commit-study-chunk-wrap {n}` (+ 한 줄) → `log/_common/til/YYYY-MM-DD.md`
- 세션 전체 끝: `colleague-commit-study-wrap` → `log/_common/til/colleague-commit-study.md`

## 참고

- 막힌 질문: —
- PROGRESS: `.cursor/skills/colleague-commit-study/PROGRESS.md` (세션 ☑는 wrap 때만)

## 진행

덩어리 끝날 때마다 `[x]` + 완료 시각 한 줄 (예: `덩어리 1 완 18:30 — vite external 이해`)

## 메모

- frontend-dev-notes/package.json 은 이 스터디와 무관 (VitePress)

## 막힌 질문
