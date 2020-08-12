/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

function useAwait(fnList, dependencyList) {
  if (!isValid(fnList, dependencyList)) {
    return;
  }
  const isArray = Array.isArray(fnList);
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [error, setIsError] = useState(null);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setIsStart(true);
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
          setIsEnd(true);
        });
    } catch (err) {
      setIsError(err);
      setIsEnd(true);
    }
  }, dependencyList);

  if (isStart === true) {
    if (!isEnd) {
      throw Promise.resolve();
    }

    if (error) {
      throw error;
    }

    if (result) {
      setIsStart(false);
      setIsEnd(false);
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
