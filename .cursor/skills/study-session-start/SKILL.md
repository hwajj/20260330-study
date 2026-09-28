---
name: study-session-start
description: >-
  study-session-start 시 STUDY-PLAN-8W.md만 최소 읽고 체크리스트를
  log/_common/sessions/active_fe.md에 저장·갱신. 채팅은 짧게. 트리거: study-session-start,
  공부 시작, 오늘 뭐 공부, /study-session-start.
---

# study-session-start

SSOT: `STUDY-PLAN-8W.md`. **쓰기:** `log/_common/sessions/active_fe.md` (다른 PC는 git pull 후 이 파일 이어서). `active.md`는 트랙 목차.

**원칙:** `active_fe.md`만 열어도 무엇을 하고, 어떤 파일을 열고, 어디에 남기는지 알 수 있어야 한다. **SI·Agent active는 건드리지 않는다.** 체크 항목은 완전한 문장으로 쓴다 (「노트 3줄」「종이만」처럼 끊기지 않게).

### active_fe.md 문체 (필수)

| 하기 | 하지 않기 |
|------|-----------|
| 첫 줄은 `#` 없이 `W{n} {요일} · YYYY-MM-DD (KST)` | `#` 제목, `###` 소제목 |
| 섹션 구분은 `## 실행 체크리스트` 등 `##`만 | 항목마다 **굵게**, 3m·10m·5m 같은 분할 타이머 |
| 블록 이름은 일반 텍스트 한 줄 (예: `이론 — {title}`) | `(회사 60~90m)`, `(AI OFF)` 같은 괄호 라벨만 잔뜩 |
| 체크 한 줄 = 동사로 시작하는 평문 문장 | **열기:** **읽기:** 같은 키워드 반복·과도한 강조 |

## 1. 읽기 (최소)

**한 번에 병렬로:**

| 대상 | 방법 |
|------|------|
| `CURRENT_WEEK`, `CURRENT_DAY`, `CURRENT_CURR_DAY` | `STUDY-PLAN-8W.md` 상단 ~20줄만 |
| §4-B 해당 주 행 1줄 | grep `\| \*\*{week}\*\* \|` |
| §4-A `### Week {week}` | grep 후 **그 블록만** Read (다른 Week 금지) |
| §10 `막힌 질문` 1줄 | grep |
| 이론 **파일 경로** | `CURRICULUM-FULL-TRACK.md`에서 `CURRENT_CURR_DAY` slug **한 줄** (md 상대 경로 전체) |
| 사고력 **오늘 슬롯** | `STUDY-PLAN-8W.md` §4-C **요일 슬롯** + 「주차 메인」표 (PS-TRACK.md 읽지 않음) |

**읽지 않기:** `CURRICULUM-BRIDGE-8W.md` 전체, §3·§2 전문 전체.

## 2. 요일 `day`

1. 사용자가 Week/요일 지정 → 그대로 (Week 없으면 `CURRENT_WEEK`).
2. 아니면 `week=CURRENT_WEEK`, `day=CURRENT_DAY`.
3. §4-B에서 `day`가 ☑ → 월→일 **첫 ☐**.
4. 주 7칸 전부 ☑ → 채팅·파일에 «주 완료»만, §4-A 과제 출력 생략, wrap·W+1 제안.

## 3. `active_fe.md` (필수, start마다)

경로: `log/_common/sessions/active_fe.md` (없으면 `log/_common/sessions/` 생성). `active.md`에 «마지막 FE start» 한 줄 갱신.

**같은 `W{week}-{day}`로 재시작:** 기존 `## 진행` / `## 메모` / `## 막힌 질문` **유지**, `## 실행 체크리스트`와 그 위 소개 줄만 갱신.

**다른 주·요일:** `active_fe.md` 전체 → `archive/{YYYY-MM-DD}-W{w}-{day}.md` 후 새 `active_fe.md`. FE 키 `W{w}-{day}`.

### 3-A. 섹션 구성 (고정 순서)

1. 첫 줄 `W{n} {요일} · 날짜` + pull 한 줄 + 오늘 순서 한 줄 (4블록 이름, 굵게 없이)
2. `## 실행 체크리스트` — 3-B~3-E 전부 `- [ ]` (대략 12~20개)
3. `## 이번 주 한 줄`
4. `## 참고` — 막힌 질문, 플랜 커서 (평문)
5. `## 진행` / `## 메모` / `## 막힌 질문` — 사용자 영역

체크리스트만 두고 위 소개를 빼지 않는다.

### 3-B. 이론 — 항상 4칸

`{theory_path}`, `{slug}`, `{title}` = FULL-TRACK·플랜에서.

```markdown
이론 — {title}
- [ ] 문서 열기: `{theory_path}` (없으면 `CURRICULUM-FULL-TRACK.md`에서 경로 확인)
- [ ] 처음부터 끝까지 한 번 읽기 (표·코드 포함). 모르는 말은 옆에 ?만 적기
- [ ] `log/_common/curriculum-notes/{slug}.md`에 내 말로 세 줄: 뭔지 / 비슷한 개념과 차이 / 회사·FE와 연결
- [ ] `frontend-dev-notes/docs/interview/index.md`에서 오늘 주제 질문 하나 골라 소리 내서 답하기 → 같은 노트에 면접 Q, 내 답 요지 각 한 줄
```

