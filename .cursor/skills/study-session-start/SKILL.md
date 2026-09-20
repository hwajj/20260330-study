---
name: study-session-start
description: >-
  Reads STUDY-PLAN-8W.md (CURRENT_WEEK, CURRENT_DAY, §4-B, §4-A, §3) and
  CURRICULUM-BRIDGE-8W.md for the week's reading list. Outputs today's study
  checklist in order. Use when the user says study-session-start, 공부 시작,
  오늘 뭐 공부, 8주 플랜 시작, or @STUDY-PLAN-8W.md session start.
---

# study-session-start

SSOT: `STUDY-PLAN-8W.md` (repo root `20260330-study`).

## 1. 파일 읽기

`STUDY-PLAN-8W.md`에서 다음을 읽는다.

- 상단 **`CURRENT_WEEK`**, **`CURRENT_DAY`**
- **§4-B** — 해당 주(W) 행의 ☐/☑
- **§4-A** — `### Week {N}` 블록 (주 목표, 금요 통과, 요일 표, 「주말:」 줄)
- **§3** — 회사 구간 (커리큘럼·리딩)
- **§2** — 저녁 타임블록·AI 규칙 (요약용)
- **§10** — `막힌 질문`, `마지막 세션` (있으면 답변에 반영)

`CURRICULUM-BRIDGE-8W.md`에서 **`CURRENT_WEEK`와 같은 Week** 「먼저 읽기」 목록을 읽는다 (주차 맥락용, 하루에 전부 할 필요 없음).

## 2. 오늘 요일 결정 (순서)

1. 사용자 메시지에 **Week / 요일**이 있으면 그 요일 사용 (주는 명시 Week, 없으면 `CURRENT_WEEK`).
2. 아니면 `week = CURRENT_WEEK`, `day = CURRENT_DAY`.
3. §4-B에서 `week` 행의 `day`가 이미 ☑이면, **월→화→…→일** 순으로 **첫 ☐**를 `day`로.
4. 해당 주 행이 전부 ☑이면: 주 완료 안내 + §10 완료 ☑ 제안 + `CURRENT_WEEK`+1·`CURRENT_DAY`=월 제안. **§4-A 내용은 출력하지 않고** 여기서 멈춘다.

## 3. §4-A에서 과제 추출

`### Week {week}` 섹션만 파싱한다.

| day | 소스 |
|-----|------|
| 월~금 | 해당 **요일 행**: 회사 (추가), 저녁 90m, 열 파일 |
| 토·일 | **「주말:」** 한 줄 + §1 주말 예산; §4-A 평일 표 행 없음 |

같은 블록의 **주 목표**, **금요 통과**는 컨텍스트로 1~2줄만 인용한다.

## 4. 회사 구간 합치기 (월~금)

- §3: 해당 주 **CURRICULUM-BRIDGE** 읽기 (진행 중이면 다음 Day 1개 정도)
- §4-A **회사 (추가)** + **열 파일** (50~80줄 리딩)

## 5. 출력 형식 (고정)

아래 순서로 **한국어**, 장문 강의 금지.

```markdown
## 오늘 학습 — Week {week} · {day} ({YYYY-MM-DD는 알면})

**커서:** CURRENT_WEEK={…}, CURRENT_DAY={…} → **실행 요일: {day}** (§4-B: {☐|☑})

### 주간 맥락
- 주 목표: …
- 금요 통과 (참고): …
- 커리큘럼 (이번 주): CURRICULUM-BRIDGE Week {week} — (문서 제목만 bullet)

### 회사 (2~3h)
1. [커리큘럼] …
2. [§4-A 추가] …
- 열 파일: `…`

### 저녁 (§2 템플릿)
- 19:15–19:45: …
- 19:45–21:15 **AI OFF:** …
- 21:30–22:30: log / 메모
- 22:30–23:00: 내일 열 파일 1줄

### AI 사용
- 손코딩 90m: AI 금지
- 그 외: 리딩·피드백·힌트 1개 OK

### §10 막힌 질문
- (비어 있으면 "없음")

### 세션 후 (수동 또는 study-session-wrap)
- §4-B Week {week} `{day}` → ☑
- `CURRENT_DAY` → 다음 요일 (일→다음 주 월 + WEEK+1)
- §10 `마지막 세션` 갱신
```

**토·일:** 회사/저녁 블록을 §1·「주말:」에 맞게 짧게.

## 6. 하지 않기

- 손코딩 과제 **전체 정답 코드** 제시 (사용자가 AI OFF 전 **뼈대/통과 기준만** 요청할 때만 예외)
- §4-B / 커서를 **사용자 확인 없이** 파일에 쓰지 않음 (start는 **읽기 + 제시**만; 체크는 wrap·사용자 요청 시)
- `CURRENT_WEEK`와 다른 주의 §4-A를 섞지 않음

## 7. 예시 트리거

User: `study-session-start`  
→ Week 1, `CURRENT_DAY`=월, §4-B W1 월 ☐ → §4-A 월 행 + 브릿지 Week 1 목록 출력.

User: `study-session-start — 수요일 건너뛰고 목요일`  
→ day=목, §4-B는 갱신하지 않음 (명시 요청 시에만).
