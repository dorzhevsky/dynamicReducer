import wrapAttachedReducer from "../wrapAttachedReducer";
import { ATTACHABLE_REDUCER_ATTACHED } from "../constants";

describe("wrapAttachedReducer", () => {
  it("Экшн не равен ATTACHABLE_REDUCER_ATTACHED", () => {
    const reducer = wrapAttachedReducer("one", (state = 1) => state);
    const state = reducer(2, { type: "type" });
    expect(state).toEqual(2);
  });

  it("Экшн равен ATTACHABLE_REDUCER_ATTACHED но key не совпадает", () => {
    const reducer = wrapAttachedReducer("one", (state = 1) => state);
    const state = reducer(2, { type: ATTACHABLE_REDUCER_ATTACHED, key: "two" });
    expect(state).toEqual(2);
  });

  it("Экшн равен ATTACHABLE_REDUCER_ATTACHED и key совпадает", () => {
    const reducer = wrapAttachedReducer("one", (state = 1) => state);
    const state = reducer(2, { type: ATTACHABLE_REDUCER_ATTACHED, key: "one" });
    expect(state).toEqual(1);
  });

  it("Экшн равен ATTACHABLE_REDUCER_ATTACHED и key совпадает и текущее состояние есть объект", () => {
    const reducer = wrapAttachedReducer("one", (state = { three: 3 }) => state);
    const state = reducer({ one: { two: 2 } }, { type: ATTACHABLE_REDUCER_ATTACHED, key: "one" });
    expect(state).toEqual({ one: { two: 2 }, three: 3 });
  });
});
