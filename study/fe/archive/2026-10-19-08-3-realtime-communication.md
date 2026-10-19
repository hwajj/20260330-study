# 08-3 · 실시간 통신 — **완료**

SSOT 노트: [`../08-08-3-realtime-communication.md`](../08-08-3-realtime-communication.md)

## active 체크

- [x] 폴링·롱 폴링 — 주기 GET vs 응답 보류
- [x] SSE (`EventSource`) — 서버→클라 단방향 스트림
- [x] WebSocket — 양방향 지속 연결
- [x] 선택 기준 — 단방향 알림 vs 양방향 상호작용
- [x] GraphQL — REST 대체재가 아닌 질의·필드 선택 트레이드오프
- [x] React Query — `refetchInterval` · 이벤트 후 `invalidateQueries`
- [x] 폴링 비용 — 백오프 · visibility · `enabled` 조건부
- [x] **통과선** — 폴링 vs WS / RQ 패턴 30초

## 정리

### 한 줄

실시간은 **무조건 WebSocket이 아니라** 트래픽·방향·운영 복잡도에 맞춰 폴링·SSE·WS·GraphQL을 고르고, FE에서는 React Query 조건부 폴링 + invalidate로 “충분히 실시간”을 자주 만든다.

### 핵심

- **폴링**: 클라이언트가 주기적으로 GET. 구현·디버깅이 REST와 같아 단순하지만 불필요 요청·지연(latency ≥ interval) 트레이드오프.
- **롱 폴링**: 서버가 변화까지 응답을 보류 → 폴링과 푸시 사이 절충.
- **SSE**: HTTP 기반 **서버→클라 단방향**. `EventSource`, 알림·진행률·로그 스트림에 적합. 브라우저 자동 재연결.
- **WebSocket**: **양방향** 지속 연결. 채팅·협업·게임. 연결·스케일·프록시 설정 비용↑.
- **GraphQL**: 클라이언트가 필요한 필드만 질의 → over/under-fetching 완화. 대신 캐시·N+1·권한·업로드 등 운영 난이도는 REST와 다름. **만능 대체재 아님**.
- **React Query 실무 패턴**: `refetchInterval`(탭 활성·조건부 `enabled`) + WS/SSE/사용자 액션 후 `invalidateQueries`로 “이벤트 + 가끔 폴링” 조합.

### 흐름

```
요구 분석
  → 서버→클라만? → SSE 또는 조건부 폴링
  → 양방향·저지연? → WebSocket
  → “가끔 갱신” + REST 유지? → RQ refetchInterval + invalidate

[RQ 조합]
  visibility hidden → interval 중단
  이벤트 수신 / mutation 성공 → invalidateQueries(key)
  부하↑ → interval 백오프 · enabled 조건
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 폴링 vs WebSocket | 단순·가끔 갱신 vs 양방향·연결 유지 |
| SSE vs WebSocket | 단방향·HTTP 친화 vs 양방향·상태ful |
| GraphQL vs REST | 필드 조합 vs 리소스·캐시 단순 |
| WS “정답” 착각 | 알림만이면 폴링/SSE가 운영·비용 유리 |
| gRPC | 주로 서비스 간·네이티브; 브라우저 FE 직접은 드묾 |

### 실무 연결

- `notes/2026-06-04-polling.md` — 폴링·백오프·탭 비활성 중단 패턴.
- `notes/2026-06-30_rest-vs-websocket.md` — REST vs WS 선택 논의.
- `notes/2026-06-08_cross-portal-settlement-sync.md` — 포털 간 정산·상태 동기(실시간 축).
- 목록·대시보드: settlement/알림은 invalidate + 짧은 interval이 WS 도입 전에도 흔한 1차 해법.

### 면접 한 방

- **Q:** 폴링 vs WebSocket, 언제 무엇을 쓰나?
- **답:** “가끔 갱신”·단방향 알림이면 조건부 폴링이나 SSE가 구현·운영이 단순하다. 채팅처럼 양방향·저지연이면 WebSocket. React Query면 `refetchInterval`과 이벤트 시 `invalidateQueries`로 폴링 비용을 줄이면서 실시간에 가깝게 보이게 할 수 있다.

### 통과선 스크립트

1. 폴링·롱 폴링·SSE·WS 방향과 감각 한 줄씩.
2. 단방향 알림 → SSE/폴링, 양방향 → WS.
3. GraphQL은 필드 선택 장점, REST 만능 대체 아님.
4. RQ: `refetchInterval` + `invalidateQueries`.
5. 폴링 완화: 백오프, visibility, `enabled`.
6. gRPC는 FE 직접보다 백엔드·모바일 협업 맥락.

## wrap 요약

- go 정리본: `study/fe/08-08-3-realtime-communication.md` 완료.
- 핵심: 방향·빈도에 따라 폴링/SSE/WS 선택, RQ는 interval + invalidate.
- 다음 start/go: `08-4-cross-tab-communication` · 노트는 다음 go에서 생성.
- 막힌: —
