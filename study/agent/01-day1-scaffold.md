# Agent 01 · DAY1 — 스펙·레포 기동

> **go** · 플랜 단계 1 · active: [`active_agent.md`](../../log/_common/sessions/active_agent.md)

## 학습 할 일

- [x] `src/labs/agent/ARCHITECTURE.md` — 도구 4개 시그니처 · §0 입력 통과선 · HITL · 트레이스 · eval 목차
- [x] `server/` — `GET /health`
- [x] `web/` — Vite+React 채팅 레이아웃 (LLM 미연결)
- [x] `.env.example` + README `pnpm dev` 한 줄
- [x] **통과선:** `pnpm dev` — health + 빈 채팅

## 진행

- `src/labs/agent/` 스캐폴드 · health `{"ok":true}` · UI `:5173` 200
- Node 20 → `pnpm@9.15.0` (corepack)

## 정리

### 한 줄
주문·정산 Agent 레포를 `server/`+`web/`로 쪼개 기동하고, 스펙은 `ARCHITECTURE.md`에 목차로 고정했다.

### 핵심
- LLM 연결 전에 health·빈 채팅으로 데모 뼈대를 먼저 둔다.
- 도구 4·HITL·트레이스·eval 위치를 1단계에서 문서만 박아 둔다.

## 메모

## 막힌 질문
