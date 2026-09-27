# Carenation 유지 + 8주 FE 복기 플랜 (SSOT)

> 다른 Cursor 세션에서: **study-session-start** (할 일) → 공부 → **study-session-wrap** (체크·요약). `@STUDY-PLAN-8W.md`  
> **커리큘럼 이론 (전체 15주):** [`CURRICULUM-FULL-TRACK.md`](./CURRICULUM-FULL-TRACK.md) ← **순서대로 전부**  
> **실무 8주와 겹치는 Day만:** [`CURRICULUM-BRIDGE-8W.md`](./CURRICULUM-BRIDGE-8W.md)  
> 마지막 갱신: 2026-09-28

**`CURRENT_WEEK`:** `1` ← 주차 (1~8). 금요 §4-A 통과 후 또는 §4-B 해당 주 전 요일 ☑ 시 +1.

**`CURRENT_DAY`:** `수` ← 다음에 할 **요일 커서** (`월|화|수|목|금|토|일`). 세션 **완료** 후 `study-session-wrap`(또는 수동)으로 다음 요일로 갱신.

**`CURRENT_CURR_WEEK`:** `1` ← 커리큘럼 **1~15** ([`CURRICULUM-FULL-TRACK.md`](./CURRICULUM-FULL-TRACK.md)).

**`CURRENT_CURR_DAY`:** `day-01-http-basics` ← 다음에 읽을 Day **파일 slug**. Day 완료 후 FULL 트랙 표에서 다음 행.

**커서 우선순위 (study-session-start):** 사용자가 채팅에 요일을 명시하면 그걸 쓴다 → 아니면 `CURRENT_DAY`가 §4-B에서 ☐이면 `CURRENT_DAY` → 아니면 해당 주 **왼쪽부터 첫 ☐** → 전부 ☑이면 주 완료 안내.

---

## 0. 목표 (2개월, Spring 제외)

| 목표 | 통과선 |
|------|--------|
| 면접/log 방어 | 이력서 불릿을 **15분 설명** 가능 (adjuster, dailycare, care 결제, community 등) |
| **면접 이론** | `frontend-dev-notes/docs/curriculum` **15주 전부** — [`CURRICULUM-FULL-TRACK.md`](./CURRICULUM-FULL-TRACK.md) 순서, 회사 구간 **매일 1 Day** |
| 손코딩 | AI 없이 **React Query + auth + URL-sync 리스트** 미니 구현 |
| nursing-hospital | **전체 재구현 X** — 설명 가능한 모듈 1개 (`useListParams` / `orderQueries` 등) |
| SI Java | **이 8주 범위 아님** — 준비 후 FE·연동 SI 검토 |
| 코딩테스트 **사고력** | 문제 **주당 2~3개 깊게** — invariant·복잡도·엣지를 **말로** 설명 (§4-C) |

**하지 않기:** nursing 전체 암기, SI 당장 이직, 주 7일 4h (번아웃), **난이도 무작정 올리기·풀이 50개 암기·AI와 함께 풀기**.

---

## 1. 일일 시간 예산

| 구간 | 시간 | 역할 |
|------|------|------|
| **회사 (여유)** | 2~3h | 해당 주 **커리큘럼 Day** 읽기, log·**가벼운 코드 리딩** (손코딩 X) |
| **회사 (사고력)** | **20~30m**, 주 **3회** | §4-C **한 문제** — 종이만, 코드는 저녁 또는 주말 |
| **퇴근 후** | 3~4h (19:15~23:00 전후) | **AI OFF 90m** 손코딩 + log 메모 |
| **주 1일** | 가볍게 | 30m 복습만 또는 휴식 |

---

## 2. 평일 저녁 템플릿 (고정)

| 시간 | 내용 |
|------|------|
| 19:15–19:45 | 어제 3줄 요약 + 막힌 점 1개 정리 |
| 19:45–21:15 | **손코딩 / 구현 (AI 금지)** — 주차표 「저녁 손」 참고 |
| 21:15–21:30 | 휴식 |
| 21:30–22:30 | log 설명 메모, 코드 리딩 노트, 모의 면접 녹음 — **화·목**이면 §4-C **복기 카드** 15m |
| 22:30–23:00 | 내일 **열 파일 경로 1줄** 적기 (사고력 날이면 **문제 링크·난이도** 1줄) |

