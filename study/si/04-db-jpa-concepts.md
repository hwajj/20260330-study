# SI 04 · DB·JPA 개념

> **go** · 플랜 단계 4

## 학습 할 일

- [x] 테이블·FK·트랜잭션·N+1 개념
- [x] 미니 도메인 ER 1장 (회원–주문)
- [x] «Repository를 왜 분리?» 3줄
- [x] MySQL vs Oracle 키워드 3줄
- [x] 통과선: CRUD 1건 DB까지 5단계

## 진행

- 도메인: User 1 — N Order (`orders.user_id` FK)
- N+1: `Order.user` LAZY인데 목록에서 user 접근 시 주문마다 SELECT — 지금은 DTO로 user 미노출해 회피

## 정리

### 한 줄
JPA는 객체를 테이블에 매핑하고, Repository는 **영속성 입구**를 Service와 분리한다.

### ER

```
users(id, email, password_hash)
orders(id, item_name, quantity, user_id → users.id)
```

### Repository 분리 3줄
1. Service에 SQL/JPQL이 섞이면 규칙과 저장이 한 클래스에 뭉친다.
2. Repository만 바꾸면 DB 벤더·쿼리 최적화를 국소 수정한다.
3. 테스트 시 Repository를 가짜로 두고 Service 규칙만 검증하기 쉽다.

### MySQL·Oracle (SI 키워드)
- 둘 다 관계형·트랜잭션·인덱스
- Oracle: 대기업 SI·시퀀스·PL/SQL 언급 많음
- MySQL: 웹·스타트업·Compose 실습에 흔함 — 미니는 MySQL

### 통과선 스크립트 (CRUD CREATE)
1. Controller가 JSON → DTO 검증
2. Service가 User 로드·Order 생성
3. `orderRepository.save` → Persist
4. 트랜잭션 커밋 → INSERT
5. 생성된 id를 응답 JSON에

## 메모

—

## 막힌 질문

—
