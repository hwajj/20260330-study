# Day 28 · SSR & Hydration — **완료**

SSOT 노트: [`../28-day-28-ssr-hydration.md`](../28-day-28-ssr-hydration.md)

## active 체크

- [x] CSR vs SSR vs SSG vs ISR 비교 (HTML·SEO·서버·캐시)
- [x] Hydration 필요성 — “보이기” vs “동작”
- [x] Hydration Mismatch 원인·회피
- [x] Streaming SSR 체감 이점 / HTML 캐시 vs 자산 캐시
- [x] **community** — HTTP 히스토리 vs Socket 실시간 / Redux 미읽음
- [x] CSR 앱에서 “서버 렌더 없이도” 상태 경계를 나누는 법
- [x] **면접 Q** — 왜 Hydration? / mismatch
- [x] **통과선** — 렌더 전략 표 + Socket/Redux 3분

## 정리

### 한 줄

SSR은 요청마다 **서버가 HTML을 만들어** 첫 화면·SEO를 주고, Hydration으로 클라이언트 JS가 **이벤트·상태를 붙여** 상호작용하게 하며, community처럼 CSR이어도 **HTTP(스냅샷)·Socket(델타)·Redux(전역 배지)**로 “언제 무엇을 그릴지”를 나눈다.

### 핵심

- **SSR**: 매 요청 HTML → FCP/SEO↑, 서버 CPU·TTFB 비용↑.
- **SSG**: 빌드 시 HTML → CDN 친화, 내용 고정에 가깝다.
- **ISR**: 배포 후에도 주기/on-demand로 페이지 재생성 → SSG 신선도 보완.
- **Hydration**: 서버 HTML에 리스너·state 연결. 없으면 “그림만 있고 클릭 안 됨”.
- **Mismatch**: 서버·클라 첫 렌더 불일치(`Date.now()`, `window`, 랜덤) → 결정적 렌더 또는 클라 전용.
- **Streaming**: HTML 조각을 준비되는 대로 전송 → 체감 대기↓.
- **캐시 구분**: SSG/ISR HTML 스냅샷 ≠ Day5 JS/CSS 해시 장기 캐시. “안 바뀜” 원인을 HTML/자산으로 분리.

### 흐름

```
SSR: 요청 → 서버 renderToHTML → HTML+JS → 브라우저 표시
    → Hydration → 상호작용 가능

SSG: 빌드 → HTML 파일 → CDN
ISR: 빌드 + 이후 재생성 규칙
```

community(목 실무):

```
목록/방 진입
  → HTTP: 메시지 히스토리 페이지네이션
  → Socket: 실시간 수신·전송·목록 lastMessage/unread 델타
  → Redux totalUnreadCount → Navbar 배지 (목록 밖)
방 leave/join 시 구독 해제·읽음 처리 (훅)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| CSR vs SSR | 클라가 그림 vs 서버가 첫 HTML |
| SSG vs ISR | 빌드 고정 vs 이후 재생성 |
| HTML 캐시 vs 자산 캐시 | 페이지 스냅샷 vs 해시 파일 바이트 |
| Hydration vs 첫 페인트 | 동작 가능하게 vs 보이기만 |
| HTTP vs Socket (community) | 과거·재시도 vs 현재 방 델타 |
| 로컬 unread vs Redux | 목록 훅만 vs Navbar 전역 배지 |

### 실무 연결

- **log** `app-community`: 히스토리=HTTP, 실시간=`Socket.IO`; 목록은 `chat:list:update:{roomId}`로 행만 갱신.
- **미읽음 Redux**: Navbar 등 목록 밖 공유 → `chatSlice.totalUnreadCount`.
- dailycare/community는 **CSR**이라 Hydration 이슈는 적지만, “서버 HTML 없이 **데이터 소스 경계**를 나누는 감각”이 SSR의 ‘무엇을 서버/클라에 둘까’와 같은 질문.
- 낙관적 UI 안 씀: emit 후 서버 echo로 ID·시각 일치(지연 vs 중복 트레이드오프).
- **목 모의**: Socket/Redux 3분.

### 면접 한 방

- **Q:** SSR인데 왜 Hydration이 또 필요한가? mismatch는?
- **답:** 서버 HTML은 픽셀로 보일 뿐 클릭 핸들러가 없다. Hydration이 DOM에 상태·리스너를 연결해야 앱이 된다. 서버와 클라가 `Date.now()`·`window`처럼 다른 값을 그리면 mismatch가 나니 렌더를 결정적으로 만들거나 클라 전용으로 뺀다.

### 통과선 스크립트

1. CSR/SSR/SSG/ISR을 HTML·SEO·비용으로 한 줄씩.
2. Hydration = 보이기 → 동작.
3. mismatch 대표 원인 2개.
4. Streaming은 조각 전송으로 체감↑.
5. HTML 캐시와 해시 자산 캐시를 섞지 말 것.
6. community: HTTP 과거 / Socket 현재.
7. 방별 동적 이벤트 구독 이유.
8. 미읽음은 Redux인 이유(배지).
9. CSR 앱도 “상태 소유권 분리”가 면접 포인트.
10. 3분: 목록 갱신 + 배지 + 방 메시지 채널.

## wrap 요약

1. Day28 go — SSR/Hydration + community HTTP/Socket/Redux.
2. W5 목 Socket/Redux 3분.
3. 다음: day-29 · 금 · dailycare 모의 10분

- **막힌:** —
- **다음 start:** `day-29-core-web-vitals` · `study/fe/29-day-29-core-web-vitals.md` · (BATCH notes-only · plan/active 미갱신)