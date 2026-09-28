---
name: si-session-wrap
description: >-
  Ends an SI study session: summarizes notes, updates STUDY-PLAN-SI.md (§2 step
  check, CURRENT_STEP, §4). Use when the user says si-session-wrap, SI 공부 마무리,
  SI wrap, or pastes SI session memos after weekend study.
---

# si-session-wrap

SSOT: `STUDY-PLAN-SI.md`. 짝: **si-session-start** (start=읽기, wrap=쓰기).

## 1. 입력

사용자 메시지에서:

- **세션 메모** — 없으면 짧게 질문 후 진행
- **완료한 단계** — 없으면 `CURRENT_STEP` = 이번에 **끝낸** 단계 번호
- «반만 함» / «체크하지 마» → §2 ☑ **유지**, 요약만 출력

**☑ 조건:** wrap 요청 + 사용자가 통과선 **대략 달성** (또는 명시적 완료). 애매하면 채팅에서 확인.

## 2. 정리 출력 (채팅)

파일 수정 **전**에:

1. **오늘 3줄 요약**
2. **막힌 질문 1개** → 답 2~4줄 (없으면 §4 `—` 유지 안내)
3. **다음 세션** — `step+1` 단계명 + 통과선 한 줄 (§2에서)

## 3. STUDY-PLAN-SI.md 수정 (완료 시)

`step`을 **완료**로 처리할 때만:

### 3-A. §2 체크표

`| **{step}** | ☐ |` → `| **{step}** | ☑ |` (해당 번호 행만).

### 3-B. `CURRENT_STEP` (상단)

- 완료한 `step`이 `CURRENT_STEP`과 같거나 작으면: **`CURRENT_STEP` = step + 1** (20 초과 시 `20` 유지 + «전 단계 완료·지원 반복» 안내).

### 3-C. §4 진행 기록

- **`마지막 SI 세션`:** `YYYY-MM-DD | 단계 {step} | {단계명 한 줄}`
- **`막힌 질문 (다음 세션)`:** 이번에 넘길 질문 1줄로 **덮어쓰기** (없으면 `—`)
- **지원·면접 로그:** 16·19 단계에서 사용자가 적은 내용이 있으면 **append** 한 줄
- §2 **1~20 전부 ☑** → **20단계 완료** ☐ → ☑, 완료일 오늘

### 3-D. 트랙 시작일

§4 **트랙 시작일**이 비어 있고 `step === 1` 완료 시 → 오늘 날짜.

## 4. `active_si.md` (start 짝)

`log/_common/sessions/active_si.md`가 있고 이번 wrap의 **단계 {step}** 세션이면:

1. 채팅 **3줄 요약**·막힌 질문을 `## 메모` / `## 막힌 질문`에 반영했다고 가정하거나, wrap 입력 메모를 병합
2. **완료 시:** 전체 또는 요약+메모를 `log/_common/sessions/archive/{YYYY-MM-DD}-SI-step-{step}.md`로 저장 (`archive/` 없으면 생성)
3. `active_si.md`는 비우거나 `# SI 단계 {step} 완료` 한 줄만

«반만»·§2 ☐ 유지 시: archive는 선택, **active_si는 그대로** 두고 요약만 채팅.

## 5. 세션 로그 (선택)

§4 archive와 **같은 파일**을 쓰면 중복 저장하지 않음. 메모만 길 때 위 archive에 `## 3줄 요약`·`## 작업` 추가.

## 6. 하지 않기

- 미니 프로젝트 **전체 코드** 장문 작성
- 사용자가 «반만»인데 §2 ☑
- `STUDY-PLAN-8W.md` 수정 (FE wrap은 **study-session-wrap**)

## 7. 트리거 예

```text
si-session-wrap

메모:
- Java 1년 프로젝트 API 담당: 주문 조회 REST
- 배포는 WAR/Tomcat이었는지 헷갈림
```

→ 단계 1 ☑, `CURRENT_STEP`=2, §4·선택 세션 md 갱신.
