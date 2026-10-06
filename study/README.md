# study — 학습 트랙 노트

`STUDY-PLAN-*.md`와 같은 **커리큘럼·누적 학습** 영역.  
`log/`는 면접·일지·이력 등 **프로젝트 이력** — 학습 노트와 섞지 않음.

| 트랙 | 노트 (`study/…`) | active (체크만) |
|------|------------------|-----------------|
| FE 8W + 커리큘럼 Day | [`fe/`](./fe/) | `log/_common/sessions/active_fe.md` |
| SI | [`si/`](./si/) | `active_si.md` |
| Agent 포폴 | [`agent/`](./agent/) | `active_agent.md` |
| IT 훑기 | [`tech-survey/`](./tech-survey/) | *(없음 — 항목 md만)* |
| 동료 커밋 | [`colleague/`](./colleague/) | `active_colleague_commit_study.md` |

**패턴 (전 트랙 공통):**

- **번호** = 플랜·커리큘럼 **고정 순번** (공부 안 한 날에 번호가 당겨지지 않음).
- **파일명** = `{번호}-{slug}.md` (week·요일·회차 없음).
- start → 노트 **`## 학습 할 일`** 갱신 · **`## 진행`은 유지** (FE/SI/Agent/Colleague는 active 체크 미러).
- wrap → **`## 진행` 정리** · 완료 시 `study/*/archive/` · IT 훑기는 항목 md만 (active 없음).
