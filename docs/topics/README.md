# topics — Day 0 심화 주제

Day 0 커리큘럼 **본문을 읽은 뒤**, 같은 주제를 **코드 위주·실습 위주**로 깊게 보는 문서 모음입니다.

---

## Day 0와의 매핑

| topics 문서 | 읽기 시점 | Day 0 본문 | 다루는 추가 깊이 |
|-------------|-----------|------------|------------------|
| [axios-interceptor-validateStatus.md](./axios-interceptor-validateStatus.md) | **0.4 직후** | [day-0.4-http-rest-jwt-basics](../day-0/day-0.4-http-rest-jwt-basics.md) | 인터셉터·`validateStatus: () => true` **한 파일 실습** |
| [async-modules-errors.md](./async-modules-errors.md) | **0.5 직후** | 0.4 + [day-0.5-service-repo-mapping](../day-0/day-0.5-service-repo-mapping.md) | ESM·Promise·**HTTP vs 도메인 에러**·service 코드 매핑 |

---

## 권장 읽기 순서

```
Day 0.4 (HTTP/JWT 개념)
    ↓
axios-interceptor-validateStatus  ← Axios “손으로” 한 번 구성
    ↓
Day 0.5 (packages/service 맵)
    ↓
async-modules-errors            ← service가 ESM·async·에러를 쓰는 이유 복습
```

---

## 문서별 한 줄 요약

### axios-interceptor-validateStatus

- `axios.create` + 요청/응답 인터셉터
- 401에서 `"reissue"` 로그까지 **최소 예제**
- **왜** 4xx도 reject 하지 않고 `validateStatus`로 받는지

### async-modules-errors

- default vs named export, tree-shaking
- `Promise.all` / `allSettled`, async 에러 전파
- `HmcException` 같은 **도메인 에러 경계**
- fetch vs axios 선택 기준

---

## 완료 체크리스트

- [ ] 인스턴스에 baseURL·timeout을 두고, Authorization을 인터셉터로 넣었다
- [ ] `validateStatus: () => true` 일 때 401이 **response**로 오는 것을 확인했다
- [ ] named export **위주** 설계가 tree-shaking에 유리한 이유를 설명할 수 있다 (default만 쓰라는 뜻은 아님)
- [ ] HTTP 4xx와 `HmcException`(도메인)을 **어느 레이어에서** 나누는지 말할 수 있다

---

[← Day 0 커리큘럼](../day-0/README.md) · [← docs 목차](../README.md)
