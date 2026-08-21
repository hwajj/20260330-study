# 학습 노트 목차

> `.study/` 학습 노트 인덱스. **새 글 추가·기존 글 제목 변경 시 이 파일을 함께 갱신한다.**
> 카테고리는 [study-notes 룰](../.cursor/rules/study-notes.mdc) + [write-study-note 스킬](../.cursor/skills/write-study-note/categories.md) 확장 분류를 따른다.

---

## 빠른 통계
ㅉ
|------|-----|
| 전체 |  |
| 최근 갱신 | 2026-06-30 |
 
---

## 카테고리별
ㅉ
### 브라우저·네트워크

| 날짜 | 제목 | 한 줄 |
|------|------|-------|
| 2026-05-29 | [로컬 개발 — CORS, `/api`, 프록시, 서버 두 번 켜기](./2026-05-29_cors-local-dev.md) | `/api` same-origin·3001 직통 CORS·상대 URL·이중 dev 함정 |

### DB·ORM

| 날짜 | 제목 | 한 줄 |
|------|------|-------|
| 2026-06-01 | [DB 연결과 풀 — 처음부터 쉽게](./2026-06-01_db-connection-basics.md) | 연결·풀·15한도≠사용자·로컬 dev 연결 고갈(EMAXCONNSESSION) |
| 2026-06-01 | [Supabase Session pool — 「15개만 연다」](./2026-06-01_supabase-session-pool-slots.md) | Session=연결 점유·15슬롯·로그인 세션과 다름·5432 vs 6543 |

### 상태·데이터

| 날짜 | 제목 | 한 줄 |
|------|------|-------|
| 2026-06-02 | [Zustand selector — useStore() 전체 구독 vs 선택 구독](./2026-06-02_zustand-selector.md) | selector 없으면 관심 없는 값이 바뀌어도 리렌더·shallow 비교 필요성 |
| 2026-06-02 | [카탈로그 UI state vs 주문서 draft — 어디까지 local, 어디서부터 서버](./2026-06-02_local-vs-draft-state.md) | 담기 버튼이 경계·rowQtys 로컬·draft API SSOT·optimistic 패턴 |
| 2026-05-29 | [요양원 주문 담기 — 상태 3층·페이지 이동·draft 시점](./2026-05-29_nh-cart-three-layers.md) | Zustand+persist·Link 공유·카탈로그 vs 재고 draft 시점 |
| 2026-05-28 | [주문서 수량 UX — 서버→낙관적→debounce→로컬](./2026-05-28_react-query-optimistic-update.md) | 4단계 시행착오, 최종은 Zustand+persist·제출 시 sync |
| 2026-05-28 | [관련 개념 — 서버·클라이언트 state · 동기화](./2026-05-28_concepts-server-client-state.md) | SSOT·낙관적·debounce·race·flush 개념 사전 |

### 성능

| 날짜 | 제목 | 한 줄 |
|------|------|-------|
| 2026-06-02 | [큰 테이블 리렌더 — state 하나 바뀌면 왜 모든 행이 다시 그려지나](./2026-06-02_table-rerender-perf.md) | 인라인 렌더·전체 구독·memo 부재가 겹치면 100개 행이 매 클릭마다 재실행됨 |

### 인증·권한

| 날짜 | 제목 | 한 줄 |
|------|------|-------|
| 2026-05-29 | [SPA 로그아웃 — 버튼 눌렀는데 왜 안 나가지?](./2026-05-29_spa-logout-three-layers.md) | clearAuth vs logout·이중 저장·사이드바 연결·Guard |

### 아키텍처 · 워크플로

| 날짜 | 제목 | 한 줄 |
|------|------|-------|
| 2026-05-11 | [AI 기반 구현-검증-수정 개발 워크플로우](./2026-05-3주차_김성현.md) | 기획 SSOT + continue/verify/revise-impl 사이클 |
| 2026-06-02 | [요양원 UI 규칙 문서 — nh-ui 정리](./2026-05-4주차_정화정.md) | nh-ui vs design.md 층·한 시각 행·문서는 맞고 필터 코드는 아직 반쯤 |

---

## 아직 없는 카테고리

아래는 글이 생기면 위 표에 **해당 섹션을 새로 만들고** 행을 추가한다. 전체 목록은 [categories.md](../.cursor/skills/write-study-note/categories.md).

**프론트엔드**: JavaScript, TypeScript, React, CSS·레이아웃, 접근성·HTML, 테스트, 보안, FE 설계, 디버깅·이슈

**백엔드·풀스택**: Node·서버, API·계약, 검증·에러

**CS·기초**: 자료구조, 알고리즘, OS·런타임, 네트워크, DB 이론, 분산·신뢰성, 설계 원칙

**도메인**: 도메인·업무 (B2B 정책·상태 전이 등)

---

## 갱신 규칙 (에이전트용)

1. `.study/`에 **새 md 추가** 또는 **제목(h1) 변경** 시 → 이 INDEX에 행 추가/수정
2. **빠른 통계** 전체 개수·최근 갱신일 갱신
3. 카테고리가 없으면 `## {카테고리명}` 섹션 생성
4. `INDEX.md` 자체는 목차에 넣지 않음

## 파일명 규칙

- 권장: `YYYY-MM-DD_{주제-kebab}.md`
- 예외: 주차·이름 포함 파일(`2026-05-3주차_김성현.md`)도 목차에 포함