### AI 규칙

- 손코딩 90m: **AI 금지**
- 30m 막히면 스스로 → 그다음 힌트 1개만
- nursing 수정 시: **테스트 먼저** (회사 TDD 스킬과 동일)

---

## 3. 회사 2~3h (평일)

**이론 (면접 커리큘럼 — 전체):**

1. [`CURRICULUM-FULL-TRACK.md`](./CURRICULUM-FULL-TRACK.md)에서 `CURRENT_CURR_DAY` md **1개** (읽기 60~90m → 노트 3줄 → [면접 Q](../frontend-dev-notes/docs/interview/index.md) 1개 말하기).
2. Day 끝나면 `CURRENT_CURR_DAY`를 표 **다음 행 slug**로, 주가 바뀌면 `CURRENT_CURR_WEEK` +1.

**실무 리딩 (Carenation 8주):**

- §4-A **회사 (추가)** + **열 파일** (하루 **50~80줄**). 이론이 길면 열 파일은 다음 평일로 미루기 OK.
- 실무 주차와 겹치는 Day는 [`CURRICULUM-BRIDGE-8W.md`](./CURRICULUM-BRIDGE-8W.md) 참고 (선택).

**가벼운 리딩 예:**

- `care/.../payment/payment.tsx` (createPayment → generalPayment)
- `20_backoffice-shared/packages/service/src/HttpClientService/AuthHttpClientService.ts`

---

## 4. 8주 로드맵

| 주 | 커리큘럼 (브릿지) | 저녁 손코딩 (90m, AI OFF) | 산출물 |
|----|-------------------|---------------------------|--------|
| **1** | Week 1 목록 | Promise/클로저 + **401 AsyncQueue 종이 그림** | 그림 1장 |
| **2** | Week 2 목록 | `useParamState` spec 케이스 1개 **미니 hook** | hook 파일 or 노트 |
| **3** | Week 3 목록 | payment 흐름 메모 → dailycare Payment diff | diff 메모 1p |
| **4** | Week 4 목록 | Query list + **URL sync** 토이 | Vite 미니 |
| **5** | Week 5 목록 | log 불릿 **모의 면접 2회** (녹음) | — |
| **6** | Week 6 목록 | `useHmcError` + adjuster QueryCache 연결 메모 | — |
| **7** | Week 7 목록 | `useListParams` ↔ `useParamState` diff | — |
| **8** | Week 8 목록 | **45m 모의 2회** + 손과제: URL-sync 주문 목록 토이 | 과제 1개 |

**8주 손과제 스펙:** Vite+TS, 탭/필터 URL 동기화, React Query list+detail, MSW 또는 json-server. 디자인 X.

**6주차 이후:** care/shared는 월·목 로테만; adjuster·dailycare·log 방어 비중 ↑.

**코딩테스트 (병행):** FE 저녁 손코딩과 **겹치지 않게** — 회사 20~30m 사고 + 주말 1문제 구현. 상세는 **§4-C**.

---

## 4-C. 코딩테스트 · 사고력 트랙 (8주 병행)

> **목표:** “많이 푼다”가 아니라 **문제를 줄이고 사고를 깊게** — 면접 손코딩·실무 버그 추적과 같은 근육.

### 원칙

| 원칙 | 실천 |
|------|------|
| **깊이 > 개수** | 주 **2~3문제**만. 같은 주제는 변형 1개까지. |
| **종이 먼저** | 회사 구간: 예시 손 trace + **invariant 1줄** + 복잡도 대략. |
| **AI OFF** | 풀이·구현 중 AI 금지. **풀고 난 뒤** 힌트 1개·복기만 OK. |
| **FE에 닿는 것 우선** | 배열·해시·스택·큐·문자열·트리(얕게)·구현(디바운스 등). |
| **실패도 자산** | 막힌 10분 후 **가설 3개** 적기 → 다음 세션에 검증. |

### 한 문제 루틴 (25~40m)

1. **읽기 (3m):** 입·출력·제약을 **한 문장**으로.
2. **브루트 (10m):** 말로 동작 확인 — “이게 맞으면 왜?”
3. **최적 (10m):** 병목 찾기 → 해시/포인터/스택 중 **하나만** 고르기.
4. **엣지 (5m):** 빈 입력, 1개, 중복, overflow(개념만).
5. **복기 카드 (5m):** `패턴 이름 | invariant | 다음에 비슷하면 1단계`.

