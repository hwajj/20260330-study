# Day 14 · 주간 정리 (JS Advanced 리뷰)

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-02-js-advanced/day-14-review.md` (노션 정리 골격 · 모의면접은 별도) · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] Day8~13 축을 한 줄 스토리로 잇기 (EC → LE → Scope/Closure → Hoisting → this → Prototype)
- [x] 코드만 보고 `undefined` / `ReferenceError` / `TypeError` 구분 복기
- [x] this 호출 형태 + bind/call/apply 한 장 요약
- [x] Prototype 체인 조회 한 장 요약
- [x] **§4-A 목** care `result.tsx` + RQ **invalidate** / dailycare **ordering ref** vs care **paymentFlag**
- [x] 면접용 비교 글 감각(중복 주문·캐시 무효화) 10줄 분량으로 압축
- [x] **통과선** — W2 JS + 결제 결과 처리 45초

## 정리

### 한 줄

W2 JS는 «실행 환경이 변수를 어떻게 등록·탐색·바인딩·공유하는가»이고, 목요일 실무 축은 결제 **성공 후 캐시 invalidate**와 **중복 주문 가드(ref vs flag)** 를 같은 입으로 말하는 것이다.

### 핵심

- **실행 모델 한 줄**: EC가 환경을 만들고 → LE/스코프가 이름을 잡고 → 클로저가 바깥을 붙잡고 → Hoisting/TDZ가 실행 전 상태를 만들고 → this가 호출로 붙고 → prototype이 공유 메서드를 찾는다.
- **에러 삼총사**: `var` 조기 읽기 `undefined` · `let`/`const` TDZ `ReferenceError` · `undefined`를 함수처럼 호출 `TypeError`.
- **this**: 호출 형태 / 화살표 렉시컬 / bind는 새 함수.
- **prototype**: own 없으면 체인; class는 설탕.
- **주간 리뷰 목적**: 키워드 나열이 아니라 **코드→결과→이유**를 30초 단위로 끊기. 모의면접 Day는 별도.

### 흐름

```
[이론 복기]
EC → Scope/Closure → Hoisting/TDZ → this → Prototype

[결제 결과 축]
주문/PG 진행 → result 진입 → 성공 판정
  → job(또는 관련) 쿼리 invalidate
  → 목록/상세가 결제 후 서버 상태를 다시 받음

[중복 주문 가드]
진입 시 잠금 → API 1회 → finally 해제
  + 기존 order 보관 시 재진입은 PG만 재개
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Hoisting «위로» vs EC | 물리 이동 ❌ |
| Closure 메모리 누수? | 참조가 살아 있으면 GC 대상 아님 — 필요 시 끊기 |
| invalidate vs staleTime 대기 | 결제처럼 상태 전환 이벤트는 명시적 무효화가 안전 |
| **ordering ref** (dailycare) | 더블클릭·동시 진입으로 **주문 API 중복** 차단 |
| **paymentFlag** (care 레거시 언급) | 모듈 플래그 등 전역/모듈 잠금 — 테스트·동시성·리셋 책임이 ref보다 흐릴 수 있음 |
| ref vs state로 잠금 | 잠금 UI 리렌더가 필요 없으면 ref가 적합 |

### 실무 연결

- **§4-A 목 · result + invalidate**: care `result.tsx` / dailycare `PaymentResultPage` — 성공(`code === 200`) 시 `jobKeys.lists()`·`jobKeys.detail(jobId)` **invalidate**. staleTime(예: 10s) 동안 결제 전 공고 상태가 남는 문제를 막는다. «성공 이벤트 = 서버 소스가 바뀜 → 캐시 폐기».
- **ordering ref / paymentFlag**: dailycare `PaymentPage`의 `ordering`·`currentOrder` ref — 연속 클릭 주문 방지 + 팝업 재오픈 시 재주문 없이 진행. care 쪽 레거시 **paymentFlag**와 비교해 «어디에 잠금을 두었는가(컴포넌트 ref vs 모듈 플래그)»를 면접 10줄로 대비한다.
- W3 금요 통과 예습: PG 5단계 + diff 3행(중복주문·키·redirect)을 이 리뷰 날에 초안.

### 면접 한 방

- **Q:** 결제 성공 후 `invalidateQueries`를 안 하면? ordering ref는 뭐 막나요?
- **답:** 캐시가 결제 전 상태를 보여 줄 수 있습니다. 성공 시 목록·상세 키를 invalidate해 다음 fetch가 서버 상태를 받게 합니다. `ordering` ref는 더블탭으로 주문이 두 번 나가는 걸 막고, `currentOrder`로 재진입 시 같은 주문으로 PG만 재개합니다. care의 paymentFlag는 비슷한 잠금이지만 위치가 모듈/플래그라 리셋·테스트 책임이 다릅니다.

### 통과선 스크립트

1. W2: EC→스코프/클로저→Hoisting/TDZ→this→prototype 한 호흡.
2. 코드 보면 실행 전 상태 → 호출 → 체인 순으로 추적.
3. `undefined` / ReferenceError / TypeError 한 문장씩.
4. 결제 성공 → invalidate로 서버 상태 동기화.
5. ordering ref = 중복 주문 API 차단, currentOrder = 재진입 재사용.
6. paymentFlag와 «잠금 위치» 차이 한 줄.
7. 모의면접은 별도 Day — 오늘은 스토리 뼈대만.
