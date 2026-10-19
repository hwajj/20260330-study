# 포폴 마무리 (단계 16)

## 이력서 불릿 (1줄)

> 물류·도매 주문 문장(`무2 고추2`)을 function calling(Zod→JSON Schema 도구 4개)으로 구조화하고, 단가·합계는 카탈로그/서버 산술만 신뢰하며 사용자 확인(HITL) 후에만 정산 엑셀을 생성하는 하이브리드 Agent — Trace 패널·골든 eval 5건 포함 (React + Express, SheetJS)

짧은 버전:

> LLM은 파싱·대화, 금액·품목·파일은 서버가 정하는 주문·정산 챗 Agent (function calling · HITL 확인 게이트 · Trace · 골든 eval)

## 링크

- 코드: https://github.com/hwajj/20260330-study/tree/main/src/labs/agent  
  (로컬 최신이 remote에 없으면 push 후 유효. 공개 범위: `log/_common/agent-repo-decision.md`)
- 데모: **라이브** `pnpm dev` + [`DEMO.md`](./DEMO.md) (영상/GIF는 선택 — `demo/`에 추가 가능)

## §0-B 자가 점검

| 목표 | 통과선 | 상태 | 근거 |
|------|--------|------|------|
| 데모 | 3~5분: 주문 → 확인 → 엑셀 | ✅ (녹화 생략) | `DEMO.md` + `scripts/smoke.mjs` · UI 시나리오. 영상은 추후 선택 |
| 설명 | 아키텍처 + 실패 모드 2개 | ✅ | `ARCHITECTURE.md` · 아래 |
| 이력서 | 불릿 1개 | ✅ | 위 |
| 회사 내부 | 하이브리드·가드레일 2분 | ✅ | `README` · `SAFETY.md` · `docs/KAKAO-SETUP.md` |

### 실패 모드 2개 (설명용)

1. **환각 단가** — LLM이 «고추 1원»을 말해도 `quote_settlement`는 카탈로그 단가만 곱한다. (골든 #5: total 1200)
2. **잘못된 SKU 매칭** — `고추` → ambiguous, 확인 전 quote·엑셀 없음. (골든 #1, #3)

## 재현 검증 명령

```bash
pnpm dev
node scripts/golden.mjs
node scripts/smoke.mjs
node scripts/fake-openai-check.mjs
```

## 한계 (면접에서 먼저)

- 실 OpenAI 키 호출은 미검증 (요청 형식만 가짜 서버로 확인). 키 없으면 mock planner.
- `parse_line_items`는 규칙 파서.
- 카탈로그·세션 in-memory · 카카오는 스텁+준비 문서만.
- 데모 **영상 미촬영** (사용자 결정으로 15 완화 완료).
