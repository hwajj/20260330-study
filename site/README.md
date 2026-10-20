# Study site (VitePress)

`../study/**` 마크다운을 GitHub Pages에 올리는 정적 사이트.

## 명령

```bash
npm install
npm run docs:dev      # http://localhost:5173/20260330-study/
npm run docs:build
npm run docs:preview
```

`predocs:*`에서 `npm run sync`가 돌아가 `study/` → `docs/{track}/` 복사와 사이드바를 갱신합니다.

## 배포

`main` push 시 `.github/workflows/deploy-pages.yml`이 빌드 후 GitHub Pages에 배포합니다.

repo **Settings → Pages → Build and deployment → GitHub Actions** 로 두세요.

배포 URL: `https://hwajj.github.io/20260330-study/`
