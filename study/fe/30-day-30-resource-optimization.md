# Day 30 · Resource Optimization

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-04-network-perf/day-30-resource-optimization.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] CDN · Cache · Compression이 전송 비용을 줄이는 이유
- [x] 이미지(WebP/srcset/lazy) ↔ LCP/CLS
- [x] 폰트 FOIT/FOUT · `font-display` · preload/subset
- [x] preload vs prefetch 우선순위
- [x] 해시+immutable 캐시 (Day5 연결) / CDN 상세는 13-3
- [x] **주말 모의** — dailycare+CWV·최적화 키워드를 한 묶음으로
- [x] **면접 Q** — preload/prefetch · immutable
- [x] **통과선** — 전송 최적화 스택 + 주말 모의 한 바퀴

## 정리

### 한 줄

자원 최적화는 **가까운 Edge(CDN)·캐시·압축**으로 바이트·RTT를 줄이고, **이미지·폰트·preload**로 LCP/CLS를 직접 건드리는 일이며, 주말 모의에서는 Day25–29 이론을 dailycare 스토리에 **끼워 말해** 끊김을 없앤다.

### 핵심

- **CDN**: Origin 복사본을 Edge에 — Hit면 Origin 생략, Miss면 채움. 옛 파일 → **파일명 해시** 또는 Invalidation.
- **Cache**: `Cache-Control`·`ETag`. immutable 해시 파일은 장기 캐시(Day5).
- **Compression**: gzip/Brotli로 JS/CSS/HTML 전송↓.
- **이미지**: WebP/AVIF, `srcset`/`picture`, lazy(단 LCP 후보는 lazy 금지에 가깝다), 크기 명시→CLS↓.
- **폰트**: FOIT(숨김) vs FOUT(폴백 후 교체). `font-display`, critical preload, subset.
- **preload**: 현재 페이지 곧 쓸 자원(우선↑). **prefetch**: 다음 항해 후보(유휴·우선↓).

### 흐름

```
사용자 ← Edge CDN (Hit?)
           ├ Hit → 바로 응답
           └ Miss → Origin → Edge 채움 → 응답

페이지 로드
  preload(critical CSS/font/LCP 이미지)
  → 본문
  → prefetch(다음 라우트 후보)
```

주말 모의 묶음:

```
REST·basename → Auth/결제 → CSR 가드
→ (이론) SSR 한 줄 대비 → CWV 3지표
→ CDN/이미지/preload로 “어떻게 빠르게”
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| preload vs prefetch | 지금 필수 vs 다음 후보 |
| Cache Hit vs Miss | Edge 완결 vs Origin 왕복 |
| lazy vs LCP 이미지 | 아래쪽 OK / 히어로는 先行 로드 |
| FOIT vs FOUT | 안 보임 vs 폴백 깜빡 |
| HTML 무효화 vs 자산 해시 | 페이지 스냅샷 vs 파일명 변경 갱신 |

### 실무 연결

- dailycare `/dailycare` 정적 자산 prefix·nginx: **캐시·배포 path** 이야기의 현장판.
- SPA 번들 = Day30 압축·스플리트·CDN 대상. CRA 산출물 해시는 장기 캐시와 맞물림.
- 카카오맵·프로필 이미지: LCP/CLS 최적화 후보로 말하기.
- **토 주말 모의**: 금 10분 모의를 45m로 확장 — 약점 절만 깊게.
- CDN 인프라 스토리(S3→CloudFront)는 **13-3**로 미룸 — 이 Day는 “왜 필요한가”.

### 면접 한 방

- **Q:** preload와 prefetch 차이, immutable 자원은?
- **답:** preload는 현재 페이지에서 곧 필요한 자원이라 우선순위가 높고, prefetch는 다음 페이지 후보라 유휴에 낮게 가져온다. 내용이 바뀌면 파일명이 바뀌는 해시 자산은 `Cache-Control: max-age=…, immutable`로 길게 캐시해도 안전하다.

### 통과선 스크립트

1. CDN = 가까운 복사본, Hit/Miss.
2. 캐시·압축으로 바이트·재요청↓.
3. 이미지 4기법 ↔ LCP/CLS.
4. 폰트 display 정책.
5. preload ≠ prefetch.
6. 해시 immutable.
7. dailycare 정적 path·번들도 같은 축.
8. Day29 지표에 최적화 수단을 매핑.
9. 주말 모의: 이론 한 줄 + 회사 스토리 교차.
10. 깊은 CDN은 13-3.
