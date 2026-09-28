# Agent 레포 위치·Git push — 결정 메모 (2026-09-28)

> 채팅에서 정리한 내용. **구현·remote 설정은 사용자 승인·아래 질문 답 후** 진행.

## 배경

- 포폴 Agent를 **`20260330-study` 아래** 만들고 싶음.
- **`src/labs/agent/` 기준으로 git push** 하고 싶음 (스터디 전체가 아닌 하위 프로젝트 중심).

## 결론 (위치)

| 항목 | 방향 |
|------|------|
| 코드 경로 | `20260330-study/src/labs/agent/` — `STUDY-PLAN-AGENT.md`·`active_agent.md` SSOT와 동일 |
| 루트 Next | 기존 `package.json` (`next dev`) **유지** — Agent는 루트에 합치지 않음 |
| Agent dev | `src/labs/agent/` **자체 `package.json`** + 플랜 통과선 `pnpm dev` (server+web) |
| 패턴 | FE 실습 `src/labs/form/`와 같이 labs 아래 앱 |

### 권장 디렉터리 (1단계 스캐폴드)

```text
20260330-study/
  package.json              # Next 8W (기존)
  src/labs/form/            # 기존
  src/labs/agent/           # 신규
    package.json
    .env.example
    ARCHITECTURE.md
    README.md
    server/
    web/
```

- `.env`는 git 제외, `.env.example`만 커밋.
- `src/labs/agent/`는 **아직 없음** — Agent 1단계 체크리스트로 생성.

## Git push — 세 가지 옵션

현재 `20260330-study`: 로컬 `main`, **remote 없음**, 플랜·세션 파일 등 미커밋 변경 다수.

| 옵션 | 설명 | 장점 | 단점 |
|------|------|------|------|
| **A** | 스터디 레포 **전체** 하나 remote | 설정 단순, 세션 이어하기 쉬움 | 면접 링크에 플랜·`log/` 노출 → **private** 권장 |
| **B** | **공개 레포 = Agent 앱만** (`server/`·`web/`·README가 루트) | 이력서·면접용 URL 깔끔 | study와 **두 레포**; 동기화는 subtree split·수동 mirror 등 |
| **C** | 루트 **pnpm workspace**로 통합 후 한 레포 push | 의존성 한곳 | 8W 루트 구조 변경 — **1단계 DAY1에는 과함** |

**추천 조합 (의도가 «하위 프로젝트 push»일 때)**

- **로컬 개발:** 항상 `20260330-study` 안 `src/labs/agent/`
- **백업·다른 PC:** private `20260330-study` 전체 (A) 또는 로컬만
- **포폴 링크:** public Agent-only repo (B)

**비추:** `src/labs/agent/` 안에 **별도 `git init`** + 부모에서 해당 경로 ignore → 이중 관리·실수 많음.

## 미결정 — 다음에 답할 것

GitHub 목표에 가장 가까운 번호를 정하면 remote·초기 커밋 범위·스캐폴드 순서를 스펙으로 고정:

1. **비공개 `20260330-study` 전체** (플랜·로그 포함)
2. **공개 = Agent만** + study는 private 또는 로컬만
3. **둘 다** (private study + public agent mirror)

## 다음 액션 (승인 후)

1. 위 **1·2·3** 선택
2. Agent **1단계** 체크: `ARCHITECTURE.md`, `server/` health, `web/` 빈 채팅, `.env.example`, `pnpm dev` 통과선
3. 선택에 따라 `git remote add` / (B·3이면) 공개 레포 생성·mirror 방식 결정

## 참고 링크 (repo 내)

- 플랜: [`STUDY-PLAN-AGENT.md`](../../STUDY-PLAN-AGENT.md)
- 오늘 실행: [`log/_common/sessions/active_agent.md`](./sessions/active_agent.md)
