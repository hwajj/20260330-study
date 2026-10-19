# 주문·정산 챗 Agent

물류·도매 B2B 시나리오: 채팅 주문 문장 → 품목 구조화 → 카탈로그 단가 → 확인 → 정산 엑셀.

아키텍처: [`ARCHITECTURE.md`](./ARCHITECTURE.md)

## 기동

```bash
cd src/labs/agent
pnpm install
pnpm dev
```

- API: http://localhost:8787/health  
- UI: http://localhost:5173  

DAY1 통과선: health OK + 빈 채팅 화면.
