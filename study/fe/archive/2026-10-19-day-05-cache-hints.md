# Day 05 · 캐시 & 리소스 힌트 — **완료**

SSOT 노트: [`../05-day-05-cache-hints.md`](../05-day-05-cache-hints.md)

## active 체크

- [x] day-05-cache-hints.md 끝까지 읽기
- [x] **Cache-Control** — `max-age` / `no-cache` / `no-store` / `immutable` 한 줄씩
- [x] **ETag + 304** 재검증 흐름 말하기
- [x] 해시 파일명 + 장기 캐시 — 빌드 vs CDN/서버 역할 구분
- [x] **preload vs prefetch** 차이
- [x] **useParamState.ts L36–54** — 연속 `updateParam`과 `document.location.href`
- [x] URL 상태 갱신 ↔ 브라우저 캐시(리소스)와 다른 층임을 한 줄 연결
- [x] **통과선** — 캐시 정책 + no-cache≠no-store + 해시 캐시 30초

## 정리

### 한 줄

브라우저는 이미 받은 JS/CSS/이미지를 **캐시에 두고 재사용**하고, 서버는 `Cache-Control`·ETag로 **얼마나 오래·언제 재검증할지**를 알려주며, 빌드는 **해시 URL**로 “바뀌면 새 주소”를 만든다.

### 핵심

- **브라우저 캐시**: 네트워크·다운로드 비용을 줄여 재방문·재요청을 빠르게 한다. “항상 서버에 다시 받는다”가 기본이 아니다.
- **Cache-Control**: 서버→브라우저 캐시 지시. `max-age=N`은 N초 fresh, `immutable`은 “내용 안 바뀜” 가정으로 재검증 압박을 줄인다.
- **`no-cache` ≠ 캐시 금지**: 저장은 가능하되 **쓰기 전 서버 재검증**. 저장 자체를 막는 건 **`no-store`**.
- **ETag + 304**: 만료(또는 재검증) 시 `If-None-Match`로 버전 확인 → 같으면 **304 Not Modified**(본문 없이 캐시 사용), 다르면 200+새 본문. 304는 실패가 아니라 **성공적 재검증**.
- **해시 파일명**: Vite/Webpack이 `app.a1b2c3.js`처럼 콘텐츠 해시를 붙인다. 내용 변경 → URL 변경 → 장기 `max-age`+`immutable`을 안전하게 켠다. **파일명=빌드, Cache-Control=서버/CDN**.
- **preload / prefetch**: preload = **지금 페이지에 곧 필요**, prefetch = **다음 네비에 쓸 수도** — 우선순위·의도가 다름.

### 흐름

```
첫 방문: 요청 → 200 + 리소스 → 캐시 저장 (정책에 따라)
재방문: 캐시 fresh? → 그대로 사용
        stale/재검증 필요? → If-None-Match → 304(캐시) or 200(갱신)
배포 후: 해시 URL이 바뀌면 “새 리소스”로 다운로드 (옛 해시는 캐시에 남아도 URL이 안 맞음)
```

리소스 힌트:

```
preload  → 현재 문서 critical path에 끼워 넣기
prefetch → idle에 가까운 선제 가져오기 (다음 화면)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| `no-cache` vs `no-store` | 재검증 후 사용 vs 저장 금지 |
| 304 vs 4xx | 재검증 성공(캐시 hit) vs 클라이언트/서버 오류 |
| 해시 장기 캐시 vs HTML | 에셋은 immutable 길게, HTML/엔트리는 짧게·재검증 흔함 |
| preload vs prefetch | 지금 필요 vs 나중에 필요할지도 |
| 브라우저 HTTP 캐시 vs `useParamState` URL | 리소스 바이트 재사용 vs **앱 UI 상태**를 쿼리에 실음 — 층이 다름 |

### 실무 연결

- **CDN/nginx**: `Cache-Control`을 잘못 켜면 구버전 JS가 남거나, 반대로 전부 `no-store`면 매번 풀 다운로드.
- **SPA 배포**: `index.html`은 짧게, `/assets/*.hash.js`는 길게 — 해시 전략이 전제.
- **`useParamState.ts` L36–54** (`updateParam`):
  - 연속 `updateParam` 시 React Router `setParams`의 `prev`가 **아직 반영 전**일 수 있어, **`document.location.href`의 searchParams를 동기 스냅샷**으로 병합한다.
  - 함수형 `setParams(prev => …)`만으로는 `prev`와 실제 location이 어긋날 수 있다는 주석.
  - `setParams`는 일반 `setState`처럼 batch되지 않아 **80ms await**로 인위 대기.
  - Day05 메시지: “캐시”는 HTTP 리소스 이야기이고, 여기 URL 쿼리는 **공유 가능한 UI 상태 소스** — 둘 다 ‘이전 값을 믿고 덮어쓰기’ 문제가 생기지만 해결층이 다르다(헤더 vs location 동기 읽기).

### 면접 한 방

- **Q:** `no-cache`와 `no-store` 차이, 그리고 해시 파일명으로 장기 캐시를 켜는 이유는?
- **답:** `no-cache`는 캐시해 두되 쓰기 전 재검증, `no-store`는 저장 자체를 막습니다. 빌드가 콘텐츠 해시를 파일명에 넣으면 URL이 버전이라 `max-age`를 길게 둬도 배포 후 새 URL로 갱신되고, 옛 해시는 버려집니다. ETag/304는 같은 URL에서 “바뀌었는지”만 확인하는 재검증입니다.

### 통과선 스크립트

1. 캐시 = 받은 리소스 재사용 → 네트워크·로딩 절감.
2. Cache-Control 네 키워드를 한 줄씩.
3. `no-cache`≠`no-store`를 반드시 구분.
4. ETag → If-None-Match → 304/200.
5. 해시 URL + immutable 장기 캐시, HTML은 짧게.
6. preload(지금) / prefetch(나중).
7. (회사) 연속 `updateParam`은 location.href 스냅샷으로 이전 쿼리 유실을 막음 — HTTP 캐시와는 다른 “상태 경합” 문제.

## wrap 요약

1. Day05 go — Cache-Control·ETag/304·해시 캐시 + `useParamState` L36–54.
2. W2 화 배치 · plan/active 미수정(요청).
3. 다음: day-06 · utils.ts.

- **막힌:** —
- **다음 start:** `day-06-auth-storage`