복기 카드는 `docs/notes/`에 `YYYY-MM-DD_ps-{slug}.md` 또는 §10 Week 메모에 한 줄씩.

### 주차별 사고 주제 (FE 복기와 맞춤)

| 주 | 사고 주제 | 연결 (이미 하는 공부) | 권장 유형 |
|----|-----------|------------------------|-----------|
| **1** | 순서·상태 전이 | event loop, 401 큐 타임라인 | 배열 1 pass, 해시 카운트, **시뮬레이션** |
| **2** | 불변식·URL 조각 | `useParamState`, query string | 슬라이딩 윈도우, Map, 문자열 파싱 |
| **3** | 단계·롤백 | 결제 5단계, ordering ref | **스택**, 유효 괄호, 상태 머신 느낌 |
| **4** | 탐색·동기화 | URL-sync list, RQ key | BFS(격자), Set 중복 제거, **이분** 입문 |
| **5** | 설명력 | 모의 면접 | “난이도 하” 1개 **화이트보드** (코드 최소) |
| **6** | 에러·분기 | onError, Validator | 구현: `once`, `groupBy`, **edge-first** 테스트 |
| **7** | 추상·테스트 | `useListParams` 테스트 | 정렬+이분, prefix sum 1문제 |
| **8** | 통합 | 손과제 | **45m 1문제** 타임 + 손과제와 **다른 날** |

### 요일 슬롯 (고정, §4-A와 병행)

| 요일 | 사고력 |
|------|--------|
| **월** | §4-C 이번 주 주제 — **문제 선정** (링크·난이도 기록) |
| **수** | 회사 20~30m: **종이 trace** (코드 X) |
| **금** | 같은 문제 **JS/TS 구현** (AI OFF) 또는 주말로 미루기 |
| **화·목** | 저녁 21:30 — **복기 카드** 15m |
| **토** | 주말 손과제와 겹치면: **변형 1개** 또는 통과한 문제 **다시 말로** 5분 |
| **일** | 휴식 — 복기 카드 **읽기만** 5m (선택) |

**문제 수 가이드:** 8주 × 2.5개 ≈ **20문제**면 충분. “다 풀었다”보다 **20장 복기 카드**가 목표.

### 플랫폼 (하나만 고정)

- **프로그래머스** Lv.1~2 (JS) 또는 **백준** 브론즈~실버 — **한 곳**에만 기록.
- 회사에서 코드 제출이 어렵으면 `20260330-study/src/labs/ps/`에 파일명 `week{N}-{slug}.ts` (로컬만).

### 통과선 (8주 끝)

- 임의 **중하** 1문제: **25m** 안에 invariant + 코드 (AI 없이).
- 틀려도 **어디서 사고가 끊겼는지** 2분 설명 가능.

---

## 4-A. 주차별 실행표 (월~금 + 주말)

평일 **회사** = §3 + 아래 「회사 추가」. **저녁 90m** = AI OFF.  
각 Week 블록 상단 **커리큘럼:** [`CURRICULUM-BRIDGE-8W.md`](./CURRICULUM-BRIDGE-8W.md) 동일 주차.
주말: 토 2~4h(손과제·모의) / 일 30m 복습 또는 휴식 (§1).

### Week 1 — JS/runtime + shared 401·Jwt

**주 목표:** event loop·Promise 말로 설명 / 401 동시 요청 큐 그림  
**사고력 (§4-C):** 배열·해시 2문제 — **큐 타임라인**처럼 “이벤트 순서” 손 trace  
**주말:** MDN 또는 Eloquent — Promise·async 1챕 정리 (손글 notes)

