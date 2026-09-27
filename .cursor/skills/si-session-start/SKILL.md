---
name: si-session-start
description: >-
  Reads STUDY-PLAN-SI.md (CURRENT_STEP, §2 numbered checklist). Outputs this
  weekend SI step checklist in plain Korean. Use when the user says si-session-start,
  SI 공부 시작, SI 트랙 시작, or @STUDY-PLAN-SI.md session start.
---

# si-session-start

SSOT: `STUDY-PLAN-SI.md` (repo root `20260330-study`).  
평일 FE 플랜: [`STUDY-PLAN-8W.md`](../../STUDY-PLAN-8W.md) — **SI 세션에서는 저녁 90m 손코딩을 배정하지 않는다.**

## 0. 말투 (필수)

- **먼저** 쉬운 말로 «이번 주말/오늘 SI에서 할 것» 3~5줄.
- **단계 번호**와 **통과선**은 짧게.
- `CURRENT_STEP`은 응답 **맨 아래 한 줄** («SI 커서»).

| 하기 | 하지 않기 |
|------|-----------|
| «지금 N단계: …» 한 가지에 집중 | 1~20 단계 목록 벽돌 |
| 8W 플랜과 **시간 충돌** 있으면 SI는 주말만 | 평일 저녁에 Spring 구현 과제 넣기 |
| 통과선을 **체크 가능한 문장**으로 | Chad Darby 전체 수강 권유 |

## 1. 파일 읽기

`STUDY-PLAN-SI.md`에서:

- 상단 **`CURRENT_STEP`**
- **§2** — 해당 번호 행: 단계명, 이번 세션 할 일, 통과선
- **§3** — 같은 번호가 있으면 **상세 힌트** (있을 때만)
- **§4** — `막힌 질문`, `마지막 SI 세션` (있으면 반영)
- **§0** — 목표·하지 않기 (요약 1줄)

## 2. 오늘 단계 결정 (순서)

1. 사용자가 **단계 N** 또는 «N단계만»을 명시하면 `step = N`.
2. 아니면 `step = CURRENT_STEP`.
3. §2에서 `step` 행이 이미 ☑이면, **번호 오름차순 첫 ☐**를 `step`으로 (1~20).
4. 1~20 전부 ☑이면: §4 **20단계 완료** 안내 + 16·19 **반복 지원** 제안. 새 과제 출력하지 않음.

## 3. 출력 형식 (고정)

**한국어.**

```markdown
## SI 세션 — 단계 {step} · {단계명}

### 오늘 할 일 (주말·여유 시간)

1. …
2. …
3. (필요 시) 참고: §3 상세 한 줄

### 통과선 (끝내면 wrap)

- …

### 시간 가이드

- 권장: 2~4h / 이번 **단계 1개**만
- 평일 FE: [`STUDY-PLAN-8W.md`](./STUDY-PLAN-8W.md) 유지 — 오늘 SI는 **겹치지 않게**

### 열어볼 것 (있을 때)

- 경로 — 이유 5단어

### 막힌 질문 (이전)

- … 또는 없음

### 끝나면

`si-session-wrap` + 메모 → 단계 {step} ☑, `CURRENT_STEP` → {step+1}

---

**SI 커서:** 다음 단계 **`{CURRENT_STEP}`** → 이번 실행 **단계 {step}** (체크: {☐|☑})
```

**단계 6~10 (구현):** 미니 프로젝트 폴더 `src/labs/si/` 없으면 «6단계에서 생성» 한 줄.

**단계 16·19:** 지원·수정만 — 코드 과제 없음.

## 4. 하지 않기

- Spring **전체 정답 구현**을 한 번에 제시 (사용자가 뼈대 요청할 때만 예외)
- §2 / `CURRENT_STEP`을 **start에서 파일에 쓰지 않음** (wrap·사용자 요청 시만)
- `STUDY-PLAN-8W.md`의 §4-A 요일표를 SI 세션에 섞지 않음

## 5. 트리거 예

User: `si-session-start`  
→ CURRENT_STEP=1: 이력서 Java 1년 블록, 통과선 2분 말하기.

User: `si-session-start — 8만`  
→ step=8, 체크표는 갱신하지 않음.
