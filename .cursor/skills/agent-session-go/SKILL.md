---
name: agent-session-go
description: >-
  Agent 단계를 start+통과선 구현+완료 wrap 한 번에. 트리거: agent-session-go,
  /agent-go, ago, /ago, agent-gogo, /agent-gogo. 반만 없음. 쭉/연속 시 다음 단계 연쇄.
---

# agent-session-go

**한 방:** `agent-session-start` + **§2 통과선까지 구현** + **완료** `agent-session-wrap`.  
FE `study-session-go`(gogo)와 같은 역할 — Agent는 **공부 정리본이 아니라 코드·문서 통과선**.

SSOT: `STUDY-PLAN-AGENT.md` (`CURRENT_STEP` 1~16).  
노트: `study/agent/{NN}-{slug}.md` (`study/agent/README.md`).  
코드: `src/labs/agent/`.  
Study repo: `20260330-study` (개인 skills 미러 — 실행 시 study repo 경로 사용).  
**FE·SI active 건드리지 않음.** SI와 같은 날 **SI 또는 Agent 하나만**.

**항상 완료 가정** (반만·☐ 남기기 금지). 통과선 검증 후 §2 ☑ · `CURRENT_STEP`+1 · archive · active 다음 힌트.

## 트리거

`agent-session-go` · `/agent-go` · `ago` · `/ago` · `agent-gogo` · `/agent-gogo`

| 입력 | 동작 |
|------|------|
| 지정 없음 | `CURRENT_STEP` **1단계**만 완료 |
| 단계 N | 그 단계만 (플랜과 다르면 사용자 확인 후) |
| `쭉` / `연속` / `N단계` | `CURRENT_STEP`부터 **연속** 완료. 실키 필수·모호한 제품 결정·실패 통과선이면 **그 단계에서 멈춤** |

## 1. 읽기 (필수 · 병렬)

| 대상 | 목적 |
|------|------|
| `STUDY-PLAN-AGENT.md` `CURRENT_STEP` · §2 해당 행 · §3 상세 · §4 | 할 일·통과선·시그니처 |
| 기존 `study/agent/{NN}-….md` | 진행 흡수·덮어쓰기 전 사용자 문장 보존 |
| `src/labs/agent/` (있으면) | 이미 있는 서버·웹·문서 |
| `active_agent.md` | 세션 키 맞춤 |

## 2. 구현 (핵심)

§2 **이번 세션 할 일** + **통과선**을 코드/문서로 충족한다.

- 스킵·«나중에»·반만 금지.
- LLM/실키(`OPENAI_API_KEY`)가 필요한 단계: **mock·스텁으로 통과선이 가능하면** 그걸로 완료. 불가능하면 연속 모드 중단 + 채팅에 필요한 env만 안내 (`.env`는 git 제외, `.env.example`만).
- 플랜 «하지 않기»(LangChain 전체·LLM 합계·10개 도구 등) 준수.
- 통과선은 **실제로 확인** (curl / `pnpm dev` / 브라우저·스크립트). 확인 실패면 wrap 하지 말고 고친다.

## 3. 노트 쓰기

경로: `study/agent/{NN}-{slug}.md`

```markdown
# Agent {NN} · {단계명}

> **go** · 플랜 단계 {step} · active: [`active_agent.md`](../../log/_common/sessions/active_agent.md)

## 학습 할 일

- [x] … (§2·통과선, **전부 [x]**)

## 진행

- 구현·확인 사실만 (경로·명령·결과 한 줄)

## 정리

### 한 줄
(이 단계 한 문장)

### 핵심
- 면접·다음 단계용 bullet 2~5개

## 메모

## 막힌 질문
```

`## 메모` / `## 막힌 질문`은 비우거나 `—`. go는 막힌을 남기지 않는 것이 기본.

## 4. 플랜·archive·active (완료 wrap과 동일)

날짜 = Asia/Seoul 캘린더일.

1. **§2** 해당 단계 ☐→☑ · **`CURRENT_STEP`** = 다음(16 완료 후 `done` 또는 `—`)
2. **§4** `마지막 Agent 세션`: `YYYY-MM-DD | step {n} go | {단계명} 통과·archive, →{next}`
3. **archive** `study/agent/archive/{YYYY-MM-DD}-step-{NN}.md` (같은 날 재-go면 덮어쓰기):
   - 제목 + **완료** + 노트 링크
   - `## active 체크` = 노트 `## 학습 할 일`
   - `## 진행` / `## 정리` = 노트 해당 섹션
   - `## wrap 요약` = 채팅 3줄 + 다음 step 한 줄
4. **`active_agent.md`**: **연속 ago 중에는 생략 OK** (SSOT는 플랜 `CURRENT_STEP`·노트). 세션 끝·다른 PC 이관 시에만 다음 단계 한 줄 갱신. 16 끝나면 «Agent 트랙 완료».
5. **`log/_common/sessions/archive/` 사용 안 함**

연속 모드: 위 1~4를 단계마다 반복. 한 채팅 응답에 여러 단계 OK — 단계마다 통과선 확인 후 다음으로.

## 5. 채팅 (짧게)

파일 쓴 뒤 (연속이면 단계마다 1블록 또는 마지막에 목록):

1. **노트 경로** + «ago 완료 · step N»
2. **한 줄** — 이 단계 핵심
3. **다음** — next step · 통과선 한 줄  
연속 중단 시: 멈춘 step + 이유(실키/실패)만.

노트 본문 전체 복붙 금지. 막힌·장문 진행 보고 금지.

## 6. 하지 않기

- start만 / wrap만 하고 통과선 미달로 ☑
- 원문·플랜 안 읽고 체크만 [x]
- FE 8W / SI 플랜·active 수정
- `sessions/archive/` 신규
- `.env`·실키 커밋
- go인데 ☐로 남기기
