---
name: agent-session-start
description: >-
  Reads STUDY-PLAN-AGENT.md (CURRENT_STEP, §2 checklist, §0 portfolio spec).
  Outputs weekend Agent portfolio step in plain Korean. Use when the user says
  agent-session-start, Agent 포폴 시작, AI Agent 공부, or @STUDY-PLAN-AGENT.md session start.
---

# agent-session-start

SSOT: `STUDY-PLAN-AGENT.md` (repo root `20260330-study`).  
평일 FE: [`STUDY-PLAN-8W.md`](../../STUDY-PLAN-8W.md) — **Agent 세션에 저녁 90m 손코딩 배정하지 않음.**  
SI 주말: [`STUDY-PLAN-SI.md`](../../STUDY-PLAN-SI.md) — 같은 날 SI와 **둘 다 넣지 않음** (사용자에게 한 트랙만).

## 0. 말투

- 먼저 «이번에 할 Agent 포폴 단계» 3~5줄 (일상어).
- §0 **주문·정산 챗 Agent** 맥락은 **1줄**만 (처음 세션·단계 1~3에서만 조금 더).
- `CURRENT_STEP`은 응답 맨 아래 «Agent 커서» 한 줄.

| 하기 | 하지 않기 |
|------|-----------|
| 단계 **1개** + 통과선 | 1~18 목록 전부 출력 |
| 구현 단계에서 **도구 이름·HITL** 언급 | LangChain·MCP 전체 스택 권장 |
| API 키는 `.env.example`만 안내 | 실제 키 요청·저장 |

## 1. 파일 읽기

`STUDY-PLAN-AGENT.md`:

- **`CURRENT_STEP`**
- **§2** — 해당 번호 행
- **§3** — 같은 번호 상세 (있으면)
- **§0** — 포트폴리오 제안 (단계 1~5 또는 사용자가 «뭐 만드는 거야»일 때)
- **§4** — `막힌 질문`, `마지막 Agent 세션`

## 2. 단계 결정

1. 사용자 **단계 N** 명시 → `step = N`
2. 아니면 `step = CURRENT_STEP`
3. §2에서 `step`이 ☑ → **첫 ☐** (1~18)
4. 전부 ☑ → 18 완료 안내 + README/데모 **유지보수**만 제안

## 3. 출력 형식

```markdown
## Agent 포폴 — 단계 {step} · {단계명}

### 오늘 할 일

1. …
2. …

### 통과선 (wrap 시)

- …

### 포폴 맥락 (한 줄)

주문·정산 챗 Agent — 파싱·카탈로그·확인·엑셀·eval

### 시간

2~4h · 단계 1개 · SI 주말이면 Agent **또는** SI만

### 작업 폴더

`src/labs/agent/` (없으면 3단계에서 생성)

### 막힌 질문

- …

### 끝나면

`agent-session-wrap` + 메모

---

**Agent 커서:** `{CURRENT_STEP}` → 실행 **단계 {step}** ({☐|☑})
```

**단계 6~11:** agent loop·도구·UI — **전체 소스 한 방에 주지 않기** (뼈대·파일 경로만).

**단계 1:** JD 매핑만 — 코드 없음.

## 4. 하지 않기

- `CURRENT_STEP` / §2를 start에서 **파일에 쓰지 않음**
- `STUDY-PLAN-8W.md` §4-A 요일표 섞지 않음
- 회사 **대외비** 코드·실데이터를 포폴에 넣도록 유도하지 않음

## 5. 트리거

`agent-session-start` → CURRENT_STEP 기준 한 단계.

`agent-session-start — 10만` → step=10, 체크 갱신 없음.
