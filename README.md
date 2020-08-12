# useAwait

### works with react suspense.

*React controls the behavior of suspense based on the throw statement. Therefore, the behavior of useAwait in the component behaves like the await function inside the async function.*

It is very simple to use.

It only takes 5 minutes to read the code below. For now, that's all.

1. Write your own asynchronous function that returns a promise.
2. It can be a function or a list of functions. If you need multiple asynchronous processing at any given time, create a list. It runs in parallel. This will be the first parameter.
3. If there is a dependency on the asynchronous processing you just wrote, pass it as a list to the second parameter. Maybe it will be something like a user ID.

```
function UseAwaitTest1() {
  const [count, setCount] = useState(0);

  const getUserName = (count) => () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Lee Seokkyu",
          count,
        });
      }, 5000);
    });
  };

  const result = useAwait(getUserName(count), [count]);

  return (
    <div>
      <div>count : {count}</div>
      <div>name : {result ? result.name : ""}</div>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        count++
      </button>
    </div>
  );
}

function UseAwaitTest2() {
  const [count, setCount] = useState(0);

  const getUserName = (count) => () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Lee Seokkyu",
          count,
        });
      }, 5000);
    });
  };

  const [result1, result2] = useAwait(
    [getUserName(count), getUserName(count)],
    [count]
  );

  return (
    <div>
      <div>count : {count}</div>
      <div>name : {result1 ? result1.name : ""}</div>
      <div>name : {result2 ? result2.name : ""}</div>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        count++
      </button>
    </div>
  );
}


function App() {
  return (
    <>
      <Suspense fallback={<div>...load data</div>}>
        <UseAwaitTest1></UseAwaitTest1>
      </Suspense>
      <Suspense fallback={<div>...load data</div>}>
        <UseAwaitTest2></UseAwaitTest2>
      </Suspense>
    </>
  );
}

```
