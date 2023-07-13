import _reduceReducers from "reduce-reducers";
import keys from "lodash/keys";
import map from "lodash/map";
import isFunction from "lodash/isFunction";
import _createAttachedReducersReducer from "./createAttachedReducersReducer";
import { ATTACHABLE_REDUCER_ATTACHED } from "./constants";
import createAttachedReducer from "./createAttachedReducer";

const attachableReducerEnhancer = (
  { createAttachedReducersReducer, reduceReducers } = {
    createAttachedReducersReducer: _createAttachedReducersReducer,
    reduceReducers: _reduceReducers
  }
) => createStore => (reducer, ...other) => {
  const store = createStore(reducer, ...other);

  const attachedReducers = new Map();

  const attachReducer = pathObject => {
    const stack = [{ obj: pathObject, path: [] }];
    // eslint-disable-next-line no-loops/no-loops
    while (stack.length > 0) {
      const { obj, path } = stack.pop();
      if (isFunction(obj)) {
        const reducerToAttach = obj;
        const key = path.join(".");
        if (attachedReducers.has(key)) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `Reducer with the same key='${key}' was already attached. Ignoring attach attempt`
            );
          }
          return;
        }
        attachedReducers.set(key, createAttachedReducer(key, reducerToAttach));
        const newReducer = reduceReducers(
          reducer,
          createAttachedReducersReducer(Object.fromEntries(attachedReducers))
        );
        store.replaceReducer(newReducer);
        store.dispatch({ type: ATTACHABLE_REDUCER_ATTACHED, key });
        return;
      }
      const newItems = map(keys(obj), k => {
        return { obj: obj[k], path: [...path, k] };
      });
      stack.push(...newItems);
    }
  };

  store.attachReducer = attachReducer;

  return store;
};

export default attachableReducerEnhancer;
