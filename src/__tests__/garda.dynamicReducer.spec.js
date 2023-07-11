import dynamicReducer from "../dynamicReducer";
import { DYNAMIC_REDUCER_ATTACHED } from "../constants";

describe("dynamicReducer", () => {
  it("Экшн не равен DYNAMIC_REDUCER_ATTACHED", () => {
    const reducer = dynamicReducer("one", (state = 1) => state);
    const state = reducer(2, { type: "type" });
    expect(state).toEqual(2);
  });

  it("Экшн равен DYNAMIC_REDUCER_ATTACHED но key не совпадает", () => {
    const reducer = dynamicReducer("one", (state = 1) => state);
    const state = reducer(2, { type: DYNAMIC_REDUCER_ATTACHED, key: "two" });
    expect(state).toEqual(2);
  });

  it("Экшн равен DYNAMIC_REDUCER_ATTACHED и key совпадает", () => {
    const reducer = dynamicReducer("one", (state = 1) => state);
    const state = reducer(2, { type: DYNAMIC_REDUCER_ATTACHED, key: "one" });
    expect(state).toEqual(1);
  });

  it("Экшн равен DYNAMIC_REDUCER_ATTACHED и key совпадает и текущее состояние есть объект", () => {
    const reducer = dynamicReducer("one", (state = { three: 3 }) => state);
    const state = reducer({ one: { two: 2 } }, { type: DYNAMIC_REDUCER_ATTACHED, key: "one" });
    expect(state).toEqual({ one: { two: 2 }, three: 3 });
  });
});
