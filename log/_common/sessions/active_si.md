# SI — 단계 1 · HTTP·REST (서버 계약) — 2026-09-28 (KST)

다른 PC에서 이어할 때: repo를 pull한 뒤 이 파일을 엽니다.

권장 2~4h · 단계 1개 · FE 저녁 90m과 겹치지 않기

## 실행 체크리스트

- [ ] HTTP 메서드(GET/POST/PUT/PATCH/DELETE) 중 미니 API에 쓸 것 2~3개 골라 **언제 쓰는지** 한 줄씩 적기
- [ ] 상태코드 200·201·400·401·404·500 — 각각 **서버가 뭘 말하는지** 내 말로 한 줄 (표 또는 불릿)
- [ ] `Content-Type: application/json`일 때 요청·응답 body가 **계약**이라는 점을 예시 JSON 1개로 적기
- [ ] **curl**로 GET 1회 실행 — URL, status, body 핵심 필드 한 줄 해석 (`## 메모`에 붙여넣기 OK)
- [ ] **curl**로 POST(또는 PUT) 1회 — body JSON 넣어 보내고 status·응답 해석
- [ ] **curl**로 401 또는 404 1회 — FE와 달리 **서버가 반환하는 이유** 한 줄
- [ ] **통과선:** 서버가 맡는 책임 3가지 vs FE 3가지를 구분해서 **말로** 설명 (녹음 선택)

### 참고

- [ ] **열기:** `frontend-dev-notes/docs/curriculum/week-01-web-js/day-01-http-basics.md` (서버 관점으로만 재독)

## 한 줄 목표

HTTP를 FE 소비자가 아니라 **API를 설계·구현하는 BE** 관점에서 읽기

## 참고

- 막힌 질문: —
- `CURRENT_STEP` → 오늘 실행 **단계 1** (☐)

## 진행

완료한 항목은 [x]로 바꾸고 한 줄 메모

## 메모

## 막힌 질문
