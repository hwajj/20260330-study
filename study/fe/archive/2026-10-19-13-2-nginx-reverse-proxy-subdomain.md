# 13-2 · Nginx 리버스 프록시 · 서브도메인 — **완료**

SSOT 노트: [../13-13-2-nginx-reverse-proxy-subdomain.md](../13-13-2-nginx-reverse-proxy-subdomain.md)

## active 체크

- [x] 리버스 프록시·proxy_pass·업스트림
- [x] server_name 서브도메인 가상 호스트
- [x] location `/api` vs `/` 분기
- [x] SPA try_files fallback·새로고침 404
- [x] same-origin으로 CORS 완화
- [x] 502·ECONNREFUSED = upstream 미기동
- [x] **실무:** 로컬 proxy vs 배포 Nginx
- [x] **통과선** — proxy·SPA fallback·502 30초

## 정리

### 한 줄

**Nginx**는 클라이언트 앞 **리버스 프록시**로 `server_name`·`location`으로 **서브도메인·경로**를 나누고, SPA는 **`try_files … /index.html`** 로 deep link 새로고침 404를 막으며, **502**는 대개 **뒤 앱이 안 떠 있음** 신호다.

### 핵심

- **리버스 프록시**: 클라는 Nginx만 본다. `/api` → Node:3000, `/` → static or dev server. **TLS termination**도 Nginx에서 자주.
- **server_name**: `app.example.com` vs `api.example.com` — **가상 호스트** 미설정 시 default server로 빠져 “엉뚱한 사이트”.
- **location /api**: `proxy_pass http://127.0.0.1:3000;` + headers `Host`, `X-Forwarded-For`, `X-Forwarded-Proto` — 앱이 HTTPS·client IP 인식.
- **SPA fallback**: filesystem에 `/dashboard` 파일 없음 → **404**. `try_files $uri $uri/ /index.html;` — React Router가 클라에서 처리.
- **same-origin**: FE `fetch('/api/...')` — 브라우저 CORS preflight 줄음(로컬 Vite proxy와 같은 패턴).
- **502 Bad Gateway**: Nginx는 살아 있으나 **upstream connect fail** — process down, wrong port, firewall.

### 흐름

```
Browser → Nginx:443
  server_name app.example.com
    location /api → proxy_pass backend:3000
    location /   → root /var/www/dist; try_files $uri /index.html

[새로고침 /orders/123]
  없는 path → index.html → JS router → OK
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| reverse vs forward proxy | 서버 앞 vs 클라 앞 (회사 프록시) |
| 404 vs 502 | static miss vs upstream dead |
| proxy_pass trailing slash | URI rewrite 함정 |
| dev Vite proxy vs prod Nginx | 같은 아키텍처 다른 도구 |
| WebSocket upgrade | proxy_set_header Upgrade |

### 실무 연결

- 로컬 **ECONNREFUSED** 노트 — upstream 미기동과 동일 진단.
- CORS 로컬 dev — 배포는 `/api` reverse proxy로 **회피**.
- 08-1 SPA routing — 배포층 fallback과 한 세트.

### 면접 한 방

- **Q:** SPA 배포 후 새로고침 404, Nginx로 어떻게?
- **답:** 서버는 실제 파일 path만 안다. 모든 경로를 index.html로 fallback(try_files)해 SPA entry를 주고 클라 라우터가 처리하게 한다. API는 location /api로 백엔드 proxy.

### 통과선 스크립트

1. reverse proxy = 단일 진입, 뒤로 분기.
2. server_name = subdomain vhost.
3. /api proxy, / static + try_files.
4. same-origin /api CORS.
5. 502 → upstream process/port.
6. WebSocket이면 Upgrade headers.

## wrap 요약

- go 정리본: study/fe/13-13-2-nginx-reverse-proxy-subdomain.md 완료.
- 핵심: try_files SPA·/api proxy·502 upstream.
- 다음 start/go: 13-3-static-deploy-s3-media · 노트는 다음 go에서 생성.
- 막힌: —
