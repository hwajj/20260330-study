# Agent 05 · parse_line_items

> **go** · 플랜 단계 5 · active: [`active_agent.md`](../../log/_common/sessions/active_agent.md)

## 학습 할 일

- [x] 규칙 파서: `무2 고추2`, `무2개 고춧가루 1통`
- [x] 단위는 허용 목록만 (개·통…) — 품명을 unit으로 먹지 않음
- [x] 트레이스에 parse 결과 기록 (`/chat` trace)
- [x] **통과선:** `{ raw, qty, unit? }[]`

## 진행

- `server/tools/parseLineItems.ts` · execute 연결

## 정리

### 한 줄
파싱은 구조만 — SKU·단가는 다음 도구.

### 핵심
- 단위 토큰 allowlist로 `무2 고추2`를 두 줄로 분리

## 메모

## 막힌 질문
