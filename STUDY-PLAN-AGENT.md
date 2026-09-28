# AI Agent 포트폴리오 트랙 (번호 단계 SSOT)

> **평일:** [`STUDY-PLAN-8W.md`](./STUDY-PLAN-8W.md) 유지.  
> **SI:** [`STUDY-PLAN-SI.md`](./STUDY-PLAN-SI.md) — 주말이 겹치면 **Agent vs SI 한 트랙만** (2~4h).  
> 세션: **agent-session-start** (`log/_common/sessions/active_agent.md` 갱신) → 작업 → **agent-session-wrap**.  
> 마지막 갱신: 2026-09-28

**`CURRENT_STEP`:** `1` ← 다음 단계 (1~16). `agent-session-wrap` 완료 시 ☑ 후 +1.

---

## 0. 포트폴리오 제안 (이 트랙의 산출물)

### 왜 이 주제인가

물류·도매에서는 **카카오톡**으로 `무2 고추2`, `무2개 고춧가루 1통` 같은 **자유 형식 주문**이 들어오고, 담당자는 **정산서(엑셀)** 를 만들어 보냅니다.  
회사 **AI Agent / LLM** JD는 «챗 UI만»이 아니라 **자연어 이해 + 도구 호출 + 정본 데이터 + 확인·평가**를 묻습니다.  
당신 강점: **React·API 연동·엑셀(SheetJS)·규칙 문서** — 이 포폴은 **「LLM은 파싱·대화, 금액·품목·파일은 서버」** 하이브리드를 보여줍니다.

### 추천 1개: **주문·정산 챗 Agent** (카카오톡 시나리오, 데모는 웹 채팅)

| 항목 | 내용 |
|------|------|
| **한 줄** | 거래처가 채팅으로 주문 문장을 내면 **품목·수량을 구조화**하고, **단가표 API**로 금액을 맞춘 뒤, **확인 한 번** 후 **정산 엑셀**을 생성·전달 |
| **도메인** | 물류센터·도매 **B2B 주문·정산** (실 카카오·실 ERP 복붙 X, **목 단가표 + 웹 채팅 UI**) |
| **면접 3분 스토리** | «**LLM 프로젝트**이지만 합계는 모델이 안 씀. **카탈로그가 정본**, 애매한 `고추`는 **한 번 확인**, **트레이스·골든 eval**로 `무2 고추2` 고정» |
| **카카오** | 포폴 **1차는 웹 채팅**; README에 **채널 웹훅 ↔ 서버** 다이어그램만. 실연동은 선택(§2 맨 아래). |

**입력 통과선 (스펙에 고정)**

- 한 메시지 여러 품목: `무2 고추2`, `무2개 고춧가루 1통` (띄어쓰기·단위 혼합)
- 단위 없으면 카탈로그 **defaultUnit** (예: 개) + 확인 요약에 **명시**
- SKU 애매(`고추` vs `고춧가루`) → **질문 후** 진행; LLM이 단가·SKU **단독 결정 금지**

**포폴에서 보여줄 5가지**

1. **Tool / function calling** — `parse_line_items`, `resolve_products`, `quote_settlement`, `generate_settlement_excel`
2. **Human-in-the-loop** — 엑셀 생성 전 **요약·합계 확인** («이대로 정산서 만들까요?»); 확인 없이 파일 X
3. **Trace 패널** — 턴·도구명·인자·결과 요약 (파싱 결과·매칭 SKU·합계)
4. **가드레일** — allowlist, **단가·합계는 API/JSON만**, «금액은 도구 결과만 인용» 시스템 프롬프트
5. **Eval** — **골든 5문장** (반드시 `무2 고추2` 포함) + 기대 도구 순서·기대 시트 행 수

**기술 스택 (최소)**

- `20260330-study/src/labs/agent/` — `server/` + `web/`
- 서버: Node + Express + OpenAI **호환** API (`OPENAI_API_KEY`)
- 클라: Vite + React (**채팅** + 트레이스 + 확인 카드 + **엑셀 다운로드**)
- 데이터: `catalog.json` (SKU, 표시명, 단가, defaultUnit, 동의어)
- 엑셀: SheetJS 등 — **서버에서만** 생성 (클라는 링크/다운로드)

