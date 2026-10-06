# IT 훑기 트랙 (번호 리스트 SSOT)

> **독립 트랙:** FE·SI·Agent와 active·시간 규칙을 섞지 않음.  
> **세션:** **tech-survey-start** (항목 노트 `## 학습 할 일`만) → 공부·`## 진행` → **tech-survey-wrap**. 체크·진행 SSOT = **`study/tech-survey/{항목}.md`** (session active 없음).  
> 마지막 갱신: 2026-10-06

**`CURRENT_ITEM`:** `5` ← 다음에 할 **항목 번호** (1~16). `tech-survey-wrap` 완료 시 해당 항목 ☑ 후 +1.

---

## 0. 목표·포지셔닝

| 목표 | 통과선 |
|------|--------|
| **폭** | AI·SW·보안·DB·경영·클라우드·네트워크를 **키워드 수준**에서 서로 연결해 말하기 |
| **깊이** | 암기보다 «왜 생겼고, 무엇을 해결하나» — 항목마다 **4단 설명** 1회 연습 |
| **트렌드** | RAG·에이전트·SBOM·제로트러스트·PQC 등 **최근 이슈**를 정의 + 한계 1줄 |

**시간 비중 (권장):** AI(1~5) + SW(6~9) + 보안(10~12)에 전체 시간의 **약 60%**. 나머지는 DB·경영·인프라 훑기.

**하지 않기:** 한 세션에 리스트 2개, 다른 트랙 `active_*` 수정, 출처·블로그 링크에 의존해 진도만 채우기.

**학습:** Cursor·`tech-survey-*`로 개념 정리·비교표·짧은 Q&A. 장문 모범답안 요청 시 **뼈대 + 통과선**만.

---

## 1. 시간 예산

| 구간 | 권장 | 역할 |
|------|------|------|
| **1세션** | 1~3h | **현재 `CURRENT_ITEM` 1개** — §2 통과선까지 |
| **짧게** | 30~45m | §2 체크리스트 **절반** + wrap 시 «반만» → ☑ 유지 |
| **습관 (선택)** | 10m/일 | IT 뉴스 헤드라인 1~2개 — §4 `트렌드 메모` 한 줄만 |

한 세션 = **항목 1개**. 다음 항목은 wrap 후 start.

---

## 2. 항목 체크 (1 → 16)

`tech-survey-start`는 **`CURRENT_ITEM` 행**과 아래 표에서 같은 번호를 읽는다.  
완료 시 `tech-survey-wrap`이 **☐ → ☑** 및 `CURRENT_ITEM` +1.

