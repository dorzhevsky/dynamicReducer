import wrapAttachedReducer from "../wrapAttachedReducer";
import { ATTACHABLE_REDUCER_ATTACHED } from "../constants";

describe("wrapAttachedReducer", () => {
  it("Action type=ATTACHABLE_REDUCER_ATTACHED", () => {
    const reducer = wrapAttachedReducer("one", (state = 1) => state);
    const state = reducer(2, { type: "type" });
    expect(state).toEqual(2);
  });

  it("Action type=ATTACHABLE_REDUCER_ATTACHED and reducer key <> action key", () => {
    const reducer = wrapAttachedReducer("one", (state = 1) => state);
    const state = reducer(2, { type: ATTACHABLE_REDUCER_ATTACHED, key: "two" });
    expect(state).toEqual(2);
  });

  it("Action type=ATTACHABLE_REDUCER_ATTACHED and reducer key == action key", () => {
    const reducer = wrapAttachedReducer("one", (state = 1) => state);
    const state = reducer(2, { type: ATTACHABLE_REDUCER_ATTACHED, key: "one" });
    expect(state).toEqual(1);
  });

  it("Action type=ATTACHABLE_REDUCER_ATTACHED and reducer key == action key and current state is plain object", () => {
    const reducer = wrapAttachedReducer("one", (state = { three: 3 }) => state);
    const state = reducer({ one: { two: 2 } }, { type: ATTACHABLE_REDUCER_ATTACHED, key: "one" });
    expect(state).toEqual({ one: { two: 2 }, three: 3 });
  });
});