| 요일 | 회사 (추가) | 저녁 90m (AI OFF) | 열 파일 |
|------|-------------|-------------------|---------|
| 월 | AuthHttpClient 주석 읽기 | `setTimeout(0)` vs `Promise.then` 순서 **콘솔 실험** | `20_backoffice-shared/packages/service/src/HttpClientService/AuthHttpClientService.ts` |
| 화 | care 결제 흐름도 스케치 | server vs client state **종이 표** + care/dailycare 예 1개씩 | `care/.../payment/payment.tsx` ~L163–230 |
| 수 | `AsyncQueue` 주석 읽기 | **401 큐** A,B,C 타임라인 **종이** (reissue 1회) | `HttpClientService/utils.ts` (`AsyncQueue`, `reissueTokenOn401Error`) |
| 목 | `createGuardedInstance` 읽기 | axios **request/response interceptor** 토이 (fetch 가짜 401) | `HttpClientService/utils.ts` L8–32 |
| 금 | adjuster resume **아키텍처 절** 읽기 | JwtAuth **register/get/reissue** 흐름 읽고 5줄 요약 | `packages/service/src/JwtAuthService/JwtAuthService.ts` |

**금요 통과:** 401 그림 설명 2분 / JwtAuth 5줄 요약.

---

### Week 2 — useParamState + adjuster 상태

**주 목표:** URL param hook **직접 1개**  
**사고력 (§4-C):** 슬라이딩/Map 2문제 — query 조각 **invariant** 1줄씩  
**주말:** `useParamState.spec.ts` 중 **실패했던 케이스** 1개 재도전

| 요일 | 회사 (추가) | 저녁 90m | 열 파일 |
|------|-------------|----------|---------|
| 월 | spec `boolean` 기본값 테스트 **읽기** | `useSearchParams` + validator **미니 hook** (string 1개) | `20_backoffice-shared/packages/hook/test/useParamState.spec.ts` L44~ |
| 화 | spec **연속 updateParam** 케이스 | 왜 `location.href`? 메모 | `useParamState.ts` L36–54 |
| 수 | `useParamState` utils 읽기 | hook에 **replace + 2키 동시 update** 추가 | `useParamState/utils.ts` |
| 목 | care `usePrevPayment` 40줄 | Query fetch → **useEffect → dispatch** 그림 (care 패턴) | `care/.../usePrevPayment.tsx` |
| 금 | adjuster resume **상태 소유권** 절 | **금주 hook** 정리 + **Redux vs Query** 종이 표 | `log/backoffice-adjuster-front/resume-2026-08-21-1256.md` |

**금요 통과:** URL `?tab=` 바꿔도 hook state 맞음 / Redux vs Query 표 1분 설명.

---

### Week 3 — care 결제 + dailycare diff

**주 목표:** care PG **5단계** 암기 / dailycare diff 1페이지 / log dailycare 불릿 3개  
**사고력 (§4-C):** 스택 2문제 — 결제 단계를 **push/pop**으로 비유해 복기  
**주말:** diff 메모 다듬기 + 결제 **한 줄 스토리** 녹음

| 요일 | 회사 (추가) | 저녁 90m | 열 파일 |
|------|-------------|----------|---------|
| 월 | `payment.tsx` createPayment~paymentApi | **sequence diagram** 주문 API → orderId (care) | `payment.tsx` L163–197 |
| 화 | generalPayment SHA256 필드 | `P_SIGNATURE` 조합식 **손으로** 적고 care 코드와 대조 | `payment.tsx` L205–226, `constants/utils.ts` sha256 |
| 수 | REAL vs TEST 키 분기 코드 읽기 | dailycare log **PaymentPage** 불릿 → care와 diff 표 | `log/app-dailycare/resume-2026-08-31-2308.md` |
| 목 | `result.tsx` + invalidate 개념 | **ordering ref / paymentFlag** 비교 글 10줄 (면접용) | dailycare log + care payment |
| 금 | 결제 스토리 1분 녹음 | `easyPayment` vs `generalPayment` care 쪽 **읽기만** | `payment.tsx` easyPayment |

**금요 통과:** 5단계 말하기 / diff 3행 (중복주문·키·redirect).

---

### Week 4 — URL-sync 토이 + care Redux

**주 목표:** Vite 미니 **list+tab URL+RQ** / care store slice 이름 5개 말하기  
**사고력 (§4-C):** BFS(격자)·Set 2문제 — “방문 처리” = RQ **중복 fetch 방지** 느낌  
**주말:** 토이에 detail route 1개 추가

