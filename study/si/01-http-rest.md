# SI 01 · HTTP·REST (서버 계약)

> **go** · 플랜 단계 1 · active: [`active_si.md`](../../log/_common/sessions/active_si.md)

## 학습 할 일

- [x] 미니 API에 쓸 메서드 GET·POST·DELETE — 언제 쓰는지 한 줄씩
- [x] 상태코드 200·201·400·401·404·500 — 서버가 말하는 것 한 줄씩
- [x] `Content-Type: application/json` 계약 예시 JSON 1개
- [x] curl GET 1회 — status·body 해석
- [x] curl POST 1회 — JSON body·Content-Type
- [x] curl 401 1회 — 서버 이유 한 줄
- [x] 통과선: 서버 책임 3 vs FE 책임 3 말로 설명

## 진행

- GET `https://httpbin.org/get` → **200** · `Content-Type: application/json` · body에 url/headers 에코
- POST `https://httpbin.org/post` · body `{"title":"si-step1","ok":true}` → **200** · 응답 `json` 필드에 파싱된 객체 에코 (계약 성립)
- GET `/status/401` → **401 UNAUTHORIZED** · body 없음 · `WWW-Authenticate: Basic realm="Fake Realm"` (인증 필요 신호)
- 참고: FE day-01을 **서버 관점**(메서드·상태·헤더·body·stateless)으로만 재독. 캐시·CORS는 2순위

## 정리

### 한 줄
HTTP는 서버가 **상태코드·헤더·본문**으로 계약을 내리고, FE는 그 계약을 소비한다.

### 핵심

- **메서드 (미니 API)**
  - `GET` — 조회, body 없이 path/query로 식별
  - `POST` — 생성·로그인 등 서버가 body를 해석해 부작용
  - `DELETE` — 리소스 삭제 (멱등 기대)
- **상태코드 (서버 메시지)**
  - `200` 성공 응답 / `201` 생성됨
  - `400` 요청 형식·검증 실패 (클라 잘못)
  - `401` 인증 없음·토큰 무효 / `404` 리소스 없음
  - `500` 서버 예외 (클라가 고칠 수 없음)
- **JSON 계약 예시**

```json
{ "title": "si-step1", "ok": true }
```

요청·응답 모두 `Content-Type: application/json`이면 파서가 같은 객체를 본다 (POST 에코로 확인).

### 통과선 스크립트

**서버 책임 3**
1. 올바른 상태코드로 결과 알리기 (200 vs 401 vs 404)
2. 헤더·본문 계약 지키기 (`Content-Type`, JSON shape, `WWW-Authenticate` 등)
3. 인증·검증·영속성 — 누구인지, 입력이 맞는지, DB에 무엇을 남길지

**FE 책임 3**
1. 메서드·URL·헤더·body를 계약대로 보내기
2. 상태코드별 UI·재시도·로그인 리다이렉트
3. 응답 JSON을 화면 상태로 매핑 (서버 메시지를 그대로 신뢰·표시)

## 메모

—

## 막힌 질문

—
