import isPlainObject from "lodash/isPlainObject";
import { ATTACHABLE_REDUCER_ATTACHED, ATTACHABLE_REDUCER_INITIALSTATE } from "./constants";

const wrapAttachedReducer = (key, reducer) => {
  return (state, action) => {
    if (action.type === ATTACHABLE_REDUCER_ATTACHED) {
      if (key === action.key) {
        const initialState = reducer(undefined, { type: ATTACHABLE_REDUCER_INITIALSTATE });
        if (isPlainObject(state)) {
          return { ...state, ...initialState };
        }
        return initialState;
      }
    }
    return reducer(state, action);
  };
};

export default wrapAttachedReducer;
