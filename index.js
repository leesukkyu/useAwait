/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

export class useAwait2 extends React.Component {
  render() {
    return 10;
  }
}

function useAwait(fnList, dependencyList) {
  if (!isValid(fnList, dependencyList)) {
    return;
  }
  const isArray = Array.isArray(fnList);
  const [isRunning, setIsRunning] = useState(false);
  const [isPromiseEnd, setIsPromiseEnd] = useState(false);
  const [error, setIsError] = useState(null);
  const [result, setResult] = useState(isArray ? [] : null);

  useEffect(() => {
    setIsRunning(true);
    try {
      Promise.all(
        isArray
          ? fnList.map((fn) => {
              return fn();
            })
          : [fnList()]
      )
        .then((resultList) => {
          if (isArray) {
            setResult(resultList);
          } else {
            setResult(resultList[0]);
          }
        })
        .catch((err) => {
          setIsError(err);
        })
        .finally(() => {
          setIsPromiseEnd(true);
        });
    } catch (err) {
      setIsError(err);
      setIsPromiseEnd(true);
    }
  }, dependencyList);

  if (isRunning) {
    if (!isPromiseEnd) {
      throw Promise.resolve();
    }

    if (error) {
      throw error;
    }

    if (result) {
      setIsRunning(false);
      setIsPromiseEnd(false);
      setIsError(null);
      return result;
    }
  }

  return result;
}

function isValid(fnList, dependencyList) {
  return !!(
    fnList &&
    (dependencyList !== undefined ? Array.isArray(dependencyList) : true)
  );
}

export default useAwait;
