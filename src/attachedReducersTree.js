import reduceReducers from "reduce-reducers";
import find from "lodash/find";
import split from "lodash/split";
import forEach from "lodash/forEach";
import reduce from "lodash/reduce";
import combineReducers from "./combineReducers";
import { KEY_PARTS_SEPARATOR } from "./constants";

const attachedReducersTree = () => {
  let root = null;

  const createNode = (key = null) => {
    return { key, children: [] };
  };

  const insertNodeIfNotExists = (key, parent) => {
    let child = find(parent.children, { key });
    if (child) {
      return child;
    }
    child = createNode(key);
    parent.children.push(child);
    return child;
  };

  const createReducer = node => {
    if (!node) {
      return createReducer(root);
    }
    if (node.children.length > 0) {
      const reducersMap = reduce(
        node.children,
        (o, e) => {
          const obj = o;
          obj[e.key] = createReducer(e);
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
      parent = insertNodeIfNotExists(e, parent);
    });
    parent.reducer = reducer;
  };

  root = createNode();

  return {
    addReducer,
    createReducer
  };
};

export default attachedReducersTree;
