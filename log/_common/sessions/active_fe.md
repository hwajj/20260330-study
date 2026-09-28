W1 목 · 2026-09-29 (KST)

다른 PC에서 이어할 때: repo를 pull한 뒤 이 파일을 엽니다.

오늘 순서: 이론 → 회사 코드 읽기 → 사고력(TIL PS 줄) → 저녁 손과제

## 실행 체크리스트

이론 — HTTP 기초
- [ ] 문서 열기: `frontend-dev-notes/docs/curriculum/week-01-web-js/day-01-http-basics.md` (없으면 `CURRICULUM-FULL-TRACK.md`에서 경로 확인)
- [ ] 처음부터 끝까지 한 번 읽기 (표·코드 포함). 모르는 말은 옆에 ?만 적기
- [ ] `log/_common/curriculum-notes/day-01-http-basics.md`에 내 말로 세 줄: 뭔지 / 비슷한 개념과 차이 / 회사·FE와 연결
- [ ] `frontend-dev-notes/docs/interview/index.md`에서 HTTP 질문 하나 골라 소리 내서 답하기 → 같은 노트에 면접 Q, 내 답 요지 각 한 줄

회사 — createGuardedInstance (코드 수정 없음)
- [ ] 파일 열기: `20_backoffice-shared/packages/service/src/HttpClientService/utils.ts`
- [ ] L8–32 `createGuardedInstance` 구간만 보기 (함수 전체 또는 대략 50~80줄)
- [ ] 가드/인스턴스가 interceptor 체인과 어떻게 연결되는지 주석과 함께 한 번 따라가기
- [ ] 아래 메모에 두 가지 적기: 이 코드가 막아 주는 문제 / 내가 헷갈리는 점

사고력 — TIL 다듬기 (저녁 15m)
- [ ] 수요일 trace에서 막힌 단계를 떠올리기 (종이 없으면 기억·프로그래머스 지문만)
- [ ] `log/_common/til/`에서 이번 주 `- PS:` 줄이 있는 파일 열기 (없으면 `2026-09-28` 또는 오늘 파일에 새로 한 줄)
- [ ] 막힌 단계 반영해 `- PS:` 한 줄 수정하기

저녁 — axios interceptor 토이 (AI·챗 끄고 손으로)
- [ ] 타이머 켜고 AI·챗은 끄기
- [ ] fetch 또는 axios로 가짜 401 한 번 낸 뒤 request/response interceptor에서 잡는 토이 작성
- [ ] 401이 interceptor 순서에 따라 어떻게 보이는지 콘솔 또는 한 줄 메모로 남기기
- [ ] 끝나면 진행 섹션에 완료 시각과 통과 여부 한 줄

기록 — daily TIL
- [ ] `log/_common/til/2026-09-29.md` 만들거나 이어쓰기 — 불릿 3~7줄 (이론 / 회사 / PS / 저녁 중 오늘 한 것)

## 이번 주 한 줄
event loop·Promise를 말로 설명할 수 있게 / 401이 여러 요청에 겹칠 때 큐 그림 그리기

## 참고
- 막힌 질문: —
- 플랜: W1, 커서는 목요일

## 진행
완료한 항목은 [x]로 바꾸고 한 줄 메모

## 메모

## 막힌 질문