| 요일 | 회사 (추가) | 저녁 90m | 열 파일 |
|------|-------------|----------|---------|
| 월 | nursing `useListParams` **시그니처만** | Vite+TS 프로젝트 생성, RQ Provider (AI OFF) | `nursing-hospital/src/hooks/useListParams.ts` (헤더만) |
| 화 | care `redux/store.ts` | **tab in URL** + `useQuery(['list', tab])` | `care/src/app/redux/store.ts` |
| 수 | adjuster resume **계층·anti-pattern** 절 | 토이: **keepPreviousData** 탭 전환 | dailycare log HistoryPage 불릿 |
| 목 | care `auto/auto.ts` ICard | 토이: 필터 1개 URL에 추가 | `care/.../redux/states/auto/auto.ts` |
| 금 | Vite env (Day 10-3 복습) | 토이 **README 5줄** + 코드 정리 | `20260330-study/` 또는 `frontend-dev-notes`에 메모 |

**금요 통과:** 탭 바꿔도 깜빡임 없음 / care slice 5개.

---

### Week 5 — dailycare log 방어

**주 목표:** dailycare resume **10분** Q&A / community or 홈페이지 불릿 2개  
**사고력 (§4-C):** 하 1문제 **화이트보드만** — 면접처럼 말로 풀기 (코드 최소)  
**주말:** 모의 면접 1회 더 (45m)

| 요일 | 회사 (추가) | 저녁 90m | 열 파일 |
|------|-------------|----------|---------|
| 월 | dailycare resume §라우팅 읽기 | **모의 1:** nginx·basename 5분 | log dailycare resume §라우팅 |
| 화 | dailycare log §결제 읽기 | **모의 2:** PG·ordering 5분 | log §결제 |
| 수 | adjuster interview md 읽기 | AuthGuard·401 assign **설명 녹음** | log §인증 |
| 목 | community log 1개 불릿 | Socket/Redux log **3분** (community) | `log/app-community/` |
| 금 | dailycare 약한 절 재독 | **모의 3:** 전체 10분 (혼자 Q list) | interview md 있으면 사용 |

**금요 통과:** dailycare 10분 끊김 없음 (90%면 OK).

---

### Week 6 — useHmcError + adjuster Query 에러

**주 목표:** HMC 에러 → UI 흐름 / adjuster B6·QueryCache 연결 메모  
**사고력 (§4-C):** JS 구현 2개 (`groupBy`, `once` 등) — **엣지 케이스 먼저** 목록  
**주말:** `adaptServiceResponse` 예제 README에 따라 **읽기만**

| 요일 | 회사 (추가) | 저녁 90m | 열 파일 |
|------|-------------|----------|---------|
| 월 | `useHmcError` Example 1 | error code table **3개** 가짜로 onError 작성 (토이) | `useHmcError.tsx` |
| 화 | adjuster interview Q Query/Redux | log adjuster **QueryCache onError** 불릿 → shared 연결 | `log/backoffice-adjuster-front/interview-*.md` |
| 수 | adjuster A8 복습 | **mutation onError** + invalidate 예시 토이 | shared README adaptServiceResponse |
| 목 | Validator `checkAll` 읽기 | Zod 없이 **Validator 2필드** 토이 (선택) | `packages/form/src/Validator/Validator.ts` |
| 금 | 4층 인가 **그림** | adjuster STAR 1개 **2분** 녹음 | resume STAR |

**금요 통과:** Query onError vs Error Boundary 3분 / useHmcError 3분.

---

### Week 7 — nursing 한 모듈 소유

**주 목표:** `useListParams` **라인 단위 설명** / orderQueries **키 팩토리** 말하기  
**사고력 (§4-C):** 정렬·이분 또는 prefix sum 2문제 — “정렬된 배열에서 탐색”  
**주말:** 해당 파일 **테스트 1개** 추가 (AI는 힌트만)

| 요일 | 회사 (추가) | 저녁 90m | 열 파일 |
|------|-------------|----------|---------|
| 월 | useParamState vs useListParams **diff表** | `useListParams` **처음~끝 리딩** + 주석 달기 (본인 손) | `nursing-hospital/src/hooks/useListParams.ts` |
| 화 | care payment.tsx 핵심 구간 재독 | `orderQueries.list` queryKey **손으로 작성** | `nursing-hospital/src/lib/api/@queries/` |
| 수 | adjuster resume **레이어 표** | list-page.md 트리 vs OrderListPage **대照** | `docs/@agents/list-page.md` |
| 목 | nursing AGENTS Query 패턴 | **테스트 1개** red → green (workflow 스킬) | `.cursor/skills/development-workflow/SKILL.md` |
| 금 | nursing 이력서 불릿 2개 | **15분 설명** nursing (AI 거버넌스 1분만) | `log/nursing-hospital/resume-*.md` |

