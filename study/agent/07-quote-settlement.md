# Agent 07 · quote_settlement

> **go** · 플랜 단계 7 · active: [`active_agent.md`](../../log/_common/sessions/active_agent.md)

## 학습 할 일

- [x] 행별 lineTotal = qty × unitPrice (서버)
- [x] subtotal / total
- [x] mock 루프: resolve 후 ambiguous 없으면 quote 호출
- [x] **통과선:** `무2개 고춧가루 1통` → total 10900

## 진행

- `execute` quote_settlement · chat 트레이스에 합계

## 정리

### 한 줄
합계는 서버 산술만 — LLM 숫자와 달라도 도구 결과만 신뢰.

### 핵심
- unitPrice는 resolve가 카탈로그에서 채운 값

## 메모

## 막힌 질문
