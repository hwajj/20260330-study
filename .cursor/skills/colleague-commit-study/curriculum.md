# 커밋 학습 커리큘럼 

| Repo | Path / branch | Filter |
|------|----------------|--------|
| backoffice-shared | `c:\Users\yojic\projects\backoffice-shared` | `HEAD`, `--no-merges --author=ksheer506@carenation.kr` |
| project-fca-mobile | `c:\Users\yojic\projects\backoffice-adjuster-front\backoffice-certified-damage-adjuster` | branch `fca-fe-mobile-main`, path `project-fca-mobile`, same author |

**Diff 범위:** 세션 `FROM .. TO`는 **양끝 커밋 포함**. Git: `git log --reverse FROM^..TO` (첫 커밋이 FROM이면 `FROM~1..TO`).

**PUBLISHER:** `[PUBLISHER]` 커밋은 릴리즈 기록 — 분석 시 1문단 요약만.

---

## Track SHARED (13세션, ~180 substantive 커밋)

권장 순서: **S01 → S13** 후 Mobile.

| ID | FROM | TO | 테마 |
|----|------|-----|------|
| S01 | `3c1e4ce` | `7d15571` | 모노레포·changesets·type·service·demo |
| S02 | `9c0a35a` | `2ed5e6d` | hook 일괄 도입 (param, atomic, storage, blocker) |
| S03 | `ce03034` | `ffa5962` | pnpm 전환·Validator·form |
| S04 | `4428e7b` | `61d0cb0` | Endpoint·publisher·createAtomicContext |
| S05 | `b49d58d` | `6576c71` | service 2.x · JwtAuth · HMC error |
| S06 | `0349461` | `da1537d` | hook 1.0 · tests · useNonReactivity · useClarity |
| S07 | `50eab3f` | `ee13574` | alias/dev · Input·Modal 시작 |
| S08 | `f347b8a` | `591fb2e` | service 2.4 · useModal · framer-motion revert |
| S09 | `2ffba18` | `51e932a` | Modal UX · useHmcError · backdrop |
| S10 | `2e0dee8` | `3c2b957` | Input/IME · CRA·react-scripts 4 호환 |
| S11 | `e18fa44` | `5a87cdc` | type·React17 · hook 1.2~1.3 · useSyncExternalStore |
| S12 | `2725472` | `3e88052` | Modal 1.x overlay · useOverlayController |
| S13 | `86a9f93` | `159a075` | AdropBanner · React19 · 스킬 · GitLab registry |

**우선 Mobile만:** M01→M06(부트스트랩) 후 **M12→M20**(9~10월)도 가능. Shared 선행 권장.

---

## Track MOBILE (20세션, 482 non-merge, 커밋 25개 단위)

| ID | FROM | TO | n |
|----|------|-----|---|
| M01 | `21a4b73a` | `e94af239` | 25 |
| M02 | `628964e5` | `b5ed4e73` | 25 |
| M03 | `0e6df272` | `da089bf0` | 25 |
| M04 | `a1a02456` | `b8778857` | 25 |
| M05 | `ee1baac8` | `10758380` | 25 |
| M06 | `70fb4c9b` | `c682b7f5` | 25 |
| M07 | `2fcce313` | `2bfcba08` | 25 |
| M08 | `7b2df333` | `20e68ecb` | 25 |
| M09 | `2e988e52` | `81c34c6c` | 25 |
| M10 | `426603ff` | `d0c5239d` | 25 |
| M11 | `7a5664ea` | `1ce13f0c` | 25 |
| M12 | `3f3f33b6` | `1109863d` | 25 |
| M13 | `e4a88790` | `3c298738` | 25 |
| M14 | `0b6dcde3` | `48c0d204` | 25 |
| M15 | `62179f9b` | `f8cc8966` | 25 |
| M16 | `42f8adf5` | `54d4880f` | 25 |
| M17 | `59f12586` | `f82b8ac1` | 25 |
| M18 | `4662482a` | `ef1f865a` | 25 |
| M19 | `84775d9a` | `e42d0ad2` | 25 |
| M20 | `2f39620f` | `066ebe0e` | 7 |

M01: FEM968 로그인·router·context. M12~: 9월 ContractProgress 등 대량 기능. M19~M20: 10월 QA·`Mobile v1.1.0`.
