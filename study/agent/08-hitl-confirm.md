# Agent 08 · HITL 확인

> **go** · 단계 8

## 학습 할 일

- [x] 확인 카드 UI · `POST /sessions/:id/confirm-quote`
- [x] 확인 전 엑셀 403
- [x] **통과선:** confirm 없이 엑셀 X

## 진행

- sessions + excelGate · smoke: without confirm → 403

## 정리

### 한 줄
엑셀은 사용자 확인 게이트 뒤에만.

### 핵심
- 루프 안 generate_settlement_excel도 차단
