# 13-3 · 정적 배포 · S3 · CDN — **완료**

SSOT 노트: [../13-13-3-static-deploy-s3-media.md](../13-13-3-static-deploy-s3-media.md)

## active 체크

- [x] 정적 빌드 산출물 호스팅·Origin
- [x] S3 객체 스토리지·권한·403 원인
- [x] CloudFront Edge·Hit/Miss
- [x] Invalidation vs content hash 파일명
- [x] gzip/Brotli·Cache-Control
- [x] 미디어·Presigned(11-2) 분리
- [x] Day30 리소스 전략과 인프라 캐시 위치
- [x] **통과선** — S3·CDN·캐시·배포 30초

## 정리

### 한 줄

FE **빌드 산출물**은 S3 등 **Origin**에 두고 **CDN(CloudFront)** Edge에서 **Hit**하면 가까이 응답하며, **`app.[hash].js`** 로 캐시 busting하고 HTML은 짧은 TTL·필요 시 **Invalidation**한다.

### 핵심

- **정적 배포**: `npm run build` → HTML/JS/CSS를 Nginx root 또는 **S3 bucket** — Node 서버 없이 서빙 가능.
- **S3**: object storage — **버킷 정책·OAC/OAI** 로 CloudFront만 읽게. public misconfig → **403** 또는 반대로 leak.
- **CDN**: PoP cache — **Hit** = Origin 안 감, **Miss** = Origin fetch 후 Edge populate.
- **왜 CDN**: latency↓, Origin bandwidth↓, HTTPS·compression 일관.
- **Invalidation vs hash**: hash filename이면 새 URL = 새 객체 — **Invalidation 비용·전파** 줄임. HTML만 invalidation 또는 짧은 `max-age`.
- **미디어**: 동영상·대용량 이미지 — 앱 서버 X, S3+CDN. 업로드는 **Presigned URL**(11-2).

### 흐름

```
User → CloudFront (Edge)
  Hit → return cached app.abc123.js
  Miss → S3 Origin GET → cache → user

Deploy new JS
  filename hash changes → browsers fetch new
  old hash expires at Edge naturally
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| Hit vs Miss | Edge vs Origin trip |
| Invalidation vs hash | same URL purge vs new URL |
| S3 public vs signed | 403 policy vs presigned |
| CDN vs browser cache | shared PoP vs local |
| HTML long cache | stale shell loading old JS names — HTML short TTL |

### 실무 연결

- Day30 **chunk hash** — 배포 후 “옛 JS” = CDN/browser cache or HTML pointing old assets.
- ubuntu-deploy-s3-media 노트 — 정적+미디어 분리.
- FE env `ASSET_URL` / CDN domain — build publicPath.

### 면접 한 방

- **Q:** S3 앞 CloudFront, Hit/Miss, 배포 후 옛 JS?
- **답:** Edge가 가까워 지연·Origin 부하를 줄인다. Hit는 캐시 응답, Miss는 Origin에서 채운다. 해시 파일명으로 새 배포 URL이 바뀌게 하고 HTML TTL을 짧게; 긴급엔 Invalidation.

### 통과선 스크립트

1. Origin S3, front CDN.
2. Hit/Miss 정의.
3. hash > invalidation habit.
4. 403 = policy/OAC/expired signed URL.
5. big media off app server.
6. Day30 hash ↔ 여기 Edge cache.

## wrap 요약

- go 정리본: study/fe/13-13-3-static-deploy-s3-media.md 완료.
- 핵심: CloudFront Hit/Miss·hash vs invalidation.
- 다음 start/go: 13-4-docker-cicd · 노트는 다음 go에서 생성.
- 막힌: —
