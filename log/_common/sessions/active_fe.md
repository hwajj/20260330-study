W1 수요일 · 2026-09-28 (KST)

다른 PC에서 이어할 때: repo를 pull한 뒤 이 파일을 엽니다.

오늘 순서: 이론 → 회사 코드 읽기 → 사고력(종이만, IDE 안 켬) → 저녁 손과제

## 실행 체크리스트

이론 — HTTP 기초
- [ ] 문서 열기: `frontend-dev-notes/docs/curriculum/week-01-web-js/day-01-http-basics.md` (없으면 `CURRICULUM-FULL-TRACK.md`에서 경로 확인)
- [ ] 처음부터 끝까지 한 번 읽기 (표·코드 포함). 모르는 말은 옆에 ?만 적기
- [ ] `log/_common/curriculum-notes/day-01-http-basics.md`에 내 말로 세 줄: 뭔지 / 비슷한 개념과 차이 / 회사·FE와 연결
- [ ] `frontend-dev-notes/docs/interview/index.md`에서 HTTP 질문 하나 골라 소리 내서 답하기 → 같은 노트에 면접 Q, 내 답 요지 각 한 줄

회사 — AsyncQueue 읽기 (코드 수정 없음)
- [ ] 파일 열기: `20_backoffice-shared/packages/service/src/HttpClientService/utils.ts`
- [ ] `AsyncQueue`와 `reissueTokenOn401Error` 부분만 보기 (함수 전체 또는 대략 50~80줄)
- [ ] 주석과 메서드만 따라가며, enqueue 다음에 dequeue가 어떻게 이어지는지 종이에 세 단계로 적기
- [ ] 아래 메모에 두 가지 적기: 이 큐가 막아 주는 문제 / 내가 헷갈리는 점

사고력 — 기능개발, 종이로만 (코드·IDE 안 켬)
- [ ] 문제: 기능개발 — https://school.programmers.co.kr/learn/courses/30/lessons/42586 (월에 다른 걸 안 골랐으면 이걸 메인으로)
- [ ] 지문 읽고 종이 맨 위에 입력·출력·제약을 한 문장으로 정리
- [ ] §4-C 「수 trace」 1~4 (입출 한 문장, 예시 `progresses=[93,30,55]` 등 표, 규칙 1줄, 엣지 말로)
- [ ] `log/_common/til/2026-09-28.md`에 `- PS: …` 한 줄

기록 — daily TIL
- [ ] `log/_common/til/2026-09-28.md` 만들거나 이어쓰기 — 불릿 3~7줄 (이론 / 회사 / PS / 저녁 중 오늘 한 것)

저녁 — 401과 큐 타임라인 (AI·챗 끄고 손으로)
- [ ] 상황 가정: 요청 A·B·C가 겹침 → 401 → 토큰 reissue는 한 번만
- [ ] 종이 한 장에 `t | 요청 | 큐 | reissue? | 결과` 열 채우고, 끝나면 두 분 정도 말로 설명 (녹음은 선택)
- [ ] 끝나면 진행 섹션에 완료 시각과 설명 가능 여부 한 줄

## 이번 주 한 줄
event loop·Promise를 말로 설명할 수 있게 / 401이 여러 요청에 겹칠 때 큐 그림 그리기

## 참고
- 막힌 질문: —
- 플랜: W1, 커서는 수요일, 오늘도 수요일

## 진행
완료한 항목은 [x]로 바꾸고 한 줄 메모

## 메모

## 막힌 질문
