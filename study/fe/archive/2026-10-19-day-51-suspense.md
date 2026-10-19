# Day 51 · Suspense — **완료**

SSOT 노트: [../51-day-51-suspense.md](../51-day-51-suspense.md)

## active 체크

- [x] Suspense = 준비될 때까지 `fallback` UI
- [x] `React.lazy` + code splitting 관계
- [x] 일반 `useEffect+fetch`는 자동 Suspense 아님
- [x] Boundary를 쪼개 부분 로딩
- [x] Error Boundary와 역할 분담(로딩 vs 오류)
- [x] **주말:** 약한 주제 복습 — lazy 라우트 한 줄
- [x] **통과선** — isLoading vs Suspense 차이

## 정리

### 한 줄

Suspense는 자식이 “아직 준비 안 됨”을 선언적으로 기다릴 때 **fallback을 보여주는 경계**이고, lazy 로딩이 대표 사용처다.

### 핵심

- `React.lazy(() => import(...))`를 Suspense로 감싸 초기 번들을 나눈다.
- 데이터: Suspense-aware 라이브러리/프레임워크가 필요. 평범한 fetch+isLoading은 컴포넌트가 직접 분기.
- Boundary를 페이지 전체에 하나만 두면 일부 delay에 전체가 스켈레톤. 위젯 단위로 나눈다.
- **Suspense(로딩) + Error Boundary(오류)** 쌍으로 감싸는 그림이 면접에 잘 나온다.
- Streaming SSR은 서버가 조각 HTML을 먼저 보내는 맥락에서 Boundary와 만난다(개념만).

### 흐름

```
<Suspense fallback={<Spinner/>}>
  <LazyPage />  // 청크 로딩 중 → fallback
</Suspense>
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Suspense vs isLoading | 경계 선언 vs 컴포넌트 내부 분기 |
| Suspense vs Error Boundary | 대기 vs 예외 |
| lazy만 / Suspense 없음 | 로딩 UI 경계 없음·경고 |
| 전부 자동 fetch | 아님 |

### 실무 연결

- W8 주말: 손과제 라우트에 `lazy` 한 페이지만이라도 적용해 “초기 JS ↓”를 README에 한 줄. nursing/order 목록은 여전히 RQ isFetching UI가 현실적일 수 있음 — 둘을 혼동하지 않기.

### 면접 한 방

- **Q:** Suspense가 fetch 로딩을 다 해주나?
- **답:** 아니다. lazy 코드 로딩 등과 Suspense를 지원하는 데이터 층이 필요하다. 보통의 useEffect fetch는 isLoading을 직접 쓴다. Error Boundary와 역할이 다르다.

### 통과선 스크립트

1. fallback 경계.
2. lazy 연결.
3. fetch 자동 X.
4. Boundary 분할.
5. Error Boundary와 쌍.

## wrap 요약

1. Day51 go — fallback 경계 + lazy.
2. 주말 약한 주제.
3. 다음: 08-1 · History API.

- **막힌:** —
- **다음 start:** `08-1-spa-routing-history`
