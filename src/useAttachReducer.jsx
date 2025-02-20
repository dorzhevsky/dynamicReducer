import { ReactReduxContext } from "react-redux";
import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";
import { useContext, useRef } from "react";
import useComponentWillMount from "./useComponentWillMount";

const useAttachReducer = (reducer, ...args) => {
  const { store } = useContext(ReactReduxContext);
  const ret = useRef();

  useComponentWillMount(() => {
    if (store.attachReducer) {
      if (isFunction(reducer)) {
        const val = reducer(store.attachReducer, ...args);
        ret.current = val;
      } else if (isObject(reducer)) {
        store.attachReducer(reducer);
      }
    }
  });
  return ret.current;
};

export default useAttachReducer;
