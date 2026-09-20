# 손해보상찾기 (backoffice-adjuster) — 면접 메모 (참고)

> **8주 플랜에서는 미사용.** 학습은 [`CURRICULUM-BRIDGE-8W.md`](../../CURRICULUM-BRIDGE-8W.md) + [`resume-2026-08-21-1256.md`](./resume-2026-08-21-1256.md).

아래는 예전 면접 방어용 압축 메모. 필요할 때만 참고.

---

## 덱 A — 아키텍처 한 장 (10장)

### A1
**앞:** 손해보상 FE 아키텍처를 한 문장으로?

**뒤:**
- **답:** PC/모바일/shared 모노레포. 앱 내부는 routes(진입·인가) → presentations+viewModel → applications(API·Query) → store(Redux persist). 서버 데이터=Query, 영속 신원=Redux, 진입 전=loader.
- **Why:** 관심사·상태 소유권을 레이어로 고정.
- **경험:** NamingConvention + Readme 기준으로 도메인 추가 시 파일 위치가 정해짐.

---

### A2
**앞:** npm workspaces를 쓴 이유? shared는 뭐가 들어감?

**뒤:**
- **답:** 배포 단위는 PC·모바일로 갈라지고, JWT/HttpClient/DTO·공통 UI·훅은 shared. pc/mobile → shared 의존, shared는 앱을 import하지 않음.
- **Why:** UX·메뉴·브랜치/환경이 달라도 HTTP·인증 중복 제거.
- **경험:** `@hmc-fca-fe/shared` + 사내 `@backoffice-fe/*` 병행.

---

### A3
**앞:** MVVM이라고 해도 되나? 면접에서 정확히 뭐라고 말함?

**뒤:**
- **답:** README는 MVVM(안). 실제는 **계층형 FE + viewModel 훅** — Page는 얇고, 화면 유스케이스·검증·네비는 viewModel 훅.
- **Why:** 엄밀한 데스크톱 MVVM과 1:1은 아님; 과장하면 꼬리 질문 위험.
- **경험:** ConsultDetailPage, useLogin 같은 presentations 패턴.

---

### A4
**앞:** applications / presentations / store / routes / core — 각각 한 줄?

**뒤:**
- **답:** routes=URL·loader·인가 진입 / presentations=Page+viewModel / applications=Service·DTO·@query / core=enum·상수·순수 유틸 / store=전역·persist 클라 상태.
- **Why:** API·캐시·UI 상태를 한 파일에 섞지 않음.
- **경험:** ConsultService, authProtectedLoader, auth/user slices.

---

### A5
**앞:** React Query vs Redux — 무엇을 어디에?

**뒤:**
- **답:** **Query** = 서버 목록/상세 캐시·refetch. **Redux persist** = 토큰·유저·역할 등 새로고침 후에도 남을 것. **Redux non-persist** = 모달 등 UI 전역. **loader** = 라우트 진입 전 필수 데이터·인증.
- **Why:** 서버 truth는 Query가 맡고, 신원은 persist.
- **경험:** QueryCache.onError와 store whitelist.

---

### A6
**앞:** Query와 Redux persist가 맞닿을 때 트레이드오프?

**뒤:**
- **답:** 유저/역할이 persist와 API 응답 양쪽에 있으면 **동기화 규칙** 필요. persist **version + migration**으로 role 스키마 변경 대응.
- **Why:** “Redux만 믿으면” 서버와 어긋남.
- **경험:** store migration 설정.

---

### A7
**앞:** Provider 스택 순서 (모바일/PC 공통 골격)?

**뒤:**
- **답:** Redux → PersistGate → (Clarity) → QueryClientProvider → RouterProvider. HTTP baseURL·JwtAuth.register는 **렌더 전 모듈 스코프** 부트스트랩.
- **Why:** 인프라 설정과 UI 트리 분리.
- **경험:** App.tsx 컴포지션.

---

### A8
**앞:** 인가가 4층인 이유 — 각 층은 언제 동작?

**뒤:**
- **답:** ① JwtAuth 부트(storage+AuthAPI) ② Router loader(미인증 리다이렉트) ③ Layout path×역할(RoleRestricted*) ④ Query/API Forbidden·승인대기(ApprovedPendingAccessError).
- **Why:** loader/layout=네비 시점, Query 에러=**서버가 거부한 시점** — 한 레이어로 못 막음.
- **경험:** PENDING_CEO 등 레이아웃 분기.

---

### A9
**앞:** loader vs viewModel에서 fetch — 언제 loader?

**뒤:**
- **답:** **loader:** 전환 전 데이터 없으면 화면 자체가 성립 안 될 때(상세·미리보기·인증 확인). **viewModel+Query:** 클릭·필터 등 상호작용 후 갱신.
- **Why:** React Router v6 loader = 진입 전 blocking 준비.
- **경험:** 모바일 loadable + loader 병행.

