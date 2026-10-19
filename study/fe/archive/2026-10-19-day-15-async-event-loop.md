# Day 15 · 비동기 & 이벤트 루프 — **완료**

SSOT 노트: [`../15-day-15-async-event-loop.md`](../15-day-15-async-event-loop.md)

## active 체크

- [x] day-15-async-event-loop.md 키워드·질문·목표 읽기
- [x] Call Stack / Web API / Macrotask / Microtask / Event Loop 관계 그림으로 말하기
- [x] `setTimeout(0)` vs `Promise.then` 순서 고정
- [x] `async`/`await`가 마이크로태스크로 이어짐을 한 줄
- [x] 동기+타이머+Promise 섞인 출력 순서 예측 연습
- [x] **§4-A 금** care `easyPayment` vs `generalPayment` 읽기·분기 스토리
- [x] **통과선** — 이벤트 루프 한 문장 + 결제 경로 분기 30초

## 정리

### 한 줄

JS 실행은 **싱글 콜 스택**이지만 타이머·네트워크는 호스트(Web API)가 맡고, 스택이 비면 이벤트 루프가 **마이크로태스크를 전부** 비운 뒤 **매크로태스크 하나**를 올려 비동기를 돌린다.

### 핵심

- **Call Stack**: 지금 도는 함수 프레임. 하나뿐.
- **Event Loop**: 스택 empty → microtask 큐 **전부** → task(macro) **하나** → 다시 microtask … 반복. «번갈아 하나씩»이 아니다.
- **Macrotask**: `setTimeout`/`setInterval`, I/O, 대부분 DOM 이벤트 콜백 등.
- **Microtask**: `Promise.then`/`catch`/`finally`, `queueMicrotask`, `MutationObserver`. `await` 이후도 Promise 계열로 이어진다.
- **Promise**: `pending → fulfilled/rejected`. 콜백은 마이크로태스크.
- **async/await**: Promise 설탕. `await`에서 함수 일시 중단 → 나머지는 마이크로태스크로 재개.
- Day24 Fetch의 `async/await`와 같은 루프 위에서 돈다.

### 흐름

```
1. Call Stack에서 동기 코드 실행
2. Stack empty
3. Microtask Queue 전부 실행 (중간에 생긴 micro도 포함해 비움)
4. Task Queue에서 Task 하나
5. 다시 3 → 4 반복
```

예:

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// → 1 4 3 2
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| 싱글 스레드 vs 비동기 | 실행 스택 하나 · 대기는 호스트가 |
| Micro vs Macro | Promise류 우선 전부 / setTimeout은 task |
| `setTimeout(0)` «즉시»? | 최소 지연일 뿐, 현재 스택+micro 이후 |
| `await` 다음 줄 | 동기 연속 ❌ · micro로 재개 |
| 긴 microtask 체인 | 렌더·task 기아 가능 — 무한 then 주의 |

### 실무 연결

- **§4-A 금 · easyPayment vs generalPayment**: care `payment.tsx` — **generalPayment**는 Welcome PG 폼 submit(서명·merchant·키), **easyPayment**는 앱 WebView 브리지(UA/`connectionType`에 따라 Android·iOS 핸들러, dailycare log는 서비스 구분값 고정). 둘 다 «클릭 → (비동기) 주문/브리지/폼»이라 콜백·Promise·브리지 응답이 **큐에 올라오는 타이밍**이 UI 잠금(`ordering`)과 맞물린다. 금요일은 결제 **1분 스토리**에 루프 언어를 섞지 말고, 경로는 정확히 분기해 말한다.
- fetch/axios then·await, React Query 콜백도 같은 micro/macro 규칙 위.

### 면접 한 방

- **Q:** 싱글 스레드인데 비동기는 어떻게? `setTimeout(0)`과 `Promise.then` 중 뭐가 먼저?
- **답:** 실행은 스택 하나지만 타이머·네트워크는 브라우저가 처리하고 완료 콜백을 큐에 넣습니다. 스택이 비면 마이크로태스크(Promise)를 전부 처리한 뒤 매크로태스크(`setTimeout`)를 하나 실행합니다. 그래서 `setTimeout(0)`보다 `Promise.then`이 먼저입니다.

### 통과선 스크립트

1. 스택 하나 + Web API + 두 큐 + 루프.
2. micro 전부 → macro 하나 → micro 전부.
3. 예시 출력 1 4 3 2 말하기.
4. await = Promise micro로 재개.
5. (회사) generalPayment = PG 폼, easyPayment = 네이티브 브리지 — 진입 경로만 다르게.
6. 결제 잠금은 콜백이 늦게 와도 주문이 두 번 안 나가게 ref로 지킨다.

## wrap 요약

1. Day15 go — Event Loop micro→macro + 결제 경로 분기.
2. W3 금 · easyPayment vs generalPayment.
3. 다음: day-16-typescript-basic · 토 · weekend payment story.

- **막힌:** —
- **다음 start:** `day-16-typescript-basic` · `study/fe/16-day-16-typescript-basic.md`
