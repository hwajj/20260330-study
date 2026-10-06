# Day 01 · HTTP 기초

> 학습 노트 SSOT. 체크리스트: [`active_fe.md`](../../log/_common/sessions/active_fe.md)  
> 이론 원문: `frontend-dev-notes/docs/curriculum/week-01-web-js/day-01-http-basics.md`

## 학습 할 일

(다음 `study-session-start`가 §4-A·커리큘럼에 맞춰 갱신)

## 진행

### 이론

(이관 대기 — curriculum-notes 통합)

### 회사

**이관 — 2026-09-28 (수, AsyncQueue)** (`sessions/archive/2026-09-28-W1-수.md`)

- 파일: `20_backoffice-shared/packages/service/src/HttpClientService/utils.ts` — `AsyncQueue`, `reissueTokenOn401Error`
- 할 일: enqueue → dequeue 흐름 종이 3단계, 큐가 막는 문제 / 헷갈리는 점

**이관 — 2026-09-29 (목, createGuardedInstance)** (`active_fe`·archive 목 placeholder)

- 같은 `utils.ts` L8–32 `createGuardedInstance` — 가드/인스턴스와 interceptor 체인

### 사고력

- 수: 기능개발 programmers 42586 — 종이 trace, `til/2026-09-28` `- PS:` 한 줄 (이관)
- 목: TIL `- PS:` 다듬기 (이번 주 trace 반영)

### 저녁

- 수: 401·큐 타임라인 종이 (`t | 요청 | 큐 | reissue? | 결과`)
- 목: axios/fetch 401 토이 — interceptor 순서 메모

## 메모

## 막힌 질문
