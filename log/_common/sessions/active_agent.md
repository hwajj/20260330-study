# Agent — 단계 1 · DAY1 — 스펙·레포 기동 — 2026-09-28 (KST)

다른 PC에서 이어할 때: repo를 pull한 뒤 이 파일을 엽니다.

권장 2~4h · 단계 1개 · SI와 같은 날 겹치지 않기

## 실행 체크리스트

- [ ] `src/labs/agent/ARCHITECTURE.md` — 한 줄·**도구 4개** 시그니처(§3)·§0 **입력 통과선**·HITL·트레이스·골든 eval **구현 단계 목차** (코드는 2단계~)
- [ ] `src/labs/agent/server/` — Express(또는 동일) + `GET /health` 또는 `/api/ping`
- [ ] `src/labs/agent/web/` — Vite+React **채팅 레이아웃** (메시지 목록·입력만, LLM은 4단계~)
- [ ] `.env.example` — `OPENAI_API_KEY` 등 placeholder + README에 `pnpm dev` 한 줄
- [ ] **통과선:** 루트에서 `pnpm dev`(또는 문서 명령) → ping/health OK + 브라우저 **빈 채팅** 보임

## 한 줄 목표

DAY1부터 **주문·정산 챗 Agent** 레포를 켜고, 스펙 문서와 빈 데모 화면까지 만든다.

## 참고

- 막힌 질문: —
- 포폴 한 줄: 채팅 주문 → 카탈로그로 금액 → 확인 후 정산 엑셀 (`무2 고추2` 통과선)
- `CURRENT_STEP` → 오늘 실행 **단계 1** (☐)

## 진행

완료한 항목은 [x]로 바꾸고 한 줄 메모

## 메모

- 레포 위치·Git push 정리: [`agent-repo-decision.md`](../agent-repo-decision.md) — **다음:** GitHub 목표 1/2/3 선택 후 스캐폴드·remote 스펙

## 막힌 질문
