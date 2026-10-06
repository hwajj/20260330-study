# 항목 3 · RAG·검색 증강

> **SSOT:** 체크 = **`## 학습 할 일`** · 내용 = **`## 진행`**. wrap 2026-10-06: 완료.

## 학습 할 일

§2 이번 세션 + §3 키워드. 아래를 보며 `## 진행`에 정리한다.

- [x] **파이프라인 4단** — 색인(index) → 검색(retrieval) → 재랭킹(rerank) → 생성(generate) 흐름 **그림 또는 4 bullet**
- [x] **chunking·embedding** — 문서를 잘라 벡터로 저장하는 이유(윈도·의미 단위); embedding **한 줄**
- [x] **벡터 DB·hybrid search** — 의미 유사도 검색 + (선택) 키워드(BM25) **왜 섞는지** 1~2줄
- [x] **실패 1 — retrieval miss** — 필요한 조각이 검색에 **안 잡힐 때** 어떤 답이 나오는지
- [x] **실패 2 — stale data / 환각** — §2의 stale·환각 중 **2가지**를 `## 진행`에 각 1줄 (contradictory chunks·context overflow 중 택해도 됨)
- [x] **연습 — 내부 문서 QA 5박스** — §3: ingest / index / query / retrieve / generate **역할만** 박스 5개
- [x] **통과선** — RAG가 해결하는 문제 vs 순수 LLM **한 줄씩** (`## 진행` 또는 말로)

## 진행

### 파이프라인 4단

1. **색인(index):** 문서 chunk → embedding → 벡터 DB(또는 역색인)에 저장  
2. **검색(retrieval):** 질의 embedding·키워드로 **top-k chunk** 후보  
3. **재랭킹(rerank):** cross-encoder 등으로 **관련도 순** 재정렬  
4. **생성(generate):** LLM에 **질의 + 선택 chunk**를 넣고 답 생성

### chunking·embedding

- **chunking:** 컨텍스트 한도·검색 단위를 맞추기 위해 문단/페이지 단위로 자름 — 너무 크면 노이즈, 너무 작으면 맥락 손실.  
- **embedding:** 텍스트 → 벡터; **의미적으로 가까운** chunk를 거리/유사도로 찾기 위함.

### 벡터 DB·hybrid search

- **벡터:** 동의어·패러프레이즈에 강함. **키워드(BM25):** 고유명·SKU·버전 번호 등 **정확 매칭**에 강함 → **hybrid**로 recall 올림.

### 실패 1 — retrieval miss

- 필요한 근거 chunk가 top-k에 **없으면** LLM은 **학습 지식으로 추측** → **환각·오답** (출처 없는 자신감).

### 실패 2 — stale data · 환각(관련)

- **stale data:** 색인이 **오래됐**는데 최신 정책·가격 반영 안 됨 → **틀린 but 그럴듯한** 답.  
- **contradictory chunks:** 서로 다른 chunk가 **모순** → LLM이 한쪽만 따르거나 섞어 **일관 없는** 답.

### 내부 문서 QA 5박스

| 박스 | 역할 |
|------|------|
| **ingest** | PDF·wiki 등 **수집·전처리** |
| **index** | chunk + embed + **저장** |
| **query** | 사용자 질문 **정규화·확장** |
| **retrieve** | 후보 chunk **검색·rerank** |
| **generate** | LLM **답 + (선택) 인용** |

### 통과선 — RAG vs 순수 LLM

- **RAG:** «**우리 KB·최신 문서**에 근거한 답» — 지식을 **검색으로 주입**, 환각·윈도 한계 완화( retrieval 품질이 병목).  
- **순수 LLM:** parametric memory만 — **일반 지식·추론**은 OK, **사내 전용·최신·출처**는 약함.

### 4단 설명 — RAG 

'RAG=필요한 문서를 검색해서 LLM에게 같이 넣어주는 방식'

1. **정의:** 검색으로 relevant context(질문에 답하는 데 필요한 관련 문서 내용)를 LLM 입력에 **끼워 넣는** 생성 패턴.  
2. **배경:** 컨텍스트 한도·환각·비공개 데이터를 **외부 corpus**로 보완. 
(LLM 바깥에서 검색해서 넣어주는 문서 → external corpus) 
3. **구성:** (색인 → 검색 → 재랭킹 → 생성)+ hybrid + rerank + citation.  
4. **한계:** retrieval miss, stale index, chunk 경계, latency·비용.

## 메모

```
[ingest] → [index: chunk+embed] → user query → [retrieve+rerank] → [LLM generate]
```

| | RAG | 순수 LLM |
|---|-----|----------|
| 강점 | 사내·최신 문서 근거 | 범용 추론·빠른 프로토타입 |
| 약점 | 검색·색인 품질 | 환각·비공개·낡은 정보 |



## 정리

```
RAG(Retrieval-Augmented Generation)는 LLM이 자체적으로 가지고 있는 지식만으로 답변하지 않고, 외부 문서나 사내 지식베이스에서 질문과 관련된 정보를 먼저 검색한 뒤 그 내용을 LLM의 입력에 넣어 답변하도록 하는 방식이다. 먼저 ingest 단계에서 PDF, 위키, 문서 등의 데이터를 수집하고 전처리한 후, 문서를 적절한 의미 단위의 chunk로 나눈다. 각 chunk는 embedding을 통해 의미를 나타내는 벡터로 변환하고 Vector DB 등에 저장하는데, 이 과정을 index라고 한다. 사용자가 질문하면 query를 생성하고, 질문의 embedding이나 키워드 검색(BM25)을 이용해 관련성이 높은 chunk를 검색(retrieval)한다. 이때 벡터 검색은 의미가 비슷한 표현을 찾는 데 강하고, BM25 같은 키워드 검색은 고유명사나 제품 코드, 버전 번호처럼 정확한 단어가 중요한 경우에 강하기 때문에 두 방식을 결합한 hybrid search를 사용하면 검색 recall을 높일 수 있다. 검색된 후보들은 rerank 과정을 통해 실제 질문과 관련성이 높은 순서로 다시 정렬하고, 최종적으로 선택된 chunk와 사용자 질문을 LLM에 전달하면 LLM이 해당 내용을 근거로 최종 답변을 생성한다(generate). RAG는 사내 문서나 최신 정책처럼 LLM이 원래 알기 어렵거나 지속적으로 변경되는 정보를 답변에 활용할 수 있다는 장점이 있지만, 필요한 chunk가 검색되지 않는 retrieval miss가 발생하면 LLM이 근거 없이 추측하여 환각을 일으킬 수 있고, 색인이 오래된 경우 stale data 문제가 발생하며, 서로 모순되는 chunk가 검색되면 일관되지 않은 답변이 나올 수도 있다. 따라서 RAG의 핵심은 단순히 LLM에 검색 기능을 붙이는 것이 아니라, 필요한 문서를 얼마나 정확하게 찾아서 적절한 context로 제공하느냐에 있으며, 결국 검색과 색인의 품질이 전체 답변 품질을 좌우한다.
```