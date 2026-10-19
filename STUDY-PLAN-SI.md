# SI 대비 트랙 (번호 단계 SSOT)

> **평일:** [`STUDY-PLAN-8W.md`](./STUDY-PLAN-8W.md) (FE 복기·면접 방어) — **이 문서와 시간 겹치지 않게.**  
> **이 트랙:** 주말·여유 있을 때만. 세션: **si-session-start** → **si-session-wrap**, 또는 한 방 **si-session-go** (`sgo` / `si-gogo`).  
> 마지막 갱신: 2026-10-19

**`CURRENT_STEP`:** `9` ← 다음에 할 **단계 번호** (1~20). `si-session-wrap` / `sgo` 완료 시 해당 단계 ☑ 후 +1.

**목표 시점:** 약 2개월 (8주 FE 플랜과 병행 가능, SI는 **주말 우선**).

---

## 0. 목표·포지셔닝

| 목표 | 통과선 |
|------|--------|
| **SI 회사 이름** | 삼성SDS·LG CNS·SK·현대오토에버·KT ds 등 **웹/Spring** JD에 서류 1차 통과·면접 진입 |
| **이력서** | **Java/Spring 실무 ~1년** 구체 블록 + **React N년** = 웹개발·풀스택 (「프론트만」 단독 헤드라인 X) |
| **손맛** | Spring Boot + JPA + JWT + MySQL **미니 1개** — 면접에서 3분 설명 + API 1개 예시 |
| **인프라 한 줄** | Docker Compose로 DB+앱 로컬 기동 (K8s·AWS는 2개월 1순위 아님) |

**하지 않기:** Udemy 완강·일일 시청, 평일 저녁 FE 90m 손코딩 빼앗기, Spring 5년처럼 경력 과장.

**학습:** **AI 1순위** — Cursor·`si-session-*`로 단계 구현·면접 노트·오류 해결. **Udemy는 선택** — JWT·JPA·Compose 등 **30분+ 막힐 때만** (Chad Darby REST·JPA·Security·MySQL · Academind Compose).

---

## 1. 시간 예산 (주말·여유)

| 구간 | 시간 | 역할 |
|------|------|------|
| **토·일 (권장)** | 2~4h / 주 | **현재 `CURRENT_STEP` 1개** 끝까지 또는 통과선의 80% |
| **평일 (선택)** | 0~30m | 지원·헤드헌터 답장, 면접 질문 입으로 1개만 |
| **8주 FE 저녁** | 유지 | SI 구현·강의는 **여기 넣지 않음** |

한 세션에 **단계 1개**만 완료 목표. 두 단계 욕심내지 않기.

---

## 2. 단계 체크 (1 → 20)

`si-session-start` / `sgo`는 **`CURRENT_STEP` 행**과 아래 표에서 같은 번호를 읽는다.  
완료 시 `si-session-wrap` / `sgo`가 **☐ → ☑** 및 `CURRENT_STEP` +1.

| # | ☑ | 단계 | 이번 세션 할 일 | 통과선 |
|---|:--:|------|----------------|--------|
| **1** | ☑ | HTTP·REST (서버 계약) | 메서드·상태코드·Content-Type·JSON body — **curl**로 GET/POST/401(또는 404) **3요청** 실행, 응답마다 한 줄 해석 | 서버 책임 3 vs FE 책임 3 구분해서 말하기 |
| **2** | ☑ | 레이어드 아키텍처 | Controller → Service → Repository·DTO 역할 — `carenation-project/nursing-hospital/server/` 또는 과거 BE 코드에서 **요청 1건 추적** (50~80줄) | 한 API 호출 순서 종이 그림 (5칸 이내) |
| **3** | ☑ | Spring Boot 개념 | IoC/DI·Bean·`@RestController`/`@Service` — 공식 doc·AI 예제 **1개 읽기** + 패키지(layer) 구조 스케치 | Bean 주입이 필요한 이유 1분 |
| **4** | ☑ | DB·JPA 개념 | 테이블·FK·트랜잭션·N+1 — 미니 도메인 **ER 1장** + «Repository를 왜 분리?» 노트 3줄 | CRUD 1건이 DB까지 가는 단계 5개 말하기 |
| **5** | ☑ | API·도메인 설계 | 도메인 고정 (회원/주문 등) — REST 목록·validation·401 규칙·ER와 **일치** 확인 | README 목차 + 엔드포인트 표 1장 |
| **6** | ☑ | Spring Boot 스켈레톤 | 프로젝트 생성, layer 패키지, health 또는 `/api` ping | 로컬 기동 |
| **7** | ☑ | JPA + CRUD | 엔티티 1~2개, Repository, REST CRUD 1리소스 | Postman/curl OK |
| **8** | ☑ | JWT 로그인 | 회원가입·로그인·Bearer 한 API — AI·공식 doc 우선 | 401/200 흐름 말 1분 |
| **9** | ☐ | Docker Compose | app + MySQL compose, README에 `docker compose up` | 새 PC에서도 기동 |
| **10** | ☐ | Git·이력서 반영 | public 또는 private repo + 이력서 **프로젝트 블록** 추가 | 링크·기술스택 일치 |
| **11** | ☐ | Java 기초 면접 | 컬렉션·equals/hashCode·String·예외 — **질문 10개 답 1줄** 노트 | 입으로 5개 |
| **12** | ☐ | Spring 면접 | Bean, DI, `@Transactional`, JPA 영속성 — **질문 10개** | N+1·트랜잭션 3분 |
| **13** | ☐ | SQL 손연습 | 조인·페이징·인덱스 개념 — 각 1문제 종이 | 말로 풀이 |
| **14** | ☐ | 스토리 1 — Java 1년 | PM·역할·갈등·배포 방식 STAR 2분 (녹음) | 헷갈리는 질문 1개 기록 |
| **15** | ☐ | 스토리 2 — 미니 프로젝트 | 설계·트레이드오프·다시 하면 1가지 (녹음) | 3분 끊김 없음 |
| **16** | ☐ | 1차 지원 | SI·IT자회사 **5곳** + 헤드헌터 1곳에 동일 이력서 | 지원일 기록 |
| **17** | ☐ | Udemy 보강 (선택) | AI로 6~8 끝냈으면 **스킵** · 부족한 주제만 Chad Darby 섹션 | gap 메모 3줄 또는 스킵 ☑ |
| **18** | ☐ | Compose 보강 (선택) | 9단계 OK면 **스킵** · 아니면 Academind Compose 또는 AI로 yaml 검증 | `docker compose up` 통과 |
| **19** | ☐ | 피드백 루프 | 서류 탈락/무반응 시 키워드·프로젝트 설명 1곳 수정 | diff 3줄 |
| **20** | ☐ | 통과선 점검 | 임의 SI JD 1개에 **자기소개 1분** + 미니 API 1개 **화면 공유 수준** 설명 | 2개월 트랙 ☑ |

