# Day 0.1 — 도구·모노레포 선행

> **커리큘럼:** [Day 0 입문](./README.md) · **이 문서:** Day 0.1  
> **선행:** (없음 — 첫 문서) · **다음:** [Day 0.2 TypeScript](./day-0.2-typescript-core.md)

Node·패키지 매니저·모노레포 구조를 익혀, 이후 Day 0.x에서 **“어느 패키지 파일을 열어야 하는지”** 헤매지 않게 하는 문서입니다.

---

## 목차

1. [Node와 패키지 매니저](#1-node와-패키지-매니저)
2. [모노레포 읽는 법](#2-모노레포-읽는-법)
3. [TypeScript 프로젝트 최소 구조](#3-typescript-프로젝트-최소-구조)
4. [학습할 때의 습관](#4-학습할-때의-습관)
5. [정리·확장 학습](#5-정리확장-학습)

---

## 1. Node와 패키지 매니저

### 1.1 왜 Node인가

프론트 빌드(Vite·Webpack), 타입 검사, 테스트, 린트는 **브라우저가 아니라 Node**에서 돌아갑니다.  
“React만 알면 된다”가 아니라 **도구 체인**이 코드를 번들·검사합니다.

### 1.2 npm / pnpm / yarn

| 도구 | 특징 |
|------|------|
| **npm** | Node 기본. `package-lock.json` |
| **pnpm** | 디스크 절약·엄격한 의존. 모노레포에 자주 사용 |
| **yarn** | `yarn.lock`. Berry(v2+)는 PnP 등 옵션 다양 |

**이 레포 학습 시:** 루트·패키지마다 `package.json`을 보고, **어느 워크스페이스에 스크립트가 있는지** 확인하는 습관이 중요합니다.

### 1.3 자주 쓰는 명령

```bash
pnpm install          # 의존성 설치
pnpm -F <pkg> build   # 특정 패키지만 빌드 (워크스페이스)
pnpm -F <pkg> test
```

**이유:** 모노레포에서는 전체가 아니라 **패키지 단위**로 스크립트를 돌리는 경우가 많습니다.

---

## 2. 모노레포 읽는 법

### 2.1 전형적 구조

```
repo/
├── package.json          # 루트 워크스페이스
├── packages/
│   ├── service/          # HTTP·에러·토큰
│   ├── form/             # 검증
│   ├── hook/             # React 훅
│   └── component/        # UI 패턴
└── apps/ 또는 src/       # 실제 앱 (레포마다 다름)
```

Day 0.x 문서는 주로 **`packages/*`** 를 “읽기 전용 맵”으로 다룹니다.

### 2.2 import 경로

- **패키지 이름:** `@scope/form`, `backoffice-shared` 등
- **상대 경로:** 같은 패키지 안 `../utils`

**학습 팁:** “이 타입/함수가 어디서 export 되는지” → 해당 패키지의 `index.ts`부터 연다.

### 2.3 읽기 순서와 Day 0의 대응

| 패키지 | Day |
|--------|-----|
| (개념만) TS·도구 | 0.1 ~ 0.2 |
| service | 0.5 |
| form | 0.6 |
| hook | 0.7 |
| component | 0.9 |

---

## 3. TypeScript 프로젝트 최소 구조

### 3.1 필수 파일

| 파일 | 역할 |
|------|------|
| `tsconfig.json` | 컴파일 옵션·경로 alias |
| `package.json` | `"types"`, `"main"`, dependencies |
| `src/` | 소스 |

Day 0.2에서 `strict`, `paths`, `moduleResolution`을 **이 레포 기준**으로 다룹니다.

### 3.2 path alias (`@/` 등)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**이유:** 깊은 상대 경로 `../../../` 를 줄이고, 리팩터 시 import를 안정적으로 유지합니다.

---

## 4. 학습할 때의 습관

1. **한 문서 = 한 패키지 또는 한 주제** — Day 0.x 순서를 지킨다.
2. **코드는 “읽기 전용”부터** — 전체 구현보다 `index.ts` → 핵심 함수 1개만 깊게.
3. **이유를 메모** — “왜 named export인가”처럼 [topics/async-modules-errors](../topics/async-modules-errors.md)와 연결.
4. **실무 노트는 notes/** — 트러블슈팅은 날짜별로 분리.

---

## 5. 정리·확장 학습

### 5.1 정리

| 주제 | 요약 |
|------|------|
| Node | 빌드·검사·테스트 실행 환경 |
| 패키지 매니저 | 워크스페이스·lockfile로 재현 가능한 설치 |
| 모노레포 | `packages/*` 단위로 관심사 분리 |
| tsconfig | strict·paths는 Day 0.2에서 심화 |

### 5.2 확장 학습

- **Turborepo / Nx** — 모노레포 태스크 캐시·의존 그래프
- **Changesets** — 패키지 버전·릴리스 자동화
- **ESM vs CJS** — [topics/async-modules-errors](../topics/async-modules-errors.md)

---

## 커리큘럼 네비게이션

| 이전 | 목차 | 다음 |
|------|------|------|
| — | [Day 0 README](./README.md) | [Day 0.2 TypeScript](./day-0.2-typescript-core.md) |