### 3-C. 회사 — §4-A 해당 요일

```markdown
회사 — {§4-A에서 짧은 제목} (코드 수정 없음)
- [ ] 파일 열기: `{열 파일 repo 상대 경로}`
- [ ] {§4-A 회사 문장에 맞는 심볼·구간}만 보기 (함수 전체 또는 대략 50~80줄)
- [ ] {§4-A 회사 한 줄을 그대로 실행 가능한 문장으로}
- [ ] 아래 메모에 두 가지 적기: 이 코드가 막아 주는 문제 / 내가 헷갈리는 점
```

회사를 미룬 날: 체크리스트 맨 아래에 «오늘 회사는 건너뜀 — 다음에 `{path}`» 한 줄.

### 3-D. 사고력 — 요일별 (`STUDY-PLAN-8W.md` §4-C 요일 슬롯)

§4-C 「주차 메인」표 + 「수 trace」. **PS-TRACK 파일은 읽지 않는다** (중복 문서 폐기).

**월**

```markdown
사고력 — 이번 주 메인·서브
- [ ] `STUDY-PLAN-8W.md` §4-C 주차 메인 표에서 메인 링크 확정 (서브 0~1은 표·§10)
- [ ] §10 또는 `log/_common/til/{YYYY-MM-DD}.md`에 `PS 메인: {제목} {URL}` 한 줄
```

**화**

```markdown
사고력 — TIL 복기 (저녁 15m, 코드 X)
- [ ] 이번 주 `- PS:` 줄이 있는 TIL 파일 열기 (`log/_common/til/`)
- [ ] invariant(또는 기억 규칙)를 소리 내서 한 번 말하기
```

**수** (종이만, IDE 안 켬)

```markdown
사고력 — {메인 제목}, 종이로만 (코드·IDE 안 켬)
- [ ] 문제: {제목} — {URL}
- [ ] §4-C 「수 trace」 1~4 (입출 한 문장, 예시 표, 규칙 1줄, 엣지 말로)
- [ ] `log/_common/til/{YYYY-MM-DD}.md`에 `- PS: …` 한 줄
```

**목**

```markdown
사고력 — TIL 다듬기 (저녁 15m)
- [ ] 수요일 trace에서 막힌 단계 → 같은 주 TIL의 `- PS:` **한 줄 수정**
```

**금**

```markdown
사고력 — 구현 (AI 끄고, 미루기 OK)
- [ ] `src/labs/ps/week{week}-{slug}.ts`에 이번 주 메인 구현
- [ ] 통과했으면 TIL `- PS:` 줄 보강 (한 줄)
```

**토**

```markdown
사고력 — 가볍게 (선택 10m)
- [ ] Week {week} **서브** 종이 trace 또는 메인 예시 하나 말로 풀기
```

**일**

```markdown
사고력 — 휴식 (선택 5m)
- [ ] 이번 주 TIL `- PS:` 줄 읽기만 (안 해도 됨)
```

금요 PS 구현과 저녁 90m FE 손과제는 같은 시간대에 겹치지 않게 §4-A를 따른다.

### 3-H. daily TIL — 매일 맨 아래 (모든 요일)

```markdown
기록 — daily TIL
- [ ] `log/_common/til/{YYYY-MM-DD}.md` 만들거나 이어쓰기 — 불릿 3~7줄 (이론 / 회사 / PS / 저녁 중 오늘 한 것)
```

### 3-E. 저녁 손과제 — §4-A «저녁»

```markdown
저녁 — {§4-A 저녁 제목 한 줄} (AI·챗 끄고 손으로)
- [ ] 타이머 켜고 AI·챗은 끄기
- [ ] {§4-A 저녁 내용을 상황·할 일 문장으로}
- [ ] {산출물: 종이 / 파일 / 로그 등 — 완료 기준을 한 문장으로}
- [ ] 끝나면 진행 섹션에 완료 시각과 통과 여부 한 줄
```

### 3-F. 주말 (토·일)

§4-A `주말:` 문장을 3~5개 체크로 쪼갠다 + 해당 요일이 **토·일**이면 위 **토/일** 사고력 템플릿 + **3-H TIL**.

### 3-G. 완성 예

`log/_common/sessions/active_fe.md` (W1 수) 구조를 참고. 항목마다 경로·남길 파일이 들어가야 한다.

## 4. 채팅 출력 (짧게)

- «W{n} {day} — active_fe.md에 체크 N개 적어 뒀어요» + 이론/회사/사고력/저녁 각 한 줄
- «자세한 건 log/_common/sessions/active_fe.md» (목차: `active.md`)
- 표·§ 원문·긴 맥락 금지

## 5. 하지 않기

- `STUDY-PLAN-8W.md` 커서/§4-B 수정 (wrap만)
- 손코딩 전체 정답 코드
- 파일 저장 없이 start만 끝내기
- 체크 한 줄짜리 비실행 요약만 남기기
- active에 `#`/`###`, 항목별 **굵게**, 3m·10m 분할 타이머
