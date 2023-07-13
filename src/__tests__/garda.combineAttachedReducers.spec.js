import constant from "lodash/constant";
import combineAttachedReducers from "../combineAttachedReducers";

describe("combineAttachedReducers", () => {
  it("Root node with reducer and 2 child nodes with reducers", () => {
    const map = {
      root: constant({ one: 1 }),
      "root.two": constant(2),
      "root.three": constant(3)
    };
    const reducer = combineAttachedReducers(map);
    const state = reducer(undefined);
    expect(state).toEqual({ root: { one: 1, two: 2, three: 3 } });
  });

  it("Root node without reducer and 2 child nodes with reducers", () => {
    const map = {
      "root.one": constant(1),
      "root.two": constant(2)
    };
    const reducer = combineAttachedReducers(map);
    const state = reducer(undefined);
    expect(state).toEqual({ root: { one: 1, two: 2 } });
  });

  it("Root node with reducer", () => {
    const map = { root: constant(1) };
    const reducer = combineAttachedReducers(map);
    const state = reducer(undefined);
    expect(state).toEqual({ root: 1 });
  });

  it("Empty map", () => {
    const map = {};
    const reducer = combineAttachedReducers(map);
    const state = reducer({ one: 1 });
    expect(state).toBeUndefined();
  });
});
