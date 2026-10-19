# Agent 06 · resolve_products

> **go** · 플랜 단계 6 · active: [`active_agent.md`](../../log/_common/sessions/active_agent.md)

## 학습 할 일

- [x] 동의어 exact + contains → matched / ambiguous
- [x] 환각 SKU 없음 (카탈로그만)
- [x] `고추` → PEPPER + PEPPER_POWDER candidates
- [x] **통과선:** candidates로 챗 확인 유도

## 진행

- `catalog.ts` resolveLines · tool `resolve_products` · mock 루프가 ambiguous면 질문 문구

## 정리

### 한 줄
SKU는 카탈로그 매칭만 — 애매하면 candidates, LLM 단독 결정 없음.

### 핵심
- exact + 다른 품명 contains → ambiguous

## 메모

## 막힌 질문
