# Day 78 · 성능 개선

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-15-career/day-78-performance-improvement.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] 성능 스토리 — **증상 → 가설 → 측정 → 변경 → 검증**
- [x] 지표 — LCP/INP/CLS, p75, 번들 KB, API TTFB 구분
- [x] Lighthouse(랩) + RUM(필드) Before/After
- [x] DevTools Performance/Memory/Network로 **원인 한 줄**
- [x] React 측 — memo·virtualization·code split·이미지·font (Day 29~44)
- [x] “최적화”가 아닌 **병목 하나** 집중
- [x] 트레이드오프 — UX·개발비용·유지보수
- [x] **통과선** — 성능 개선 1건 2분 + 숫자

## 정리

### 한 줄

성능 개선 경험은 **어떤 사용자 증상**을 **어떤 지표로 확인**하고, **무엇을 바꿨으며**, **랩·필드에서 얼마나 줄었는지**를 한 병목에 대해 말하는 것이다.

### 핵심

- **원문 보강**: 커리큘럼 키워드만 — 면접은 “useMemo 썼다”가 아니라 **LCP 3.2s→2.1s (p75)** 같은 문장.
- **증상**: “느리다” → 구체 route·기기·LCP/INP/롱태스크·번들 download.
- **가설 트리**: 네트워크(waterfall·캐시) vs JS(parse·long task) vs 렌더(리스트 N행) vs hydration.
- **측정**: Lighthouse trace 1회 + **RUM 세그먼트** + (가능하면) Sentry performance — 개선 **우선순위**는 필드.
- **FE 레버**: route lazy·dynamic import, image width/height·lazy, list virtualization, query staleTime·prefetch, font subset, CDN cache.
- **React 함정**: 무분별 memo는 오히려 비용 — **profiler로 증명**한 1곳만 말한다.
- **검증**: 배포 후 1~2주 RUM p75, regression alert — “체감”만으로 끝내지 않기.

### 흐름

```
Slow report / RUM p75 bad on /list
  → Reproduce (throttle CPU 4x)
  → Performance: long task / LCP element
  → Network: chunk size · API
  → Change ONE (e.g. route split + virtual list)
  → Lab: Lighthouse LCP −800ms
  → Field: RUM p75 LCP −600ms over 7d
  → Document tradeoff (complexity +15 LOC)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 랩 vs 필드 개선 | Lighthouse vs RUM p75 |
| 번들 vs 런타임 | download vs long task |
| LCP vs INP | 로드 vs 상호작용 지연 |
| memo vs architecture | 미세 vs split/virtualize |
| API vs FE | TTFB vs hydration/render |
| “최적화 다 함” vs 1병목 | 나열 vs 측정된 1건 |

### 실무 연결

- Day 22·29·30·44 커리큘럼 — **같은 에피소드**로 CWV·번들·memo를 연결해 말한다.
- Week 14 **RUM** — 개선 전후 필드 문장.
- nursing/W8 **목록·필터** — URL+Query와 성능(불필요 refetch) 동시 회고 가능.

### 면접 한 방

- **Q:** 직접 한 성능 개선 사례와 수치를 말해 달라.
- **답:** 목록 첫 LCP p75가 3s대였다. RUM과 Performance에서 LCP가 hero 이미지+대형 chunk였음을 확인했다. route lazy와 이미지 dimensions·priority 조정 후 Lighthouse LCP 2.1s, 배포 후 RUM p75 2.3s로 내렸다. INP는 별 이슈 아니었음을 구분했다. memo가 아니라 **로딩 경로**가 병목이었다.

### 통과선 스크립트

1. 증상·페이지·사용자.
2. 지표 이름 + Before p75/lab.
3. 가설 1줄 + DevTools 근거.
4. 변경 1~2개만 구체.
5. After 숫자 (lab + field).
6. 트레이드오프·유지보수.
7. 다른 병목은 intentionally 안 건드림.
8. Day 80 STAR Action에 붙일 Result 숫자.
