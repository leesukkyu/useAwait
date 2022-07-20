/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Suspense } from "react";
import useAwait from "../index.js";

function UseAwaitExample1() {
  const [count, setCount] = useState(0);

  const getUserName = () => () => {
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

function App() {
  return (
    <>
      <Suspense fallback={<div>...Loading data</div>}>
        <UseAwaitExample1></UseAwaitExample1>
      </Suspense>
    </>
  );
}

export default App;