| # | ☑ | 주제 | 이번 세션 할 일 | 통과선 |
|---|:--:|------|----------------|--------|
| **1** | ☑ | AI·ML 기초 개념 | 지도/비지도·과적합·편향 — 의사결정나무·SVM·앙상블을 **어떤 문제에 쓰는지** 표 3행 | 문제 유형별로 알고리즘 1개씩 **말로** 짝짓기 |
| **2** | ☑ | 생성형 AI·LLM | 토큰·컨텍스트 윈도·pretrain vs fine-tune vs inference — Foundation 모델 **4요소** bullet | 학습/추론 구분 + 컨텍스트 한계 **1분** |
| **3** | ☑ | RAG·검색 증강 | 색인→검색→재랭킹→생성 파이프라인 그림; 환각·stale data **실패 2가지** | RAG가 해결하는 문제 vs 순수 LLM **한 줄씩** |
| **4** | ☑ | 에이전트·MLOps | Agent 루프(계획·도구·메모리); MLOps 파이프라인 vs DevOps **비교 3줄** | Agent 1회 루프를 **5단계**로 말하기 |
| **5** | ☐ | 프라이버시 ML | 연합학습·MPC(다자간계산) — **왜** 중앙 집중 데이터 대신 쓰는지 | 한계(통신·악의적 참여자) **1개** + use case 1개 |
| **6** | ☐ | SW 테스트 전략 | 단위→통합→시스템→인수 + 회귀·성능·보안 테스트 **역할** 표 | 테스트 피라미드 그림 + «어디서 버그 잡나» 3줄 |
| **7** | ☐ | SBOM·OSS 거버넌스 | SBOM에 담기는 것(컴포넌트·버전·라이선스); SPDX vs CycloneDX **차이 1줄** | 라이선스 리스크(copyleft·특허) **2유형** 예시 |
| **8** | ☐ | MSA·복원력 | 사가·서킷브레이커·CQRS·이벤트소싱 — **한 줄 정의** + 적용 상황 | 분산 트랜잭션 실패 시 **사가 보상** 예 1개 |
| **9** | ☐ | 배포·릴리즈 | Blue-Green / Canary / Rolling **3열 비교표** (다운타임·리스크·롤백) | 무중단 배포 **트레이드오프** 1분 |
| **10** | ☐ | 제로트러스트·SASE | «신뢰하지 말고 검증»; ZTNA·SASE·SSE **계층** 5칸 그림 | VPN 중심 vs 제로트러스트 **차이 3 bullet** |
| **11** | ☐ | 개인정보·거버넌스 | Privacy by Design 7원칙 중 **핵심 3개**; 가명 vs 익명 | 처리 단계별 **최소수집** 예 1개 |
| **12** | ☐ | 암호·OT 보안 | PQC·동형암호 **개념**(무엇을 보호); OT(IEC62443) **IT와 다른 위협** | 양자 위협 타임라인 **개념** + OT 자산 예 1개 |
| **13** | ☐ | DB·트랜잭션 | 격리수준 4단(read uncommitted~serializable) **현상**; ACID | dirty read 등 **현상→격리** 1쌍 설명 |
| **14** | ☐ | NoSQL·데이터 운영 | 문서·컬럼·그래프·KV **비교표**; DataOps·데이터 거버넌스 | DevOps vs DataOps **책임 3줄** |
| **15** | ☐ | IT 경영·윤리 | ISP vs ISMP; IT거버넌스·PMO·감리 **역할**; AI 윤리 **원칙 3개** | 임의 주제 **4단 설명**(정의→배경→구성→한계) 1회 |
| **16** | ☐ | 클라우드·네트워크 훑기 | 멀티클라우드·FinOps·BCP/DR **정의**; 5G 특화망·SDN·TCP 혼잡제어 **한 줄씩** | 7분야 중 **가장 약한 2분야** 이름 + 보강 키워드 3개 |

**16 전부 ☑:** §4 «전 항목 완료» ☑. **1·3·10·13** 등 취약 항목만 골라 **반복 세션** (플랜 ☑는 유지, active만 새로).

---

## 3. 항목별 상세 (start가 가져갈 때)

### 1 — AI·ML 기초 개념

- 지도: 레이블 있는 분류·회귀. 비지도: 군집·차원 축소.
- 과적합: train 좋고 generalization 나쁨 — regularization·더 많은 데이터·단순 모델.
- 트리: 해석 가능, 범주형 OK. SVM: 마진·커널(고차원). 앙상블: bagging vs boosting 직관.
- 연습: «불균형 데이터»면 어떤 지표/기법? (precision/recall, SMOTE 개념만)

### 2 — 생성형 AI·LLM

- Transformer: self-attention으로 장거리 의존. Foundation: 대규모 pretrain + downstream task.
- 4요소 예: 아키텍처·데이터·compute·alignment(또는 safety).
- Fine-tune vs prompt vs RAG — **언제 무엇**을 쓰는지 표 3행.

### 3 — RAG·검색 증강

- 벡터 DB·chunking·embedding. Hybrid search(키워드+벡터) 개념.
- 실패: retrieval miss, context overflow, contradictory chunks.
- 연습: «내부 문서 QA» 아키텍처 5박스.

### 4 — 에이전트·MLOps

- Agent: LLM + tools + planning loop + (optional) human approval.
- MLOps: data versioning, experiment tracking, model registry, monitoring drift.
- DevOps는 **앱 배포**, MLOps는 **모델·데이터 라이프사이클**.

### 5 — 프라이버시 ML

- Federated: gradient/모델만 공유, raw data 로컬.
- MPC: 여러 party가 합산·연산 결과만 공개.
- 딥페이크·합성 데이터는 **보안·윤리**와 연결해 1줄.

