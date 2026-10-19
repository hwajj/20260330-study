# Day 22 · Browser Performance — **완료**

SSOT 노트: [`../22-day-22-browser-performance.md`](../22-day-22-browser-performance.md)

## active 체크

- [x] day-22-browser-performance.md 끝까지 읽기
- [x] **curriculum 세 줄** — Reflow/Repaint / Layout Thrashing / Debounce·Throttle·rAF
- [x] **면접 Q** — 무엇이 더 비싼지, thrashing 피하는 법
- [x] W4 금 — Vite env (`10-3` / `VITE_*`) 복습
- [x] 토이 README 5줄 + 불필요 리렌더·레이아웃 유발 정리
- [x] **차이·함정** — Debounce vs Throttle, env 노출
- [x] **통과선** — 성능 키워드 + Vite env 공개/시크릿

## 정리

### 한 줄

크기·위치 변경은 Reflow가 비싸고, 읽기/쓰기 교차는 thrashing을 낳으며, 입력·스크롤은 Debounce/Throttle·rAF로 호출을 줄이고, Vite `VITE_*`는 **빌드에 박히는 공개 값**이다.

### 핵심

- **Reflow (Layout)**: 기하 재계산 — 하위까지 전파 가능. Repaint보다 무겁다.
- **Repaint**: 색·배경 등 시각만. 기하는 유지.
- **Layout Thrashing**: `getBoundingClientRect` 읽기 ↔ 스타일 쓰기를 번갈아 → 강제 동기 레이아웃 반복. **읽기 묶음 → 쓰기 묶음**.
- **requestAnimationFrame**: 다음 페인트 직전. 애니메·스크롤 연동을 프레임에 맞춤.
- **Debounce**: 마지막 호출 후 Nms 1번 — 검색 입력·resize 끝.
- **Throttle**: 간격당 최대 1번 — 스크롤 중 UI 갱신.
- Day 04 Composite와 연결: `transform`/`opacity`는 상대적으로 쌈.

### 흐름

```
이벤트 폭주 (input / scroll / resize)
  → Debounce or Throttle or rAF로 호출 축소
  → DOM/스타일 변경
  → Reflow? Repaint? Composite-only?
```

Vite env (W4 금):

```
.env → import.meta.env.VITE_* (빌드 시 문자열 치환)
  → 공개 API base 등만
  → 시크릿은 VITE_ 붙이지 말 것 / 서버만
  → 비우면 '/api' + proxy → same-origin (CORS 회피)
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Reflow vs Repaint | 기하 vs 다시 칠하기 — Reflow가 비쌈 |
| Debounce vs Throttle | 최종 1번 vs 주기적 1번 |
| rAF vs setTimeout | 페인트 동기 vs 타이머(지터) |
| 읽기/쓰기 교차 | thrashing — 배치로 분리 |
| `VITE_*` vs 무접두사 | 번들 노출 가능 vs 서버 전용이어야 함 |

### 실무 연결

- **Vite env (Day 10-3 복습)**: `import.meta.env.VITE_API_BASE_URL`. 접두사 있는 값만 클라이언트. nursing은 env 없으면 `'/api'` + Vite proxy → 브라우저 same-origin. env에 절대 URL을 넣으면 CORS가 **오히려** 날 수 있음(`docs/notes/2026-05-29_cors-local-dev.md`).
- W4 금: 토이 README 5줄 — 탭 URL, RQ key, keepPreviousData, env/proxy, slice 이름. 코드에서 불필요한 레이아웃 유발(큰 리스트 통째 key 변경 등) 점검.
- 검색 필터를 URL에 쓸 때 input마다 setParams 하면 렌더·fetch가 폭주 → Debounce와 궁합.

### 면접 한 방

- **Q:** Reflow와 Repaint 중 뭐가 비싸고, thrashing·Debounce/Throttle은?
- **답:** Reflow가 더 비싸다. 읽기와 쓰기를 섞으면 강제 레이아웃이 반복되니 읽고 나서 쓴다. 입력 최종값이면 Debounce, 스크롤처럼 주기 반영이면 Throttle, 애니메는 rAF. 프론트 env는 `VITE_`가 붙으면 번들에 들어갈 수 있어 시크릿을 넣으면 안 된다.

### 통과선 스크립트

1. Reflow > Repaint 한 줄.
2. thrashing = 읽기/쓰기 교차.
3. Debounce / Throttle / rAF 각각 한 장면.
4. transform 쪽 애니메 감각(Day04).
5. (회사) Vite `VITE_*` 공개·빌드 주입, `/api`+proxy vs 절대 URL CORS.

## wrap 요약

1. Day22 go — Reflow/Debounce + Vite env.
2. W4 금 정리본·archive.
3. 다음: day-23-typescript-dom-practice · toy detail route.

- **막힌:** —
- **다음 start:** `day-23-typescript-dom-practice` · `study/fe/23-day-23-typescript-dom-practice.md`
