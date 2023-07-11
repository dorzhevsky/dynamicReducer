import keys from "lodash/keys";
import forEach from "lodash/forEach";
import isFunction from "lodash/isFunction";
import isUndefined from "lodash/isUndefined";
import reduce from "lodash/reduce";

function getUndefinedStateErrorMessage(key, action) {
  const actionType = action && action.type;
  const actionDescription = (actionType && `action "${String(actionType)}"`) || "an action";

  return (
    `Given ${actionDescription}, reducer "${key}" returned undefined. ` +
    "To ignore an action, you must explicitly return the previous state. " +
    "If you want this reducer to hold no value, you can return null instead of undefined."
  );
}

export default function combineReducers(reducers) {
  const reducerKeys = keys(reducers);
  const finalReducers = {};

  forEach(reducerKeys, key => {
    if (isFunction(reducers[key])) {
      finalReducers[key] = reducers[key];
    }
  });
  const finalReducerKeys = keys(finalReducers);

  return function combination(state = {}, action) {
    let hasChanged = false;
    const nextState = { ...state };

    forEach(finalReducerKeys, key => {
      const index = finalReducerKeys.indexOf(key);
      const stateSlice = reduce(
        [...finalReducerKeys.slice(0, index), ...finalReducerKeys.slice(index + 1)],
        (o, k) => {
          // eslint-disable-next-line no-param-reassign
          o[k] = state[k];
          return o;
        },
        {}
      );
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action, stateSlice);
      if (isUndefined(nextStateForKey)) {
        const errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    });

    return hasChanged ? nextState : state;
  };
}
