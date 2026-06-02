# 요양원 주문 담기 — 상태 3층·페이지 이동·draft 시점

> 작성일: 2026-05-29  
> 맥락: 물품 카탈로그에서 수량 input을 바꿨는데 새로고침해도 그대로인 이유, 카탈로그→주문서로 값을 어떻게 넘기는지, 서버·로컬·페이지 state가 헷갈릴 때

## 이 글의 질문

- 주문 담기에서 **서버 / 앱 전역 / 페이지 로컬**은 각각 무엇을 맡나?
- 카탈로그에서 주문서로 갈 때 **props나 URL로 안 넘겨도** 되는 이유는?
- **카탈로그**에서 담기와 **재고**에서 담기는 서버(draft)와 언제 맞추나?

## 핵심 (먼저 읽기)

| 구분 | 무엇을 저장하나 | 새로고침 후 | 대표 위치(이 레포) |
|------|-----------------|-------------|-------------------|
| **페이지 로컬** | 검색어·페이지 번호·모달 열림 | **대부분 사라짐** | `useState` (카탈로그 필터 등) |
| **앱 전역 + 디스크** | 담긴 품목·수량·창고별 배송 메모 | **남음** (localStorage) | `useCartStore` + 키 `nh-cart` |
| **서버** | 상품 목록·미제출 draft·제출된 주문 | **서버에 남음** (단, UI는 아래 규칙) | React Query, `nh-draft` API |

| 화면 | 담기 직후 서버 draft |
|------|---------------------|
| **물품 카탈로그** | **안 맞춤** — Zustand(+localStorage)만 |
| **재고 현황** | **바로 맞춤** — `postDraftLine` / `patchDraftLine` 후 스토어 갱신 |
| **주문서 제출 직전** | **한 번에 맞춤** — `syncDraftToServer` 후 주문 API |

## 전제 (30초)

- **브라우저**: 사용자가 보는 화면. JavaScript로 input·버튼을 다룬다.
- **SPA(단일 페이지 앱)**: 페이지를 바꿔도 앱 전체가 완전히 새 HTML로 갈아끼우지 않고, **같은 탭 안의 JavaScript**가 계속 살아 있다.
- **서버 API**: 상품 목록·“아직 제출 안 한 주문 줄(draft)”·실제 주문 제출을 저장한다.
- **localStorage**: 브라우저가 디스크에 두는 작은 저장소. **새로고침(F5)** 해도 같은 출처(도메인)에서는 값이 남는다.

## 한눈에

### 그림 1 — 상태가 쌓이는 3층

```
[서버]
  GET catalog 목록          ← 카탈로그 표만 (읽기)
  GET/PATCH draft           ← 미제출 주문 줄 (계정·서버 DB)
  POST 주문 제출            ← 제출 후 draft 비움

        ↑ hydrate(로컬 비었을 때만)     ↑ 제출 직전 sync
        │                               │
[앱 전역 Zustand + localStorage "nh-cart"]
  lines[], shippingRequestByWarehouseId
  ← 카탈로그 수량 input, 주문서 편집이 여기를 읽고 씀

        ↑ useState (페이지만)
[페이지 로컬]
  검색어, page, 모달 open …
```

### 그림 2 — 카탈로그 → 주문서 (값을 “안 넘김”)

```
CatalogPage                    CartOrderPage
   │                                │
   │  Link to="/…/cart"             │
   │  (props / query 없음)          │
   └──────────┬─────────────────────┘
              │
        useCartStore  ←── 같은 서랍
        (persist nh-cart)
```

## 용어 (이 글에서만)

| 용어 | 한 줄 뜻 |
|------|----------|
| **Zustand** | React 밖/안에서 쓰는 가벼운 **전역 상태** 라이브러리 |
| **persist** | Zustand 상태를 **localStorage**에 자동 저장·복원하는 미들웨어 |
| **draft** | 아직 “주문 제출”하지 않은 **미제출 주문 줄** (서버 API `nh-draft`) |
| **controlled input** | `value={state}`로 React가 input 글자를 **state와 묶어** 두는 패턴 |
| **React Query** | 서버에서 가져온 데이터를 캐시·재요청하는 **서버 상태** 도구 |
| **hydration** | 앱이 켜질 때 서버 draft를 스토어에 **한 번** 채우는 동작 (`useNhDraftHydration`) |

