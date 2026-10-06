---
name: tech-survey-start
description: >-
  Minimal read of STUDY-PLAN-TECH-SURVEY.md; writes item note ## 학습 할 일 only
  (§2·§3). No session active file. Short chat. tech-survey-start.
disable-model-invocation: true
---

# tech-survey-start

SSOT: `STUDY-PLAN-TECH-SURVEY.md` (repo `20260330-study`).

**역할:** **공부 시작** — 오늘 뭘 할지 **항목 노트에만** 나열. 답·정리는 **wrap**.

**쓰기 (항목 노트만):**

| 파일 | start |
|------|--------|
| `study/tech-survey/{항목}.md` | **`## 학습 할 일`** ← §2 «이번 세션 할 일»·§3·통과선 (`- [ ]` 5~12개, 정답 X) |
| 같은 노트 | `## 진행` / `## 메모` / `## 막힌 질문` — **유지** (기존 `## 진행` 삭제 금지) |

`active.md`: «마지막 tech-survey start» 한 줄 + 표 **IT 훑기** 열을 **현재 항목 md** 링크로 갱신. **FE·SI·Agent·Colleague active 건드리지 않음.** **`active_tech_survey.md` 사용·생성 금지.**

**용어:** 시험·기술사·기출 등 사용하지 않음.

## 1. 읽기 (최소)

| 읽을 것 | 방법 |
|---------|------|
| `CURRENT_ITEM` | 플랜 상단 1줄 |
| §2 해당 **#** 행 | grep `\| \*\*{N}\*\* \|` 한 줄 (통과선·이번 세션 할 일) |
| §3 `### {N}` | 해당 블록만 |
| §4 막힌 | 노트에 반영할 때만 grep |
| `study/tech-survey/README.md` | **새 항목 파일 생성할 때만** |

**읽지 않기:** 플랜 전체 · 삭제된 session active · 다른 트랙 active.

## 2. item 결정

N 지정 / `CURRENT_ITEM` / §2 첫 ☐ / 16 완료 — 기존 규칙.

## 3. 항목 md — **`## 학습 할 일`**

매 start마다 해당 섹션만 **다시 쓴다**.

- §2 «이번 세션 할 일» 쪼개기 · §3·연습 추가 · 마지막 1개 = §2 통과선(말로/진행 요약)
- **`## 진행` 이하:** 유지 (`## 학습 할 일`만 덮어쓰기)
- 파일 없으면 생성 + `README.md` 표 한 줄

## 4. 채팅 (짧게)

- 할 일 **3~5줄** (본문 중복 나열 금지)
- 노트 경로 + **`## 학습 할 일` {N}개** + 통과선 한 줄
- **Tech survey 커서:** …

## 5. 하지 않기

- 통과선 **모범답** · `## 진행` 정리 (wrap)
- `CURRENT_ITEM`·§2 ☑ (wrap)
- session active 파일 생성·갱신
