# 카카오톡 채널 연동 — 나중에 참고용

> **지금 레포:** 실채널 연동 없음. 서버에는 **웹훅 스텁**만 (`POST /webhook/kakao`).  
> 이 문서는 «다음에 붙일 때 콘솔에서 뭘 하는지» 체크리스트다.  
> UI·메뉴명은 카카오 콘솔 개편에 따라 달라질 수 있으니, **실제 붙일 때 공식 문서를 한 번 더 본다.**

관련 코드: [`server/kakao/`](../server/kakao/) · README 개념도.

---

## 0. 한 줄로

카카오는 **입구(웹훅)** 만 담당하고, 주문 해석·단가·엑셀은 **이미 있는 Agent 파이프라인**을 그대로 쓴다.

```text
카톡 메시지 → 카카오 서버 → HTTPS POST → 내 /webhook/kakao
                                      → extract 텍스트
                                      → runAgentLoop / confirm
                                      → 카카오 응답 JSON으로 회신
```

---

## 1. 콘솔·계정 준비 (체크리스트)

| # | 할 일 | 메모 |
|---|--------|------|
| 1 | [카카오 비즈니스](https://business.kakao.com) / [카카오 디벨로퍼스](https://developers.kakao.com) 계정 | 회사·개인 중 포폴용으로 쓸 계정 |
| 2 | **카카오톡 채널** 개설 (구 플러스친구) | 거래처가 말 거는 «봇 프로필» |
| 3 | 챗봇 도구 선택 | 보통 **카카오 i 오픈빌더** (스킬 서버 = 내 API) |
| 4 | 채널 ↔ 챗봇 연결 | 오픈빌더에서 채널 연결 |
| 5 | **스킬(Skill) / 웹훅 URL** 등록 | 예: `https://xxxx.ngrok-free.app/webhook/kakao` |
| 6 | (선택) 검수·오픈 | 내부 테스트만이면 샌드박스·초대 사용자로 충분할 수 있음 |

### 로컬에서 받을 때

카카오 서버는 `localhost`로 못 온다. 터널 필요:

```bash
# 예: Cloudflare Tunnel / ngrok
ngrok http 8787
# → https://xxxx.ngrok-free.app 을 스킬 URL로 등록
```

HTTPS, 공개 도달 가능해야 한다.

---

## 2. 오픈빌더에서 «스킬»이란

오픈빌더 시나리오 안에서 **외부 API를 호출하는 블록**이다.

1. 사용자가 «무2개 고춧가루 1통» 입력  
2. 봇이 내 스킬 URL로 POST  
3. 내가 JSON 응답 → 봇이 말풍선/버튼으로 보여 줌  

포폴 스텁은 이 POST body를 **단순화한 가짜 JSON**으로 받는다.  
실연동 시에는 오픈빌더가 보내는 **실제 필드명**에 맞춰 `extractKakaoText`만 고치면 된다.

공식 문서 (검색 키워드, 시점별 URL 변동):

- `카카오 i 오픈빌더 스킬 서버`
- `카카오톡 채널 챗봇`
- `skill payload` / `userRequest.utterance`

---

## 3. 요청·응답에서 자주 쓰는 개념

| 개념 | 의미 | 우리 서버에서 |
|------|------|----------------|
| `userRequest.utterance` | 사용자가 보낸 문장 | → `runAgentLoop(text)` |
| `user.id` / `user.key` | 사용자 식별 | → `session`에 매핑 (확인·엑셀 연속 대화) |
| 봇 응답 `version` + `template` | 말풍선·버튼 카드 | `toKakaoSkillResponse(...)` |
| 버튼 `block` / `message` / `webLink` | «예, 정산서 만들기» | → `confirm-quote` 트리거 |

HITL 예시:

1. 첫 메시지 → 견적 요약 텍스트 + 버튼 «확인 · 엑셀»  
2. 버튼 콜백(또는 «확인» 텍스트) → `confirmQuote` → `xlsx` 다운로드 링크를 `webLink` 또는 텍스트로 회신  

(스텁은 1번까지 단순 텍스트+메타로 흉내 낸다.)

---

## 4. 보안·운영

- [ ] 웹훅 URL 시크릿 / 허용 Origin·서명 (콘솔·문서에 있는 방식 따를 것)
- [ ] `.env`에 채널/앱 키 — **git 커밋 금지** (`.env.example`에 이름만)
- [ ] Rate limit · 타임아웃: 카카오는 스킬 응답 시간 제한이 있는 경우가 많음 → Agent `maxSteps`·LLM 지연 주의
- [ ] 개인정보: 주문·연락처 로그 최소화 (포폴이면 mock만)

`.env.example` 후보 이름:

```bash
# 실연동 시 (지금은 스텁만 — 없어도 동작)
# KAKAO_SKILL_SECRET=
# PUBLIC_BASE_URL=https://xxxx.ngrok-free.app
```

---

## 5. 이 레포에서 검증하는 법 (실채널 없이)

서버 기동 후:

```bash
curl -s -X POST http://localhost:8787/webhook/kakao ^
  -H "Content-Type: application/json" ^
  --data-binary @server/kakao/fixtures/sample-utterance.json
```

기대:

- `ok: true`
- `pipeline`에 trace / quote (문장이 명확하면)
- `kakao`에 오픈빌더 비슷한 스킬 응답 골격

확인 후 엑셀:

```bash
# webhook 응답의 sessionId 사용
curl -s -X POST http://localhost:8787/sessions/<sessionId>/confirm-quote -H "Content-Type: application/json" -d "{}"
```

---

## 6. 면접에서 말할 문장

> «카카오 실연동은 1차 범위 밖입니다. 채널 웹훅(또는 오픈빌더 스킬)이 들어오는 어댑터만 추가하면 되고, 파싱·카탈로그·HITL·엑셀은 웹 데모와 동일한 서버 파이프라인을 씁니다. 로컬은 ngrok으로 콜백 URL을 열고, 스텁으로 body 변환을 검증해 두었습니다.»

---

## 7. 다음에 실연동할 때 TODO

1. 오픈빌더 스킬 URL = `PUBLIC_BASE_URL/webhook/kakao`  
2. 실 payload 샘플 저장 → `extractKakaoText` 필드 맞추기  
3. 버튼 콜백 → `confirm-quote` 연결  
4. xlsx는 공개 HTTPS 링크 (`PUBLIC_BASE_URL/files/...`) 또는 임시 업로드  
5. 타임아웃·에러 시 사용자용 짧은 안내 문구  

실채널·사업자 검수는 포폴 필수 아님.
