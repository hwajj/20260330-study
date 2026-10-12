---
name: study-session-start
description: >-
  STUDY-PLAN-8W.md 최소 읽기 → active_fe 체크 + study/fe 노트 ## 학습 할 일. 트리거:
  study-session-start, 공부 시작, /study-session-start.
---

# study-session-start

SSOT: `STUDY-PLAN-8W.md` · Day 순서: `CURRICULUM-FULL-TRACK.md`. **형식 = tech-survey-start** (노트 `## 학습 할 일`만 갱신, **이론/회사 블록 구분 없음**).

**역할:** 공부 **시작** — 할 일 나열. 정리·요약 파일은 **study-session-wrap**.

**쓰기:**

| 파일 | start |
|------|--------|
| `log/_common/sessions/active_fe.md` | 체크리스트·목표·노트 링크 (**진행 메모 없음**) |
| `study/fe/{NN}-{slug}.md` | **`## 학습 할 일`** 갱신 (**단일 `- [ ]` 목록**) |
| 같은 노트 | `## 진행` / `## 메모` / `## 정리` — **유지** (`## 진행` 삭제 금지) |

PS·저녁·§4-C는 **플랜·`til/`** — start가 Day 노트에 넣지 않음.

`study/fe/README.md` 표에 없으면 한 줄 추가. `active.md` «마지막 FE start» 갱신. **SI·Agent·Colleague active 건드리지 않음.**

**세션 키:** `FE-{slug}` (`slug` = `CURRENT_CURR_DAY`).

| 상황 | 처리 |
|------|------|
| active가 **같은 키** | 노트 `## 학습 할 일` + active 체크만 갱신 |
| **다른 slug** | active **전체 교체** (`sessions/archive` 백업 **안 함**) |

**NN:** slug `day-(\d+)-`의 숫자를 2자리 (`01` …).

체크 한 줄 = 동사로 시작하는 평문. **시간·week·요일 라벨 금지** (플랜 §4-B는 참고만).

## 1. 읽기 (병렬)

| 대상 | 방법 |
|------|------|
| `CURRENT_WEEK`, `CURRENT_DAY`, `CURRENT_CURR_DAY` | `STUDY-PLAN-8W.md` 상단 ~20줄 |
| §4-B 해당 주 1줄 | grep `\| \*\*{week}\*\* \|` |
| §4-A `### Week {week}` | 해당 블록만 (회사·열 파일; **저녁 행은 참고만**) |
| `{theory_path}`, `{title}` | FULL-TRACK에서 `CURRENT_CURR_DAY` 한 줄 |

## 2. 요일 `day` (§4-A·§4-B)

1. 사용자 Week/요일 지정 → 그대로 (Week 없으면 `CURRENT_WEEK`).
2. 아니면 `week=CURRENT_WEEK`, `day=CURRENT_DAY`.
3. §4-B `day` ☑ → 월→일 첫 ☐.
4. 주 7칸 전부 ☑ → «주 완료»·wrap·W+1 제안.

## 3. 노트 `## 학습 할 일` (필수)

경로: `study/fe/{NN}-{slug}.md`.

매 start마다 **이 섹션만** 다시 쓴다 (`- [ ]` 대략 **6~10개**, **한 목록**).

**순서 (tech-survey처럼 구역 헤더 없이):**

1. 커리큘럼 Day — 문서 열기 · 끝까지 읽기 · `## 진행`에 세 줄(뭔지 / 차이 / FE·실무 연결) · 면접 index 질문 1개 말하기·요지
2. §4-A **해당 요일** — 파일 열기 · 구간 보기 · 회사 추가 문장을 실행 가능한 1~2체크 · `## 진행`에 막는 문제/헷갈림
3. 마지막 1개(선택): §4-A **통과선** 또는 Day 통과선 — «말로 확인»

회사 건너뜀: 목록 맨 아래 «오늘 코드 리딩 건너뜀 — `{path}`» 한 줄 (`- [ ]` 아님).

주말: §4-A `주말:` 리딩만 체크로 (저녁 손코딩은 플랜 참고).

새 노트면 `## 진행` / `## 메모` 빈 헤더만. `## 정리`는 wrap이 채움.

**wrap이 `## 진행`에 쓸 제목:** 각 `- [ ]` **굵은 제목 부분**과 동일한 `###` (예: `### curriculum 세 줄`).

## 4. `active_fe.md`

```markdown
# FE — {slug} · {title}

다른 PC: repo **pull** → 이 파일 + **노트 링크**.

**노트:** [`study/fe/{NN}-{slug}.md`](../../../study/fe/{NN}-{slug}.md) — **`## 학습 할 일`** · **`## 진행`** · **wrap → archive**

## 실행 체크리스트
(노트 `## 학습 할 일`과 동일 항목·순서)

## 한 줄 목표
(§4-A 주 목표 또는 이번 주 한 줄)

## 참고
- `CURRENT_CURR_DAY` → **{slug}**
- §4-A **{day}** 열 파일: `{path}`
```

## 5. 채팅 (tech-survey-start 톤)

- 할 일 **3~5줄** (노트 전체 복붙 금지)
- 노트 경로 + **`## 학습 할 일` N개** + 통과선·열 파일 한 줄
- «자세한 건 노트 + active_fe»

## 6. 하지 않기

- 플랜 §4-B·커서 수정 (wrap)
- `sessions/archive`에 active 덮어쓰기 백업
- `log/_common/curriculum-notes/` 신규 생성
- active에 `## 진행` / 분·week 제목
- 노트 `## 학습 할 일`에 **이론 — / 회사 —** 구역 헤더
- 노트에 사고력·저녁·막힌 질문 섹션 **추가**
