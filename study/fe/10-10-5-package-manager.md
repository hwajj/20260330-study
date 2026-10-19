# 10-5 · 패키지 관리 (npm · pnpm · lockfile · semver)

> **go 정리본** · 원문: `frontend-dev-notes/docs/curriculum/week-10-tooling/10-5-package-manager.md` · active: [`active_fe.md`](../../log/_common/sessions/active_fe.md)

## 학습 할 일

- [x] npm / pnpm / yarn — 매니저 통일
- [x] lockfile — 재현 가능 설치 트리
- [x] semver — `^` · `~` · exact
- [x] dependencies vs devDependencies
- [x] peerDependencies — React 중복 방지
- [x] lockfile 커밋 이유
- [x] pnpm store · phantom dependency
- [x] workspace — 10-4 연결
- [x] **통과선** — lock / semver / peer 30초

## 정리

### 한 줄

**팀 매니저 하나 + lockfile 커밋**으로 설치 트리를 고정하고, semver 범위·**peerDependencies**로 React처럼 호스트 싱글톤을 지키며, pnpm은 strict hoisting으로 숨은 의존을 드러낸다.

### 핵심

- **lockfile** (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`): `package.json`의 `^4.17.0`은 **허용 범위**일 뿐 — lock이 **실제 설치 트리** 고정. 미커밋·매니저 혼용 = “내 PC에선 되는데”.
- **semver**: `^1.2.3` → 같은 major 내 업데이트 허용; `~1.2.3` → minor 고정에 가깝게 patch; `1.2.3` exact. 라이브러리는 `^` 흔함, 재현성 극대화는 exact+lock.
- **dependencies vs devDependencies**: 런타임 필요 vs 빌드·테스트·lint. 의도·`pnpm install --prod` 범위; **번들 포함은 import 그래프**가 최종 결정(10-1).
- **peerDependencies**: UI 라이브러리가 React를 dependencies에 넣으면 **앱과 React 두 벌** → hooks·context 깨짐. peer = “앱이 이 버전 제공”.
- **pnpm**: content-addressable store + symlink node_modules — 디스크·모노레포 효율, **phantom dependency**(declare 안 한 패키지 import)가 npm보다 잘 걸림 → 올바른 declare로 수정.

### 흐름

```
의존 추가
  → runtime? dependencies : devDependencies
  → lib publish? peers for react 등
  → install → lock 갱신 → lock 커밋
팀 규칙
  → pnpm only (예) · CI 동일 매니저
모노레포
  → workspace:* + 루트 lock 하나
```

### 차이·함정

| 대비 | 한 줄 |
|------|--------|
| ^ vs ~ | major 고정 vs minor 고정 |
| lock vs no lock | 재현 vs drift |
| dep vs peer (React lib) | 번들 포함 vs 호스트 제공 |
| npm vs pnpm hoisting | 느슨 vs strict |
| devDep vs prod 번들 | 의도 분리 vs import가 끌고 옴 |

### 실무 연결

- backoffice-shared publish-package skill: changeset, version bump, lock refresh.
- 10-4 workspace + `workspace:*` 내부 버전.
- create-branch `feature/alias@version` — semver 릴리즈와 연결.

### 면접 한 방

- **Q:** lockfile 커밋 이유, peerDependencies는?
- **답:** `^`만으론 날마다 트리가 달라질 수 있어 lock으로 CI·팀 재현. peer는 React 같은 singleton을 앱에 맡겨 중복 설치·hooks 오류를 막는다.

### 통과선 스크립트

1. lockfile = 실제 설치 트리 SSOT.
2. ^ / ~ / exact 차이.
3. lock 커밋 + 매니저 통일.
4. dependencies vs devDependencies 의도.
5. peerDependencies React 예시.
6. pnpm phantom dep 감각.
7. workspace 10-4 한 줄.
