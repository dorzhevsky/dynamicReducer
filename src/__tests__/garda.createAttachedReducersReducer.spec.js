import constant from "lodash/constant";
import createAttachedReducersReducer from "../createAttachedReducersReducer";

describe("createAttachedReducersReducer", () => {
  it("Рутовый узел с редьюсером и два дочерних узла с редьюсерами", () => {
    const map = {
      root: constant({ one: 1 }),
      "root.two": constant(2),
      "root.three": constant(3)
    };
    const reducer = createAttachedReducersReducer(map);
    const state = reducer(undefined);
    expect(state).toEqual({ root: { one: 1, two: 2, three: 3 } });
  });

  it("Рутовый узел без редьюсера и два дочерних узла с редьюсерами", () => {
    const map = {
      "root.one": constant(1),
      "root.two": constant(2)
    };
    const reducer = createAttachedReducersReducer(map);
    const state = reducer(undefined);
    expect(state).toEqual({ root: { one: 1, two: 2 } });
  });

  it("Рутовый узел c редьюсером и нет дочерних узлов", () => {
    const map = { root: constant(1) };
    const reducer = createAttachedReducersReducer(map);
    const state = reducer(undefined);
    expect(state).toEqual({ root: 1 });
  });

  it("Пустая мапа", () => {
    const map = {};
    const reducer = createAttachedReducersReducer(map);
    const state = reducer({ one: 1 });
    expect(state).toBeUndefined();
  });
});
