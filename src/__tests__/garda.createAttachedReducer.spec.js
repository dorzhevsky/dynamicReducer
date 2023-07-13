import createAttachedReducer from "../createAttachedReducer";
import { ATTACHABLE_REDUCER_ATTACHED } from "../constants";

describe("dynamicReducer", () => {
  it("Экшн не равен ATTACHABLE_REDUCER_ATTACHED", () => {
    const reducer = createAttachedReducer("one", (state = 1) => state);
    const state = reducer(2, { type: "type" });
    expect(state).toEqual(2);
  });

  it("Экшн равен ATTACHABLE_REDUCER_ATTACHED но key не совпадает", () => {
    const reducer = createAttachedReducer("one", (state = 1) => state);
    const state = reducer(2, { type: ATTACHABLE_REDUCER_ATTACHED, key: "two" });
    expect(state).toEqual(2);
  });

  it("Экшн равен ATTACHABLE_REDUCER_ATTACHED и key совпадает", () => {
    const reducer = createAttachedReducer("one", (state = 1) => state);
    const state = reducer(2, { type: ATTACHABLE_REDUCER_ATTACHED, key: "one" });
    expect(state).toEqual(1);
  });

  it("Экшн равен ATTACHABLE_REDUCER_ATTACHED и key совпадает и текущее состояние есть объект", () => {
    const reducer = createAttachedReducer("one", (state = { three: 3 }) => state);
    const state = reducer({ one: { two: 2 } }, { type: ATTACHABLE_REDUCER_ATTACHED, key: "one" });
    expect(state).toEqual({ one: { two: 2 }, three: 3 });
  });
});
