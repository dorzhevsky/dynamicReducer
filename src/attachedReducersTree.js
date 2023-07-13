import reduceReducers from "reduce-reducers";
import find from "lodash/find";
import split from "lodash/split";
import forEach from "lodash/forEach";
import reduce from "lodash/reduce";
import combineReducers from "./combineReducers";
import { KEY_PARTS_SEPARATOR } from "./constants";

const attachedReducersTree = () => {

  const _createNode = (key = null) => {
    return { key, children: [] };
  };

  const _insertNodeIfNotExists = (key, parent) => {
    let child = find(parent.children, { key });
    if (child) {
      return child;
    }
    child = _createNode(key);
    parent.children.push(child);
    return child;
  };

  const _createReducer = node => {
    if (node.children.length > 0) {
      const reducersMap = reduce(
        node.children,
        (o, e) => {
          const obj = o;
          obj[e.key] = _createReducer(e);
          return obj;
        },
        {}
      );
      return node.reducer
        ? reduceReducers(node.reducer, combineReducers(reducersMap))
        : combineReducers(reducersMap);
    }
    return node.reducer;
  };

  const addReducer = (key, reducer) => {
    const splitItems = split(key, KEY_PARTS_SEPARATOR);
    let parent = root;
    forEach(splitItems, e => {
      parent = _insertNodeIfNotExists(e, parent);
    });
    parent.reducer = reducer;
  };

  const createReducer = () => {
    return _createReducer(root);
  };

  const root = _createNode();

  return {
    addReducer,
    createReducer
  }
}

export default attachedReducersTree;