---

### A10
**앞:** shared vs `@backoffice-fe/*` — 면접에서 어떻게 말함?

**뒤:**
- **답:** **shared** = 이 제품군(hmc-fca) 공통. **@backoffice-fe** = 조직(백오피스) 공통. 단일 SSOT는 아니라 **중복·경계 리스크**를 솔직히 말함. 후자 전체를 “내가 설계”라고 하지 않음.
- **Why:** 면접관이 모노레포 경계를 파고듦.
- **경험:** package.json workspaces + 사내 패키지 의존.

---

## 덱 B — 크로스앱·기능·함정 (10장)

### B1
**앞:** PC와 모바일 배포가 갈라졌을 때 로그인 연속성은?

**뒤:**
- **답:** 스토리지/오리진이 달라서 **원타임 토큰+role 쿼리**로 상대 앱에서 세션 재구성(`UATransition`).
- **Why:** localStorage 공유 불가.
- **경험:** 모바일→PC 전환 UX.

---

### B2
**앞:** 모바일에서 PC 전용 메뉴는 어떻게 막음?

**뒤:**
- **답:** PC 전용 **path 목록** + 라우트 정책으로 차단 후 PC 유도 — 제품 경계를 URL 정책으로 표현.
- **Why:** 한 앱에 다 넣으면 번들·UX 비대.
- **경험:** RoleRestricted·path 정책.

---

### B3
**앞:** 모바일 `--vh` / visualViewport — 왜?

**뒤:**
- **답:** 모바일 브라우저 주소창·툴바로 **100vh가 실제 보이는 영역과 어긋남** → `--vh` 보정.
- **Why:** 풀스크린 레이아웃 깨짐 방지.
- **경험:** 모바일 레이아웃 이슈 대응.

---

### B4
**앞:** 코드 스플리팅 — 모바일은? PC는?

**뒤:**
- **답:** 모바일: `@loadable/component` 페이지 지연 로딩 + loader. PC: createBrowserRouter; **현재 런타임은 ServiceClosedPage** (기능 라우트는 주석·코드에 설계 보존).
- **Why:** 초기 번들·상세 진입 데이터.
- **경험:** 면접에서 PC “종료 페이지” 솔직히 구분.

---

### B5
**앞:** PC ServiceClosed만 보이면 “뭐 했어?”에 뭐라고?

**뒤:**
- **답:** **현재 운영 진입점은 종료 UI**이나, 도메인 계층·주석 라우트·applications/presentations에 **구축한 구조가 남아 있음**. “지금 서비스 ON”이 아니라 “아키텍처·도메인 코드를 이렇게 짰다”로 말함.
- **Why:** 거짓말 없이 기여 범위 명확히.
- **경험:** Router 주석, dash/계약 PDF 등 PC 코드.

---

### B6
**앞:** QueryCache 전역 onError — Forbidden / 승인대기를 왜 Query에서?

**뒤:**
- **답:** API가 **403·승인 대기**로 거부하는 건 “데이터 요청의 부작용”. UI 가드만으로는 서버 최종 상태 반영 불가 → QueryCache에서 커스텀 에러 분기.
- **Why:** 인가를 presentation만에 두지 않음.
- **경험:** ApprovedPendingAccessError 등.

---

### B7
**앞:** 계약 PDF — 클라(html2canvas + jsPDF) 선택의 트레이드오프?

**뒤:**
- **답:** **장점:** 서버 PDF 파이프 없이 빠른 전달, iframe 렌더 후 캡처(`useDownloadPdf`). **단점:** 성능·인쇄 픽셀·보안은 서버 생성보다 약함.
- **Why:** 면접에서 “왜 서버 PDF 안 함?” 대비.
- **경험:** PC 계약 미리보기/다운로드.

---

### B8
**앞:** 대시보드 Chart.js — FE 관점 역할?

**뒤:**
- **답:** DashboardService로 API → Chart.js 섹션 렌더. **운영 현황 시각화**를 presentations/dash 계층에 둠.
- **Why:** applications Service + UI 분리 유지.
- **경험:** dash presentations.

---

### B9
**앞:** 계층이 깨지는 대표 anti-pattern 3가지?

**뒤:**
- **답:** ① presentations가 Service URL 직접 호출 ② store에 **서버 목록 전체** 적재 ③ shared가 앱 store import. **정답 방향:** Service/@query + viewModel 경유.
- **Why:** NamingConvention이 막으려는 것.
- **경험:** 코드 리뷰·컨벤션 문서.

---

### B10
**앞:** Vite mode dev/qa/prod/proto — FE에서 의미?

**뒤:**
- **답:** **앱별·환경별 빌드/설정 분기** (API base, 기능 플래그 등). workspaces에서 pc/mobile **독립 배포**와 맞물림.
- **Why:** 백오피스 다환경 배포.
- **경험:** project-fca-pc / mobile Vite 설정.

