# Carenation 유지 + 8주 FE 복기 플랜 (SSOT)

> 다른 Cursor 세션에서: **study-session-start** (할 일) → 공부 → **study-session-wrap** (체크·요약). `@STUDY-PLAN-8W.md`  
> **주차별 커리큘럼 읽기:** [`CURRICULUM-BRIDGE-8W.md`](./CURRICULUM-BRIDGE-8W.md)  
> 마지막 갱신: 2026-09-20

**`CURRENT_WEEK`:** `1` ← 주차 (1~8). 금요 §4-A 통과 후 또는 §4-B 해당 주 전 요일 ☑ 시 +1.

**`CURRENT_DAY`:** `월` ← 다음에 할 **요일 커서** (`월|화|수|목|금|토|일`). 세션 **완료** 후 `study-session-wrap`(또는 수동)으로 다음 요일로 갱신.

**커서 우선순위 (study-session-start):** 사용자가 채팅에 요일을 명시하면 그걸 쓴다 → 아니면 `CURRENT_DAY`가 §4-B에서 ☐이면 `CURRENT_DAY` → 아니면 해당 주 **왼쪽부터 첫 ☐** → 전부 ☑이면 주 완료 안내.

---

## 0. 목표 (2개월, Spring 제외)

| 목표 | 통과선 |
|------|--------|
| 면접/log 방어 | 이력서 불릿을 **15분 설명** 가능 (adjuster, dailycare, care 결제, community 등) |
| 손코딩 | AI 없이 **React Query + auth + URL-sync 리스트** 미니 구현 |
| nursing-hospital | **전체 재구현 X** — 설명 가능한 모듈 1개 (`useListParams` / `orderQueries` 등) |
| SI Java | **이 8주 범위 아님** — 준비 후 FE·연동 SI 검토 |

**하지 않기:** nursing 전체 암기, SI 당장 이직, 주 7일 4h (번아웃).

---

## 1. 일일 시간 예산

| 구간 | 시간 | 역할 |
|------|------|------|
| **회사 (여유)** | 2~3h | 해당 주 **커리큘럼 Day** 읽기, log·**가벼운 코드 리딩** (손코딩 X) |
| **퇴근 후** | 3~4h (19:15~23:00 전후) | **AI OFF 90m** 손코딩 + log 메모 |
| **주 1일** | 가볍게 | 30m 복습만 또는 휴식 |

---

## 2. 평일 저녁 템플릿 (고정)

| 시간 | 내용 |
|------|------|
| 19:15–19:45 | 어제 3줄 요약 + 막힌 점 1개 정리 |
| 19:45–21:15 | **손코딩 / 구현 (AI 금지)** — 주차표 「저녁 손」 참고 |
| 21:15–21:30 | 휴식 |
| 21:30–22:30 | log 설명 메모, 코드 리딩 노트, 모의 면접 녹음 |
| 22:30–23:00 | 내일 **열 파일 경로 1줄** 적기 |

### AI 규칙

- 손코딩 90m: **AI 금지**
- 30m 막히면 스스로 → 그다음 힌트 1개만
- nursing 수정 시: **테스트 먼저** (회사 TDD 스킬과 동일)

---

## 3. 회사 2~3h (평일)

- 해당 주 [`CURRICULUM-BRIDGE-8W.md`](./CURRICULUM-BRIDGE-8W.md) Day를 나눠 읽기 (주 초에 목록 확인).
- §4-A **회사 (추가)** + **열 파일** 리딩 (하루 **50~80줄**).

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

---

## 4-A. 주차별 실행표 (월~금 + 주말)

평일 **회사** = §3 + 아래 「회사 추가」. **저녁 90m** = AI OFF.  
각 Week 블록 상단 **커리큘럼:** [`CURRICULUM-BRIDGE-8W.md`](./CURRICULUM-BRIDGE-8W.md) 동일 주차.
주말: 토 2~4h(손과제·모의) / 일 30m 복습 또는 휴식 (§1).

### Week 1 — JS/runtime + shared 401·Jwt

**주 목표:** event loop·Promise 말로 설명 / 401 동시 요청 큐 그림  
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
| **1** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **2** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **3** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **4** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **5** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **6** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **7** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| **8** | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

- **월~금:** §4-A 해당 주 **요일 행** + §3 (커리큘럼·리딩).
- **토·일:** §4-A 「주말:」 + §1 (토 2~4h / 일 30m 복습·휴식).

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
오늘 할 일: **study-session-start** (§4-B + `CURRENT_WEEK` / `CURRENT_DAY`).

---

## 8. 세션 이어하기 — AI에게 줄 프롬프트

**시작 (권장):**

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
| 1 | 2026-09-20 | ☐ | |
| 2 | | ☐ | |
| 3 | | ☐ | |
| 4 | | ☐ | |
| 5 | | ☐ | |
| 6 | | ☐ | |
| 7 | | ☐ | |
| 8 | | ☐ | |

**마지막 세션:** `—` ← `YYYY-MM-DD | W{n} | {요일}` (wrap 후 갱신)

**막힌 질문 (회사→저녁):** _______________

**일차 체크는 §4-B.** 주 완료(월~일 전부 ☑ 또는 금요 통과선 달성) 후 §10 해당 Week **완료 ☑**.
