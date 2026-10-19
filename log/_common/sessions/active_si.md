# SI — 단계 9 · Docker Compose (연속 sgo 중단점)

pull 후 이 파일 + 노트. **Docker Desktop 켠 뒤** `sgo`로 9부터 재개.

**노트:** [`study/si/09-docker-compose.md`](../../../study/si/09-docker-compose.md)

## 실행 체크리스트

- [x] compose·Dockerfile·README 작성
- [x] `docker compose config` OK
- [ ] Docker Desktop 실행
- [ ] `cd src/labs/si/mini-api && docker compose up --build`
- [ ] `curl http://localhost:8080/api/ping` → ok
- [ ] 통과선: 새 셸에서도 compose로 기동 가능

## 한 줄 목표

MySQL+앱을 compose 한 방으로 기동

## 참고

- 직전: step 2~8 완료 (2026-10-19 sgo 쭉) · `mini-api` H2에서 JWT·CRUD 확인
- `CURRENT_STEP` → **단계 9** (☐)
- 막힌: Docker 데몬 `docker_engine` pipe 없음
