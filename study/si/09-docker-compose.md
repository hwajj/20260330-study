# SI 09 · Docker Compose

> **진행 중** · 플랜 단계 9 — **데몬 미기동으로 sgo 연속 중단**

## 학습 할 일

- [x] `docker-compose.yml` + `Dockerfile` 작성 (app + MySQL)
- [x] README에 `docker compose up` 안내
- [x] `docker compose config` 검증 OK
- [ ] `docker compose up --build` 실제 기동 (Docker Desktop 필요)

## 진행

- 파일: `src/labs/si/mini-api/docker-compose.yml`, `Dockerfile`, profile `mysql`
- `docker compose config` exit 0
- `docker compose up --build -d` → **docker_engine pipe 없음** (데몬 OFF)

## 정리

### 한 줄
Compose로 DB+앱을 한 번에 올리려면 **로컬 Docker 데몬**이 먼저 떠 있어야 한다.

### 다음 액션
Docker Desktop 실행 후 `cd src/labs/si/mini-api && docker compose up --build` → ping 확인 → `sgo`로 9 완료

## 메모

—

## 막힌 질문

—
