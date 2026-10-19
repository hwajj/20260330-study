# Day 02 · 네트워크 연결 흐름 — **완료**

SSOT 노트: [`../02-day-02-network-flow.md`](../02-day-02-network-flow.md)

## active 체크

- [x] `frontend-dev-notes/docs/curriculum/week-01-web-js/day-02-network-flow.md` 열어서 끝까지 읽기
- [x] **curriculum 세 줄** — 뭔지 / 비슷한 개념과 차이 / FE·실무 연결
- [x] **면접 Q 요지** — `docs/interview` CS(HTTP vs HTTPS) + 원문 URL→화면 Q
- [x] **주말 Promise 챕터** — Promise·async/await 핵심 (W1 주말 리딩)
- [x] Promise·async를 네트워크 응답과 연결해 정리
- [x] **차이·함정** — DNS 캐시·TCP/TLS·HTTP/2·3·렌더 병렬
- [x] **통과선 말하기** — DNS → TCP → TLS → HTTP → 렌더링 순서 설명

## 정리

### 한 줄

주소창 URL을 풀면 **DNS로 IP → TCP로 연결 → (HTTPS면) TLS로 보안 → HTTP로 데이터**이고, HTML이 오기 시작하는 순간부터 **파싱·추가 리소스 요청이 겹치며** 화면이 그려진다.

### 핵심

- **URL**은 `scheme` / `host` / `port` / `path`(/`query`)로 리소스를 가리킨다. `https://example.com:443/users`에서 scheme=`https`, host=`example.com`, port=`443`(생략 시 HTTPS 기본), path=`/users`.
- **DNS**는 사람이 쓰는 이름을 IP로 바꾼다. 브라우저·OS 등 **캐시**에 있으면 외부 DNS 서버를 안 친다 → 첫 연결 지연(TTFB 전 구간)에 직접 영향.
- **TCP 3-way** (`SYN → SYN-ACK → ACK`)는 “서로 준비됐는지 확인하고 **신뢰성 있는 바이트 스트림 연결**을 연다”. **UDP**는 연결·전달 보장 없이 가볍고, HTTP/3의 QUIC이 그 위에 올라간다.
- **TLS**는 TCP(또는 QUIC) **위**에서 인증서로 서버인지 확인하고, 암호화·무결성 키를 협상한다. HTTPS는 “TCP만 되면 바로 HTTP”가 아니다.
- **HTTP Request/Response**는 연결이 준비된 뒤의 애플리케이션 데이터. Keep-Alive·HTTP/2 등으로 **연결 재사용**하면 핸드셰이크 비용을 줄인다.
- **HTTP/2**: 보통 **한 TCP** 위에서 여러 요청/응답을 **멀티플렉싱**. **HTTP/3**: **QUIC(UDP)** — 연결 설정·스트림을 바꿔 TCP식 Head-of-Line Blocking을 완화.
- 함정: “DNS·TCP·TLS가 **전부 끝난 뒤에만** 화면”이 **아님**. HTML 바이트가 들어오는 즉시 파싱하고, `<link>`/`<script>`/`img`를 발견하면 **추가 요청을 병렬**로 날린다.

### 흐름

```
URL 입력
  → URL 분해 (scheme/host/port/path)
  → DNS Lookup (캐시 없으면 Resolver)
  → TCP 3-way Handshake
  → TLS Handshake (HTTPS)
  → HTTP Request → HTTP Response
  → HTML 파싱 시작
       ↘ 추가 리소스 요청 (CSS/JS/이미지…)  ← 여기부터 네트워크와 렌더 준비 겹침
  → CSS/JS 처리 → 렌더링(화면)
```

