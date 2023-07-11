import isPlainObject from "lodash/isPlainObject";
import { DYNAMIC_REDUCER_ATTACHED, DYNAMIC_REDUCER_INITIALSTATE } from "./constants";

const dynamicReducer = (key, reducer) => {
  return (state, action) => {
    if (action.type === DYNAMIC_REDUCER_ATTACHED) {
      if (key === action.key) {
        const initialState = reducer(undefined, { type: DYNAMIC_REDUCER_INITIALSTATE });
        if (isPlainObject(state)) {
          return { ...state, ...initialState };
        }
        return initialState;
      }
    }
    return reducer(state, action);
  };
};

export default dynamicReducer;
