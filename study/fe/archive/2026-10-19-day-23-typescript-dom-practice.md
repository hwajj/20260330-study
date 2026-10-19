# Day 23 · TypeScript + DOM 실전 — **완료**

SSOT 노트: [`../23-day-23-typescript-dom-practice.md`](../23-day-23-typescript-dom-practice.md)

## active 체크

- [x] day-23-typescript-dom-practice.md 끝까지 읽기
- [x] **curriculum 세 줄** — DOM Typing / Event Typing / narrowing 우선
- [x] **면접 Q** — querySelector `Element | null`, target vs currentTarget
- [x] W4 토 주말 — URL-sync 토이에 **detail route 1개** 추가
- [x] 리스트→상세 링크·params 타입 좁히기
- [x] **차이·함정** — `as` 남용 vs instanceof/null 체크
- [x] **통과선** — 3주 TS+DOM 묶기 + detail route

## 정리

### 한 줄

DOM/이벤트 API는 `null`·광의 타입을 돌려주므로 **narrowing을 우선**하고, 주말 토이에서는 리스트 URL-sync에 **detail 라우트**를 붙여 path/params까지 타입으로 고정한다.

### 핵심

- **DOM Typing**: `querySelector` → `Element | null`. 제네릭 `querySelector<HTMLInputElement>` 또는 null 체크 후 사용.
- **Event Typing**: `MouseEvent`, `ChangeEvent<HTMLInputElement>`(React). `event.target`은 실제 발생 노드라 단언/좁히기가 잦고, `currentTarget`은 리스너 요소로 더 명확.
- **Narrowing 우선**: `if (el instanceof HTMLInputElement)`, `if (!el) return`. `as`는 컴파일러만 속임 — 런타임 보장 없음.
- **미니 프로젝트 감각**: 타입 안전한 검색/Todo = Day 18~22 합본. W4 토이는 list+tab URL+RQ에 **detail**을 더해 라우트 계약까지 확장.
- path param `id`는 string — API number면 파싱·가드. 잘못된 id는 replace로 리스트로 되돌리는 패턴(dailycare JobDetail invalid tab과 유사).

### 흐름

```
/list?tab=…           URL-sync 목록
  → 행 클릭 (typed handler)
  → /list/:id  or  /items/:id
  → useParams → id narrowing
  → useQuery(['detail', id])
  → 상세 DOM 렌더
```

타입 체크 순서:

```
query / params 획득
  → null·undefined 가드
  → instanceof / 리터럴 유니온 좁히기
  → (최후) as — 최소화
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| narrowing vs `as` | 검사로 좁힘 vs 우회(위험) |
| target vs currentTarget | 발생 노드(넓음) vs 리스너 노드(명확) |
| `Element` vs `HTMLInputElement` | 일반 요소 vs value 등 특화 |
| path param string vs number id | 항상 string — 변환·검증 필요 |
| 상세 404 | fetch 실패와 라우트 miss를 UI에서 구분 |

### 실무 연결

- **W4 주말 과제**: Vite 미니 list+tab URL+RQ에 **detail route 1개**. 목록에서 id로 이동, 상세는 `['detail', id]` 쿼리. 북마크·공유 가능한 URL 계약 유지.
- dailycare: `jobs/:id` + `?tab=` — invalid tab은 `pickDefaultTab`+`replace`. 토이에서도 잘못된 param은 조용히 교정.
- nursing 목록→주문 상세 섹션 co-location과 같은 **리스트/상세 분리** 연습.
- Day 18 제네릭 훅 + Day 19 Pick 상세 DTO + Day 21 클릭 위임이 여기서 만난다.

### 면접 한 방

- **Q:** `querySelector`가 `Element | null`인 이유와, `as` 대신 뭘 쓰나? detail 라우트는?
- **답:** 못 찾을 수 있어서 null이다. null 체크나 `instanceof`, 제네릭 선택자로 좁히고 `as`는 최후 수단이다. target보다 currentTarget이 리스너 타입이 명확한 경우가 많다. 실전에서는 리스트 URL-sync에 `/items/:id`를 붙여 params를 가드한 뒤 detail query로 잇는다.

### 통과선 스크립트

1. DOM 반환 타입에 null이 있는 이유.
2. narrowing > assertion.
3. target vs currentTarget.
4. 3주 키워드 한 줄 묶기(제네릭·유틸·DOM·이벤트·성능).
5. (주말) detail route: params 좁히기 → detail queryKey → 목록과 URL 계약 공유.

## wrap 요약

1. Day23 go — TS+DOM 실전 + toy detail route.
2. W4 토 정리본·archive.
3. 다음: day-24-fetch · weekend Promise/fetch.

- **막힌:** —
- **다음 start:** `day-24-fetch` · `study/fe/24-day-24-fetch.md`
