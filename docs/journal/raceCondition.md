# Race Condition (경쟁 상태)

> 작성일: 2026-06-11

## 1. Race Condition 이란?

Race Condition(경쟁 상태)이란 여러 비동기 작업이 동시에 진행될 때, **어떤 작업이 먼저 끝나느냐에 따라 결과가 달라지는 문제**를 말한다.

특히 API 요청에서는

```txt
마지막으로 요청한 데이터
≠
마지막으로 도착한 데이터
```

가 될 수 있다.

---

## 2. Race Condition 예시

```jsx
function App() {
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(id).then((result) => {
      setData(result);
    });
  }, [id]);

  return (
    <>
      <button onClick={() => setId((prev) => prev + 1)}>
        Next ({id})
      </button>

      <div>{data}</div>
    </>
  );
}
```

사용자가 버튼을 빠르게 눌렀다고 가정해보자.

```txt
id=2 요청
id=3 요청
id=4 요청
```

하지만 서버 응답 순서는 보장되지 않는다.

```txt
id=4 응답 도착
id=2 응답 도착
id=3 응답 도착
```

그러면 최종적으로 화면에는

```txt
버튼: Next (4)
데이터: 3번 데이터
```

가 표시될 수 있다.

현재 선택된 id는 4인데, 화면에는 3번 데이터가 표시되는 문제다.

---

## 3. Race Condition 해결

```jsx
useEffect(() => {
  let ignore = false;

  fetchData(id).then((result) => {
    if (!ignore) {
      setData(result);
    }
  });

  return () => {
    ignore = true;
  };
}, [id]);
```

### 동작 과정

```txt
effect1 실행
↓
ignore1 = false
↓
fetchData(1) 요청
↓
아직 응답 안 옴
↓
id 변경
↓
effect1 cleanup 실행
↓
ignore1 = true
↓
effect2 실행
```

이후 나중에 1번 요청 응답이 도착하면

```js
if (!ignore1) {
  setData(result);
}
```

를 실행하게 된다.

하지만 이미 cleanup에서

```js
ignore1 = true;
```

로 변경되었으므로

```js
if (!true)
```

가 되어 state를 업데이트하지 않는다.

### 핵심 이해

> id2가 실행될 때 id1의 cleanup이 먼저 실행되어 id1이 참조하던 ignore 값이 변경된다. 그래서 나중에 id1의 응답이 도착해도 이미 ignore=true 상태라 결과를 무시한다.

이 동작이 가능한 이유는 `then` 콜백과 `cleanup` 함수가 동일한 `ignore` 변수를 클로저로 참조하고 있기 때문이다.

---

## 정리

* Race Condition은 응답 순서에 따라 결과가 달라지는 문제다.
* API 응답 순서는 보장되지 않는다.
* `useEffect`의 cleanup을 이용해 이전 요청을 무효화할 수 있다.
* 이 패턴은 요청을 취소하는 것이 아니라 **응답을 무시하는 방식**이다.
* 실제 요청 취소가 필요하다면 `AbortController`를 사용한다.
