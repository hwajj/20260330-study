# 08-1 · SPA 라우팅 & History API

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-08-routing-realtime/08-1-spa-routing-history.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] History API: `pushState` / `replaceState` / `popstate`
- [x] client-side routing = URL만 바꾸고 JS가 화면 매핑
- [x] SPA 새로고침 404 → 서버 `index.html` fallback
- [x] push vs replace 사용 시점(뒤로가기·필터)
- [x] 이탈 차단: `beforeunload` vs 라우터 blocker
- [x] **실무:** URL-sync 리스트 = replace로 히스토리 스팸 방지 여부
- [x] **통과선** — 404 원인 + push/replace 30초

## 정리

### 한 줄

SPA 라우팅은 **History API로 URL을 바꾼 뒤** 서버 왕복 없이 JS가 경로→화면을 고르고, 새로고침 시에는 서버가 그 경로를 `index.html`로 받아줘야 한다.

### 핵심

- `pushState`: 스택에 쌓임 → 뒤로가기 복귀. `replaceState`: 현재 엔트리 교체 → 뒤로가기에 안 남김.
- 필터·탭·페이지를 URL에 쓸 때 매 키입력마다 push하면 히스토리가 오염 → **replace**가 흔함(실무 노트 `url-replace-no-history`).
- 동적·중첩 라우트(`/users/:id`, 레이아웃)는 라우터 라이브러리가 path 매칭·outlet을 담당.
- 라우트 가드: 인증·권한. 작성 중 이탈은 SPA 내부엔 **blocker**, 탭 닫기/새로고침엔 `beforeunload` — 둘 다 필요할 수 있음(pitfalls 노트).
- basename/nginx는 dailycare 모의에서 이미 건드린 축과 연결.

### 흐름

```
클릭 링크
  → preventFullReload
  → pushState(/orders?page=2)
  → popstate/라우터 구독 → 컴포넌트 트리 교체

새로고침 GET /orders
  → 서버가 파일 /orders 없으면 404
  → fallback → index.html → 클라이언트가 /orders 해석
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| push vs replace | 히스토리 남김 vs 현재만 교체 |
| MPA vs SPA | 서버 문서 전환 vs 클라이언트 매핑 |
| beforeunload vs blocker | 창 닫기·리로드 vs in-app 이동 |
| 404 | 서버가 SPA 경로를 모름 |

### 실무 연결

- W8 URL-sync 토이·`useListParams`: 페이지/필터 변경 시 push/replace 정책이 UX를 가른다.
- 관련 노트: `notes/2026-07-02_url-replace-no-history.md`, `notes/study/2026-05-29_use-blocker-pitfalls.md`.

### 면접 한 방

- **Q:** SPA에서 새로고침 404 나는 이유와 해결? push/replace는?
- **답:** 서버가 `/app/orders` 같은 클라이언트 경로를 정적 파일로 찾기 때문. Nginx 등에서 모두 `index.html`로 fallback. 뒤로가기 필요하면 push, 필터처럼 스택을 남기기 싫으면 replace.

### 통과선 스크립트

1. History API 세 요소.
2. 클라이언트 매핑 한 줄.
3. 404 + fallback.
4. push vs replace 상황.
5. blocker vs beforeunload.
6. 리스트 URL-sync와 연결.
