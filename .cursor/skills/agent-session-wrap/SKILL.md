---
name: agent-session-wrap
description: >-
  Ends an Agent portfolio session: summarizes notes, updates STUDY-PLAN-AGENT.md
  (§2 check, CURRENT_STEP, §4). Use when the user says agent-session-wrap,
  Agent 포폴 마무리, Agent wrap, or pastes Agent session memos.
---

# agent-session-wrap

SSOT: `STUDY-PLAN-AGENT.md`. 짝: **agent-session-start**.

## 1. 입력

- **세션 메모** (없으면 짧게 질문)
- **완료 단계** — 없으면 `CURRENT_STEP`
- «반만» / «체크 X» → §2 ☑ 유지

## 2. 채팅 출력 (파일 수정 전)

1. 오늘 3줄 요약  
2. 막힌 질문 1개 → 답 2~4줄  
3. 다음 단계명 + 통과선 1줄  

## 3. STUDY-PLAN-AGENT.md (완료 시)

### 3-A. §2

`| **{step}** | ☐ |` → `☑`

### 3-B. `CURRENT_STEP`

`step + 1` (18 초과 시 18 유지, 완료·유지보수 안내)

### 3-C. §4

- `마지막 Agent 세션`: `YYYY-MM-DD | 단계 {step} | …`
- `막힌 질문`: 1줄 덮어쓰기
- `리포 경로`: 사용자가 다른 경로 쓰면 갱신
- 1~18 전부 ☑ → `18단계 완료` ☑

### 3-D. 트랙 시작일

`step === 1` 완료 & 비어 있으면 오늘 날짜.

## 4. 세션 로그 (선택)

`log/_common/sessions/AGENT-YYYY-MM-DD-step{step}.md`

## 5. 하지 않기

- Agent **전체 구현** 장문
- `STUDY-PLAN-8W.md` / `STUDY-PLAN-SI.md` 수정 (각각 전용 wrap)
- API 키·`.env` 실값 커밋 유도

## 6. 예

```text
agent-session-wrap

메모:
- tool 스키마 4개 Zod 완료
- OpenAI 호출 타임아웃 설정 헷갈림
```

→ 단계 5 ☑, `CURRENT_STEP`=6.
