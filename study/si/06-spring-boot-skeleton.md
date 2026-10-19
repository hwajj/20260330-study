# SI 06 · Spring Boot 스켈레톤

> **go** · 플랜 단계 6

## 학습 할 일

- [x] `src/labs/si/mini-api` 프로젝트 생성 (Boot 3.4 · Maven wrapper)
- [x] layer 패키지 health/auth/user/order/security
- [x] `GET /api/ping` 구현
- [x] 통과선: 로컬 기동 확인

## 진행

- `mvnw.cmd -DskipTests package` OK
- `spring-boot:run` → Tomcat 8080 · `curl /api/ping` → `{"status":"ok"}`

## 정리

### 한 줄
스켈레톤은 **기동 + ping**으로 «서버가 살아 있다»를 먼저 증명한다.

### 핵심
- Initializr Boot 4는 Central 미배포 → **3.4.1**로 고정
- `mvnw`로 시스템 Maven 없이도 빌드

## 메모

—

## 막힌 질문

—
