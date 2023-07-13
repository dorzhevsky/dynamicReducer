import forEach from "lodash/forEach";
import keys from "lodash/keys";
import noop from "lodash/noop";
import attachedReducersTree from "./attachedReducersTree";

const combineAttachedReducers = map => {
  const k = keys(map);
  if (!k.length) {
    return noop;
  }
  const { addReducer, createReducer } = attachedReducersTree();
  forEach(map, (d, key) => {
    addReducer(key, d);
  });
  return createReducer();
};

export default combineAttachedReducers;
