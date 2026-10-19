# Day 08 · Execution Context — **완료**

SSOT 노트: [`../08-day-08-execution-context.md`](../08-day-08-execution-context.md)

## active 체크

- [x] day-08-execution-context.md 끝까지 읽기
- [x] EC = 코드 실행 단위 · GEC / FEC · Call Stack 관계
- [x] **생성 단계 vs 실행 단계** — 선언 등록·LE·`this` / 실제 실행
- [x] Lexical Environment가 EC 안에서 하는 일(미리보기, Day09 깊게)
- [x] 호이스팅을 “위로 이동”이 아니라 **생성 단계 선언 처리**로 말하기
- [x] adjuster resume **상태 소유권** 절 — Query / Redux / loader
- [x] “실행 컨텍스트 스택” ↔ “상태 소유 레이어” 비유 한 줄(과한 동일시 금지)
- [x] **통과선** — EC→LE→Call Stack 30초 (var/TDZ 세부는 Day11)

## 정리

### 한 줄

**Execution Context**는 JS가 코드를 돌리기 위해 만드는 실행 단위이고, **Call Stack**에 쌓였다 빠지며, 그 안의 **Lexical Environment**가 식별자·상위 참조를 들고 있다.

### 핵심

- **EC란**: 실행에 필요한 환경 정보(변수·함수·`this`·외부 참조 등)를 묶은 단위. 엔진은 EC를 만들고 Call Stack으로 관리한다.
- **종류**: Global EC(스크립트 진입), Function EC(호출마다), (Eval은 면접에서 보통 생략).
- **Call Stack**: `outer` 호출 → FEC push → `inner` 호출 → FEC push → 끝나면 pop. **지금 실행 중 = 스택 top**.
- **생성 → 실행**: 생성 단계에서 선언 등록·LE 구성·Outer 참조·`this` 결정. 실행 단계에서 코드를 위에서 아래로 돌린다.
- **호이스팅**: 변수가 “물리적으로 위로” 가는 게 아니라, **생성 단계에서 선언이 먼저 처리**되어 실행 시점에 식별자를 볼 수 있는 현상. `var`는 `undefined`로 초기화, `let`/`const`는 TDZ(세부는 Day11).
- **Scope와의 관계**: Scope(접근 범위)의 구현 뼈대가 LE 체인. EC는 “지금 실행”, LE는 “그 실행이 보는 변수 지도”.

### 흐름

```
Global EC 생성·실행
  → outer() 호출 → outer FEC 생성·실행
    → inner() 호출 → inner FEC 생성·실행
    → inner pop
  → outer pop
```

식별자 (inner에서 `x+y+z`):

```
z → inner LE
y → outer LE (Outer 참조)
x → global LE
```

```
Execution Context
  ├── Lexical Environment
  │     ├── Environment Record
  │     └── Outer Environment Reference
  └── this 등
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Global EC vs Function EC | 프로그램 진입 1개 vs 호출마다 생성 |
| EC vs Call Stack | 단위 객체 vs 그 단위를 쌓는 구조 |
| 생성 vs 실행 | 선언·환경 준비 vs 코드 평가 |
| “호이스팅 = 코드가 위로” | ❌ → 생성 단계 선언 처리 |
| EC 스택 vs 앱 상태 레이어 | 비유만 — JS 런타임 ≠ Redux/Query 아키텍처 |

### 실무 연결

- **adjuster resume 「상태 소유권」** (`log/backoffice-adjuster-front/resume-2026-08-21-1256.md`):
  - 서버 데이터 → **TanStack Query**
  - 토큰·유저·역할 영속 → **Redux + persist**
  - 모달 등 UI/세션성 → Redux (일부 non-persist)
  - 라우트 진입 전 인증·필수 데이터 → **React Router loader**
- 면접 한 줄: “실행 중 누가 스택 top인지”처럼, **어느 레이어가 그 상태의 소스 오브 트루스인지**를 테이블로 고정한다. EC 용어를 아키텍처에 억지로 끼우지 말고, **관심사 분리**만 연결.
- W2 hook: `updateParam` 클로저·연속 호출 이슈는 Day09–10에서 LE/클로저로 설명 가능 — Day08은 “함수 호출 = 새 FEC”까지만.

### 면접 한 방

- **Q:** Execution Context란 무엇이고 Call Stack과 어떻게 연결되나요?
- **답:** JS가 코드를 실행할 때 만드는 환경 단위입니다. 전역에서 시작하고, 함수를 호출할 때마다 Function EC가 Call Stack에 push되며, 끝나면 pop됩니다. 생성 단계에서 변수·함수 선언과 Lexical Environment·`this`를 준비하고, 실행 단계에서 본문을 돌립니다. 호이스팅도 그 생성 단계의 결과로 설명합니다.

### 통과선 스크립트

1. EC = 실행 단위, Stack에 쌓임.
2. GEC / FEC 구분.
3. 호출 → push, return → pop 그림.
4. 생성(선언·LE·this) / 실행(코드).
5. LE는 “변수 지도 + 바깥 참조” — Day09로 넘김.
6. 호이스팅 = 생성 단계 선언 처리 (TDZ는 Day11).
7. (회사) Query / Redux persist / loader 소유권 표 한 줄.

## wrap 요약

1. Day08 go — EC·Call Stack·생성/실행 + adjuster 상태 소유권.
2. W2 금 배치 · plan/active 미수정.
3. 다음: day-09 Lexical Environment.

- **막힌:** —
- **다음 start:** `day-09-lexical-environment`