---

## 목차

1. [주문 담기 상태 3층](#1-주문-담기-상태-3층)
2. [페이지 이동 시 값을 안 넘겨도 되는 이유](#2-페이지-이동-시-값을-안-넘겨도-되는-이유)
3. [카탈로그 vs 재고 — draft 맞추는 시점](#3-카탈로그-vs-재고--draft-맞추는-시점)

---

## 1. 주문 담기 상태 3층

지금 설명하는 것은 **“어디에 무엇을 두었는가”** 한 장 지도다.

### 한 줄 요약

**화면에 보이는 모든 input이 “그 페이지만의 state”는 아니다** — 주문 수량은 **전역 장바구니(Zustand) + localStorage**에 붙어 있다.

### 함정 한 가지

**착각:** “카탈로그 화면의 input을 바꿨으니 페이지 state다 → 새로고침하면 사라져야 한다.”  
**실제:** 그 input은 `useState`가 아니라 **`cart.lines`에서 읽은 수량**을 `value={qty}`로 보여 준다. 수량 변경은 `commitCartQty` → `addLine` / `updateQuantity`로 **스토어**를 고친다. `persist` 때문에 **F5 후에도** DevTools → Application → Local Storage → `nh-cart`에서 복원된다.

반대로 **검색어·카테고리·페이지**는 `useState`만 쓰므로 새로고침하면 **초기화되는 것이 정상**이다.

### 왜 이렇게인가

주문서(미제출)는 카탈로그·재고·주문서 화면을 **오가며** 이어서 편집한다. 페이지마다 따로 state를 두면 “카탈로그에서 3개 담았는데 주문서는 0개”처럼 **어긋나기 쉽다**. 그래서 담긴 라인의 **단일 출처(SSOT)** 를 `useCartStore`로 두고, 브라우저를 닫았다 열어도 이어 쓰게 **localStorage**에 백업한다.

서버 draft는 **다른 기기·탭**이나 **로컬이 비었을 때** 복구용 + **제출 직전** 최종 검증(단가·품절)용으로 쓴다. 카탈로그에서 매 수량 변경마다 API를 치지 않는 것은 **담기가 잦을 때** 네트워크·레이스를 줄이기 위한 선택이다(재고 화면은 정책이 다름 — §3).

### 참고 코드

**전역 스토어 + persist 이름** — 담긴 줄이 여기 저장된다.

```51:55:src/stores/cart-store.ts
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      shippingRequestByWarehouseId: {},
```

```168:169:src/stores/cart-store.ts
    {
      name: 'nh-cart',
```

**카탈로그 수량 input은 스토어에서 읽음** — 페이지 전용 `useState`가 아님.

```69:71:src/routes/nursing-hospital/supplies/CatalogPage.tsx
  function getRowQtyValue(item: CatalogProduct) {
    const inCartLine = cart.lines.find((l) => l.productId === item.id);
    return inCartLine?.quantity ?? 0;
```

**로컬이 비었을 때만 서버 draft를 1회 가져옴** — 로컬 우선.

```6:21:src/hooks/use-nh-draft-hydration.ts
/**
 * 서버 draft → Zustand 1회 동기화.
 * persist된 로컬 주문서가 있으면 덮어쓰지 않는다(로컬 우선).
 */
...
    if (useCartStore.getState().lines.length > 0) {
      return;
    }
```

### 이 레포에서는

| 파일·키 | 역할 |
|---------|------|
| `src/stores/cart-store.ts` | 미제출 주문 줄·창고별 배송 메모의 **클라이언트 정본** |
| localStorage `nh-cart` | 새로고침·재방문 시 복원 |
| `src/hooks/use-nh-draft-hydration.ts` | 카탈로그·주문서 마운트 시 서버 draft **보조** 동기화 |
| `CatalogPage` `useState` | 목록 필터·페이지네이션만 (담기 수량 아님) |
| `catalogQueries` (React Query) | **상품 목록** 서버 읽기 전용 |

### 면접 한 줄 (선택)

“서버 state(Query), 클라이언트 전역(Zustand+persist), UI 로컬(useState)을 **수명·복구 요구**에 맞게 나눈다. 수량 input이 페이지에 있어도 **소유권**은 스토어에 있을 수 있다.”

---

## 2. 페이지 이동 시 값을 안 넘겨도 되는 이유

지금 설명하는 것은 **라우트(URL)만 바꿀 때 데이터를 어떻게 이어 붙이는지**다.

### 한 줄 요약

카탈로그→주문서는 **같은 Zustand 서랍**을 쓰는 두 방이라, `Link`로 **경로만** 바꾸면 된다 — props·query string으로 줄 목록을 실을 필요가 없다.

### 함정 한 가지

**착각:** “다른 페이지로 가면 state가 초기화된다.”  
**실제:** SPA에서 **컴포넌트 트리 일부만** 바뀌고, **모듈 최상위에 만든 Zustand 스토어**와 **localStorage**는 라우트와 무관하게 유지된다. 사라지는 것은 **그 페이지 컴포넌트의 `useState`** 뿐이다.

### 왜 이렇게인가

React Router의 `Link`는 **주소만** 바꾼다. `CartOrderPage`는 마운트되면서 `useCartStore()`로 **이미 채워진 `lines`** 를 구독한다. 예전 패턴인 “location.state로 장바구니 넘기기”는 새로고침·딥링크에 약하고, 이 앱은 **주문서 전용 URL**(`/nursing-hospital/supplies/cart`)을 열어도 persist·draft hydration으로 복구할 수 있게 설계했다.

### 참고 코드

**라우트만 분리** — 두 페이지는 형제 경로.

```112:115:src/App.tsx
      <Route path="/nursing-hospital/supplies/catalog" element={<CatalogPage />} />
      <Route path="/nursing-hospital/supplies/inventory" element={<NHInventoryPage />} />
      <Route path="/nursing-hospital/supplies/withdrawal" element={<WithdrawalPage />} />
      <Route path="/nursing-hospital/supplies/cart" element={<CartOrderPage />} />
```

**카탈로그 — props 없이 Link만**

```189:195:src/routes/nursing-hospital/supplies/CatalogPage.tsx
                <Link
                  to="/nursing-hospital/supplies/cart"
                  className="btn btn--ghost"
                  aria-label={`주문서 보기, 담긴 품목 ${lines.length}종`}
                >
                  {`주문서 보기 (${lines.length}종)`}
```

**주문서 — 같은 스토어 구독**

```157:159:src/routes/nursing-hospital/supplies/CartOrderPage.tsx
  const cart = useCartStore();

  const lines = cart.lines;
```

### 이 레포에서는

| 확인 방법 | 기대 결과 |
|-----------|-----------|
| 카탈로그에서 수량 변경 → 「주문서 보기」 | 주문서에 동일 라인·수량 |
| 주문서에서 수량 변경 → 뒤로 카탈로그 | 테이블 input에 반영 |
| F5 on `/cart` | `nh-cart` 복원 후 목록 표시 (로컬에 줄이 있었으면) |

기획: [cart-order.md](../docs/nursing-hospital/supplies/cart-order.md) — 주문서는 **전면 라우트**, 카탈로그에서 *주문서로* 링크.

### 면접 한 줄 (선택)

“페이지 간 공유가 필요하면 URL state보다 **전역 클라이언트 store + 필요 시 persist**가 딥링크·새로고침에 유리한 경우가 많다.”

---

## 3. 카탈로그 vs 재고 — draft 맞추는 시점

지금 설명하는 것은 **같은 ‘담기’인데 왜 서버 호출 시점이 다른지**다.

### 한 줄 요약 (정책)

**카탈로그 담기 = 클라이언트에 먼저 쌓고**, **재고 담기 = 서버 draft에 먼저 맞춘 뒤** 스토어를 갱신한다. **제출**은 주문서에서 서버 draft와 한 번 더 맞춘 다음 주문 API를 친다.

### 함정 한 가지

**착각:** “담기 = 항상 `postDraftLine`이다.”  
**실제:** `CatalogPage`는 `nh-draft`를 import조차 하지 않는다. 테스트도 **카탈로그 담기 시 draft API 미호출**을 검증한다. 재고 `handleAddToSheet`만 `postDraftLine` / `patchDraftLine`을 **루프 안에서** 호출한다.

### 왜 이렇게인가

카탈로그는 SKU 탐색·수량 조절이 **연속적**이라 매 키입력마다 서버와 맞추면 느리고, 실패 시 UX가 깨지기 쉽다. 재고의 “주문서에 담기”는 **선택한 부족 품목을 한 번에** 확정하는 액션이라, 서버 draft를 **즉시 정본에 가깝게** 두는 편이 안전하다. 어느 경로든 **주문 제출 직전** `syncDraftToServer`로 로컬·서버를 맞추고, 단가 변동·품절을 서버 응답으로 반영할 수 있다.

### 참고 코드

**재고 — 담기 시 draft API + 스토어 동기화**

```127:133:src/routes/nursing-hospital/supplies/InventoryPage.tsx
  const addDraftMutation = useMutation({
    mutationFn: postDraftLine,
  });
  const patchDraftMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      patchDraftLine(productId, quantity),
  });
```

```218:240:src/routes/nursing-hospital/supplies/InventoryPage.tsx
        if (existing) {
          const body = await patchDraftMutation.mutateAsync({
            productId: item.productId,
            quantity: existing.quantity + targetQty,
          });
          useCartStore.getState().syncLineFromDraft(body);
        } else {
          const body = await addDraftMutation.mutateAsync({
            productId: item.productId,
            quantity: targetQty,
          });
          useCartStore.getState().addLine({
            productId: body.productId,
            ...
```

**주문서 — 제출 확인 시에만 로컬→서버 draft 일괄 sync** (함수명 `syncDraftToServer`).

```115:116:src/routes/nursing-hospital/supplies/CartOrderPage.tsx
/** 제출 직전: 로컬 주문서 → 서버 draft (삭제·수량·단가·가용 반영) */
async function syncDraftToServer(localLines: CartLine[]): Promise<DraftPriceChange[]> {
```

### 이 레포에서는

| 진입 화면 | 담기 직후 | 제출 시 |
|-----------|-----------|---------|
| 물품 카탈로그 | `useCartStore`만 | `syncDraftToServer` → `createNHOrder` → `clearCart` + `clearAllDraftLines` |
| 재고 현황 | draft API + 스토어 | 동일 |
| (로컬 비어 있고 서버에만 draft) | `useNhDraftHydration` | 동일 |

### 더 볼 것 (선택)

- [catalog.md](../docs/nursing-hospital/supplies/catalog.md) — 행 단위 담기·주문서에서 공급처 변경 불가
- [cart-order.md](../docs/nursing-hospital/supplies/cart-order.md) — 미제출 주문서·제출 흐름

### 면접 한 줄 (선택)

“클라이언트 SSOT와 서버 draft의 **동기화 시점**은 UX·일관성 트레이드오프다. 지연 sync는 빠르지만 제출 전 검증 단계가 필수다.”

---

## 더 볼 것 (공통)

- INDEX의 [관련 개념 — 서버·클라이언트 state](./2026-05-28_concepts-server-client-state.md) (파일이 있으면 SSOT·낙관적 업데이트 심화)
- [주문서 수량 UX 시행착오](./2026-05-28_react-query-optimistic-update.md) (파일이 있으면 debounce·낙관적 업데이트 역사)
