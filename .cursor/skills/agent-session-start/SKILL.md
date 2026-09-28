---
name: agent-session-start
description: >-
  STUDY-PLAN-AGENT.md 최소 읽기 → log/_common/sessions/active_agent.md 갱신. 채팅은 짧게.
  트리거: agent-session-start, Agent 포폴 시작, /agent-session-start.
---

# agent-session-start

SSOT: `STUDY-PLAN-AGENT.md` (repo `20260330-study`).  
평일 FE: [`STUDY-PLAN-8W.md`](../../STUDY-PLAN-8W.md) — Agent에 저녁 90m 넣지 않음.  
SI: [`STUDY-PLAN-SI.md`](../../STUDY-PLAN-SI.md) — 같은 날 **SI 또는 Agent 하나만**.

**쓰기:** `log/_common/sessions/active_agent.md`. `active.md`는 트랙 목차. 섹션 순서는 **study-session-start** §3와 동일.

**원칙:** 실행 SSOT는 `active_agent.md`. FE·SI active는 건드리지 않음. API 키는 `.env.example`만 안내.

## 1. 읽기 (최소, 병렬)

| 대상 | 방법 |
|------|------|
| `CURRENT_STEP` | 상단 |
| §2 step 행 | grep `\| \*\*{step}\*\* \|` |
| §3 | `### {step} —` 블록만 (있으면) |
| §4 `막힌 질문` | grep |
| §0 포폴 한 줄 | 단계 1~2 또는 «뭐 만드는 거야»일 때만 짧게 |

## 2. step 결정

1. 사용자 **단계 N** / `— N만` → `step = N` (플랜 커서·☑ 유지, **active는 N으로 갱신**)
2. 아니면 `CURRENT_STEP`
3. step ☑ → 1~16 **첫 ☐**
4. 전부 ☑ → 16 완료·README/데모 유지보수만. active 새 과제 없음

## 3. `active_agent.md` (필수, 4번 아닐 때)

**세션 키:** `Agent-step-{step}`

archive·재시작 규칙은 **si-session-start** §3와 동일 (`active_agent.md`만, `archive/{YYYY-MM-DD}-{이전키}.md`).

### 섹션

1. `# Agent — 단계 {step} · {단계명} — {YYYY-MM-DD} (KST)` + pull + `2~4h · 단계 1개 · SI와 같은 날 겹치지 않기`
2. `## 실행 체크리스트` — §2 할 일 → `- [ ]`; 통과선 1~2개
3. §3 경로·`src/labs/agent/` (**1단계**부터 레포·`ARCHITECTURE.md` 체크에 포함)
4. `## 한 줄 목표` — 주문·정산 챗 Agent, **오늘 단계에 맞게** 1줄
5. `## 참고` — 막힌 질문, 커서 줄
6. `## 진행` / `## 메모` / `## 막힌 질문`

**6~11:** 전체 소스 금지 — 체크에 **파일 경로·뼈대**만.

**1:** DAY1 — 스펙 문서 + `src/labs/agent/` 스캐폴드·빈 채팅 (구직·JD 수집 체크 **넣지 않음**).

## 4. 채팅 (짧게)

- 할 일 3~5줄
- active_agent.md 체크 **N**개
- 통과선 한 줄
- **Agent 커서:** `{CURRENT_STEP}` → 실행 **단계 {step}** ({☐|☑})

LangChain·MCP 스택 권장·실키 요청 금지.

## 5. 하지 않기

- start에서 `STUDY-PLAN-AGENT.md` 수정
- 8W §4-A 섞기, 대외비·실데이터 포폴 유도
- active 없이 종료
