# Agent 02 · 카탈로그 API

> **go** · 플랜 단계 2 · active: [`active_agent.md`](../../log/_common/sessions/active_agent.md)

## 학습 할 일

- [x] `catalog.json` seed (RADISH / PEPPER / PEPPER_POWDER)
- [x] `GET /catalog`
- [x] `POST /catalog/resolve` mock (LLM 없음)
- [x] **통과선:** curl OK · `고추` → ambiguous candidates

## 진행

- `server/catalog.json` · `catalog.ts` · `GET /catalog` · `POST /catalog/resolve`
- 확인: 무+고추 exact 매칭 · `고추`만 → PEPPER + PEPPER_POWDER candidates

## 정리

### 한 줄
단가·SKU 정본은 카탈로그 API이고, resolve는 LLM 없이 동의어·부분일치로 matched / ambiguous를 나눈다.

### 핵심
- 금액·SKU는 카탈로그가 정본 — LLM이 단가 결정 금지의 기반.
- `고추`처럼 다른 품명에 포함되면 candidates로 올려 챗 확인(단계 6·8)에 넘긴다.

## 메모

## 막힌 질문