**하지 않기:** LangChain 전체 스택, 자체 LLM, LLM이 합계·단가 직접 출력, RAG 과장, 카카오 실연동을 2단계(카탈로그) 전 필수로 두기, 10개 도구, **채용 JD·키워드 표 수집**.

### 대안 (16단계 전에만 방향 전환)

| 대안 | 언제 |
|------|--------|
| **Logistics Desk Agent** | 내부 어드민 **조회·정책·승인 후 상태 변경** JD가 더 맞을 때 |
| **Study Coach Agent** | 시간 극단적 부족; `STUDY-PLAN-8W.md` 도구 2개 — 비즈 JD에는 약함 |

---

## 0-B. 목표·통과선

| 목표 | 통과선 |
|------|--------|
| **데모** | `pnpm dev` — **3~5분**: `무2 고추2` → 확인 → 엑셀 다운로드 (녹화 또는 README GIF) |
| **설명** | 아키텍처 1장 (채팅·LLM·도구·카탈로그·엑셀) + **실패 모드 2개** (환각 단가, 잘못된 SKU 매칭 시 막는 방법) |
| **이력서** | 불릿 1개: LLM 주문 파싱 + function calling + 확인 gate + eval (링크) |
| **회사 내부** | README·데모로 **하이브리드·가드레일** 2분 설명 (구직·JD 수집은 이 트랙 밖) |

---

## 1. 시간 예산

| 구간 | 시간 | 역할 |
|------|------|------|
| **토·일** | 2~4h | `CURRENT_STEP` **1단계** |
| **평일** | 0~20m | 골든 문장 한 줄 추가 (`무2 고추2` 변형), README만 |
| **8W 저녁 90m** | **사용 안 함** | Agent 구현은 이 트랙에만 |

SI 주말과 **같은 날**이면: Agent **또는** SI만.

---

## 2. 단계 체크 (1 → 16)

구직·JD 수집은 **이 트랙에 넣지 않음**. 1단계부터 **주문·정산 챗 Agent** 코드·문서를 만든다.

| # | ☑ | 단계 | 이번 세션 할 일 | 통과선 |
|---|:--:|------|----------------|--------|
| **1** | ☐ | DAY1 — 스펙·레포 기동 | `src/labs/agent/ARCHITECTURE.md`(도구 4·§0 입력 통과선·HITL·트레이스·eval 목차)·`server/`+`web/`·`.env.example`·README 한 줄 | `pnpm dev` — ping/health + **빈 채팅 화면** |
| **2** | ☐ | 카탈로그 API | `GET /catalog`, `POST /catalog/resolve` mock — LLM 안 거침 | curl OK |
| **3** | ☐ | Tool 스키마 | Zod/JSON Schema 4개 + **서버에서만** 실행 | 잘못된 인자 거절 |
| **4** | ☐ | Agent 루프 | user → (optional tools)* → assistant, max steps 제한 | 무한 루프 없음 |
| **5** | ☐ | `parse_line_items` | `무2 고추2` 등 → `{ raw, qty, unit? }[]` | 트레이스에 기록 |
| **6** | ☐ | `resolve_products` | 동의어·애매 SKU → matched / **candidates** | 환각 SKU 없음 |
| **7** | ☐ | `quote_settlement` | 행별 단가·수량·**합계** (서버 계산만) | LLM 숫자와 불일치 시 도구만 신뢰 |
| **8** | ☐ | HITL 확인 | 요약 카드 → 사용자 **확인** 후에만 다음 단계 | 확인 없이 엑셀 X |
| **9** | ☐ | `generate_settlement_excel` | 확인된 quote → `.xlsx` + 다운로드 URL | 시트 행 수 = 품목 수 |
| **10** | ☐ | Trace UI | 사이드바: step, tool, args, result 요약 | 데모에서 보임 |
| **11** | ☐ | 시스템 프롬프트·가드 | allowlist, 단가 금지 규칙, injection 1줄 시나리오 | `SAFETY.md` 1페이지 |
| **12** | ☐ | 골든 eval | 5문장 (`무2 고추2` 필수) + 기대 도구 순서·행 수; 3개 수동 통과 | 표 + 메모 |
| **13** | ☐ | 에러·타임아웃 | API/LLM 실패 시 사용자 메시지·재시도 1회 | UI 깨짐 없음 |
| **14** | ☐ | README | 설치·env·5분 시나리오·**카카오 웹훅 개념도**·하이브리드 설명 | 면접 전날 재현 |
| **15** | ☐ | 데모 녹화 | 3분: 주문 문장 → 확인 → 엑셀 | 말 끊김 1회 이하 |
| **16** | ☐ | 포폴 마무리 | 이력서 **불릿 1줄** + repo 링크·§0-B 데모 통과선 자가 점검 | 트랙 ☑ |

