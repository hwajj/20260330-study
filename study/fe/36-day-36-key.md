# Day 36 · key

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-05-react-rendering/day-36-key.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] key = **형제 사이 identity** (전역 unique 아님) 정의
- [x] index key 함정 — 정렬·삽입·입력 상태 꼬임
- [x] key 변경 = **언마운트·리마운트** (상태 초기화) 말하기
- [x] **W6 금** 4층 인가 **그림** + adjuster STAR 1개 2분
- [x] Query onError vs Error Boundary 3분 골격(금요 통과)
- [x] **차이·함정** — key vs id prop / 인가 4층 혼동
- [x] **통과선** — key 30초 + STAR + 통과 두 축

## 정리

### 한 줄

`key`는 리스트 형제가 **같은 항인지** React에 알려 reconciliation을 안정화하고, adjuster **4층 인가**는 인증 부트스트랩→loader→역할 레이아웃→QueryCache 에러로 **시점별로 identity(권한)를 다시 확인**한다.

### 핵심

- key는 props로 자식에 전달되지 않는 **reconciler용 힌트**. 같은 부모의 형제끼리만 유일하면 됨.
- 안정적 비즈니스 id(`ticketId`) 권장. `index`는 정적 목록에만 허용에 가깝고, 중간 삽입·필터·정렬 시 **DOM·state 재사용 오류**.
- `key={user.id}`를 바꾸면 컴포넌트가 **새로 마운트** — 폼 입력을 리셋하는 의도적 패턴으로도 씀.
- **4층 인가 (adjuster):**
  1. 인증 부트스트랩(JWT/세션)
  2. loader / authProtectedLoader (진입 전)
  3. RoleRestricted·path 정책 맵 (네비·레이아웃)
  4. QueryCache.onError Forbidden·승인대기 (서버 최종 거부)
- STAR: S 다역할·승인대기 혼재 / T 무권한 차단·전이 일관 / A path+loader+QueryCache / R 정량 없음·구조로 증명.

### 흐름

```
list.map(item => <Row key={item.id} />)
  → reconcile이 id로 항 매칭
  → 순서만 바뀌면 이동·갱신, id 없으면 오인 재사용

요청 경로
  로그인 → loader 가드 → 역할 레이아웃
       → useQuery → 403/승인대기 → QueryCache 분기
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| key vs `id` prop | reconciler 힌트 vs DOM/접근성 속성 |
| index key vs stable id | 편함 vs **순서 변경에 안전** |
| UI 가드만 vs 4층 | 클라 추측 vs **서버 최종 포함** |
| Query onError vs Error Boundary | fetch 실패 정책 vs 렌더 예외 UI |

### 실무 연결

- **열:** resume STAR «역할·승인 인가» + flashcard B6.
- 금요 통과: (1) Query onError vs Error Boundary 3분 (2) useHmcError 3분 — 월~화 복습을 key Day에 묶어 **말하기 완성**.
- 리스트 화면의 `key={id}`와 인가의 “어느 층 identity 실패인가”를 같은 날 혀에 올림.

### 면접 한 방

- **Q:** key는 왜 필요하나? / 인가를 왜 여러 층으로 두나?
- **답:** 형제 목록에서 항 신원을 고정해 잘못된 DOM·state 재사용을 막는다. 인가는 네비 전(loader)·역할 UI·API 거부가 시점이 달라 한곳에 못 모은다. 서버가 최종이므로 QueryCache에서 Forbidden/승인대기를 받는다.

### 통과선 스크립트

1. key = sibling identity.
2. index 함정 한 예.
3. key 변경 = remount.
4. 4층: bootstrap → loader → role layout → QueryCache.
5. STAR 2분 압축.
6. onError ≠ Error Boundary / useHmcError 한 줄씩.
