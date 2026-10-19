---
name: si-session-start
description: >-
  STUDY-PLAN-SI.md → active_si + study/si 노트 ## 학습 할 일. si-session-start, SI 공부 시작.
---

# si-session-start

SSOT: `STUDY-PLAN-SI.md`. 짝: **si-session-wrap**. 한 방: **si-session-go** (`sgo`). 형식은 **tech-survey-start**와 동일.

**쓰기:** `active_si.md` · `study/si/{NN}-{file-slug}.md` (`study/si/README.md` 표). **FE·Agent active 건드리지 않음.**

**세션 키:** `SI-step-{step}` · **NN** = step 2자리.

| 상황 | 처리 |
|------|------|
| 같은 키 | 노트 `## 학습 할 일` + active 체크만 갱신 · `## 진행` 유지 |
| 다른 step | active 교체 (`sessions/archive` **안 함**) |

시간·week 표기 금지.

## 1. 읽기

`CURRENT_STEP` · §2 step 행 · §3 `### {step}` · §4 막힌 질문

## 2. step

N 지정 / `CURRENT_STEP` / 첫 ☐ / 20 완료 — **기존 규칙**.

## 3. 노트 `## 학습 할 일`

§2 «이번 세션 할 일»·통과선을 `- [ ]` 3~8개 (+ §3 경로 «열기»). 마지막 1~2개는 통과선 체크 문장.

## 4. `active_si.md`

```markdown
# SI — 단계 {step} · {단계명}

pull 후 이 파일 + 노트 링크.

**노트:** [`study/si/{NN}-….md`](../../../study/si/{NN}-….md)

## 실행 체크리스트
(노트와 동일)

## 한 줄 목표

## 참고
- 막힌 질문
- `CURRENT_STEP` → **단계 {step}** ({☐|☑})
```

## 5. 채팅

할 일 3~5줄 · active N개 · 통과선 한 줄 · SI 커서.

## 6. 하지 않기

- 플랜 수정 (wrap) · active 없이 종료 · `sessions/archive`
