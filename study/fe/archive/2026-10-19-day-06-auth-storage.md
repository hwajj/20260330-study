# Day 06 · 인증/저장소 — **완료**

SSOT 노트: [`../06-day-06-auth-storage.md`](../06-day-06-auth-storage.md)

## active 체크

- [x] day-06-auth-storage.md 끝까지 읽기
- [x] Cookie / SessionStorage / LocalStorage / IndexedDB — 수명·전송·용량 표로 비교
- [x] 인증 토큰 위치 — HttpOnly 쿠키 vs LocalStorage 트레이드오프
- [x] **면접 Q** — Cookie vs LS, 토큰 LS 위험, SessionStorage·IndexedDB 용도
- [x] **useParamState/utils.ts** — encode·`toParams`·validator 힌트 읽기
- [x] URL 쿼리 상태 vs 브라우저 저장소 역할 구분 한 줄
- [x] Day 26/09-4(인증 설계)와 “어디에 두나”만 연결
- [x] **통과선** — 저장소 선택 기준 + 토큰 위치 30초

## 정리

### 한 줄

브라우저 저장소는 **수명·자동 전송·용량·JS 접근성**이 다르고, 인증 값은 “구현 쉬움”보다 **XSS/CSRF 트레이드오프**로 위치를 고른다.

### 핵심

- **Cookie**: 작음(~4KB). 조건 맞으면 **요청에 자동 첨부**. `HttpOnly`(JS 불가), `Secure`(HTTPS), `SameSite`(CSRF 완화)가 보안 축. 서버가 매 요청에 알아야 할 값(세션 ID 등)에 적합.
- **SessionStorage**: 탭(세션) 단위, 탭 닫으면 소멸, 탭 간 비공유. 마법사 폼·탭 한정 UI 임시값.
- **LocalStorage**: 오리진 영속(~5MB), 동기 API, **JS가 읽음 → XSS 시 토큰 탈취 가능**. 테마·최근 검색 등 **비민감** 설정에 적합.
- **IndexedDB**: 대용량·구조화·비동기. 오프라인 큐·목록 캐시. 설정 한두 개는 LS로 충분한 경우가 많다.
- **토큰 위치**: HttpOnly 쿠키는 XSS 탈취가 상대적으로 어렵지만 자동 전송 → **CSRF** 대비 필요. LS는 붙이기 쉽지만 XSS에 노출. SessionStorage는 탭 동기화가 약하다. JWT/Refresh 세부 흐름은 Day 26 — 오늘은 **어디에 두나**.

### 흐름

```
저장소 고르기
  ├─ 서버가 매 요청에 필요? → Cookie (+ 보안 플래그)
  ├─ 탭만·임시 UI? → SessionStorage
  ├─ 영속·비민감 설정? → LocalStorage
  └─ 대량·오프라인 구조화? → IndexedDB

인증 토큰
  ├─ HttpOnly Cookie → XSS↓, CSRF 대비(SameSite/CSRF 토큰)
  └─ LocalStorage + Authorization 헤더 → 구현↑, XSS에 토큰 노출
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Cookie vs LocalStorage | 자동 전송·용량·HttpOnly 가능 여부 |
| SessionStorage vs LocalStorage | 탭 수명 vs 영속·탭 공유 |
| XSS vs CSRF | LS 토큰 훔치기 vs 쿠키 자동 전송으로 위조 요청 |
| “쿠키에 넣으면 무조건 안전” | Secure/SameSite/HttpOnly·도메인 설정 없으면 아님 |
| URL 쿼리(`useParamState`) vs 저장소 | 공유·북마크 가능 UI 상태 vs 기기 로컬 영속 — 민감 인증을 쿼리에 두면 로그·히스토리 유출 |

### 실무 연결

- SPA·백오피스는 흔히 **Access는 메모리/짧은 수명, Refresh는 HttpOnly** 또는 사내 JwtAuth storage 추상 — “어디에 두나”를 레이어로 고정.
- **`useParamState/utils.ts`**:
  - `isValid` / `is`: URL 문자열을 boolean(`Y`/`N`)·number·date·array·record·tuple로 **검증·타입 판별**.
  - `encodeParam`: bool→`Y`/`N`, Date→`YYYY-MM-DD`, 배열은 **trailing comma**로 string과 구분, 빈 배열은 `NONE`.
  - `toParams`: `null`/`undefined`/`''`는 쿼리에서 **제거**(empty면 키 생략).
  - Day06 연결: 쿼리는 “공개 UI 필터 상태”용 인코딩이지, **토큰·PII 저장소가 아님**. Cookie/LS와 혼동하지 말 것.

### 면접 한 방

- **Q:** Cookie와 LocalStorage 차이, 로그인 토큰을 LS에 두면 왜 위험한가?
- **답:** Cookie는 조건 충족 시 요청에 자동으로 실리고 HttpOnly로 JS 접근을 막을 수 있습니다. LocalStorage는 JS가 읽어 API에 붙여야 하고, XSS가 나면 스크립트가 토큰을 그대로 훔칩니다. 대신 쿠키는 자동 전송이라 SameSite·CSRF 토큰으로 CSRF를 막아야 합니다.

### 통과선 스크립트

1. 네 저장소를 수명·전송·용량으로 한 줄씩.
2. 용도: 서버 필요 / 탭 임시 / 비민감 영속 / 대용량.
3. 토큰: HttpOnly vs LS 트레이드오프(XSS↔CSRF).
4. SessionStorage = 탭 한정, IndexedDB = 오프라인·구조화.
5. (회사) `utils.ts`의 encode/`toParams`는 URL 상태 직렬화 — 인증 저장과 층 분리.
6. “어디에 두나”만 오늘, Refresh 흐름은 Day 26.

## wrap 요약

1. Day06 go — 저장소 4종·토큰 위치 + `useParamState/utils.ts`.
2. W2 수 배치 · plan/active 미수정.
3. 다음: day-07 주간 정리.

- **막힌:** —
- **다음 start:** `day-07-review`
