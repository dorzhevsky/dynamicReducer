import { createStore } from "redux";
import identity from "lodash/identity";
import attachableReducerEnhancer from "../attachableReducerEnhancer";
import { ATTACHABLE_REDUCER_ATTACHED } from "../constants";
import wrapAttachedReducer from "../wrapAttachedReducer";

jest.mock("../wrapAttachedReducer");

const mockWrapAttachedReducer = jest.fn(() => identity);
wrapAttachedReducer.mockImplementation(mockWrapAttachedReducer);

describe("attachableReducerEnhancer", () => {
  it("attachableReducerEnhancer должен обогащать стор доп. функцией attachReducer", () => {
    const reducer = state => state;
    const store = createStore(reducer, undefined, attachableReducerEnhancer());
    expect(store.attachReducer).toBeDefined();
  });

  const testAttachReducer = (attach, expectedKey) => {
    it("Attach редьюсера", () => {      
      const staticReducer = state => state;
      const combineAttachedReducers = jest.fn(() => identity);
      const combineAll = jest.fn(() => identity);
      const store = createStore(
        staticReducer,
        undefined,
        attachableReducerEnhancer({
          combineAttachedReducers,
          combineAll
        })
      );
      store.replaceReducer = jest.fn();
      store.dispatch = jest.fn();

      const dynamicallyAttachedReducer = state => state;

      attach(store, dynamicallyAttachedReducer);

      expect(mockWrapAttachedReducer).toHaveBeenCalledWith(expectedKey, dynamicallyAttachedReducer);
      expect(combineAttachedReducers).toHaveBeenCalledWith({
        [expectedKey]: mockWrapAttachedReducer.mock.results[0].value
      });
      expect(combineAll).toHaveBeenCalledWith(
        staticReducer,
        combineAttachedReducers.mock.results[0].value
      );
      expect(store.replaceReducer).toHaveBeenCalledWith(combineAll.mock.results[0].value);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: ATTACHABLE_REDUCER_ATTACHED,
        key: expectedKey
      });
    });
  };

  testAttachReducer((store, attachedReducer) => {
    const key = "one.two.three";
    store.attachReducer({ [key]: attachedReducer });
  }, "one.two.three");

  testAttachReducer((store, attachedReducer) => {
    store.attachReducer({ one: { two: { three: attachedReducer } } });
  }, "one.two.three");
});
