## W1 D1 (월)

**주제:** JS 런타임 + shared HTTP/JWT 진입

| 구간     | 내용                                                                            |
| -------- | ------------------------------------------------------------------------------- |
| 커리큘럼 | HTTP 기초, event loop/async, auth storage (브릿지 Week 1 1~3)                   |
| 회사     | `AuthHttpClientService.ts` 주석 — 401·AsyncQueue·인터셉터 흐름                  |
| 저녁     | `setTimeout(0)` vs `Promise.then` **콘솔 실험** (마이크로태스크 순서)           |
| 남긴 것  | AuthHttpClient·401 큐 주석 정리, JWT **Storage / API / Service** 역할 분리 노트 |

---

## W1 D2 (화)

**주제:** care 결제 + server/client state 구분

| 구간    | 내용                                                               |
| ------- | ------------------------------------------------------------------ |
| 회사    | care 결제 **흐름도** 스케치                                        |
| 저녁    | server vs client state **종이 표**, care·dailycare **예 1개씩**    |
| 열 파일 | `care/.../payment/payment.tsx` ~L163–230 (주문 API → PG 제출 구간) |
| 남긴 것 | §10에 손코딩 상세 메모 없음 — 플랜상 과제만 수행했다고 가정        |

---

**한 줄로:** 월 = event loop 실험 + backoffice 401/JWT 레이어 읽기, 화 = care 결제 구간 리딩 + 상태 소유권 표로 정리.  
화요일 손코딩·막힌 점을 채우려면 wrap 때 `메모:` 블록으로 보내면 §10·세션 로그에 반영할 수 있다.
