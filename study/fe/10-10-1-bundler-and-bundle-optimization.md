# 10-1 · 번들러 & 번들 최적화

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-10-tooling/10-1-bundler-and-bundle-optimization.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] 번들러 역할 — webpack / Vite / esbuild
- [x] CJS vs ESM — require vs import, Tree Shaking
- [x] Code Splitting — 라우트·청크 분리
- [x] Lazy Loading — `React.lazy` + `Suspense`
- [x] Tree Shaking — sideEffects · ESM 전제
- [x] Dynamic import — `import()`
- [x] webpack vs Vite dev/prod 차이
- [x] **통과선** — splitting / shaking / CJS·ESM 30초

## 정리

### 한 줄

번들러는 모듈을 브라우저용으로 묶고, **ESM·code splitting·lazy load·tree shaking**으로 초기 번들을 줄이며, CJS-only 라이브러리는 shaking이 약해진다는 점을 안다.

### 핵심

- **번들러**: import 그래프 해석 → 하나 또는 여러 chunk로 출력. webpack(번들 중심), Vite(dev: 네이티브 ESM+esbuild 빠른 HMR, prod: Rollup 번들).
- **CJS vs ESM**: CJS는 `require`·동기·런타임 경로 → 정적 분석·dead code elimination 어려움. ESM은 `import/export` 정적 구조 → **Tree Shaking** 가능(단, side effect import·`sideEffects: false` 관리 필요).
- **Code Splitting**: 초기 JS↓ → TTI·LCP 개선(Day 27 CSR·Web Vitals). 라우트 단위 `React.lazy` + dynamic `import()`가 대표. tradeoff: 요청 수·워터폴 관리.
- **Tree Shaking 안 먹는 경우**: CJS 패키지, 부수효과 있는 모듈, barrel(`index.ts` re-export 전부) 오용.
- **Dynamic import**: 런타임에 chunk 로드 — 조건부 기능·모달·에디터 등.

### 흐름

```
앱 진입
  → 라우트별 lazy + Suspense fallback
  → 무거운 lib → dynamic import()
package.json "sideEffects": false (신중)
  → ESM-first deps 선택
빌드 분석 → initial chunk size · duplicate modules
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| CJS vs ESM | shaking·interop vs Node 레거시 |
| split vs lazy | 청크 나눔 vs 컴포넌트 지연 마운트 |
| webpack vs Vite dev | 번들 dev vs ESM dev server |
| barrel file | 편의 vs 전체 re-export로 shaking 깨짐 |
| devDependencies | 번들러가 import 그래프 따라감 — dev만 ≠ 절대 미포함 |

### 실무 연결

- `notes/2026-06-08_node-openssl-webpack.md` — Node·webpack 버전 정합(10-3).
- `notes/2026-06-15_script-loading-and-js-modules.md` — script type=module·로딩.
- Day 51 Suspense · Day 30 resource optimization — lazy와 연결.

### 면접 한 방

- **Q:** Code Splitting이 개선하는 지표와 Tree Shaking이 안 먹는 이유?
- **답:** 초기 번들 크기를 줄여 로드·TTI를 개선한다. Shaking은 ESM 정적 export 전제인데 CJS, side effect import, barrel 남용이면 unused code가 남는다.

### 통과선 스크립트

1. 번들러 = 모듈 → 브라우저 번들.
2. Vite dev ESM vs prod Rollup; webpack 번들 dev.
3. CJS shaking 불리, ESM 유리.
4. Code splitting·lazy → 초기 로드.
5. Tree shaking 전제·실패 원인 3가지.
6. dynamic `import()` 용도.