**20 전부 ☑:** §4 진행 메모에 완료일 적기. 오퍼는 채용 사이클에 따라 **2~4개월**일 수 있음 — 16·19를 **반복**해도 됨.

---

## 3. 단계별 상세 (start가 가져갈 때)

### 1 — HTTP·REST (서버 계약)

- MDN HTTP 개요 또는 `frontend-dev-notes` day-01을 **서버 관점**으로만 재독 (캐시·CORS는 2순위).
- curl: 로컬/공개 API 아무거나 — **본문·상태코드·헤더**를 구분해서 적기.

### 2 — 레이어드 아키텍처

- Express든 Spring이든 **같은 질문**: 라우트(Controller) → 비즈니스(Service) → DB(Repository) 어디에 있나?
- FE `HttpClient`는 **계약 소비자** — BE는 **계약·상태·영속성** 담당이라고 한 줄 정리.

### 3 — Spring Boot 개념

- `ApplicationContext`·생성자 주입만 이해해도 6단계 스켈레톤에서 덜 헤맴.
- Udemy는 **여기서 시작하지 않음** — doc 30분 + AI 질문 2개.

### 4 — DB·JPA 개념

- N+1은 12단계 면접 전에 **개념만** — `fetch join` 구현은 7단계 이후.
- MySQL·Oracle 차이는 SI JD용 **키워드** 수준 (4단계에서 표 3줄).

### 5 — API·도메인 설계

```
회원: POST /auth/register, POST /auth/login
주문: CRUD /api/orders (JWT)
DB: MySQL, JPA
비기능: validation, 401 on bad token
```

FE는 **2개월 SI 1순위 아님** — Postman으로 충분.

### 16·19 — 지원

- 1군(대형 SI) + 2군(SI·IT자회사) **동시** — 이름이 목표면 2군 합격도 **SI 이름**인지 JD에서 확인.
- 탈락 시: JD 키워드가 이력서에 **문자열로** 있는지 19단계에서만 수정.

---

## 4. 진행 기록

| 항목 | 값 |
|------|-----|
| **트랙 시작일** | 2026-10-19 |
| **20단계 완료** | ☐ |
| **마지막 SI 세션** | 2026-10-19 \| step 2~8 go 연속 \| mini-api JWT·CRUD·archive, →9 (compose: Docker 데몬 OFF로 중단) |
| **막힌 질문 (다음 세션)** | — |
| **지원·면접 로그** | (날짜 \| 회사 \| 단계 \| 메모 한 줄) |

---

## 5. 세션 프롬프트

**한 방 (권장):**

```text
si-session-go
```

또는 `sgo` / `si-gogo` / `/si-go`. 연속: `sgo 쭉` · `sgo 3단계`.

**시작만:**

```text
si-session-start
```

또는:

```text
@STUDY-PLAN-SI.md si-session-start — 단계 7만 미리
```

**마무리만:**

```text
si-session-wrap

메모:
(오늘 한 것, 막힌 점)
```

**8주 FE와 같이:**

```text
study-session-start
```

(평일) + 주말에만 `si-session-start` / `sgo`.

---

## 6. 관련 경로

| 용도 | 경로 |
|------|------|
| FE 8주 SSOT | `STUDY-PLAN-8W.md` |
| 미니 API 참고 (도메인만) | `carenation-project/nursing-hospital/server/` |
| AI·Udemy | AI 1순위 · Udemy Chad Darby·Academind Compose (**선택**, 막힐 때) |
| 로컬 실습 폴더 (권장) | `20260330-study/src/labs/si/` (없으면 6단계에서 생성) |
