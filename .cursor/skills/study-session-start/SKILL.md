---
name: study-session-start
description: >-
  STUDY-PLAN-8W.md 최소 읽기 → active_fe 체크 + study/fe 노트 ## 학습 할 일. 트리거:
  study-session-start, 공부 시작, /study-session-start.
---

# study-session-start

SSOT: `STUDY-PLAN-8W.md` · Day 순서: `CURRICULUM-FULL-TRACK.md`.

**역할:** 공부 **시작** — 할 일 나열. 정리는 **study-session-wrap**.

**쓰기:**

| 파일 | start |
|------|--------|
| `log/_common/sessions/active_fe.md` | 체크리스트·목표·노트 링크 (**진행 메모 없음**) |
| `study/fe/{NN}-{slug}.md` | **`## 학습 할 일`** 갱신 (이론·회사·사고력·저녁·기록) |
| 같은 노트 | `## 진행` / `## 메모` / `## 막힌 질문` — **유지** (삭제 금지) |

`study/fe/README.md` 표에 없으면 한 줄 추가. `active.md` «마지막 FE start» 갱신. **SI·Agent·Colleague active 건드리지 않음.**

**세션 키:** `FE-{slug}` (`slug` = `CURRENT_CURR_DAY`).

| 상황 | 처리 |
|------|------|
| active가 **같은 키** | 노트 `## 학습 할 일` + active 체크만 갱신 |
| **다른 slug** | active **전체 교체** (노트는 slug별 파일에 이미 있음; `sessions/archive`에 active 백업 **안 함**) |

**NN:** slug `day-(\d+)-`의 숫자를 2자리 (`01` …).

체크 한 줄 = 동사로 시작하는 평문. **시간·week·요일 라벨 금지** (플랜 §4-B는 참고만).

## 1. 읽기 (병렬)

| 대상 | 방법 |
|------|------|
| `CURRENT_WEEK`, `CURRENT_DAY`, `CURRENT_CURR_DAY` | `STUDY-PLAN-8W.md` 상단 ~20줄 |
| §4-B 해당 주 1줄 | grep `\| \*\*{week}\*\* \|` |
| §4-A `### Week {week}` | 해당 블록만 |
| §10 `막힌 질문` | grep |
| `{theory_path}`, `{title}` | FULL-TRACK에서 `CURRENT_CURR_DAY` 한 줄 |
| 사고력 | §4-C 요일 슬롯 + 주차 메인 (PS-TRACK 읽지 않음) |

## 2. 요일 `day` (§4-A·§4-B)

1. 사용자 Week/요일 지정 → 그대로 (Week 없으면 `CURRENT_WEEK`).
2. 아니면 `week=CURRENT_WEEK`, `day=CURRENT_DAY`.
3. §4-B `day` ☑ → 월→일 첫 ☐.
4. 주 7칸 전부 ☑ → «주 완료»·wrap·W+1 제안.

## 3. 노트 `## 학습 할 일` (필수)

경로: `study/fe/{NN}-{slug}.md`.

매 start마다 **이 섹션만** 다시 쓴다 (`- [ ]` 대략 12~20개).

### 이론 — 4칸

```markdown
이론 — {title}
- [ ] 문서 열기: `{theory_path}`
- [ ] 끝까지 읽기 (모르는 말은 ?만)
- [ ] 노트 `## 진행` → `### 이론`에 세 줄: 뭔지 / 비슷한 개념과 차이 / 회사·FE 연결
- [ ] 면접 index에서 주제 질문 하나 말하기 → 같은 `### 이론`에 Q·답 요지 각 한 줄
```

### 회사 — §4-A 해당 요일

```markdown
회사 — {§4-A 짧은 제목} (코드 수정 없음)
- [ ] 파일 열기: `{path}`
- [ ] {심볼·구간}만 보기
- [ ] {§4-A 회사 문장을 실행 가능하게}
- [ ] 노트 `## 진행` → `### 회사`: 막는 문제 / 헷갈리는 점
```

회사 건너뜀: 맨 아래 «오늘 회사 건너뜀 — `{path}`» 한 줄.

### 사고력 — 요일별 (§4-C)

**월:** 메인·서브 링크 확정 · §10 또는 til에 `PS 메인:` 한 줄  
**화:** 이번 주 `- PS:` TIL 열기 · invariant 말하기  
**수:** 문제 URL · §4-C 수 trace 1~4 · til `- PS:` 한 줄 (종이만, IDE 안 켬)  
**목:** 수 trace 막힌 단계 → `- PS:` 한 줄 수정  
**금:** `src/labs/ps/week{week}-{slug}.ts` 구현 · til 보강  
**토:** 서브 trace 또는 메인 예시 말로 (선택)  
**일:** `- PS:` 읽기만 (선택)

각 항목을 `- [ ]`로. `### 사고력`에 결과 남기기.

### 저녁 — §4-A

```markdown
저녁 — {§4-A 저녁 제목}
- [ ] AI·챗 끄기
- [ ] {§4-A 저녁을 상황·할 일 문장으로}
- [ ] {산출물·완료 기준 한 문장}
- [ ] 노트 `## 진행` → `### 저녁`에 결과 한 줄
```

### 기록

```markdown
기록
- [ ] 노트 `## 진행`에 오늘 요약 3~7줄 **또는** `log/_common/til/{YYYY-MM-DD}.md`에 이 노트 링크 한 줄
```

주말: §4-A `주말:`을 3~5체크로 + 해당 요일 사고력.

새 노트면 `## 진행` / `## 메모` / `## 막힌 질문` 빈 헤더만 추가.

## 4. `active_fe.md`

```markdown
# FE — {slug} · {title}

다른 PC: repo **pull** → 이 파일 + **노트 링크**.

**노트:** [`study/fe/{NN}-{slug}.md`](../../../study/fe/{NN}-{slug}.md) — **`## 학습 할 일`** · **`## 진행`** · **wrap**

## 실행 체크리스트
(노트 `## 학습 할 일`과 동일 항목·순서)

## 한 줄 목표
(§4-A·이번 주 한 줄)

## 참고
- 막힌 질문: …
- `CURRENT_CURR_DAY` → **{slug}** ({☐|☑})
```

## 5. 채팅

- `{slug} — 노트 할 일 N개 · active N개` + 블록별 한 줄
- «자세한 건 active_fe + study/fe/…»

## 6. 하지 않기

- 플랜 §4-B·커서 수정 (wrap)
- `sessions/archive`에 active 덮어쓰기 백업
- `log/_common/curriculum-notes/` 신규 생성
- active에 `## 진행` / 분·week 제목
