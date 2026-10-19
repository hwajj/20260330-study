# 13-4 · Docker & CI/CD

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-13-infra-deploy/13-4-docker-cicd.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] 이미지·컨테이너·환경 드리프트 제거
- [x] Dockerfile·레이어 캐시
- [x] 멀티 스테이지 빌드·경량 final image
- [x] CI/CD lint→test→build→deploy
- [x] dev/staging/prod·시크릿 주입
- [x] 실패 시 롤백·이전 artifact
- [x] FE: build args·env at build time 함정
- [x] **통과선** — Docker·multi-stage·pipeline 30초

## 정리

### 한 줄

**Docker**는 OS·런타임·deps를 **이미지**로 고정해 “내 PC만 됨”을 없애고, **멀티 스테이지**로 빌드 도구를 제외한 slim image를 만들며, **CI/CD**가 lint/test/build/deploy를 자동화한다.

### 핵심

- **이미지 vs 컨테이너**: recipe vs running instance. **Layer cache** — Dockerfile 순서(dependencies before source)가 build speed.
- **환경 드리프트**: Node 18 vs 20, OpenSSL/webpack(13-5) — `.nvmrc` + **image node:20-alpine** 로 통일.
- **멀티 스테이지**: `AS builder` npm run build → `FROM nginx` COPY dist only — devDependencies·소스 미포함 → **작고 안전**.
- **CI/CD**: PR → lint/test → main merge → build image → push registry → deploy staging → approval → prod. **Fail fast**, green만 deploy.
- **시크릿**: GitHub Secrets → runtime env, **never in image layer**. FE `VITE_*`는 **build-time embed** — staging/prod job 분리.
- **롤백**: 이전 image tag redeploy — DB migration은 별도 정책.

### 흐름

```
git push
  → CI: eslint, vitest, tsc
  → docker build (multi-stage) → tag sha
  → push ECR/GHCR
  → CD: pull on server / k8s rollout
  → health check → traffic
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| image vs volume | immutable vs persistent data |
| build-time vs runtime env | Vite embed vs server API_URL |
| Docker vs VM | lighter, shared kernel |
| CI vs CD | verify vs ship |
| cache bust COPY . | order matters |

### 실무 연결

- **배포만 실패** — Node in Docker ≠ local nvm (13-5 case).
- Next.js: standalone output in Docker — server vs static export choice.
- preview deploy per PR — same pipeline, different env secrets.

### 면접 한 방

- **Q:** Docker가 drift를 어떻게 없애고, 멀티 스테이지 이점은?
- **답:** 런타임과 의존성을 이미지에 박아 어디서나 같게 실행한다. 멀티 스테이지는 빌드 단계만 도구를 쓰고 최종 이미지엔 dist만 넣어 가볍고 attack surface를 줄인다.

### 통과선 스크립트

1. image = frozen env.
2. layer cache = Dockerfile order.
3. multi-stage = builder + runtime.
4. CI lint test build; CD deploy.
5. secrets at CI inject, not in git.
6. FE env build-time vs runtime 구분.
