# Day 26 · Authentication

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-04-network-perf/day-26-authentication.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Authentication vs Authorization 구분
- [x] Cookie(HttpOnly/Secure/SameSite) · Session vs JWT
- [x] Access / Refresh 토큰 흐름
- [x] 저장소 선택 — localStorage vs HttpOnly 쿠키 (XSS/CSRF)
- [x] **dailycare log §결제** — 선택→주문→CI/REAL/0원 분기
- [x] `ordering`/`currentOrder` ref · 결제 헤더·토큰 맥락
- [x] **면접 Q** — Session vs JWT / 토큰 저장
- [x] **통과선** — 인증 한 줄 + PG·ordering 5분 모의

## 정리

### 한 줄

인증은 **누구인지**, 인가는 **무엇 할 수 있는지**이고, FE는 Access(짧게)·Refresh(길게)와 저장 위치(XSS↔CSRF)를 절충하며, dailycare 결제는 **이미 로그인된 보호자 세션** 위에서 주문·PG만 환경별로 나눈다.

### 핵심

- **Authentication**: 신원 확인. **Authorization**: 권한 판단 (`Authorization: Bearer …`).
- **Cookie**: 요청에 자동 첨부. `HttpOnly`(JS 불가·XSS↓), `Secure`(HTTPS), `SameSite`(CSRF↓).
- **Session**: 서버가 상태 보관(stateful) — 무효화 쉬움, 스케일 시 저장소 공유 부담.
- **JWT**: 서명된 자체 검증(stateless) — 확장 유리, **즉시 폐기 어려움**.
- **Access/Refresh**: Access 유출 창 축소 + Refresh로 재로그인 없이 갱신.
- **저장**: HttpOnly 쿠키가 XSS에 상대적으로 안전. localStorage는 XSS에 노출. 쿠키면 CSRF·SameSite 설계 필수.

### 흐름

```
로그인 → Access(+Refresh) 발급
API 요청 → Authorization / Cookie
Access 만료 → Refresh로 재발급 (또는 재로그인)
로그아웃/401 → 토큰 폐기·클리어
```

dailycare 결제(화 모의 축):

```
selectCaregiver → /dailycare/payment?id=&applicantId=
  → createOrder
     ├ total=0 → FreeMatching → result
     ├ CI/QA + redirectUrl → navigate result (PG 스킵)
     └ REAL → Welcome PG form (과세/면세 키·SHA256)
  → PaymentResult → jobKeys invalidate
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| AuthN vs AuthZ | 누구인가 vs 무엇을 해도 되나 |
| Session vs JWT | 서버 상태·쉬운 폐기 vs stateless·폐기 난이도 |
| localStorage vs HttpOnly | XSS에 노출 vs JS 불가(대신 CSRF 대비) |
| Access vs Refresh | 짧은 API 토큰 vs 긴 재발급 토큰 |
| ordering vs currentOrder | 더블클릭 주문 차단 vs 같은 order로 PG 재진입 |

### 실무 연결

- **log** `app-dailycare` §결제·면접: 선택→주문→환경 분기. `UserType: protector` + `Authorization` 헤더로 care API.
- **`ordering` ref**: createOrder 진입 중 true — 연속 클릭 중복 주문 방지.
- **`currentOrder` ref**: 주문 1회 후 PG/팝업 재오픈 시 재주문 없이 proceed.
- **REAL**: `tax>0` 과세 merchant/키 vs 면세; CI는 test 상점. `P_SIGNATURE` = sha256 필드 조합.
- **모의 2(화)**: PG·ordering 5분 — “왜 ref인가(리렌더로 플래그 리셋 방지)”.

### 면접 한 방

- **Q:** Session과 JWT 차이, 토큰은 어디에?
- **답:** Session은 서버가 로그인 상태를 들고 ID만 쿠키로 줌 — 폐기 쉽고 확장 시 공유 필요. JWT는 서명으로 자체 검증해 확장은 쉬운데 발급 후 즉시 무효화가 어렵다. Access는 짧게, Refresh로 갱신. 저장은 HttpOnly가 XSS에 유리하고, localStorage는 XSS에 취약해 CSRF/쿠키 설계와 트레이드오프다.

### 통과선 스크립트

1. AuthN vs AuthZ 한 문장.
2. Cookie 옵션 세 가지 역할.
3. Session stateful vs JWT stateless.
4. Access 짧게 / Refresh로 UX·보안 절충.
5. 저장소 XSS vs CSRF.
6. dailycare: 로그인 토큰 전제 위 결제 API.
7. 선택→payment 쿼리→createOrder.
8. 0원 / CI redirect / REAL PG 세 갈래.
9. ordering·currentOrder가 막는 시나리오.
10. 결과 성공 시 invalidate로 stale 결제 전 UI 방지.
