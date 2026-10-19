# 11-1 · Node 런타임 & 서버 기초 — **완료**

SSOT 노트: [../11-11-1-node-runtime-server.md](../11-11-1-node-runtime-server.md)

## active 체크

- [x] Node 이벤트 루프·libuv 논블로킹 I/O
- [x] 싱글 스레드와 CPU 바운드 함정·워커/클러스터
- [x] 미들웨어 체인 순서(인증·파싱·에러)
- [x] 환경변수·시크릿·`.env` 감각
- [x] 스트림으로 대용량 조각 처리
- [x] 브라우저 이벤트 루프(Day15)와 Node phase 차이
- [x] **실무:** API 서버가 느려질 때 I/O vs CPU 구분
- [x] **통과선** — 동시성·미들웨어·CPU 함정 30초

## 정리

### 한 줄

Node는 **싱글 스레드 이벤트 루프**로 I/O를 libuv에 논블로킹 위임해 동시성을 내고, 요청은 **미들웨어 체인**을 타며, CPU 바운드 작업은 루프를 막으므로 워커·클러스터로 분리해야 한다.

### 핵심

- **동시성 ≠ 멀티스레드 CPU 병렬**: 연결 많아도 I/O 대기 중에는 다른 콜백을 처리. 진짜 CPU 연산(암호화·이미지 리사이즈·대용량 JSON parse)이 길면 **전체 처리량이 막힌다**.
- **이벤트 루프 phase**: timers → pending → poll(I/O) → check → close. `process.nextTick`·Promise microtask는 phase 사이에 끼어든다. 브라우저와 **개념은 같지만 우선순위·phase 이름이 다르다**.
- **미들웨어**: 요청→응답 사이 `(req,res,next)` 체인. **순서가 계약**: body parser 전에 body 읽기 불가, 인증 전에 보호 라우트 접근 불가, **에러 핸들러는 마지막**(4인자 `(err,req,res,next)`).
- **환경변수**: 포트·DB URL·API 키는 코드에 박지 않고 `.env` + 배포 시크릿. FE는 `VITE_*`/`NEXT_PUBLIC_*`만 클라에 노출 가능 — 서버 키와 구분.
- **스트림**: 파일·대용량 응답을 한 번에 메모리에 올리지 않고 chunk 처리 → 메모리·타임아웃 완화.

### 흐름

```
HTTP 요청
  → 미들웨어: 로깅 → CORS → body parse → auth → 라우트 핸들러
  → 핸들러: DB/외부 API await (I/O → 루프는 다른 요청 처리)
  → 응답
  → (에러) → error middleware

[CPU 바운드]
  핸들러에서 sync heavy work → 이벤트 루프 블록 → worker_threads / 큐 / 별도 서비스
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| I/O bound vs CPU bound | await 많음 vs sync 연산·암호화 |
| Node vs Java 스레드 모델 | Node는 기본 1스레드 루프, CPU는 워커로 |
| 미들웨어 vs 라우트 | 공통 횡단 vs URL별 핸들러 |
| next() 누락 | 요청 hang — 체인 끊김 |
| 클라 이벤트 루프 vs Node | UI microtask vs timers/poll/check |

### 실무 연결

- FE가 **API 지연**을 볼 때: 네트워크만이 아니라 **서버 이벤트 루프 블로킹**(무거운 sync 로직) 가능. DevTools Network TTFB vs 서버 CPU 프로파일을 같이 본다.
- BFF/Express 계열에서 **401 미들웨어 위치**가 프론트 refresh 큐(26·11-3)와 맞물린다 — 인증 실패를 일관된 JSON으로 내리려면 에러 형식도 미들웨어에서 통일.
- 로컬 `.env` 누락 → `undefined` base URL — 배포·Docker(13-4)와 같은 “환경 고정” 문제의 서버 측.

### 면접 한 방

- **Q:** Node가 싱글 스레드인데 동시에 많은 요청을 어떻게 처리하나?
- **답:** I/O는 논블로킹으로 OS/libuv에 맡기고, 완료 시 콜백을 이벤트 루프가 처리한다. CPU를 오래 잡는 sync 작업은 루프를 막으니 worker_threads나 별도 프로세스로 빼야 한다. 미들웨어는 위에서 아래로 흐르고 에러 핸들러는 마지막에 둔다.

### 통과선 스크립트

1. Node 동시성 = 논블로킹 I/O + 이벤트 루프, CPU 바운드는 별도 처리.
2. libuv·phase 감각 한 줄, 브라우저 루프와 차이.
3. 미들웨어 순서: parse → auth → route → error last.
4. `.env`/시크릿 — 클라 노출 금지 키.
5. 스트림 = 대용량 메모리 절약.
6. API 느림 진단: I/O wait vs loop block.

## wrap 요약

- go 정리본: study/fe/11-11-1-node-runtime-server.md 완료.
- 핵심: Node 이벤트 루프·미들웨어·CPU 바운드 분리.
- 다음 start/go: 11-2-rest-api-design-advanced · 노트는 다음 go에서 생성.
- 막힌: —
