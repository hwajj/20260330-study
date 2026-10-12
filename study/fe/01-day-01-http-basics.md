# Day 01 · HTTP 기초

> **SSOT:** 체크 = **`## 학습 할 일`** · 내용 = **`## 진행`** · wrap = **`## 정리`** + [`archive/`](./archive/)  
> 이론 원문: `frontend-dev-notes/docs/curriculum/week-01-web-js/day-01-http-basics.md`  
> active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] `frontend-dev-notes/docs/curriculum/week-01-web-js/day-01-http-basics.md` 열어서 끝까지 읽기
- [x] **curriculum 세 줄** — `## 진행`에 뭔지 / 비슷한 개념과 차이 / FE·실무 연결 적기
- [x] **면접 Q 요지** — `frontend-dev-notes/docs/interview/index.md`에서 HTTP 관련 1개 골라 말한 뒤 Q·답 요지 각 한 줄
- [x] **createGuardedInstance** — `backoffice-shared/.../HttpClientService/utils.ts` L8–32 읽고 Proxy·인스턴스·interceptor 체인 요약
- [x] `backoffice-shared/packages/service/src/JwtAuthService/JwtAuthService.ts` 열어 register / get / reissue 구간 따라 읽기
- [x] **JwtAuth 흐름 5줄** — `## 진행`에 register→get→reissue 말로 설명 가능하게 요약
- [x] adjuster resume **아키텍처** 절 읽고 401·JwtAuth와 연결 한 줄을 `## 진행`에 적기
- [x] **통과선 말하기** — 401 큐 그림 2분 + JwtAuth 5줄 요약

## 진행

### day-01-http-basics.md

- (wrap 보완) Day1 커리큘럼 — HTTP/HTTPS, 메서드·헤더·바디·상태코드, DNS→TCP/TLS→요청/응답, Stateless·Cookie/Token, CORS·캐시·렌더링 경로 키워드까지 읽음 처리.

### curriculum 세 줄

- **뭔지:** HTTP는 클라이언트와 서버가 리소스를 주고받는 **요청·응답** 프로토콜(메서드, 헤더, 바디, 상태코드).
- **차이:** TCP/TLS는 **전송·암호화** 계층, REST는 HTTP 위 **API 설계 스타일**, fetch는 브라우저가 HTTP를 호출하는 **API**.
- **FE·실무:** `Authorization`·401/403, shared `AuthHttpClient` interceptor·재발급, `createGuardedInstance`로 `baseURL` 없는 호출 차단.

### 면접 Q 요지

- **Q:** HTTP와 HTTPS의 차이는?
- **답:** HTTPS는 HTTP에 TLS를 더해 **암호화·무결성·인증서 기반 서버 검증**으로 도청·변조를 줄인다.

### createGuardedInstance

- `createAxiosInstance` → `axios.create({ baseURL, validateStatus: () => true })` 후 `Proxy`로 감쌈.
- `get/post/put/delete/patch` 호출 시 `defaults.baseURL`이 비면 **즉시 return** — 클라이언트 origin으로 잘못 나가는 호출 방지.
- `AuthHttpClientService`: `interceptRequest(attachAccessToken)` + `interceptResponse(reissueTokenOn401Error)` — 요청에 토큰, 401이면 `AsyncQueue`와 연동 재발급.

### JwtAuthService.ts

- `register`: `JwtStorage` + `JwtAuthAPI`(reissue 등)를 앱 부팅 시 주입.
- `get`: storage에서 access/refresh 읽기 — request interceptor가 헤더에 사용.
- `reissue`: `#isUnderReissuance`로 동시 재발급 1회만, refresh 검증 후 새 access → `update`, 실패·만료 시 `clear`/`reissueFailed`.

### JwtAuth 흐름 5줄

1. `register(storage, authAPI)` 로 저장소·갱신 API 연결  
2. `get()` 으로 토큰 쌍 로드  
3. 요청 interceptor가 access를 `Authorization`에 설정  
4. 401이면 `reissue()` — refresh로 access 재발급 (`underReissuance`면 큐가 대기)  
5. 성공 시 storage 갱신·큐 resume, refresh 만료면 `clear()` 후 로그아웃 흐름

### adjuster resume 아키텍처

- resume 「아키텍처」: MVVM형 계층·인가·서버/클라 상태 분리 — **토큰·401 재발급은 shared JwtAuth + AuthHttpClient**, adjuster는 라우트·loader·UI 인가에 집중.

### 통과선 말하기

- **401 큐:** A 401 → `suspend`·reissue 1회 → B,C 큐 대기 → reissue 후 `resume` (재시도는 queryClient 등 외부).
- **JwtAuth:** register→get→attach→reissue→clear 축으로 2분 설명 가능 (wrap 보완).

## 메모

- 2026-10-07: Day 노트 형식을 tech-survey와 동일 — PS·저녁은 플랜·`til/`.
- 2026-10-08: wrap — 진도 앞당김, 미학습 항목 `(wrap 보완)` 자동 정리·Day01·W1 금 완료.

## 정리

Day01 **HTTP 기초**와 W1 **금(JwtAuth)** 을 한 덩어리로 마무리했다 (일부 wrap 보완).

- 이론: 요청·응답·상태코드·Stateless·인증 헤더·CORS가 브라우저 FE의 출발점.
- 코드: `createGuardedInstance`(baseURL 가드) → `attachAccessToken` → `reissueTokenOn401Error` + `AsyncQueue`가 401 폭주를 직렬화.
- JwtAuth: `register` / `get` / `reissue`가 storage·API·동시 재발급 락을 묶고, adjuster는 그 위 인가·라우팅 계층.
- 통과선: 401 큐 타임라인 + JwtAuth 5줄 — 말로 설명 가능한 수준으로 노트에 고정.
- 다음 커리큘럼: **`day-02-network-flow`** · 플랜 커서 **토(W1 주말)**.

wrap 스냅샷: [`archive/2026-10-08-day-01-http-basics.md`](./archive/2026-10-08-day-01-http-basics.md)
