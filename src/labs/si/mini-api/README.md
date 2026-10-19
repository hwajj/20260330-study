# SI mini-api

Spring Boot + JPA + JWT + (H2 local / MySQL compose) 미니 주문 API.

## 로컬 (H2)

```bash
./mvnw spring-boot:run
# Windows: mvnw.cmd spring-boot:run
```

- `GET /api/ping` → `{"status":"ok"}`
- `POST /auth/register` `{ "email":"a@b.com", "password":"secret1" }`
- `POST /auth/login` → `accessToken`
- `CRUD /api/orders` — `Authorization: Bearer <token>`

## Docker Compose (MySQL)

```bash
docker compose up --build
```

DB는 `localhost:3307`, 앱은 `localhost:8080`.

## 엔드포인트

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/ping` | no |
| POST | `/auth/register` | no |
| POST | `/auth/login` | no |
| GET/POST | `/api/orders` | Bearer |
| GET/PUT/DELETE | `/api/orders/{id}` | Bearer |