**금요 통과:** useListParams 5분 / 테스트 green.

---

### Week 8 — 통합 + 손과제

**주 목표:** 45m 모의 **2회** / §4 손과제 완료  
**사고력 (§4-C):** **45m 타임 1문제** (손과제와 다른 날) + 복기 카드 20장 점검  
**주말:** 쉬거나 약한 주제 1개만

| 요일 | 회사 (추가) | 저녁 90m | 열 파일 |
|------|-------------|----------|---------|
| 월 | 브릿지 Week 8 + 약한 Day 1개 재독 | 손과제: URL-sync + list query | §4 손과제 스펙 |
| 화 | §6 한 줄 스토리 말하기 연습 | 손과제: detail + invalidate | — |
| 수 | **모의 45m #1** (회사 가능) | 손과제 마무리 | log 3종 질문 list |
| 목 | adjuster+dailycare 약점 | **모의 45m #2** | — |
| 금 | `CURRENT_WEEK` 8 완료 체크 | §10 메모 + **다음 8주** 여부 결정 | `STUDY-PLAN-8W.md` §10 |

**금요 통과:** 손과제 demo / 모의 2회 중 1회는 “털리지 않음”.

---

## 4-B. 요일별 진행 체크 (8주)

`study-session-start`는 **`CURRENT_WEEK` 행**에서 ☐/☑로 W*N* 안 위치를 본다.  
세션 **끝**에 해당 요일을 ☑로 바꾸고 `CURRENT_DAY`를 **다음 요일**로 (금→토→일→다음 주 월, 주 전환 시 `CURRENT_WEEK` +1).

| W | 월 | 화 | 수 | 목 | 금 | 토 | 일 |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **1** | ☑ | ☑ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **2** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **3** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **4** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **5** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **6** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **7** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **8** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

- **월~금:** §4-A 해당 주 **요일 행** + §3 (커리큘럼·리딩) + §4-C **요일 슬롯** (월·수·금·화·목).
- **토·일:** §4-A 「주말:」 + §1 (토 2~4h / 일 30m 복습·휴식) + §4-C 주말 행.

---

## 5. 프로젝트별 — 무엇을 왜 보는지

### 5.1 log (면접 SSOT)

| 경로 | 내용 |
|------|------|
| `log/backoffice-adjuster-front/` | 손해보상 adjuster resume + interview |
| `log/app-dailycare/` | 통합돌봄 resume + interview |
| `log/app-community/` | 커뮤니티 채팅 |
| `log/nursing-hospital/` | side project (AI 거버넌스 스토리) |
| `log/홈페이지/` | React 전환, AI 챗봇 |


### 5.2 adjuster (실무 아키텍처)

- **Repo:** 회사 `hmc-fca-fe` (워크스페이스 pc/mobile/shared) — 로컬 경로는 clone 위치 따름
- **한 줄:** routes → viewModel → applications(Query) → Redux persist; 4층 인가
### 5.3 `01_frontend_protector/care` (결제·Redux wizard)

- **스택:** CRA, React 17, Redux classic + persist root, RQ v4 소수, Welcome PG
- **핵심 파일:**
  - `src/app/components/care/caregiver/payment/payment.tsx` — 주문 API → SHA256 → form submit
  - `src/app/components/care/caregiver/payment/result.tsx`
  - `src/app/components/matchType/@logic/usePrevPayment.tsx` — Query → Redux
  - `src/app/redux/store.ts`, `redux/states/auto/auto.ts`
  - `src/app/api/api.ts` — `jobPayment`, `prevPayment`
- **면접 스토리:** care(원본 PG) → dailycare(ref·Repository·CI redirect) → adjuster(공통 service)

**레거시로만 언급 (개선안):** 모듈 `paymentFlag`, 루트 전체 persist.

### 5.4 `20_backoffice-shared` (@backoffice-fe 소스)

