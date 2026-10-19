---
name: si-session-go
description: >-
  SI 단계를 start+통과선 충족+완료 wrap 한 번에. 트리거: si-session-go,
  /si-go, sgo, /sgo, si-gogo, /si-gogo. 반만 없음. 쭉/연속 시 다음 단계 연쇄.
---

# si-session-go

**한 방:** `si-session-start` + **§2 통과선까지 충족** + **완료** `si-session-wrap`.  
FE `study-session-go`(gogo) · Agent `ago`와 같은 역할 — SI는 **면접·구현 통과선** (개념 노트 + 필요 시 `src/labs/si/` 코드).

SSOT: `STUDY-PLAN-SI.md` (`CURRENT_STEP` 1~20).  
노트: `study/si/{NN}-{slug}.md` (`study/si/README.md`).  
실습: `src/labs/si/` (6단계 이후, 없으면 생성).  
**FE·Agent active 건드리지 않음.** Agent와 같은 날 **SI 또는 Agent 하나만**.

**항상 완료 가정** (반만·☐ 남기기 금지). 통과선 검증 후 §2 ☑ · `CURRENT_STEP`+1 · archive · active 다음 힌트.

## 트리거

`si-session-go` · `/si-go` · `sgo` · `/sgo` · `si-gogo` · `/si-gogo`

| 입력 | 동작 |
|------|------|
| 지정 없음 | `CURRENT_STEP` **1단계**만 완료 |
| 단계 N | 그 단계만 (플랜과 다르면 사용자 확인 후) |
| `쭉` / `연속` / `N단계` | `CURRENT_STEP`부터 **연속** 완료. 외부 지원·녹음·실계정 필수·실패 통과선이면 **그 단계에서 멈춤** |

## 1. 읽기 (필수 · 병렬)

| 대상 | 목적 |
|------|------|
| `STUDY-PLAN-SI.md` `CURRENT_STEP` · §2 해당 행 · §3 상세 · §4 | 할 일·통과선 |
| 기존 `study/si/{NN}-….md` | 진행 흡수·덮어쓰기 전 사용자 문장 보존 |
| `src/labs/si/` (있으면) · §3 참고 경로 | 이미 있는 코드·문서 |
| `active_si.md` | 세션 키 맞춤 |

## 2. 통과선 충족 (핵심)

§2 **이번 세션 할 일** + **통과선**을 노트·코드·명령으로 충족한다.

- 스킵·«나중에»·반만 금지.
- **개념·면접 단계**(1~5, 11~15 등): curl·한 줄 답·STAR·ER 스케치를 **노트에 실제 내용**으로 남긴다. 체크만 [x] 금지.
- **구현 단계**(6~10 등): `src/labs/si/`에 최소 코드·README. 통과선은 **실제로 확인** (curl / 기동 / compose). 실패면 wrap 하지 말고 고친다.
- **선택 단계**(17·18): 이미 앞 단계로 gap 없으면 **스킵 ☑** + gap 메모 3줄(또는 «스킵 사유»).
- **지원·외부**(16·19): 실제 지원 URL/계정이 없으면 연속 모드 **중단** + 채팅에 필요한 액션만 안내. 강제 날조 지원 금지.
- 플랜 «하지 않기»(Udemy 완강·평일 FE 뺏기·경력 과장) 준수.

## 3. 노트 쓰기

경로: `study/si/{NN}-{slug}.md` (`README` 표의 file-slug).

```markdown
# SI {NN} · {단계명}

> **go** · 플랜 단계 {step} · active: [`active_si.md`](../../log/_common/sessions/active_si.md)

## 학습 할 일

- [x] … (§2·통과선, **전부 [x]**)

## 진행

- 실행·확인 사실만 (경로·명령·결과 한 줄)

## 정리

### 한 줄
(이 단계 한 문장)

### 핵심
- 면접·다음 단계용 bullet 2~5개 (**왜 / 순서 / 차이**)

### 통과선 스크립트
(해당 시) 입으로 읽는 문장 3~10줄

## 메모

## 막힌 질문
```

`## 메모` / `## 막힌 질문`은 비우거나 `—`. go는 막힌을 남기지 않는 것이 기본.

## 4. 플랜·archive·active (완료 wrap과 동일)

날짜 = Asia/Seoul 캘린더일.

1. **§2** 해당 단계 ☐→☑ · **`CURRENT_STEP`** = 다음(20 완료 후 `done` 또는 `—`)
2. **§4** `마지막 SI 세션`: `YYYY-MM-DD | step {n} go | {단계명} 통과·archive, →{next}`
3. **archive** `study/si/archive/{YYYY-MM-DD}-step-{NN}.md` (같은 날 재-go면 덮어쓰기):
   - 제목 + **완료** + 노트 링크
   - `## active 체크` = 노트 `## 학습 할 일`
   - `## 진행` / `## 정리` = 노트 해당 섹션
   - `## wrap 요약` = 채팅 3줄 + 다음 step 한 줄
4. **`active_si.md`**: **연속 sgo 중에는 생략 OK** (SSOT는 플랜 `CURRENT_STEP`·노트). 세션 끝·다른 PC 이관 시에만 다음 단계 한 줄 갱신. 20 끝나면 «SI 트랙 완료» · §4 `20단계 완료` ☑.
5. **`log/_common/sessions/archive/` 사용 안 함**

연속 모드: 위 1~4를 단계마다 반복. 한 채팅 응답에 여러 단계 OK — 단계마다 통과선 확인 후 다음으로.

## 5. 채팅 (짧게)

파일 쓴 뒤 (연속이면 단계마다 1블록 또는 마지막에 목록):

1. **노트 경로** + «sgo 완료 · step N»
2. **한 줄** — 이 단계 핵심
3. **다음** — next step · 통과선 한 줄  
연속 중단 시: 멈춘 step + 이유(지원 필요/실패)만.

노트 본문 전체 복붙 금지. 막힌·장문 진행 보고 금지.

## 6. 하지 않기

- start만 / wrap만 하고 통과선 미달로 ☑
- 원문·플랜 안 읽고 체크만 [x]
- FE 8W / Agent 플랜·active 수정
- `sessions/archive/` 신규
- 지원·이력서 사실 날조
- go인데 ☐로 남기기
