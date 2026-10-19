# 주문·정산 챗 Agent

물류·도매 B2B: 채팅 주문 → 품목 구조화 → 카탈로그 단가 → **확인** → 정산 엑셀.

- 아키텍처: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 가드레일: [`SAFETY.md`](./SAFETY.md)
- 골든: [`eval/golden.md`](./eval/golden.md)

## 기동

```bash
cd src/labs/agent
# Node 20: corepack prepare pnpm@9.15.0 --activate
pnpm install
pnpm dev
```

- API: http://localhost:8787/health  
- UI: http://localhost:5173  

선택: `.env`에 `OPENAI_API_KEY` (없으면 mock planner).

## 5분 시나리오

대본: [`DEMO.md`](./DEMO.md) (3분 녹화 스크립트)

1. UI에서 `무2개 고춧가루 1통` 전송  
2. Trace에 parse → resolve → quote 확인  
3. «이대로 정산서 만들까요?» → **확인 · 엑셀 생성**  
4. 다운로드 · 시트 행 수 = 2  
5. (애매) `무2 고추2` → 후보 확인 문구 · 확인 전 엑셀 없음

데모: 라이브 `pnpm dev` + [`DEMO.md`](./DEMO.md). 영상/GIF는 선택 — `demo/`에 두면 여기 링크.

## 하이브리드

**LLM은 파싱·대화, 금액·품목·파일은 서버.** 합계는 `quote_settlement` 산술만 신뢰.

## 카카오 웹훅 개념도 (실채널 X · 스텁 O)

입구만 카카오고, **안쪽 처리(tools·catalog·HITL·엑셀)는 웹 `/chat`과 동일**.

```text
[카카오 채널] --webhook--> [POST /webhook/kakao 어댑터]
                              |  텍스트 추출
                              v
                         기존 Agent 파이프라인
                         (tools + catalog)
                              |
                         confirm (HITL)
                              |
                         .xlsx 회신/링크
```

- 콘솔 준비·ngrok·면접 멘트: [`docs/KAKAO-SETUP.md`](./docs/KAKAO-SETUP.md)
- 스텁 호출: `curl … --data-binary @server/kakao/fixtures/sample-utterance.json`

## 이력서 불릿 (초안)

주문 자연어를 function calling으로 구조화하고, 카탈로그 정본·HITL 확인 후에만 정산 엑셀을 생성하는 하이브리드 Agent (Trace·골든 eval 포함).
