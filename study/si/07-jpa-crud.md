# SI 07 · JPA + CRUD

> **go** · 플랜 단계 7

## 학습 할 일

- [x] Entity User·Order, Repository
- [x] Order REST CRUD
- [x] curl로 생성·목록 확인
- [x] 통과선: Postman/curl OK

## 진행

- `POST /api/orders` (JWT) → 201 `{"id":1,"itemName":"kimchi","quantity":2}`
- `GET /api/orders` → 동일 목록

## 정리

### 한 줄
주문은 JPA 엔티티로 저장하고, Service가 **소유자(userId)** 를 강제한다.

### 핵심
- `OrderRepository.findByUserIdOrderByIdDesc`
- 타인 주문은 404로 응답 (존재 누설 최소화)

## 메모

—

## 막힌 질문

—
