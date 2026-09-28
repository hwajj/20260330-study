---
name: si-session-start
description: >-
  STUDY-PLAN-SI.md 최소 읽기 → log/_common/sessions/active_si.md 갱신. 채팅은 짧게.
  트리거: si-session-start, SI 공부 시작, /si-session-start.
---

# si-session-start

SSOT: `STUDY-PLAN-SI.md` (repo `20260330-study`).  
평일 FE: [`STUDY-PLAN-8W.md`](../../STUDY-PLAN-8W.md) — SI 세션에 저녁 90m 손코딩 넣지 않음.

**쓰기:** `log/_common/sessions/active_si.md` (다른 PC는 git pull 후 이 파일 이어서). `active.md`는 트랙 목차만 갱신. 형식은 **study-session-start** §3와 동일한 섹션 순서.

**원칙:** `active_si.md`만 열어도 무엇을·몇 분·무엇을 남기는지 알 수 있어야 한다. **FE·Agent active 파일은 건드리지 않는다.** 채팅에 긴 과제문 복사하지 않는다.

## 1. 읽기 (최소, 병렬)

| 대상 | 방법 |
|------|------|
| `CURRENT_STEP` | 상단 ~15줄 |
| §2 **step 행** | grep `\| \*\*{step}\*\* \|` |
| §3 | `### {step} —` 있으면 그 블록만 Read |
| §4 `막힌 질문` | grep 1줄 |

§0·§2 전표·§3 전문 읽지 않기.

## 2. step 결정

1. 사용자 **단계 N** / «N단계만» / `— N만` → `step = N` (`dry_run`: 플랜 ☑·`CURRENT_STEP` 안 바름, **active는 N으로 갱신**)
2. 아니면 `step = CURRENT_STEP`
3. §2에서 step이 ☑ → 1~20 **첫 ☐**
4. 1~20 전부 ☑ → 20단계 완료·16·19 반복 안내. **active 새 과제 없음**, 채팅만

## 3. `active_si.md` (필수, 4번 아닐 때)

경로: `log/_common/sessions/active_si.md` (`sessions/`·`archive/` 없으면 생성). `active.md`에 «마지막 SI start» 한 줄 갱신.

**세션 키:** `SI-step-{step}`

| 상황 | 처리 |
|------|------|
| 기존 `active_si.md`가 **같은 키** | `## 진행` / `## 메모` / `## 막힌 질문` **유지**, `## 실행 체크리스트`만 갱신 |
| **다른 SI step** | `active_si.md` 전체 → `archive/{YYYY-MM-DD}-{이전키}.md` 후 새 `active_si.md` |

이전키 예: `SI-step-1`, `SI-step-3`

### 섹션 (고정 순서)

1. `# SI — 단계 {step} · {단계명} — {YYYY-MM-DD} (KST)` + pull 안내 + `권장 2~4h · 단계 1개 · FE 저녁 90m과 겹치지 않기`
2. `## 실행 체크리스트` — §2 «이번 세션 할 일»을 **문장·불릿마다** `- [ ]` (3~8개). 마지막 1~2개는 §2 **통과선**을 체크 가능한 문장으로
3. §3에 경로 있으면 `### 참고` + `- [ ] **열기:** \`path\``
4. step **6~10**이고 `src/labs/si/` 없음 → 체크 또는 메모 한 줄 «6단계에서 생성»
5. `## 한 줄 목표` — §0 한 줄 또는 단계명
6. `## 참고` — 막힌 질문, `CURRENT_STEP` → 오늘 실행 **단계 {step}** ({☐|☑})
7. `## 진행` / `## 메모` / `## 막힌 질문` — 빈 템플릿 (재시작 시 기존 유지)

**16·19:** 지원·피드백만 — 코드 체크 최소.

## 4. 채팅 (짧게)

- 이번 SI 할 일 **3~5줄** (일상어)
- «**active_si.md**에 실행 체크 **{N}**개» (+ FE 병행 시 `active_fe.md` 그대로)
- 통과선 **한 줄**
- 맨 아래: **SI 커서:** `{CURRENT_STEP}` → 실행 **단계 {step}** ({☐|☑})

20단계 목록·Chad Darby 권유·Spring 전체 정답 금지.

## 5. 하지 않기

- start에서 `STUDY-PLAN-SI.md`의 `CURRENT_STEP`·§2 수정 (**wrap만**)
- `STUDY-PLAN-8W.md` §4-A 요일표 섞기
- **active 없이** start 종료