**왜 이 순서인가:** HTTP를 보내려면 대상을 알아야 하고(DNS), 전송 통로가 있어야 하고(TCP), HTTPS면 그 통로를 먼저 암호화해야 하며(TLS), 그다음 앱 데이터(HTTP)다.

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| TCP vs TLS | TCP = 전달·연결 관리 / TLS = 그 위 암호화·인증·무결성 |
| TCP vs UDP | 신뢰·순서 vs 가벼움·비보장 (QUIC은 UDP 위에 신뢰 요소를 다시 올림) |
| DNS 항상 외부? | 아니요. 캐시 히트면 조회 스킵 |
| 매 요청마다 TCP? | 아니요. Keep-Alive / HTTP/2·3 연결 재사용 |
| HTTP/2 vs /3 | TCP 멀티플렉싱 vs QUIC(UDP) — HoL·핸드셰이크 개선 포인트 |
| 네트워크 끝 → 렌더 시작? | **거짓**. HTML 수신과 동시에 파싱·추가 fetch |

### 실무 연결

- `fetch` / axios를 호출하기 **전에** 브라우저는 이미 DNS·TCP·TLS 비용을 치를 수 있다. DevTools Network의 **Waiting (TTFB)** 앞단·Connection ID 재사용이 여기와 맞닿는다.
- SPA라도 첫 HTML·번들·API 호스트가 다르면 DNS/연결이 **여러 번** 열린다 → 도메인 수·CDN·HTTP/2가 워터폴에 영향.
- **(W1 주말) Promise:** 네트워크 응답은 “나중에 끝나는 일”이라 JS에서는 `fetch(...).then` / `async-await`로 다룬다. Promise는 **성공(`fulfilled`)·실패(`rejected`)·대기(`pending`)** 상태의 값이고, `await`는 그 자리를 동기처럼 읽히게 할 뿐 이벤트 루프를 막지 않는다. 여러 API를 기다릴 때는 `Promise.all` / `allSettled`가 “연결이 여러 개”인 네트워크 현실과 자주 만난다.
- W1 평일 shared `AuthHttpClient`·401 큐는 **이미 열린 HTTP 세션 위**의 앱 계층 이야기다. Day02는 그 아래 “연결이 어떻게 생기는지” 층.

### 면접 한 방

- **Q:** 브라우저에 `https://example.com`을 입력하면 어떤 일이 일어나는가? (원문 + `interview/cs/http-vs-https` 연계)
- **답:** URL을 분해한 뒤 DNS로 IP를 얻고(캐시 우선), TCP로 연결한 다음 HTTPS이므로 TLS로 인증서·키 협상 후 HTTP 요청/응답을 주고받는다. HTML을 받으며 파싱하고 CSS/JS 등을 추가로 요청해 렌더한다. HTTPS의 핵심 차이는 HTTP 위에 **TLS(암호화·무결성·서버 인증)** 가 붙는 것이다. 네트워크가 끝난 뒤에야 그리기 시작하는 것은 아니다.

### 통과선 스크립트

1. URL을 scheme / host / port / path로 쪼개 말한다. HTTPS 기본 포트는 443.
2. DNS가 필요한 이유(이름→IP)와 캐시가 있으면 외부 조회를 안 한다고 말한다.
3. TCP 3-way는 연결 수립용 `SYN → SYN-ACK → ACK`라고 말한다.
4. TCP는 전달, TLS는 암호화·인증서 검증이라고 **역할을 나눈다**. HTTPS는 TCP 직후 HTTP가 아니라 TLS가 먼저다.
5. HTTP/2는 한 TCP에서 멀티플렉싱, HTTP/3는 QUIC(UDP)이라고 한 줄씩.
6. 연결 재사용(Keep-Alive/HTTP2)으로 매번 핸드셰이크를 안 할 수 있다고 말한다.
7. 마지막으로: HTML이 오는 즉시 파싱·추가 요청이 돌아가서 **렌더 준비가 네트워크와 겹친다**고 못 박는다.
8. (주말) Promise는 그 비동기 응답을 JS에서 pending→fulfilled/rejected로 다루는 단위라고 한 줄 붙인다.

## wrap 요약

1. Day02 go 정리본 완료 (DNS→TCP→TLS→HTTP + 렌더 병렬).
2. W1 토 ☑ · curr → day-03-rendering-1.
3. 다음 go/start: day-03 · 렌더링(1).

- **막힌:** —
- **다음 start:** `day-03-rendering-1` · `study/fe/03-day-03-rendering-1.md` (다음 go에서 생성) · §4-A **일** = W1 주말 리딩 잔여/복습
