# 14-2 · RUM · Sentry — **완료**

SSOT 노트: [`../14-14-2-monitoring-rum-sentry.md`](../14-14-2-monitoring-rum-sentry.md)

## active 체크

- [x] RUM — 실사용 Web Vitals 필드 데이터(p75)
- [x] Lighthouse(랩) vs RUM(필드) 함께 해석
- [x] Sentry — 런타임 에러·스택·릴리즈·그룹핑
- [x] Source Map — minify 스택을 원본 파일·라인으로 복원
- [x] 배포 파이프라인에서 소스맵 업로드(또는 비공개 보관)
- [x] 알럿·샘플링·ignore 규칙으로 노이즈 제어
- [x] DevTools Network / Performance / Memory 로컬 보완
- [x] **통과선** — 랩 vs 필드 / Sentry·소스맵 / DevTools 30초

## 정리

### 한 줄

**Lighthouse는 재현 가능한 랩**, **RUM은 실제 기기·망의 p75**로 우선순위를 잡고, 프로덕션 에러는 **minify + Sentry + 소스맵 파이프라인** 없으면 원인 추적이 막히며, 로컬은 **DevTools**로 네트워크·롱태스크·힙 누수를 좁힌다.

### 핵심

- **RUM**: 실 사용자 환경에서 LCP·INP·CLS 등 **필드** 분포 수집. “내 맥북 Lighthouse 95”와 “저사양 Android p75 LCP 4s”는 다를 수 있다 — 개선 우선순위는 **필드 p75·영향 사용자 수**.
- **랩 vs 필드**: Lighthouse = 고정 CPU·네트워크·캐시 cold/warm 시나리오. RUM = CDN·캐시 hit·3G·구형 WebView 혼합. 둘 다 봐야 “측정은 좋은데 CS 느리다”를 설명한다.
- **Sentry**: uncaught error·promise rejection·(선택) breadcrumb. **릴리즈 태그**로 “어느 배포부터?”를 잡고, fingerprint/그룹핑으로 같은 root cause를 묶는다.
- **Minified stack**: `a.b@chunk.js:1:234` — 소스맵 **미업로드**면 FE가 수정할 파일을 못 찾는다. CI/CD에서 빌드 산출물과 **release + source map upload**가 관측의 전제.
- **노이즈**: 서드파티 스크립트·known benign·샘플링 rate·beforeSend 필터. “에러 10만 건”이면 **중요 이슈가 묻힌다**.
- **DevTools**: Network(304·disk cache·CORS·워터폴), Performance(롱 태스크·메인 스레드 구간), Memory(힙 스냅샷 diff → 리스너·detach DOM·구독 미해제).

### 흐름

```
[성능]
  Lighthouse/로컬 프로파일 → 회귀·번들·렌더 병목 가설
  RUM p75·세그먼트(기기/페이지) → 실제 아픈 곳 우선순위
  수정 → 랩 재측 + 필드 배포 후 RUM 추이

[에러]
  사용자 환경 throw → Sentry ingest
  release + source map → 원본 stack frame
  알럿(새 issue/spike) → 재현 → fix → 다음 release 검증

[로컬]
  재현 경로 반복 → Performance/Memory
  Network로 API·캐시·번들 크기 확인
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Lighthouse vs RUM | 랩 점수 vs 실사용 분포 |
| Sentry vs console | 프로덕션 집계·알럿 vs 개발 1회 |
| Source map 공개 vs 비공개 업로드 | 디버깅 vs 소스 유출 리스크 |
| Error boundary vs Sentry | UI fallback vs 서버로 스택 전송 |
| 샘플링 100% vs 10% | 비용·PII vs 대표성 |
| “메모리 누수” vs GC | 힙이 안 내려가는 패턴을 **경로 반복** 후 스냅샷 diff |

### 실무 연결

- Day 29 Core Web Vitals·Day 30 리소스 최적화와 연결 — **필드 p75**로 검증 문장을 만든다.
- Day 50 Error Boundary는 사용자 UX, Sentry는 **배포 단위 추적** — boundary 안에서 `captureException` 패턴.
- 배포(Week 13 Docker/CI)와 소스맵 업로드를 **한 파이프라인**으로 묶는 게 면접·회고 공통 답.

### 면접 한 방

- **Q:** Lighthouse 점수는 좋은데 실사용이 느린 이유는? Sentry 스택이 읽히지 않을 때는?
- **답:** 랩은 환경이 고정되고 RUM은 저사양·느린 망·캐시 상태가 섞인다. 실제 문제는 RUM p75와 영향 범위로 잡는다. Sentry 스택이 minify만 보이면 **해당 release에 소스맵이 업로드되지 않았거나 release 이름이 빌드와 불일치**한 경우가 대부분이다.

### 통과선 스크립트

1. RUM = 필드 Web Vitals, 우선순위는 p75·영향도.
2. Lighthouse = 랩, RUM과 같이 본다.
3. Sentry = 프로덕션 에러·릴리즈·그룹핑.
4. 소스맵 = minify → 원본 위치, CI 업로드.
5. 샘플링·ignore로 노이즈 줄이기.
6. DevTools Network/Performance/Memory 역할 각 1줄.
7. 성능 개선은 필드 지표로 “전/후” 말하기.

## wrap 요약

- go 정리본: `study/fe/14-14-2-monitoring-rum-sentry.md` 완료.
- 핵심: RUM p75 + Sentry·소스맵 + DevTools 보완, 랩/필드 함께 해석.
- 다음 start/go: `day-75-project-retrospective-1` · 노트는 다음 go에서 생성.
- 막힌: —
