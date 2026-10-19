# 주문·정산 챗 Agent — 아키텍처

> DAY1 목차. 구현은 2단계~. 입력·도구 스펙은 [`STUDY-PLAN-AGENT.md`](../../../STUDY-PLAN-AGENT.md) §0·§3과 동일.

## 한 줄

거래처가 채팅으로 주문 문장을 내면 **품목·수량을 구조화**하고, **단가표 API**로 금액을 맞춘 뒤, **확인 한 번** 후 **정산 엑셀**을 생성·전달한다.  
**LLM은 파싱·대화, 금액·품목·파일은 서버.**

## 구성요소

```text
[web] 채팅 UI · 확인 카드 · Trace 사이드바 · 엑셀 다운로드
   │
   ▼
[server] Agent 루프 (OpenAI 호환) + Tool 실행 (서버 전용)
   │
   ├─ catalog.json  (SKU 정본)
   ├─ quote 계산    (단가·합계 — API만)
   └─ SheetJS       (.xlsx 생성 — 서버만)
```

## §0 입력 통과선 (스펙 고정)

| 규칙 | 내용 |
|------|------|
| 여러 품목 | `무2 고추2`, `무2개 고춧가루 1통` (띄어쓰기·단위 혼합) |
| 단위 없음 | 카탈로그 **defaultUnit** + 확인 요약에 **명시** |
| SKU 애매 | `고추` vs `고춧가루` → **질문 후** 진행; LLM이 단가·SKU **단독 결정 금지** |

## 도구 4개 (시그니처)

```
parse_line_items({ text })
  → { lines: { raw, qty, unit? }[] }

resolve_products({ lines[] })
  → { items: { sku, name, qty, unit, unitPrice }[],
      ambiguous?: { raw, candidates[] }[] }

quote_settlement({ items[] })
  → { rows[], subtotal, tax?, total }

generate_settlement_excel({ quoteId | rows[] })
  → { fileId, downloadUrl }
```

확인: 클라이언트 «확인» 또는 `POST /sessions/:id/confirm-quote` — **이후에만** `generate_settlement_excel`.

## 포폴 5가지 → 구현 위치

| # | 항목 | 어디에 |
|---|------|--------|
| 1 | Tool / function calling | server Agent 루프 + 도구 스키마 (단계 3~9) |
| 2 | Human-in-the-loop | web 확인 카드 + confirm API (단계 8) |
| 3 | Trace 패널 | web 사이드바 — step/tool/args/result (단계 10) |
| 4 | 가드레일 | allowlist · 단가 API만 · SAFETY.md (단계 11) |
| 5 | Eval | 골든 5문장 (`무2 고추2` 필수) (단계 12) |

## HITL

엑셀 생성 전 **요약·합계 확인** («이대로 정산서 만들까요?»). 확인 없이 파일 생성 **금지**.

## Trace

턴마다: step, tool name, args 요약, result 요약 (파싱 결과 · 매칭 SKU · 합계).

## Eval (목차)

골든 문장 표 + 기대 도구 순서 + 기대 시트 행 수 — 단계 12에서 채움.

## API 스케치 (DAY1)

| Method | Path | 역할 |
|--------|------|------|
| GET | `/health` | 기동 확인 |
| GET | `/catalog` | 카탈로그 (단계 2) |
| POST | `/catalog/resolve` | SKU resolve mock (단계 2) |
| POST | `/chat` | Agent 루프 (단계 4~) |
| POST | `/sessions/:id/confirm-quote` | HITL 확인 (단계 8) |
| GET | `/files/:fileId` | 엑셀 다운로드 (단계 9) |