- **스택:** pnpm workspaces — service, hook, component, form, type, route
- **우선 읽기 순:**
  1. `packages/service/src/HttpClientService/` (utils, AuthHttpClientService, 401 AsyncQueue)
  2. `packages/service/src/JwtAuthService/JwtAuthService.ts`
  3. `packages/hook/src/useParamState/` + `packages/hook/test/useParamState.spec.ts`
  4. `packages/service/src/utils/useHmcError/useHmcError.tsx`
  5. `packages/form/src/Validator/Validator.ts`
- **로컬 테스트:** README → `pnpm install`, `pnpm run demo` 또는 `npx apply-aliases ../20_backoffice-shared --package=hook,service`

### 5.5 nursing-hospital (7주차)

- **Repo:** `carenation-project/nursing-hospital`
- **목표:** 한 모듈 소유 — `hooks/useListParams.ts`, `lib/api/@queries/orderQueries` 등
- **연결:** backoffice `useParamState`와 diff

### 5.6 dailycare (log 기준 코드는 별도 app repo)

- log: `log/app-dailycare/resume-2026-08-31-2308.md`
- nginx basename, PG, `ordering` ref, Repository 패턴

---

## 6. 면접 한 줄 스토리 (결제·인프라)

> care에서 Welcome PG·서명·환경 키를 다뤘고, dailycare에서 Repository·중복 주문 방지·CI redirect로 정리했으며, adjuster/backoffice는 `@backoffice-fe/service`로 JWT·에러 코드를 공통화했다.

---

## 7. 주차별 일일표

**Week 1~8 월~금 + 주말** → **§4-A** 한 곳에만 있음 (중복 제거).  
오늘 할 일: **study-session-start** (§4-B + `CURRENT_WEEK` / `CURRENT_DAY` + §4-C).

---

## 8. 세션 이어하기 — AI에게 줄 프롬프트

**시작 (권장):** `study-session-start` — AI는 **«오늘 할 일» 쉬운 말** 먼저, 코테는 [`PS-TRACK-8W.md`](./PS-TRACK-8W.md) 참고.

```text
study-session-start
```

또는:

```text
@STUDY-PLAN-8W.md study-session-start — 막힌 질문: (있으면)
```

**특정 요일만 미리/보충:**

```text
@STUDY-PLAN-8W.md Week 3 화요일만 체크리스트 뽑아줘.
```

**마무리 (권장):**

```text
study-session-wrap

메모:
(오늘 한 것, 막힌 점)
```

**SI 트랙 (주말·별도):** [`STUDY-PLAN-SI.md`](./STUDY-PLAN-SI.md) — 번호 단계 1~20 · **si-session-start** / **si-session-wrap**

**AI Agent 포폴 (주말·별도):** [`STUDY-PLAN-AGENT.md`](./STUDY-PLAN-AGENT.md) — 단계 1~18 · **agent-session-start** / **agent-session-wrap** (SI와 같은 날 **한 트랙만**)

---

## 9. 커리어 맥락 (불안 참고용, 짧게)

- **포지션:** React/TS 5년차 FE + 초기 Java/Spring + Node/Express side depth
- **현재 회사:** Carenation, 워라밸·34h — **베이스캠프로 8주 복기**가 SI 무리한 이직보다 우선
- **AI 불안:** log/nursing = 오케스트레이션 역량; **면접은 「15분 설명 + 손코딩」**으로 방어
- **기술사:** 8주 플랜과 별개; FE-only로는 요건 불리 — 장기 검토

---

## 10. 진행 기록 (직접 채우기)

| Week | 시작일 | 완료 | 메모 |
|------|--------|------|------|
| 1 | 2026-09-20 | ☐ | W1 월: AuthHttpClient·401 큐 주석, JWT Storage/API/Service 분리 노트 / W1 화: 세션 종료(손코딩 메모 없음) |
| 2 | | ☐ | |
| 3 | | ☐ | |
| 4 | | ☐ | |
| 5 | | ☐ | |
| 6 | | ☐ | |
| 7 | | ☐ | |
| 8 | | ☐ | |

**마지막 세션:** `2026-09-28 | W1 | 화`

**막힌 질문 (회사→저녁):** —

**일차 체크는 §4-B.** 주 완료(월~일 전부 ☑ 또는 금요 통과선 달성) 후 §10 해당 Week **완료 ☑**.
