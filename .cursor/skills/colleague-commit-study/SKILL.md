---
name: colleague-commit-study
description: >-
  Analyzes 김성현 commits on backoffice-shared and project-fca-mobile in S01-S13 /
  M01-M20 chunks. Study repo 20260330-study; active_colleague_commit_study.md;
  TIL in log/_common/til/ (daily chunk lines + colleague-commit-study.md on wrap).
  Use for colleague-commit-study-start, -analyze, -chunk-wrap, -wrap, /chunk, /chunk-wrap,
  chunk-wrap, 덩어리랩, 커밋 학습. Short alias skill: colleague-chunk-wrap.
---

# colleague-commit-study

**종속 repo:** `20260330-study` (로그·active만 여기; 코드 repo는 curriculum 참고)

| SSOT | 경로 (repo root 기준) |
|------|------------------------|
| 커리큘럼·커밋 해시 | `.cursor/skills/colleague-commit-study/curriculum.md` |
| 세션 ☑ (S01/M01…) | `.cursor/skills/colleague-commit-study/PROGRESS.md` |
| **누적 학습 노트** | `study/colleague/{NN}-{id-kebab}.md` — `study/colleague/README.md` 표 |
| **덩어리 체크** | `log/_common/sessions/active_colleague_commit_study.md` |
| 덩어리 정의 템플릿 | `.cursor/skills/colleague-commit-study/session-chunks.md` |
| TIL (덩어리, 선택) | `log/_common/til/YYYY-MM-DD.md` — `- colleague·{ID}·d{n}: …` |

**원칙:** 체크·다음 덩어리 = **active**. 배운 내용 = **study/colleague 노트 `## 진행`**. PROGRESS는 **세션 wrap** 때만 ☑.

**TIL:** 덩어리 한 줄은 til에 **선택**; 세션 요약은 노트 `## 진행`에 3~5줄 (기존 `til/colleague-commit-study.md` 내용은 wrap 시 노트로 이관).

---

## 모드

| 트리거 | 모드 |
|--------|------|
| `colleague-commit-study-start`, 진도, 이어하기 | **start** |
| `[SHARED S01]`, analyze, 분석 | **analyze** |
| **`/chunk`**, **`/chunk-wrap`**, `chunk-wrap`, `colleague-chunk-wrap`, `덩어리랩`, `덩어리 1 끝`, `-chunk-wrap` | **chunk-wrap** |
| `colleague-commit-study-wrap`, `/wrap`, 세션 완료 | **wrap** |

**슬래시 메뉴:** Cursor 기본 `/` 목록에 `/chunk`는 **없을 수 있음**. 채팅 입력창에 **`/chunk 1`** 또는 **`chunk-wrap 1`** 을 **직접 치거나**, **`@colleague-chunk-wrap`** 스킬을 고른다.

세션 ID 없으면 PROGRESS의 `CURRENT_TRACK` + `CURRENT_SESSION`.

---

## start

1. **PROGRESS.md**, **active_colleague_commit_study.md**, **session-chunks.md**(해당 ID 섹션) 읽기.
2. active의 세션 ID ≠ PROGRESS `CURRENT_SESSION` 이면 **session-chunks**로 active **재작성** (기존 메모는 **study/colleague** 해당 세션 노트로 옮기기).
3. 세션 ID에 맞는 `study/colleague/*.md` 없으면 README 규칙으로 생성 · `## 학습 할 일`은 덩어리 체크 요약(선택).
4. active에서 **첫 ☐ 덩어리** 번호·이름 계산.
5. 채팅 (짧게):

```markdown
## 커밋 학습

- **세션:** {ID} — {테마} — `{FROM}..{TO}`
- **덩어리 진행:** {완료 덩어리}/{전체} — **지금 할 것: 덩어리 {n} ({이름})**
- **이어하기 파일:** `log/_common/sessions/active_colleague_commit_study.md` (pull 후 열기)
- Shared/Mobile: {n}/{total}

### 오늘 첫 액션
active의 덩어리 {n} 체크리스트만 수행 → 끝나면 `colleague-commit-study-chunk-wrap {n}`

### 세션 전체 완료 후
`colleague-commit-study-wrap`
```

---

## analyze

1. curriculum에서 repo·FROM·TO 확인; PowerShell에서 `git log`/`diff` (루트 커밋은 `FROM^` 대신 `FROM..TO` + `git show FROM` if root).
2. **session-chunks**에 해당 ID 덩어리가 없으면 **추가 작성** 후 active 체크리스트 동기화.
3. 출력 = **거시(커밋 그룹·패턴)** + **미시(덩어리별: 읽을 경로·질문·통과 기준)** — `session-chunks` / active와 **동일한 덩어리 번호** 사용.
4. PROGRESS ☑ 금지.

---

## chunk-wrap

1. 사용자가 완료한 **덩어리 번호** (없으면 active에서 방금 언급한 번호).
2. **active_colleague_commit_study.md**:
   - 해당 덩어리 블록 하위 `- [ ]` → `- [x]` (통과한 항목만; 반만이면 ☐ 유지)
   - active `## 진행`에 한 줄 (있으면) + **study/colleague** 노트 `## 진행`에 덩어리 {n} 한 줄
   - `## 다음에 할 일` → **다음 ☐ 덩어리** 번호로 갱신
3. **TIL (덩어리):** `log/_common/til/{YYYY-MM-DD}.md` (Asia/Seoul, 없으면 생성) 맨 아래 **1줄** append:

   `- colleague·{ID}·d{n}: {핵심 한 줄}` — 사용자 메모 우선; 없으면 `## 진행`에서 추출. 장문 금지.

4. 채팅: 다음 덩어리 **체크리스트** + 방금 TIL 한 줄 인용.

---

## wrap (세션 단위)

1. ID = PROGRESS `CURRENT_SESSION` (또는 사용자 지정).
2. active 덩어리 **전부 [x]** 또는 사용자 “세션 wrap (덩어리 N 스킵)” 명시 — 스킵 시 PROGRESS ☑ **하지 않음**.
3. **세션 노트:** `study/colleague/{NN}-{id}.md`의 `## 진행`에 `### {ID}` + 불릿 **3~5줄** (세션 핵심). daily `colleague·{ID}·d*` 줄은 **통합·압축**. 완료 시 `study/colleague/archive/…` 스냅샷 선택.

4. **PROGRESS.md** ☑·완료일·`LAST_COMPLETED`·다음 ID·세션 메모.
5. active → **다음 세션** 체크리스트 재생성.
6. `active.md` 마지막 colleague 줄 갱신.
7. 채팅: 3줄 요약 + TIL 경로 (`colleague-commit-study.md`, 필요 시 당일 daily).

---

## 규칙

- `frontend-dev-notes` package.json = **무관** (안내 시 backoffice-shared 경로 명시).
- 한 analyze = 커리큘럼 **1세션**; 한 sitting = **1덩어리** 권장.
- Mobile: `project-fca-mobile` path 필터.

---

## 예시

- `colleague-commit-study-start` → active 덩어리 2부터
- `[SHARED S01] analyze` → 거시 + 덩어리표
- `colleague-commit-study-chunk-wrap 1 — vite lib는 react external` → active [x] + `til/2026-10-02.md` 한 줄
- `colleague-commit-study-wrap` → S01 ☑ + `til/colleague-commit-study.md` § S01
