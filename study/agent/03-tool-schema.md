# Agent 03 · Tool 스키마

> **go** · 플랜 단계 3 · active: [`active_agent.md`](../../log/_common/sessions/active_agent.md)

## 학습 할 일

- [x] Zod 스키마 4개 (`parse` / `resolve` / `quote` / `excel`)
- [x] `executeTool` — **서버에서만** 실행 · allowlist
- [x] `POST /tools/:name` — 잘못된 인자 400
- [x] **통과선:** 빈 body → `invalid arguments` 거절

## 진행

- `server/tools/schemas.ts` · `execute.ts` · `POST /tools/:name` · `GET /tools`
- curl: `{}` → 400 · `{"text":"무2 고추2"}` → ok(stub) · resolve/quote는 서버 로직 연결

## 정리

### 한 줄
도구 인자는 Zod로 서버에서만 검증·실행하고, 미등록 도구와 잘못된 args는 거절한다.

### 핵심
- Function calling 이름을 allowlist로 고정 (가드레일 11단계 예고).
- parse는 단계 5 스텁, resolve/quote는 이미 서버 계산 가능.

## 메모

## 막힌 질문
