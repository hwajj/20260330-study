# Archive · day-01-http-basics · 2026-10-07 · **미완**

스냅샷. SSOT 노트: [`../01-day-01-http-basics.md`](../01-day-01-http-basics.md)

## active 체크

```
## 학습 할 일

(다음 study-session-start가 §4-A·커리큘럼에 맞춰 단일 목록으로 갱신)
```

## 진행

### AsyncQueue·401 재발급

- `HttpClientService/utils.ts` — `AsyncQueue`, `reissueTokenOn401Error`
- enqueue → reissue 1회 → dequeue로 동시 401 요청 정리 — 종이 3단계 (`archive/2026-09-28-W1-수.md`에 이관)

### createGuardedInstance

- **미완:** L8–32 — 가드·인스턴스·request/response interceptor 체인 요약

### curriculum 세 줄

- **미완:** `day-01-http-basics` — 뭔지 / 비슷한 개념과 차이 / FE·실무 연결

### 면접 Q 요지

- **미완:** `frontend-dev-notes/docs/interview/index.md`에서 HTTP 관련 1개 — Q·답 요지 각 한 줄

## wrap 요약

1. Day01 진행은 **401 큐 리딩 완료**, curriculum 3줄·면접 Q·`createGuardedInstance` **미완** (노트와 동일).
2. `## 학습 할 일`은 아직 start placeholder — **다음 start**에서 W1 금 체크리스트 채움.
3. §4-B W1 **금 ☐** · `CURRENT_DAY` **금** 유지.

**막힌:** —

**다음 start:** `study-session-start` → `day-01-http-basics` · [`01-day-01-http-basics.md`](../01-day-01-http-basics.md) · §4-A 금 열 파일 `packages/service/src/JwtAuthService/JwtAuthService.ts`

## 정리

- W1 수~목 코드 리딩은 **401 동시 요청을 큐로 직렬화**하는 `AsyncQueue`·`reissueTokenOn401Error`까지 정리됨.
- **HTTP curriculum 3줄·면접 Q·`createGuardedInstance`**는 다음 세션에서 이어서.
- wrap 스냅샷: 이 파일.
