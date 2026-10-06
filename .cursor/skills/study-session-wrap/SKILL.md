---
name: study-session-wrap
description: >-
  FE 세션 마무리: study/fe 노트 ## 진행 정리, STUDY-PLAN-8W §4-B·커서·§10, active 최소화.
  study-session-wrap, 공부 마무리.
---

# study-session-wrap

SSOT: `STUDY-PLAN-8W.md`. 짝: **study-session-start**.

**노트 SSOT:** `study/fe/{NN}-{slug}.md` · **active:** 체크만.

## 1. 입력

- 세션 메모 — 없으면 짧게 질문
- 완료 요일 — 없으면 `CURRENT_DAY`
- Week — 없으면 `CURRENT_WEEK`
- «반만» → §4-B ☐, 요약만

wrap 요청 + 완료 → 해당 요일 ☑.

## 2. 채팅 (파일 수정 전)

1. 오늘 3줄 요약  
2. 막힌 질문 1개 → 답 2~4줄 + Why 1줄  
3. 다음 start 힌트 — 다음 §4-A 요일·열 파일 한 줄  

## 3. STUDY-PLAN-8W.md (완료 시)

3-A §4-B `{day}` ☑ · 3-B `CURRENT_DAY`/`CURRENT_WEEK` (월~토 다음 요일, 일→월+W+1) · 3-C §10 · 3-D 주 완료 — **기존 규칙 유지**.

**커리큘럼 Day 완료** (이론 4칸 다 했다고 사용자 확인 또는 메모): `CURRENT_CURR_DAY`·FULL-TRACK 표에서 **다음 slug**로 (안 했으면 유지).

## 4. 노트 + active (필수)

`slug` = wrap 시점 `CURRENT_CURR_DAY`. 노트를 **먼저** 읽는다.

### 4-A. `## 진행` 정리

- **`## 학습 할 일` 건드리지 않음**
- active 체크 순으로 `## 진행` 재구성 (`### 이론` / `회사` / `사고력` / `저녁` 유지)
- 사용자·active 메모 우선; 빈 칸만 `(wrap 보완)`
- `## 막힌 질문` → §10에 넘길 1줄 반영

### 4-B. 완료 시 (요일 ☑)

- `study/fe/archive/{YYYY-MM-DD}-{slug}.md` — 노트 `## 진행`·요약 스냅샷 (선택, 메모 있을 때)
- `active_fe.md` 비우거나 `# FE — {slug} 완료` 한 줄
- (선택) `log/_common/til/{date}.md` wrap 요약 1~3줄

«반만»: 4-A만, active 유지.

## 5. 하지 않기

- `sessions/archive/` 신규 저장
- 손코딩 정답 장문
- 반만인데 §4-B ☑
