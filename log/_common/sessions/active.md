# W1 수 — 2026-09-28 (KST)

> 다른 PC: 이 repo pull → 이 파일 편집 → commit/push

오늘 4블록: **이론 · 회사 · 사고력(종이) · 저녁 90m**

## 실행 체크리스트

### 이론 — HTTP 기초 (회사 60~90m)
- [ ] **열기:** `frontend-dev-notes/docs/curriculum/week-01-web-js/day-01-http-basics.md` (없으면 `CURRICULUM-FULL-TRACK.md` 링크로 경로 확인)
- [ ] **읽기:** 문서 **전체 1회** (표·코드 블록 포함)
- [ ] **남기기:** `log/_common/curriculum-notes/day-01-http-basics.md` — 나만의 말로 **3줄** (정의 / 다른 개념과 차이 / FE·회사 연결)
- [ ] **면접:** `frontend-dev-notes/docs/interview/index.md`에서 HTTP 관련 질문 1개 → **30초+** 소리 내 답 → 같은 노트에 `면접 Q:` / `내 답 요지:` 각 1줄

### 회사 — AsyncQueue 리딩 (20~40m, 수정 X)
- [ ] **열기:** `20_backoffice-shared/packages/service/src/HttpClientService/utils.ts`
- [ ] **범위:** `AsyncQueue` + `reissueTokenOn401Error` (**50~80줄** 또는 함수 전체)
- [ ] **할 일:** `AsyncQueue` **주석·메서드**만 읽고, enqueue 후 dequeue 순서를 종이에 **3스텝** 적기
- [ ] **남기기:** `## 메모` — (1) 큐가 막는 문제 1문장 (2) 헷갈리는 점 1개

### 사고력 — 종이 trace (회사 20~30m, 코드·IDE X)
- [ ] **문제:** 기능개발 — https://school.programmers.co.kr/learn/courses/30/lessons/42586 (월에 안 골랐으면 이걸 메인으로)
- [ ] **3m** 입·출·제약을 종이 상단 **한 문장**
- [ ] **10m** `progresses=[93,30,55]`, `speeds=[1,1,1]` 로 `step | progresses | deploy일 | 스택` trace
- [ ] **10m** invariant **한 줄** (본인 문장; «스택 top 진행도…» 힌트는 참고만)
- [ ] **5m** 엣지 3개 말로만 (빈 배열·길이 1·전부 동시 완료)
- [ ] **남기기:** `docs/notes/2026-09-28_ps-feature-dev.md` — PS-TRACK §1 복기 카드 5줄 초안

### 저녁 90m — 401 큐 타임라인 (AI OFF)
- [ ] **준비:** 타이머 90m, AI·챗 끄기
- [ ] **할 일:** 요청 **A, B, C** 동시 → **401** → token **reissue 1회** 가정 타임라인
- [ ] **산출물:** 종이 1장 — 열 `t | 요청 | 큐 | reissue? | 결과` 채우기 → **2분** 말로 설명 (녹음 선택)
- [ ] **끝:** `## 진행`에 완료 시각·설명 가능/불가 한 줄

## 이번 주 한 줄
event loop·Promise 말로 설명 / 401 동시 요청 큐 그림

## 참고
- 막힌 질문: —
- 플랜: W1 · 커서 `수` → 오늘 **수**

## 진행
(완료한 칸은 `[x]`로 바꾸고 한 줄 메모)

## 메모

## 막힌 질문
