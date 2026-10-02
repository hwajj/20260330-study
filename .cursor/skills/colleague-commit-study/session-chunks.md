# 세션 내 읽기 덩어리 (chunks)

커리큘럼 **1세션(S01, M03 …)** 안을 **0,1,2…** 로 쪼갠다.  
집·회사 이어하기: **`log/_common/sessions/active_colleague_commit_study.md`** 의 체크만 갱신.

아래에 없는 세션 ID는 **analyze** 때 이 파일에 덩어리 표를 추가하거나, active에만 임시 체크리스트를 쓴다.

---

## SHARED S01 — 모노레포·초기 패키지

**Repo 코드:** `c:\Users\yojic\projects\backoffice-shared`  
**Git 스냅샷(선택):** `7d15571` — 루트 `workspaces`는 이 커밋; 최신은 `pnpm-workspace.yaml` (S03)

| # | 이름 | 통과 기준 (한 줄) |
|---|------|-------------------|
| 0 | 레포가 뭐하는 곳 | README §1~§3만 — “공통 npm 패키지 + demo” 설명 가능 |
| 1 | 패키지 빌드 한 바퀴 | hook `package.json` → `vite.config.ts` → `src/index.ts` — peer/external 이해 |
| 2 | type 패키지 | `packages/type/src/**` 짧게 — “공통 가드” 역할 |
| 3 | service 층 | README → apiTypes → unpackResponse → HttpClient → Jwt register 흐름 |
| 4 | useParamState | types → const → utils(encode) → useParamState.ts |
| 5 | demo (선택) | `demo/App.tsx` + tsconfig paths — 로컬 검증 루트 |

### 체크리스트 (active에 복사)

**0 — README**
- [ ] `backoffice-shared/README.md` §1~§3
- [ ] 브랜치 `feature/{pkg}@{ver}` 의미 한 줄 메모

**1 — hook 패키지 템플릿**
- [ ] 루트 `package.json` @ `7d15571` 또는 `pnpm-workspace.yaml` + scripts `demo`/`build:a`
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

**5 — demo**
- [ ] `demo/src/App.tsx`, `demo/tsconfig.app.json` paths

---

## SHARED S02 — hook 일괄 도입

_(analyze S02 시 위와 같은 형식으로 이 섹션 채움)_

## MOBILE Mxx

_(analyze Mxx 시 채움)_
