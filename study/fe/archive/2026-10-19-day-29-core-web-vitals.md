# Day 29 · Core Web Vitals — **완료**

SSOT 노트: [`../29-day-29-core-web-vitals.md`](../29-day-29-core-web-vitals.md)

## active 체크

- [x] LCP / CLS / INP(·FCP) 의미·권장 수치
- [x] 지표별 저하 원인 ↔ 개선책 매핑
- [x] Lighthouse(랩) vs RUM(실사용자) 역할
- [x] **dailycare 모의 3** — resume/interview Q list 10분
- [x] 라우팅·결제·Auth·Repository를 CWV 관점으로 한 줄씩 연결
- [x] keepPreviousData·이미지(지도)가 CLS/LCP에 주는 영향 감각
- [x] **면접 Q** — LCP/CLS/INP 개선
- [x] **통과선** — 3지표 + dailycare 10분 끊김 없음

## 정리

### 한 줄

Core Web Vitals는 **LCP(로딩)·CLS(시각 안정)·INP(반응성)**로 체감을 수치화하고, dailycare 면접에서는 지표 용어보다 **라우팅·결제·가드 스토리**를 막힘 없이 말하되, 탭 전환 깜빡임·큰 미디어가 곧 CLS/LCP 이야기로 이어짐을 안다.

### 핵심

- **LCP**: 가장 큰 콘텐츠 페인트. 권장 ≤2.5s. 큰 이미지·느린 TTFB·렌더 차단·폰트가 주범.
- **CLS**: 예기치 않은 레이아웃 이동 누적. 권장 ≤0.1. 크기 미지정 이미지/광고/동적 삽입.
- **INP**: 입력→다음 페인트. 권장 ≤200ms(FID 대체). 긴 메인 스레드 태스크.
- **FCP**: 첫 콘텐츠 — LCP의 앞단 신호.
- **측정**: Lighthouse=랩 진단·점수. RUM/`PerformanceObserver`=실사용 분포·우선순위.

### 흐름

```
사용자 체감
  LCP ← 히어로/큰 이미지·폰트·TTFB
  CLS ← 공간 미예약 삽입
  INP ← 긴 JS·동기 레이아웃·무거운 핸들러

개선 우선순위: 실측(RUM) → 가장 나쁜 지표 → 원인 매핑 → 한 가지씩
```

모의 면접(금) 체크리스트:

```
1) nginx·basename·homepage 안 쓰는 이유
2) AuthGuard + 401
3) Repository·Dummy
4) 결제 3갈래 + ordering
5) invalidate / keepPreviousData
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| LCP vs FCP | 가장 큰 것 vs 첫 콘텐츠 |
| CLS vs 애니메이션 | 예기치 않은 이동 vs 의도된 전환(보통 제외 설계) |
| INP vs FPS | 입력 반응 vs 연속 프레임 |
| Lighthouse vs RUM | 랩 한 번 vs 필드 분포 |
| 탭 깜빡임 vs CLS | 빈 목록 플래시 ≠ 레이아웃 시프트이지만 UX 동일 계열 |

### 실무 연결

- **금 모의 3**: `interview-2026-08-31-2308.md` Q list로 10분 — 약한 절 재독 후 끊김 없이.
- dailycare `keepPreviousData`: 탭 전환 시 빈 화면 깜빡임↓ → 체감 안정(CLS는 아니어도 “안정성” 스토리).
- 카카오맵·이미지: LCP/CLS 후보 — 컨테이너 크기 예약 감각.
- CSR 번들 크기 → LCP/TTI에 직접; Day27·30과 연결.
- 결제 직후 invalidate: “틀린 UI가 10s 남는 것”도 신뢰·체감 품질.

### 면접 한 방

- **Q:** LCP·CLS·INP를 각각 어떻게 개선하나?
- **답:** LCP는 큰 이미지 포맷·preload, TTFB, 렌더 차단 제거. CLS는 width/height·aspect-ratio로 공간 예약, 동적 삽입 최소화. INP는 긴 태스크 분할·양보, 무거운 작업을 입력 경로 밖으로. 랩(Lighthouse)으로 후보를 찾고 RUM으로 실제 우선순위를 정한다.

### 통과선 스크립트

1. 3대 지표 이름·한 단어 정의·권장 수치.
2. LCP 원인 2 + 개선 2.
3. CLS 원인 2 + 공간 예약.
4. INP = 긴 태스크 → 분할.
5. Lighthouse vs RUM.
6. dailycare 10분: 라우팅.
7. 인증·401.
8. Repository.
9. 결제 분기·ref.
10. Query UX(keepPrevious / invalidate)까지 말하고 끝.

## wrap 요약

1. Day29 go — LCP/CLS/INP + dailycare 모의 3.
2. W5 금 10분 통과선.
3. 다음: day-30 · 토 · 주말 모의·자원 최적화

- **막힌:** —
- **다음 start:** `day-30-resource-optimization` · `study/fe/30-day-30-resource-optimization.md` · (BATCH notes-only · plan/active 미갱신)