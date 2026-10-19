# 11-2 · REST API 설계 심화

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-11-backend/11-2-rest-api-design-advanced.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] 멱등성·Idempotency-Key로 POST 재시도 안전
- [x] 에러 규격 `{code,message}` + 4xx/5xx 선택
- [x] offset vs cursor 페이지네이션
- [x] OpenAPI 계약·MSW·타입 생성 협업
- [x] API 버저닝 v1/v2·호환 깨짐 관리
- [x] Rate limit 429·백오프·재시도 상한
- [x] Multipart vs Presigned URL 업로드
- [x] **통과선** — 멱등·cursor·429·업로드 30초

## 정리

### 한 줄

안전한 쓰기 API는 **멱등성·Idempotency-Key**로 재시도를 허용하고, 목록은 **cursor**·에러는 **일관된 코드**·협업은 **OpenAPI 계약**·과부하는 **429+백오프**, 대용량 업로드는 **Presigned URL**로 앱 서버를 우회한다.

### 핵심

- **멱등성**: GET/PUT/DELETE는 같은 요청 N번 ≈ 같은 결과. **POST는 기본 비멱등** → 결제·주문 생성은 **Idempotency-Key** 헤더로 서버가 `(key → 결과)` 저장, 재요청 시 동일 응답.
- **에러 규격**: HTTP status + body `{ code, message, details? }`. FE는 **code로 분기**(재로그인·재시도·폼 필드). 5xx는 사용자에게 일반 메시지, 4xx는 수정 가능 안내.
- **페이지네이션**: **offset** `?page=100` — 구현 쉬우나 대량에서 느리고 삽입 시 **중복/누락**. **cursor** `?after=id` — 마지막 키 기준, 실시간 피드·무한 스크롤에 유리. React Query `getNextPageParam`과 직결.
- **OpenAPI**: 프론트/백 **병렬 개발**, MSW mock, openapi-typescript 등 **타입 동기화**. “口頭 스펙” drift 방지.
- **버저닝**: breaking change를 `/v2` 또는 Accept 헤더로 **구 클라이언트 유예**. FE는 점진적 마이그레이션·feature flag.
- **429**: Rate limit — **지수 백오프·최대 재시도·Jitter**. 무한 retry는 서버·UX 악화.
- **업로드**: **Multipart** — 작은 파일·단순. **Presigned URL** — 클라가 S3 등에 직접 PUT, 앱 서버 대역폭·타임아웃↓ (→ 13-3).

### 흐름

```
[Idempotent POST]
  클라: Idempotency-Key: uuid
  → 서버: key 없음 → 처리·저장
  → 네트워크 재시도 동일 key → 저장된 결과 반환 (중복 생성 X)

[Cursor list]
  GET /items?limit=20
  → { items, nextCursor }
  → GET /items?limit=20&after=nextCursor

[Presigned upload]
  FE: POST /uploads/sign → { url, fields }
  → PUT S3 presigned URL (직접)
  → FE: POST /assets { key } 로 등록
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| offset vs cursor | page 번호 vs 마지막 id, 삽입·성능 |
| 멱등 POST vs PUT | POST+Key vs 리소스 URL 고정 갱신 |
| 401 vs 403 vs 429 | 인증 vs 권한 vs 속도 제한 |
| Multipart vs Presigned | 서버 경유 vs 스토리지 직행 |
| v1/v2 동시 | FE 두 base path 또는 adapter |

### 실무 연결

- React Query **retry**는 5xx만, 429는 backoff 정책 명시. mutation은 Idempotency-Key를 axios interceptor로 붙이는 패턴.
- 목록 URL state(08-2) + **cursor**를 쿼리에 넣을지 — 보통 cursor는 API 내부, URL에는 page/filter만.
- JWT 추상화 노트와 연결: **401 일관 응답**이 refresh 큐와 맞아야 함.

### 면접 한 방

- **Q:** POST 재시도로 중복 생성을 어떻게 막나?
- **답:** Idempotency-Key를 클라가 생성해 헤더로 보내고, 서버는 키별로 처리 결과를 저장한다. 같은 키 재요청은 새로 만들지 않고 이전 응답을 반환한다. GET/PUT/DELETE는 설계상 멱등, POST는 키나 upsert 패턴으로 보완한다.

### 통과선 스크립트

1. 멱등 메서드 vs POST + Idempotency-Key.
2. cursor가 offset보다 나은 상황(피드·대량).
3. OpenAPI = 계약·mock·타입.
4. v2 = breaking change 격리.
5. 429 → backoff, 무한 retry 금지.
6. Presigned = 대용량·S3 직접 업로드.
