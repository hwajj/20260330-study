# Day 80 · STAR — **완료**

SSOT 노트: [../80-day-80-star-answers.md](../80-day-80-star-answers.md)

## active 체크

- [x] STAR — Situation · Task · Action · Result 구조
- [x] Day 75~79 재료를 **질문 유형별** 3~5개로 압축
- [x] Result — 숫자·관측·Before/After·정성 1줄
- [x] Action — “우리”가 아닌 **본인 기여** 동사
- [x] 30초 / 2분 / 5분 버전 길이 조절
- [x] adjuster **인가 STAR**(Day 36)와 career STAR 합치기
- [x] 약점·실패·갈등 질문 — 학습 Result
- [x] **통과선** — 대표 STAR 2분 1개 + 30초 2개

## 정리

### 한 줄

STAR는 경험을 **맥띉(S)·과제(T)·내 행동(A)·검증 가능 결과(R)** 로 재단해, Week 15 회고·장애·성능·협업 재료를 면접 **2분 스크립트**로 통합한다.

### 핵심

- **S (10~15초)**: 팀·서비스·제약(일정·레거시). “2024 Q2 adjuster 승인 플로우”처럼 **구체**.
- **T (10초)**: 내 책임 — “무권한 진입 차단 + 상태 전이 일관” / “LCP p75 3s→2s” / “배포 후 TypeError 0”.
- **A (60~90초)**: **3~5 동사** — 설계·구현·리뷰·조율·측정. 기술 이름 1~2개만(loader+QueryCache, URL SSOT, Sentry+sourcemap).
- **R (15~20초)**: 숫자 우선 — p75, 에러 건수, CS 티켓, 릴리즈 MTTR, 퍼널 완료율. 없으면 **관측·QA·포스트모템 action** 2개.
- **질문 매핑**:
  - 아키텍처/회고 → Day 75~76 (경계·결정)
  - 장애/압박 → Day 77
  - 성능 → Day 78
  - 협업/갈등 → Day 79
  - 인가/보안 → Day 36 STAR 재사용
- **함정**: S 너무 김 · A에 팀 전체 나열 · R 없음 · 패턴· buzzword만.
- **FULL 통과**: Curr Week 15 마지막 — **대표 3 STAR**를 입으로 2분씩, flashcard처럼 반복.

### 흐름

```
Week 15 재료 목록
  → 질문 유형별 1 STAR씩 (최소 3)
  → 각 STAR: 30s / 2m 타이머 연습
  → Result 숫자 보강 (RUM/Sentry/GA4)
  → 약점 질문: "그때 부족했던 점 + 이후 습관"으로 R
  → resume bullet ↔ STAR 1:1 대응표 (머릿속)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| STAR vs 회고 글 | 말하기 길이·Result |
| 2분 vs 5분 | 깊이 vs 질문 follow-up |
| Action vs 기술 나열 | 행동 vs 스택 리스트 |
| Result vs 과장 | p75·건수 vs “많이 개선” |
| 성공 vs 실패 STAR | R = 학습·프로세스도 OK |
| 하나 vs 여러 STAR | 같은 프로젝트 다른 T |

### 실무 연결

- **Day 36 adjuster STAR** — S: 다역할·승인대기 / T: 무권한 차단 / A: path+loader+QueryCache / R: 구조로 증명 (정량 없을 때).
- **GA4 regist 이벤트** — T: 퍼널 blind / A: step_view·nav·abandon / R: Looker 단계별 이탈 가시화.
- resume·`flashcard B6`와 **같은 문장**으로 맞추면 암기 부담↓.

### 면접 한 방

- **Q:** 가장 자신 있는 프로젝트를 STAR로 2분 말해 달라.
- **답:** (템플릿) S — 서비스·팀·레거시. T — 내 OKR 1줄. A — 설계 결정 2·구현 2·협업 1. R — p75/에러/퍼널/CS 중 1 숫자 + 재발 방지 1. Follow-up 대비로 **트레이드오프** 한 줄 예비.

### 통과선 스크립트

1. STAR 각 파트 시간 비율.
2. 대표 3주제: 회고·장애·성능(또는 협업·인가).
3. Action은 본인 동사 3~5개.
4. Result 숫자 또는 검증 1개 필수.
5. 30초 버전 = S+T / A 한 줄 / R 한 줄.
6. 실패 질문 = R에 학습.
7. resume bullet과 1:1.
8. **Curr FULL** — Week 15 완료, 통과선 입으로 1회.

## wrap 요약

- go 정리본: `study/fe/80-day-80-star-answers.md` 완료.
- 핵심: Week15 재료 STAR 2분 통합.
- 다음 start/go: `FULL 완료` · 노트는 다음 go에서 생성.
- 막힌: —
