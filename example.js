/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Suspense } from "react";
import useAwait from "./useAwait";

function UseAwaitExample1() {
  const [count, setCount] = useState(0);

  const getUserName = (state) => () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: count === 0 ? "Hwang" : count === 1 ? "Jeon" : "Lee",
        });
      }, 5000);
    });
  };

  const result = useAwait(getUserName(count), [count]);

  return (
    <div>
      <div>count : {count}</div>
      <div>load name : {result ? result.name : "empty"}</div>
      <button
        type="button"
        onClick={() => {
          const c = (count + 1) % 3;
          setCount(c);
        }}
      >
        count++
      </button>
    </div>
  );
}

function UseAwaitExample2() {
  const [count, setCount] = useState(0);

  const getUserName = (count) => () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: count === 0 ? "Hwang" : count === 1 ? "Jeon" : "Lee",
        });
      }, 5000);
    });
  };

  const getAge = (count) => () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: count === 0 ? "35" : count === 1 ? "15" : "35",
        });
      }, 5000);
    });
  };

  const [result1, result2] = useAwait(
    [getUserName(count), getAge(count + 1)],
    [count]
  );

  return (
    <div>
      <div>count : {count}</div>
      <div>load name data : {result1 ? result1.name : "empty"}</div>
      <div>load age data : {result2 ? result2.name : "empty"}</div>
      <button
        type="button"
        onClick={() => {
          const c = (count + 1) % 3;
          setCount(c);
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
        <UseAwaitExample1></UseAwaitExample1>
      </Suspense>
      <Suspense fallback={<div>...load data</div>}>
        <UseAwaitExample2></UseAwaitExample2>
      </Suspense>
    </>
  );
}

export default App;
