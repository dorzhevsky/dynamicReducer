import { ReactReduxContext } from "react-redux";
import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";
import { useContext, useEffect, useRef, useState } from "react";

const useAttachReducer = (reducer, ...args) => {
  const { store } = useContext(ReactReduxContext);
  const ret = useRef();
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    if (store.attachReducer) {
      if (isFunction(reducer)) {
        const val = reducer(store.attachReducer, ...args);
        ret.current = val;
      } else if (isObject(reducer)) {
        store.attachReducer(reducer);
      }
    }
    setAttached(true);
  }, []);

  return { ret: ret.current, attached };
};

export default useAttachReducer;
