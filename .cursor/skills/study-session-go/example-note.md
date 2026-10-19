# go 노트 품질 예 (발췌 · Day02 톤)

에이전트는 이 밀도와 구조를 맞춘다. 실제 go 시 `CURRENT_CURR_DAY` 원문을 읽고 채운다.

```markdown
# Day 02 · 네트워크 연결 흐름

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-01-web-js/day-02-network-flow.md` · active: …

## 학습 할 일

- [x] day-02-network-flow.md 끝까지 읽기
- [x] **curriculum 세 줄** …
- [x] **면접 Q 요지** …
- [x] **주말 Promise 챕터** …
- [x] Promise·async 핵심 정리
- [x] **차이·함정** 반영
- [x] **통과선 말하기**

## 정리

### 한 줄
주소창 URL → DNS로 IP → TCP 연결 → (HTTPS면) TLS → HTTP 요청/응답 → HTML 파싱과 추가 요청이 **겹치며** 화면이 그려진다.

### 핵심
- DNS는 사람이 쓰는 이름을 IP로 바꾼다. 캐시(브라우저·OS 등)가 있으면 외부 조회를 건너뛴다.
- TCP 3-way(SYN→SYN-ACK→ACK)는 **연결 수립·신뢰 전송**용. TLS는 그 위 **암호화·인증서 검증**.
- HTTP/2는 한 TCP에서 멀티플렉싱, HTTP/3는 QUIC(UDP)으로 HoL 등을 완화.
- «네트워크가 다 끝난 뒤에만 렌더」가 아니다. HTML이 오는 즉시 파싱·추가 리소스 요청이 시작된다.

### 흐름
URL 입력 → DNS → TCP → TLS → HTTP Request/Response → 파싱·추가 요청 → 렌더

### 차이·함정
- TCP vs TLS: 전달 vs 보안
- HTTP/2 vs /3: TCP 멀티플렉싱 vs QUIC
- DNS 항상 외부? → 캐시 우선

### 실무 연결
FE fetch/axios 호출 전에 브라우저는 이미 DNS·연결·TLS 비용을 치른다. Keep-Alive/HTTP2로 연결 재사용이 TTFB·워터폴에 영향. (주말) Promise는 이 비동기 응답을 JS에서 다루는 단위.

### 면접 한 방
- **Q:** `https://example.com` 치면 무슨 일이?
- **답:** URL 분해 → DNS(캐시 없으면 조회) → TCP → TLS → HTTP → HTML 파싱하며 CSS/JS 추가 요청 → 렌더. 네트워크와 렌더가 완전 직렬은 아님.

### 통과선 스크립트
1. URL 부품(scheme/host/port/path) 말하기
2. DNS→TCP→TLS→HTTP 이유 한 줄씩
3. TCP와 TLS 역할 구분
4. HTTP/2·3 한 줄
5. 파싱·추가 요청 병렬 한 줄
```

**나쁜 예:** 키워드만 나열, «미완», `## 진행`/`## 메모` 추가, 원문 Q&A 복붙만.
