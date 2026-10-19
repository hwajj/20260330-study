# 10-3 · Node 버전 · 환경변수

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-10-tooling/10-3-node-version-env.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] nvm · `.nvmrc` — 선언 vs `nvm use` 적용
- [x] `engines` · lockfile — 버전 드리프트 완화
- [x] OpenSSL 3 · webpack 4 — `ERR_OSSL_EVP_UNSUPPORTED`
- [x] `.env` — 빌드 시 주입 vs 런타임
- [x] `import.meta.env` (VITE_*) · `NEXT_PUBLIC_*`
- [x] 시크릿 — public 접두사 금지, 서버/CI만
- [x] `NODE_ENV` — development / production 분기
- [x] **통과선** — nvm / env 노출 / OpenSSL 30초

## 정리

### 한 줄

**Node는 `.nvmrc`+`nvm use`+`engines`로 맞추고**, 프론트 env는 **빌드 시 문자열 치환**이라 `VITE_`/`NEXT_PUBLIC_`만 클라이언트 공개·**시크릿은 번들·public env에 넣지 않는다**.

### 핵심

- **nvm / `.nvmrc`**: 권장 Node 버전 **선언**일 뿐 자동 전환 아님 → 셸에서 `nvm use` 또는 dir 변경 훅. `package.json` `engines` + lockfile로 “내 PC에선 되는데” 줄임.
- **OpenSSL 3 (Node 17+)**: 구 webpack 4 등 구 crypto 알고리즘 → `ERR_OSSL_EVP_UNSUPPORTED`. 임시 `--openssl-legacy-provider`, **근본은 Node·webpack/Vite 버전 업**.
- **프론트 env 주입**: Vite/CRA/Next는 빌드 시 `process.env` / `import.meta.env`가 **리터럴로 치환** → CI에서 잘못 빌드하면 **재빌드 전까지 고정**.
- **노출 규칙**: `VITE_*`, `NEXT_PUBLIC_*` → 브라우저 번들에 들어갈 **수 있는 공개 설정**(API base URL). DB 비밀·private API key·`SECRET` → **서버·BFF·CI secret**만.
- **`NODE_ENV`**: production에서 minify·dev warning off 등 도구 분기.

### 흐름

```
온보딩
  → clone → nvm use ( .nvmrc )
  → pnpm install ( lockfile )
빌드/배포
  → CI secret → 서버 env
  → NEXT_PUBLIC_/VITE_ 만 빌드 args
  → 잘못된 env 빌드 → artifact에 박힘 → 재배포 필요
OpenSSL 에러
  → Node/webpack 버전 확인 → upgrade or legacy flag
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| .nvmrc vs auto switch | 선언 vs 수동/훅 적용 |
| build-time vs runtime env | SPA 정적 번들 vs SSR 서버 읽기 |
| public prefix vs none | 클라 노출 가능 vs 서버 전용 |
| env in .env committed | `.env.example` OK, secret commit 금지 |
| openssl legacy | 임시 vs 버전 정합 |

### 실무 연결

- `notes/2026-06-08_nvmrc-node-drift.md` — 팀 Node 드리프트.
- `notes/2026-06-08_node-openssl-webpack.md` — OpenSSL·webpack(10-1).
- 09-4: `NEXT_PUBLIC_API_SECRET` = 소스 공개와 동일.

### 면접 한 방

- **Q:** `.nvmrc` 있는데 버전 안 바뀌는 이유? `NEXT_PUBLIC_` vs 없는 변수?
- **답:** `.nvmrc`는 자동 전환이 아니라 `nvm use`로 적용한다. `NEXT_PUBLIC_`/`VITE_`는 클라 번들에 들어갈 공개 값, 접두사 없는 건 서버·CI 시크릿만.

### 통과선 스크립트

1. nvm use + engines + lock = 재현성.
2. OpenSSL 3 · 구 webpack 증상·근본 해결.
3. 프론트 env는 대부분 빌드 시 치환.
4. VITE_/NEXT_PUBLIC_ = 공개, secret = 서버.
5. NODE_ENV production 의미.
6. API_SECRET을 .env public에 두면 안 되는 이유.
