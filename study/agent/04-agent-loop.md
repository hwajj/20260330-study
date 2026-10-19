# Agent 04 · Agent 루프

> **go** · 플랜 단계 4 · active: [`active_agent.md`](../../log/_common/sessions/active_agent.md)

## 학습 할 일

- [x] `POST /chat` — user → (tools)* → assistant
- [x] `maxSteps` 상한 (기본 8)
- [x] 키 없으면 mock planner
- [x] **통과선:** `maxSteps:1` → capped, 무한 루프 없음

## 진행

- `server/agent/loop.ts` · trace 배열 · mock/OpenAI 분기

## 정리

### 한 줄
도구 호출을 반복하되 step 상한으로 루프를 끊는다.

### 핵심
- allowlist 도구만 execute · OPENAI_API_KEY 없으면 deterministic mock

## 메모

## 막힌 질문
