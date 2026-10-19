# 08-4 · 탭 간 통신 — **완료**

SSOT 노트: [`../08-08-4-cross-tab-communication.md`](../08-08-4-cross-tab-communication.md)

## active 체크

- [x] `storage` 이벤트 — 다른 탭의 `localStorage` 변경 감지
- [x] 같은 탭 미발신 함정 — 커스텀 이벤트·직접 갱신
- [x] BroadcastChannel — 동일 출처 탭/워커 브로드캐스트
- [x] postMessage — 창·iframe 간 메시지, `origin` 검증
- [x] iframe messaging — `targetOrigin` 명시, `*` 지양
- [x] 로그인/로그아웃 탭 동기 — 인증 3층과 연결
- [x] **통과선** — storage 함정 / postMessage 보안 30초

## 정리

### 한 줄

탭·iframe 간 상태는 **storage 이벤트(다른 탭만)·BroadcastChannel·postMessage**로 나누고, storage는 같은 탭에 안 오는 스펙 함정을 알아 두며 postMessage는 **origin 검증**이 필수다.

### 핵심

- **`storage` 이벤트**: 다른 문서(탭)에서 `localStorage`가 바뀔 때만 발생. **같은 탭에서 set한 변경에는 이벤트가 안 온다** — 스펙 함정.
- **같은 탭 우회**: set 후 직접 state 갱신, 또는 `CustomEvent` / BroadcastChannel로 자기 탭까지 알림.
- **BroadcastChannel**: 같은 origin의 탭·워커에 메시지 브로드캐스트. 로그아웃·장바구니·테마 동기에 API가 깔끔.
- **postMessage**: `window`/`iframe` 간 크로스 오리진 통신 표준. 수신: `event.origin` 화이트리스트, 송신: `targetOrigin`을 `*` 대신 명시.
- **인증 동기**: 한 탭에서 로그아웃하면 다른 탭도 세션 무효화·리다이렉트 — storage/BC + Day 6·26 토큰 저장 전략과 맞물림.

### 흐름

```
[다른 탭 동기]
  탭 A: localStorage.setItem('auth', …)
  탭 B: window 'storage' → UI/쿼리 invalidate

[같은 탭]
  setItem 후 → storage 이벤트 없음
  → setState 직접 또는 dispatch CustomEvent / BC.postMessage

[iframe]
  parent.postMessage(data, targetOrigin)
  child: if (event.origin === ALLOWED) handle
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| storage vs sessionStorage | storage는 탭 간 공유·storage 이벤트; session은 탭 격리 |
| storage vs BroadcastChannel | KV 변경 감지 vs 임의 메시지 채널 |
| postMessage vs storage | 크로스 오리진·iframe vs same-origin 탭 |
| `targetOrigin: '*'` | 수신 범위 과다 → origin 고정 |
| same-tab storage | 이벤트 기대하면 버그 — 직접 갱신 필요 |

### 실무 연결

- `notes/2026-07-13_same-tab-storage-notify.md` — same-tab storage 알림 트릭.
- `notes/2026-06-30_cross-origin-iframe-messaging.md` — iframe postMessage·origin.
- `notes/2026-07-07_cart-localstorage-sync.md` — 장바구니 localStorage 탭 동기.
- 백오피스·포털: 로그아웃 한 탭 → 나머지 탭 401/로그인 유도 패턴.

### 면접 한 방

- **Q:** `storage` 이벤트로 같은 탭 동기화가 안 되는 이유는?
- **답:** 스펙상 storage 이벤트는 **다른** 문서에만 발신된다. 같은 탭은 set 후 직접 상태를 맞추거나 CustomEvent/BroadcastChannel을 쓴다. postMessage는 `event.origin`과 `targetOrigin`을 반드시 검증한다.

### 통과선 스크립트

1. storage 이벤트 = 다른 탭의 localStorage 변경.
2. 같은 탭 함정과 우회(직접·커스텀·BC).
3. BroadcastChannel 용도(동일 origin 브로드캐스트).
4. postMessage origin·targetOrigin 수칙.
5. 로그인/로그아웃 탭 간 동기 한 줄.

## wrap 요약

- go 정리본: `study/fe/08-08-4-cross-tab-communication.md` 완료.
- 핵심: storage는 다른 탭만; BC/postMessage + origin 검증.
- 다음 start/go: `09-1-css-layout-architecture` · 노트는 다음 go에서 생성.
- 막힌: —
