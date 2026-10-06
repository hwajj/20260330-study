# 항목 4 · 에이전트·MLOps

> **SSOT:** 체크 = **`## 학습 할 일`** · 내용 = **`## 진행`**. wrap 2026-10-06: 완료.

## 학습 할 일

§2 이번 세션 + §3 키워드. 아래를 보며 `## 진행`에 정리한다.

- [x] **Agent 구성** — LLM + **tools** + **planning loop** (+ human approval 선택) 각 **한 줄**
- [x] **Agent 루프** — 계획 → 도구 호출 → 관찰(observation) → (메모리) 반복 **흐름** bullet 또는 그림
- [x] **human-in-the-loop** — 위험·비용 큰 tool 전 **승인**이 왜 필요한지 1~2줄
- [x] **MLOps 키워드** — data versioning · experiment tracking · model registry · **drift monitoring** 중 **2개 이상** `## 진행`에 정의
- [x] **DevOps vs MLOps** — §3: 앱 **배포** vs 모델·데이터 **라이프사이클** — **비교 3줄**
- [x] **통과선** — Agent **1회 루프**를 **5단계**로 말하기 (단계 이름만 `## 진행`에 적어도 됨)

## 진행

### Agent 구성

- **LLM:** 계획·자연어 추론·tool 호출 **포맷** 생성  
- **tools:** API·DB·코드 실행 등 **외부 행동** (환각 줄이고 사실·액션 분리)  
- **planning loop:** 목표까지 **반복** (실패 시 재시도·다른 tool)  
- **human approval (선택):** 결제·삭제·메일 발송 등 **되돌리기 어려운** action 전 확인

### Agent 루프

목표 → **계획** → **tool 선택·인자** → **실행** → **observation(결과)** → (메모리/대화에 적재) → 목표 달성까지 **반복** 또는 종료.

### human-in-the-loop

tool이 **비가역·규제·비용**이 크면 LLM만 믿지 않고 **사람 승인** — prompt injection·잘못된 plan으로 **자동 실행** 방지.

### MLOps 키워드

- **experiment tracking:** 하이퍼파라미터·메트릭·아티팩트 **재현** (어떤 run이 배포됐는지)  
- **model registry:** 승 promoted 모델 **버전·스테이지**(staging/prod)  
- **drift monitoring:** serving 데이터·예측 분포가 **학습 시와 달라지면** 알람·재학습  
- **data versioning:** 학습에 쓴 **데이터 스냅샷** 추적 (재현·감사)

### DevOps vs MLOps (3줄)

1. **DevOps:** 애플리케이션 **빌드·테스트·배포·인프라** — CI/CD, feature flag.  
2. **MLOps:** **데이터·학습·평가·모델 배포·모니터링** — 실험·registry·drift.  
3. **겹침:** 둘 다 CI·관측·롤백; MLOps는 **데이터/모델 품질**이 추가 축.

### 통과선 — Agent 1회 루프 **5단계**

1. **목표 입력** (user task)  
2. **계획** (다음 action)  
3. **tool 호출** (name + args)  
4. **observation** (tool 결과)  
5. **종료 또는 반복** (답 제출 / 2로)

### 4단 설명 — Agent (한계)

1. **정의:** LLM이 tool을 **연쇄 호출**하며 목표를 수행하는 패턴.  
2. **배경:** 단일 프롬프트로는 **최신·실행·다단계** 작업 한계.  
3. **구성:** LLM + tools + memory + (guardrails·approval).  
4. **한계:** tool abuse, 무한 루프, 비용·latency, 잘못된 plan.

## 메모

```
[goal] → plan → act(tool) → observe → (memory) ↻ → answer
```

| | DevOps | MLOps |
|---|--------|--------|
| 산출물 | 바이너리·컨테이너 | 모델·데이터·메트릭 |
| 핵심 위험 | 배포 장애 | drift·데이터 누수·재현 불가 |

## 막힌 질문

—