### 6 — SW 테스트 전략

- 테스트 더블(mock/stub/fake) 차이는 **통합 테스트** 맥락에서만.
- Shift-left, CI에서 테스트 피라미드 유지.
- 연습: «결제 API»면 어느 레벨에 어떤 테스트?

### 7 — SBOM·OSS 거버넌스

- 공급망 공격 → SBOM으로 **투명성**. VEX·취약점 매핑 개념.
- 라이선스: permissive vs copyleft; 컴pliance 정책 3줄.

### 8 — MSA·복원력

- API Gateway, service mesh **왜** — cross-cutting concern.
- CQRS: read/write 분리. Event sourcing: audit·replay.
- 연습: 주문→재고 **사가** happy path + compensate.

### 9 — 배포·릴리즈

- Feature flag vs Canary. DB migration 무중단(expand/contract) 개념만.
- SW 규모 산정(LOC·FP·COCOMO) — **비교 목적** 1줄.

### 10 — 제로트러스트·SASE

- Identity-centric, micro-segmentation, continuous verification.
- SASE: SD-WAN + SSE(secure web gateway, CASB, ZTNA…).
- 연습: «재택 + SaaS» 접근 정책 4 bullet.

### 11 — 개인정보·거버넌스

- ISMS-P·개인정보보호법은 **프레임** 수준 — 최신 개정 **키워드**만 메모.
- Privacy by Design: proactive, default privacy, full lifecycle.
- 다크패턴: UX 조작 → 규제·윤리 연결.

### 12 — 암호·OT 보안

- PQC: Shor 위협 → lattice 등. 동형: ciphertext에서 연산.
- IEC62443: zone/conduit, OT 가용성 vs IT 기밀성.
- AI 에이전트 보안: tool abuse, prompt injection **한 줄**.

### 13 — DB·트랜잭션

- 2PL, MVCC 직관. Sharding vs replication.
- CAP·PACELC — **한 문장** each.

### 14 — NoSQL·데이터 운영

- ELK: 수집·색인·시각화 — **보안 관제**와 연결.
- Lake vs warehouse; mesh vs fabric **트렌드** 1줄.

### 15 — IT 경영·윤리

- ISP(전략) vs ISMP(마스터플랜). COBIT·ITIL **역할** 한 줄.
- ESG·디지털 정부 — 정책 키워드만. AI 윤리: fairness, transparency, accountability.

### 16 — 클라우드·네트워크 훑기

- Cloud native: container, orchestration, 12-factor **3개**.
- BCP RTO/RPO; DRS 개념.
- TCP: 3-way handshake, congestion control **이름**만. SDN control/data plane.

---

## 4. 진행 기록

| 항목 | 값 |
|------|-----|
| **트랙 시작일** | 2026-10-06 |
| **전 항목 완료 (16)** | ☐ |
| **마지막 tech-survey 세션** | 2026-10-06 \| 항목 4 \| 에이전트·MLOps (완료) |
| **막힌 질문 (다음 세션)** | — |
| **트렌드 메모 (한 줄, 선택)** | — |

---

## 5. 세션 프롬프트

**시작:**

```text
tech-survey-start
```

또는:

```text
@STUDY-PLAN-TECH-SURVEY.md tech-survey-start — 항목 3만
```

**마무리:**

```text
tech-survey-wrap

메모:
(오늘 한 것, 막힌 점)
```

---

## 6. 관련 경로

| 용도 | 경로 |
|------|------|
| SSOT (진도·16항목) | `STUDY-PLAN-TECH-SURVEY.md` |
| 체크·진행·메모 | `study/tech-survey/{항목}.md` — [`README.md`](study/tech-survey/README.md) |
| 스킬 | `tech-survey-start`, `tech-survey-wrap` |
| 트랙 허브 | `log/_common/sessions/active.md` («마지막 tech-survey start» + 현재 항목 링크) |

---

## 7. 개념 설명 4단 (에이전트·본인 노트 공통)

1. **정의** — 한 줄  
2. **배경** — 어떤 문제 때문에 생겼는지  
3. **구성** — 종류·단계·핵심 컴포넌트  
4. **한계** — 트레이드오프·실패 모드 1~2개  
