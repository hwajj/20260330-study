---
name: study-session-go
description: >-
  FE Day를 start+완료 wrap 한 번에: 공부용 정리 노트만 생성·커서 전진. 트리거:
  study-session-go, /go, go, gogo, /gogo. 진행·메모·막힌 섹션 없음.
---

# study-session-go

**한 방:** `study-session-start` + **완료** `study-session-wrap`을 이미 끝낸 것처럼 처리한다.  
목표는 **그 노트만 다시 읽어도 이해·면접 말하기가 되는 정리본**.

SSOT: `STUDY-PLAN-8W.md` · Day: `CURRICULUM-FULL-TRACK.md` (**Curr 1~15 전부**).  
노트: `study/fe/{NN}-{slug}.md`  
- slug `day-(\d+)-…` → `NN` = 2자리 (`51-day-51-suspense.md`)  
- slug `08-3-…` / `09-1-…` 등 → `NN` = 주 접두 (`08-08-3-….md`)

**항상 완료 가정** (반만 없음). Day 커서 다음 slug · archive · active 다음 힌트.

### post-W8 (실무 8주 끝난 뒤)

`CURRENT_WEEK`가 **8이고 §4-B 월~일 전부 ☑**이면:
- **§4-B / `CURRENT_DAY` / `CURRENT_WEEK` 건드리지 않음**
- **FULL만** 전진: 해당 행 ☑ · `CURRENT_CURR_DAY` 다음 · 주 바뀌면 `CURRENT_CURR_WEEK` +1
- §10 `마지막 세션`: `YYYY-MM-DD | curr-only go | {slug} 정리본·archive, curr→{next}`
- 실무 연결: §4-A 없으면 FE/면접에서 어디에 쓰이는지 1~3줄
- Curr Week **15 · day-80** 완료 후: `CURRENT_CURR_DAY` = `—`(또는 `done`) · FULL 통과선 안내

## 트리거

`study-session-go` · `/go` · `go` · `gogo` · `/gogo`  
slug 지정 없으면 `CURRENT_CURR_DAY`. 요일 지정 없으면 `CURRENT_DAY`(§4-B ☐면 그 날, 아니면 첫 ☐).

## 1. 읽기 (필수 · 병렬)

| 대상 | 목적 |
|------|------|
| `STUDY-PLAN-8W.md` 상단 + §4-B + §4-A 해당 Week | week/day/통과선·열 파일 |
| FULL-TRACK `CURRENT_CURR_DAY` 행 | `{theory_path}` · `{title}` · 다음 slug |
| **이론 원문 전체** (`frontend-dev-notes/.../{slug}.md`) | 키워드·질문·목표 → 정리 재료 |
| §4-A 열 파일(있으면) **해당 구간** | 실무 연결 (주말이면 Promise/MDN 등 주말 리딩) |
| interview `index`에서 Day 주제 질문 1개 | 면접 블록 |
| 기존 노트 있으면 | 덮어쓰기 전 사용자 문장 있으면 **보존·흡수** |

얕은 요약 금지. 원문·코드를 **읽고** 말로 다시 쓴다. 품질 예: [example-note.md](example-note.md).

## 2. 노트 쓰기 (핵심 산출물)

경로: `study/fe/{NN}-{slug}.md` — **전면 작성**(go 산출물 SSOT).

### 넣을 것

```markdown
# Day {NN} · {title}

> **go 정리본** · 원문: `{theory_path}` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] … (start 규칙과 같은 6~10개, **전부 [x]**)

## 정리

### 한 줄
(이 Day를 한 문장)

### 핵심
- 면접·복습용 bullet. **왜 / 순서 / 차이**가 보이게.
- 원문 키워드를 나열만 하지 말고 **연결 문장**으로.

### 흐름 (해당 시)
순서·다이어그램·단계 (code fence OK). URL→화면, 401 큐 등.

### 차이·함정
헷갈리기 쉬운 대비 2~5개 (TCP vs TLS, HTTP/2 vs /3 …).

### 실무 연결
§4-A 열 파일·회사 코드가 있으면 **파일명 + 동작 한 줄**. 없으면 FE에서 어디에 쓰이는지 1~3줄.
주말-only면 Promise/async 핵심만.

### 면접 한 방
- **Q:** …
- **답:** … (30초~1분 스크립트)

### 통과선 스크립트
§4-A/Day 통과선을 **입으로 읽는 문장**으로 5~12줄.
```

### 넣지 말 것

- `## 진행` · `## 메모` · `## 막힌` / `막힌 질문`
- «미완» · «반만» · «wrap 보완» · 세션 메타 장문
- PS·저녁·§4-C · `### 이론` / `### 회사` 구역 헤더
- 원문 통째 복붙 · 손코딩 정답 장문

`study/fe/README.md`에 slug 없으면 한 줄 추가.

## 3. 플랜·archive·active (완료 wrap과 동일)

1. **§4-B** (실무 8주 **미완**일 때만): `{day}` ☑ · `CURRENT_DAY` 다음(월→…→토→일, 일→월+`CURRENT_WEEK`+1) · 주 전부 ☑면 주 완료 안내. **post-W8이면 이 단계 스킵.**
2. **Day 완료:** FULL-TRACK 해당 행 ☑ · `CURRENT_CURR_DAY` = 다음 slug (`CURRENT_CURR_WEEK` 규칙 유지) · 플랜 상단 `CURRENT_CURR_*` 동기화.
3. **§10** `마지막 세션`: 평소 `YYYY-MM-DD | W{n} {day} go | …` · **post-W8**이면 `curr-only go` 형식.
4. **archive** `study/fe/archive/{YYYY-MM-DD}-{slug}.md` (같은 날 재-go면 덮어쓰기):
   - 제목 + **완료** + 노트 링크
   - `## active 체크` = 노트 `## 학습 할 일`
   - `## 정리` = 노트 `## 정리` 복사
   - `## wrap 요약` = 채팅 3줄 + 막힌 `—` + 다음 start/go 한 줄  
   (`## 진행` 없음 — go 노트에 진행이 없으므로 생략)
5. **`active_fe.md`**: 다음 start/go 한 줄 + **다음** 노트 링크(없으면 «다음 go에서 생성»). 트랙 끝이면 «FULL 완료».
6. **`active.md`**: `마지막 FE start` → 오늘 날짜 · 방금 완료한 slug (**완료 slug** 기록).

날짜 = Asia/Seoul 캘린더일.

## 4. 채팅 (짧게)

파일 쓴 뒤:

1. **노트 경로** + «go 정리본 완료»
2. **한 줄** — 이 Day 핵심
3. **다음** — next slug · (있으면) 다음 §4-A 열 파일

막힌·진행 보고 **금지**. 노트 본문 전체 복붙 금지.

## 5. 하지 않기

- start만 / wrap만 흉내 내고 정리 부실하게 끝내기
- 원문 안 읽고 키워드만 나열
- 반만·§4-B ☐로 남기기
- `sessions/archive/` 신규
- SI·Agent·Colleague active 수정
- go 노트에 `## 진행`/`## 메모` 다시 넣기
