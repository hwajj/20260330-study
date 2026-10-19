# 이력서 프로젝트 블록 (초안)

**프로젝트:** 주문 Mini API (Spring Boot)  
**기간:** 2026 — SI 대비 미니 1개  
**역할:** 단독 설계·구현  
**링크:** `20260330-study/src/labs/si/mini-api` (로컬·학습 repo; public 분리 push는 선택)

## 기술 스택
Java 17 · Spring Boot 3.4 · Spring Security · JPA · JWT · MySQL · Docker Compose · H2(로컬)

## 불릿
- 회원 가입/로그인 JWT 발급 후 Bearer로 주문 CRUD 보호 (401 무토큰·위조 토큰)
- Controller–Service–Repository 레이어로 주문 소유자 검증·validation 분리
- `docker compose up`으로 MySQL+앱 기동, README에 엔드포인트·로컬/Compose 절차 정리
