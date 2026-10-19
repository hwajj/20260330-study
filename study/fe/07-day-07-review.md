# Day 07 · W1 주간 정리

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-01-web-js/day-07-review.md` (stub → Day01–06 + 실무 축으로 합성) · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] W1 축 한 줄씩 — HTTP · 네트워크 · CRP · Layout/Paint · 캐시 · 저장소
- [x] **면접 스토리** — URL 입력부터 화면·재방문·로그인 저장까지 90초로 잇기
- [x] 회사 연결 맵 — JwtAuth/401 · `useParamState` · (care `usePrevPayment` 탐색)
- [x] care `usePrevPayment` — 로컬 경로 미발견 시 **패턴만** (Query → effect → dispatch)
- [x] Redux(클라) vs Query(서버) vs URL 쿼리 역할 구분 표
- [x] **차이·함정** W1 자주 헷갈리는 5개 복습
- [x] **통과선** — “이번 주 뭘 말할 수 있나” 체크리스트

## 정리

### 한 줄

W1은 **요청이 어떻게 오고(HTTP·네트워크), 어떻게 그려지고(CRP·레이아웃), 무엇을 다시 쓰며(캐시), 어디에 남기는지(저장소·URL 상태)**를 한 줄기로 말할 수 있게 만드는 주간이다.

### 핵심

- **Day01 HTTP**: 요청·응답·상태코드·Stateless. 실무는 `Authorization`·401 재발급·interceptor.
- **Day02 네트워크**: DNS→TCP→TLS→HTTP. 연결·보안·전송 층 분리. 파싱과 추가 요청은 완전 직렬이 아님.
- **Day03–04 렌더**: DOM+CSSOM→Render Tree → Layout → Paint → Composite. 비싼 변경(`width`) vs 합성만(`transform`).
- **Day05 캐시**: `no-cache`≠`no-store`, ETag/304, 해시+장기 캐시, preload/prefetch.
- **Day06 저장소**: Cookie/SS/LS/IDB 선택 기준 + 토큰 위치 트레이드오프.
- **상태 소유 감각(실무)**: 서버 데이터≠영속 클라 세션≠URL 공유 UI≠탭 임시. 한 store에 전부 넣지 않는 이유가 W1 끝에 붙는다.

### 흐름

```
주소창 URL
  → DNS·TCP·TLS·HTTP
  → HTML 파싱 + 리소스(캐시 hit/miss, preload)
  → CRP → Layout/Paint/Composite
  → (로그인) 토큰·세션을 Cookie/LS/메모리 중 어디에
  → (앱) 필터·페이지는 URL 쿼리(useParamState) / 서버 목록은 Query / 유저·역할은 persist
```

care 결제 이전값 패턴(파일 미존재 시 개념만):

```
Query(prevPayment API)
  → 성공 데이터
  → useEffect
  → Redux dispatch (wizard/폼 시드)
```

요지: **서버 스냅샷을 클라 마법사 상태에 한 번 심는** 브리지. Query 캐시와 Redux를 같은 소유로 취급하면 동기화 지옥.

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| TCP vs TLS | 연결·신뢰 전송 vs 암호화·인증서 |
| Reflow vs Repaint | 기하 vs 다시 칠하기 |
| no-cache vs no-store | 재검증 vs 비저장 |
| Cookie vs LocalStorage | 자동 전송·HttpOnly vs JS 영속 |
| React Query vs Redux | 서버 캐시·동기화 vs 클라/영속·UI 전역 |
| HTTP 캐시 vs `useParamState` | 바이트 재사용 vs UI 상태 URL |

### 실무 연결

- **shared**: JwtAuth + AuthHttpClient 401 큐 · `useParamState` URL 상태 · utils encode.
- **adjuster resume**: 서버=Query, 영속=Redux persist, 진입 전=loader — Day08(금)에 깊게.
- **care `usePrevPayment`**: 플랜 경로 `care/.../matchType/@logic/usePrevPayment.tsx` — **워크스페이스에 파일 없음 → 코드 인용 생략**. 패턴만: RQ fetch 결과를 effect로 Redux에 밀어 결제/매칭 이전값을 복원. dailycare·adjuster와 비교할 때 “원본 PG 마법사 → 공통화” 스토리의 한 점.

### 면접 한 방

- **Q:** 브라우저에 URL을 치면 화면이 나오기까지, 그리고 로그인 상태를 어디에 둘지까지 설명해 보세요.
- **답:** DNS·TCP·TLS 후 HTTP로 HTML을 받고 파싱하며 CSS/JS를 추가로 요청합니다. 캐시·ETag로 재방문을 줄이고, Render Tree 이후 Layout·Paint·Composite로 그립니다. 세션 토큰은 HttpOnly 쿠키와 LS의 XSS/CSRF 트레이드오프를 보고 고르고, 목록 데이터는 Query, 필터는 URL, 유저 역할은 persist처럼 **소유권을 나눕니다**.

### 통과선 스크립트

1. HTTP 한 줄 + 401/재발급이 왜 필요한지.
2. DNS→TCP→TLS→HTTP 순서와 TCP/TLS 구분.
3. CRP + Layout/Paint/Composite + 비싼 CSS 예.
4. no-cache/no-store + 해시 장기 캐시.
5. 저장소 4종 + 토큰 위치.
6. Query / Redux / URL / Cookie 역할을 표로 한 줄.
7. care prevPayment는 “파일 없으면 패턴만” — Query→effect→dispatch.
