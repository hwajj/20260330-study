---
name: study-session-wrap
description: >-
  Ends a study session: summarizes user notes, updates STUDY-PLAN-8W.md (§4-B check,
  CURRENT_DAY/WEEK, §10), optional log/_common/sessions file. Use when the user says
  study-session-wrap, 공부 마무리, 오늘 공부 정리, 세션 wrap, or pastes session memos after studying.
---

# study-session-wrap

SSOT: `STUDY-PLAN-8W.md`. 짝: **study-session-start** (start=읽기, wrap=쓰기).

## 1. 입력

사용자 메시지에서:

- **세션 메모** (손코딩 결과, 막힌 점) — 없으면 짧게 질문 후 진행
- **완료한 요일** — 없으면 상단 `CURRENT_DAY` = 이번에 **끝낸** 요일
- **Week** — 없으면 `CURRENT_WEEK`

**☑ 조건:** 사용자가 wrap을 요청했으면 해당 요일 **완료**로 간주. "반만 함"이면 §4-B는 ☐ 유지하고 요약만 출력.

## 2. 정리 출력 (채팅)

먼저 아래를 생성해 보여준 뒤 파일을 수정한다.

1. **오늘 3줄 요약**
2. **막힌 질문 1개** → 답 2~4줄 + Why 1줄 (메모에 없으면 §10에 `—` 또는 사용자가 채우도록 안내)
3. **내일 힌트** — 다음 `study-session-start` 때 열 파일 1줄 (§4-A 다음 요일 행에서)

## 3. STUDY-PLAN-8W.md 수정 (완료 시)

`week` / `day` 세션을 **완료**로 처리할 때만:

### 3-A. §4-B

`| **{week}** | … |` 행에서 `{day}` 열 **☐ → ☑**.

### 3-B. 커서 (상단)

요일 순서: `월 → 화 → 수 → 목 → 금 → 토 → 일`.

| 끝낸 day | `CURRENT_DAY` | `CURRENT_WEEK` |
|----------|---------------|----------------|
| 월~토 | 다음 요일 | 유지 |
| 일 | `월` | +1 (8 초과면 8 유지, 사용자에게 8주 종료 안내) |

백틱 값 형식 유지: **`CURRENT_WEEK`:** `2` , **`CURRENT_DAY`:** `화`

### 3-C. §10

- **`마지막 세션`:** `YYYY-MM-DD | W{week} | {day}` (오늘 날짜 KST 추정 가능하면 사용)
- **`막힌 질문`:** 이번 세션에서 **다음 저녁/회사로 넘길** 질문 1줄로 **덮어쓰기** (없으면 `—`)
- **Week `{week}` 메모 열:** 3줄 요약을 **한 줄**로 append 또는 짧게 교체 (너무 길면 `log/`에만 상세)
- **TIL (선택):** 같은 날 `log/_common/til/YYYY-MM-DD.md` 맨 아래에 wrap 요약 1~3줄 붙이기

### 3-D. 주 완료

§4-B 해당 **week** 행 7칸 전부 ☑이면:

- §10 그 Week **완료** 열 ☐ → ☑
- 사용자에게 **금요 통과** (§4-A 해당 주) 리마인드 — 달성 여부는 사용자 확인

다음 주 첫 일(`CURRENT_WEEK` +1) 시 §10 다음 Week **시작일**이 비어 있으면 오늘 날짜로 채운다.

## 4. 세션 로그 파일

**start 짝:** `log/_common/sessions/active_fe.md`가 있으면 `## 진행`·`## 메모`를 아래 아카이브에 반영한 뒤, 완료 시 `active_fe.md`는 비우거나 «완료» 한 줄만 남긴다.

**아카이브 (선택, 메모 있을 때):** `log/_common/sessions/YYYY-MM-DD-W{week}-{day}.md`

```markdown
# W{week} {day} — {title one line}

## 3줄 요약
- …

## 손코딩 / 회사
…

## 막힌 질문 → 다음
…
```

`log/_common/sessions/` 없으면 생성.

## 5. 하지 않기

- 손코딩 **정답 코드** 장문 작성
- 사용자가 "체크하지 마" / "반만"이라고 한데 §4-B ☑
- wrap 없이 `CURRENT_WEEK` 임의 변경

## 6. 트리거 예

```text
study-session-wrap

메모:
- setTimeout vs microtask 순서: …
- Jwt refresh 타이밍 헷갈림
```

→ W1 월 ☑, `CURRENT_DAY`=화, §10·세션 md 갱신, 채팅에 요약.
