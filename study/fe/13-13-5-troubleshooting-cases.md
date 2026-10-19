# 13-5 · 실전 트러블슈팅 사례

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-13-infra-deploy/13-5-troubleshooting-cases.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] 증상→가설→확인→원인→해결 틀
- [x] 레이어 좁히기 DNS→Nginx→upstream→앱
- [x] Node OpenSSL·webpack 빌드 실패
- [x] Nginx server_name·try_files·/api 누락
- [x] 502·ECONNREFUSED upstream
- [x] 로컬 OK·배포 NG 후보
- [x] curl -v·nginx error.log·상태 코드
- [x] **통과선** — 502·404·빌드 실패 진단 30초

## 정리

### 한 줄

배포 장애는 **레이어(DNS→Nginx→upstream→앱)** 로 좁히고, **502는 뒤 서버 미기동**, SPA **새로고침 404는 try_files**, **빌드 실패는 Node/OpenSSL drift** 같은 **다중 원인 체인**을 사례처럼 문서화한다.

### 핵심

- **사고 틀**: symptom → hypothesis → **minimal repro** (`curl -v`) → confirm layer → fix → postmortem.
- **레이어**: DNS wrong IP → Nginx wrong vhost/location → **upstream down** → app 500/ env missing.
- **사례 1 — Node 17+ OpenSSL 3**: old webpack → `ERR_OSSL_EVP_UNSUPPORTED`. Fix: **`.nvmrc`/engines**, image pin, legacy provider는 임시.
- **사례 2 — Nginx**: `server_name` subdomain miss → default site. **try_files** miss → refresh 404. **no /api** → API static served or 404.
- **사례 3 — 502**: almost always **process not listening** on `proxy_pass` port — `ss -lntp`, systemd, docker ps.
- **로컬 vs prod**: Node version, **env vars**, Nginx routing, **same-origin vs CORS**, asset base path.

### 흐름

```
"배포 후 502"
  curl -v https://app.../api/health
  → 502 from nginx
  → check upstream:3000 listening? (often NO)
  → start app / fix port / docker

"새로고침만 404"
  → direct URL hits nginx static
  → add try_files → /index.html

"빌드 pipeline red"
  → log ERR_OSSL → node version matrix
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 502 vs 504 | bad gateway vs timeout |
| 404 static vs 404 API | try_files vs route miss |
| build fail vs runtime fail | CI vs deploy server |
| CORS error vs 502 | browser block vs nginx |
| DNS propagation vs config | wait vs fix record |

### 실무 연결

- proxy-econnrefused, nvmrc-drift, node-openssl-webpack, ubuntu-deploy 노트 — 같은 체인.
- FE developer: **can't fix Nginx** but can **narrow layer** with curl status + “works on `/` not `/api`”.
- CI green + prod broken → **CD env / infra** not code.

### 면접 한 방

- **Q:** 배포 후 502, 어디부터?
- **답:** Nginx는 살아 있고 upstream이 죽은 경우가 많다. proxy_pass 대상 프로세스·포트를 확인하고, 그다음 설정·방화벽. SPA 404는 try_files, 빌드 실패는 Node/OpenSSL 버전부터 본다.

### 통과선 스크립트

1. 레이어: DNS → Nginx → upstream → app.
2. curl -v + logs.
3. 502 = upstream down first.
4. refresh 404 = SPA fallback.
5. OpenSSL webpack = node pin.
6. local OK prod NG = env·routing·version.
