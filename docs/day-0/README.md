# Day 0 — 입문 커리큘럼

**backoffice-shared(모노레포) 스타일**의 프론트엔드 코드를 읽기 전, 개념·패키지·흐름을 **Day 0.x 한 편씩** 익히는 로드맵입니다.  
각 문서는 **MD만으로 학습 가능**하도록 개념·코드·이유를 한 흐름에 담았습니다.

---

## 한 줄 요약

```
도구·TS(0.1~0.2) → React(0.3) → HTTP·JWT(0.4) → service 패키지(0.5)
  → form(0.6) → hook(0.7) → type guard(0.8) → component(0.9)
```

심화 주제는 [topics/](../topics/README.md)에서 Day 0.4·0.5와 **병행**합니다.

---

## 읽는 순서

| Day | 문서 | 주제 | 예상 |
|-----|------|------|------|
| **0.1** | [day-0.1-tooling-prerequisites.md](./day-0.1-tooling-prerequisites.md) | Node·패키지 매니저·모노레포·읽기 습관 | 30분 |
| **0.2** | [day-0.2-typescript-core.md](./day-0.2-typescript-core.md) | 타입 시스템·제네릭·가드·tsconfig | 2~3시간 |
| **0.3** | [day-0.3-react-fundamentals.md](./day-0.3-react-fundamentals.md) | 컴포넌트·state·effect·렌더 | 1~2시간 |
| **0.4** | [day-0.4-http-rest-jwt-basics.md](./day-0.4-http-rest-jwt-basics.md) | HTTP·REST·Axios·JWT | 2시간 |
| **0.5** | [day-0.5-service-repo-mapping.md](./day-0.5-service-repo-mapping.md) | `packages/service` 맵핑 | 1~2시간 |
| **0.6** | [day-0.6-form-validation-basics.md](./day-0.6-form-validation-basics.md) | Validator·AsyncValidator | 1~2시간 |
| **0.7** | [day-0.7-hooks-repo-mapping.md](./day-0.7-hooks-repo-mapping.md) | `packages/hook` 맵핑 | 1~2시간 |
| **0.8** | [day-0.8-type-utility-typeguards.md](./day-0.8-type-utility-typeguards.md) | 유틸리티 타입·타입 가드 | 1시간 |
| **0.9** | [day-0.9-component-patterns.md](./day-0.9-component-patterns.md) | Modal·Input·withSuspense | 1~2시간 |

---

## topics와의 관계

| Day 0 | 심화 문서 (topics/) | 관계 |
|-------|---------------------|------|
| 0.4 | [axios-interceptor-validateStatus.md](../topics/axios-interceptor-validateStatus.md) | 인터셉터·`validateStatus` 실습 |
| 0.4·0.5 | [async-modules-errors.md](../topics/async-modules-errors.md) | ESM·Promise·에러 계층·service 코드 매핑 |

**권장:** 0.4 본문 → axios 심화 → 0.5 → async-modules-errors (에러·재시도 복습).

---

## 선행 지식 (이 레포 밖)

- JavaScript 기본(함수, 객체, 배열, `async` 문법)
- Git clone·브랜치·PR 흐름
- (선택) React 공식 튜토리얼 1회독

---

## 문서 공통 규칙

- 상단 **선행 / 다음** 링크로 커리큘럼 이동
- 하단 **커리큘럼 네비게이션** 표로 이전·다음·목차
- 마지막 **정리·확장 학습**으로 복습·심화 제안

---

## 실무 노트

날짜별 시행착오·개념 정리는 [notes/](../notes/) — 예: [서버/클라이언트 state](../notes/2026-05-28_concepts-server-client-state.md).

[← docs 목차](../README.md)