**선택 (+1 세션 each):** 카카오 채널 **웹훅 스텁** · `eval/run.ts` CI 한 job · MCP로 `get_catalog_item` 노출.

---

## 3. 단계별 상세

### 1 — DAY1

- `ARCHITECTURE.md`에 §0 **입력 통과선**·**포폴 5가지**가 어디에 구현될지 목차만 (코드는 2단계~).
- `web/`: 채팅 레이아웃만 — 메시지 목록·입력창 (LLM 연결은 4단계 이후).
- `server/`: `GET /health` 또는 `/api/ping`.

### 도구 4개 (권장 시그니처, 1단계 문서에 적기)

```
parse_line_items({ text }) → { lines: { raw, qty, unit? }[] }
resolve_products({ lines[] }) → { items: { sku, name, qty, unit, unitPrice }[], ambiguous?: { raw, candidates[] }[] }
quote_settlement({ items[] }) → { rows[], subtotal, tax?, total }
generate_settlement_excel({ quoteId | rows[] }) → { fileId, downloadUrl }
```

확인: 클라이언트 «확인» 또는 `POST /sessions/:id/confirm-quote` — 이후에만 `generate_settlement_excel` 호출.

### 2 — 카탈로그 seed 예시

| sku | name | synonyms | defaultUnit | unitPrice |
|-----|------|----------|-------------|-----------|
| RADISH | 무 | 무, 무우 | 개 | … |
| PEPPER_POWDER | 고춧가루 | 고춧가루, 고추가루 | 통 | … |
| PEPPER | 고추 | 고추, 청양고추 | 개 | … |

`고추`만 넣으면 `PEPPER` vs `PEPPER_POWDER` **candidates** — 챗으로 확인.

### 5·6 — 파싱 프롬프트 힌트

- 예시 문장을 시스템/도구 설명에 포함: `무2개 고춧가루 1통`, `무2 고추2`, `무 2 / 고추2`
- 파싱은 **구조만**; SKU·단가는 **6·7단계 도구**

### 12 — 골든 예시

| 사용자 | 기대 도구 (요약) | 기대 |
|--------|------------------|------|
| `무2 고추2` | parse → resolve → quote → (confirm) → excel | 2행, 단위 default |
| `무2개 고춧가루 1통` | 동일 | 2행, 단위 명시 |
| `고추 2` (애매) | parse → resolve (**ambiguous**) → 질문 | excel 전 확인 대화 |

---

## 4. 진행 기록

| 항목 | 값 |
|------|-----|
| **트랙 시작일** | |
| **16단계 완료** | ☐ |
| **마지막 Agent 세션** | — |
| **막힌 질문** | — |
| **리포 경로** | `src/labs/agent/` |
| **포폴 방향** | 주문·정산 챗 Agent (2026-09-28 고정) |

---

## 5. 세션 프롬프트

```text
agent-session-start
```

```text
agent-session-wrap

메모:
…
```

```text
@STUDY-PLAN-AGENT.md agent-session-start — 단계 6만
```

---

## 6. 관련 링크

| 용도 | 경로 |
|------|------|
| FE 8주 | `STUDY-PLAN-8W.md` |
| SI 주말 | `STUDY-PLAN-SI.md` |
| 엑셀·어드민 패턴 참고 | `nursing-hospital` (SheetJS·목 API 톤만) |
| Cursor Agent 규칙 참고 | `nursing-hospital/AGENTS.md` |
| (선택) Cursor SDK | REST + tools로 충분; 카카오는 웹훅 문서로 대체 가능 |
