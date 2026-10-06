---
name: tech-survey-wrap
description: >-
  Tech-survey done: tidy item note ## 진행, optional ## 학습 할 일 [x], STUDY-PLAN
  ☑. No session active file. tech-survey-wrap.
disable-model-invocation: true
---

# tech-survey-wrap

SSOT: `STUDY-PLAN-TECH-SURVEY.md`. 짝: **tech-survey-start**.

**역할:** **공부 끝** 신호. **`study/tech-survey/{항목}.md`만** 수정.

**읽기 (최소):** 해당 항목 md · 플랜 `CURRENT_ITEM` + §2 해당 행(완료 시 패치용). **session active 읽지 않음.**

## 1. 입력

- 메모 없으면 노트 `## 진행`·`## 메모`
- «반만» / «체크하지 마» → §2 ☐ · `## 학습 할 일` `[ ]` 유지
- «막힌 없음» → §4·노트 막힌 `—`
- **완료:** 통과선 달성 또는 명시적 완료 → §2 ☑ · `CURRENT_ITEM`+1 · archive

## 2. 채팅 (파일 수정 전)

3줄 요약 · 막힌 1개(없으면 —) · 다음 항목 통과선

## 3. STUDY-PLAN (완료 시만)

§2 ☑ · `CURRENT_ITEM`+1 · §4 · «마지막 tech-survey 세션» — 기존 규칙.

## 4. 항목 md

### 4-A. `## 진행` 정리

- **`## 학습 할 일`:** start 전용 텍스트는 유지. **완료 세션**이면 해당 `- [ ]` → `- [x]` (반만이면 건드리지 않음).
- `## 진행`을 **`## 학습 할 일` 순서**로 재구성; 사용자 우선, 빈 칸만 `(wrap 보완)`
- 같은 항목 **두 번째 wrap:** 미완 훑어 채운 뒤 완료면 §2 ☑

### 4-B. 완료 시

`study/tech-survey/archive/{date}-item-{NN}.md` 스냅샷 · 항목 md 유지

«반만»: 4-A만, 플랜 ☐.

## 5. 하지 않기

- wrap에서 `## 학습 할 일`을 정답 목록으로 **교체**
- 반만인데 §2 ☑
- session active 파일 생성·갱신
