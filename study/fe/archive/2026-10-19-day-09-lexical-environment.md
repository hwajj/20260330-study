# Day 09 · Lexical Environment — **완료**

SSOT 노트: [`../09-day-09-lexical-environment.md`](../09-day-09-lexical-environment.md)

## active 체크

- [x] day-09-lexical-environment.md 끝까지 읽기
- [x] LE = Environment Record + Outer Environment Reference
- [x] **식별자 해석** — 현재 → Outer → … → Global
- [x] **Lexical(정적) 스코프** — 선언 위치 기준, 호출 위치 아님
- [x] EC와 LE 관계 한 그림으로
- [x] Closure 예고 — 함수가 바깥 LE를 **계속 참조**
- [x] **주말**: `useParamState.spec` 엣지(이중 hook·무효 값·초기화) **재도전 테마** 정리
- [x] **통과선** — 변수 탐색 + 정적 스코프 30초

## 정리

### 한 줄

**Lexical Environment**는 “이 스코프에 어떤 식별자가 있고, 없으면 **어디로 가서 찾을지**”를 담은 구조이며, JS는 **작성(선언) 위치** 기준으로 그 체인을 고정한다.

### 핵심

- **구성**: Environment Record(현재 식별자→값) + Outer Environment Reference(상위 LE).
- **변수 탐색**: 현재 Record에 없으면 Outer를 따라 올라감 → Scope Chain의 구현 관점.
- **Lexical Scope**: `foo`가 `bar` 안에서 호출돼도, `foo`가 **선언된 곳**의 체인을 탄다(동적 스코프 아님).
- **EC와의 관계**: EC = 실행 전체 환경, LE = 그중 **식별자·스코프** 핵심. Day08 “생성 단계”에서 LE가 잡힌다.
- **Closure 연결**: 내부 함수가 바깥 변수를 참조한 채 살아 있으면, 바깥 함수 FEC가 끝나도 **그 LE 참조가 유지**된다 → Day10.

### 흐름

```
inner에서 x 찾기
  inner ER — 없음
    → outer ER — 없음
      → global ER — x 발견
```

정적 스코프 반례 감각:

```
bar(){ const x='bar'; foo(); }  // foo가 bar 안에서 호출
foo(){ console.log(x); }       // foo 선언은 global → x는 global
```

```
EC
 └─ LE ── ER (locals)
       └─ Outer ──→ 상위 LE ──→ …
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Lexical vs Dynamic scope | 선언 위치 vs 호출 위치 |
| ER vs Outer | “여기 있는 것” vs “다음 찾을 곳” |
| Scope Chain vs LE | 탐색 관점 이름 vs 엔진 구조 이름 — 같은 사다리 |
| “호출한 쪽 변수 보임” | JS에선 일반적으로 **아님** (정적) |
| URL 파싱 실패 vs LE | 무효 쿼리→fallback은 앱 로직, LE와 무관 — 다만 “어디서 값을 읽나” 감각은 비슷 |

### 실무 연결

- **주말 `useParamState.spec` 재도전 테마** (실패·엣지 케이스 감각):
  - **이중 `useParamState`**: 한 컴포넌트에서 hook 두 개로 `str1`/`str2`를 연속 업데이트해도 둘 다 남아야 함 → `document.location.href` 스냅샷이 **공유 URL LE처럼** “현재 진실”을 읽게 함(비유). 실제로는 React Router 상태 경합 해결.
  - **무효 Search Param**: `bool=YES`, 잘못된 date/tuple/record → **초기값(fallback)** — “현재 환경에 유효한 바인딩이 없으면 설정된 기본 Record로”.
  - **`updateParam(null)` / navigate(`/`)**: 쿼리 초기화 = dirty false, get은 config 기본값.
  - **string이 숫자·날짜처럼 보여도** `Param.string`이면 string 유지 — 타입 Record를 함부로 바꾸지 않음.
- 주말 목표: 스펙 하나를 **왜 location.href인지 / 왜 trailing comma인지**까지 말로 재설명.

### 면접 한 방

- **Q:** Lexical Environment란 무엇이고, 변수는 어떤 순서로 찾나요?
- **답:** 현재 스코프의 식별자-값(Environment Record)과 상위 환경 참조(Outer)를 가진 구조입니다. 식별자를 현재에서 못 찾으면 Outer를 따라 전역까지 올라갑니다. JS는 함수가 **선언된 위치**의 체인을 쓰므로, 다른 함수 안에서 호출돼도 호출자 로컬을 보지 않습니다.

### 통과선 스크립트

1. LE = ER + Outer.
2. 탐색: 현재 → 바깥 → 전역.
3. 정적 스코프 = 선언 위치.
4. EC 안의 LE라고 Day08과 연결.
5. Closure는 “바깥 LE를 붙잡고 있는 함수” — Day10.
6. (주말) dual updateParam·무효 쿼리 fallback 스펙을 LE 비유 없이, **경합·검증**으로 설명.

## wrap 요약

1. Day09 go — LE·정적 스코프 + useParamState.spec 주말 재도전 테마.
2. W2 토 배치 · plan/active 미수정.
3. 다음: day-10 Scope/Closure.

- **막힌:** —
- **다음 start:** `day-10-scope-closure`
