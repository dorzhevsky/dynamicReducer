import reduceReducers from "reduce-reducers";
import find from "lodash/find";
import split from "lodash/split";
import forEach from "lodash/forEach";
import keys from "lodash/keys";
import reduce from "lodash/reduce";
import noop from "lodash/noop";
import combineReducers from "./combineReducers";

class AttachedReducersTree {
  constructor() {
    this.root = this.createChild();
  }

  addReducer = (key, dynamicReducer) => {
    const splitItems = split(key, ".");
    let parent = this.root;
    forEach(splitItems, e => {
      parent = this.insert(e, parent);
    });
    parent.reducer = dynamicReducer;
  };

  createReducer = () => {
    return this.createNodeReducer(this.root);
  };

  createNodeReducer = node => {
    if (node.children.length > 0) {
      const reducersMap = reduce(
        node.children,
        (o, e) => {
          const obj = o;
          obj[e.key] = this.createNodeReducer(e);
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

  insert = (key, parent) => {
    let child = find(parent.children, { key });
    if (child) {
      return child;
    }
    child = this.createChild(key);
    parent.children.push(child);
    return child;
  };

  createChild = (key = null) => {
    return { key, children: [] };
  };
}

const createAttachedReducersReducer = map => {
  const k = keys(map);
  if (!k.length) {
    return noop;
  }
  const tree = new AttachedReducersTree();
  forEach(map, (d, key) => {
    tree.addReducer(key, d);
  });
  return tree.createReducer();
};

export default createAttachedReducersReducer;
