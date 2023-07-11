import { createStore } from "redux";
import identity from "lodash/identity";
import dynamicReducerEnhancer from "../dynamicReducerEnhancer";
import { DYNAMIC_REDUCER_ATTACHED } from "../constants";

describe("dynamicReducerEnhancer", () => {
  it("dynamicReducerEnhancer должен обогащать стор доп. функцией attachReducer", () => {
    const reducer = state => state;
    const store = createStore(reducer, undefined, dynamicReducerEnhancer());
    expect(store.attachReducer).toBeDefined();
  });

  const testAttachReducer = (attach, expectedKey) => {
    it("Attach редьюсера с использованием строкового апи", () => {
      const staticReducer = state => state;
      const createDynamicReducer = jest.fn(() => identity);
      const reduceReducers = jest.fn(() => identity);
      const wrapReducer = jest.fn(() => identity);
      const store = createStore(
        staticReducer,
        undefined,
        dynamicReducerEnhancer({
          wrapReducer,
          createDynamicReducer,
          reduceReducers
        })
      );
      store.replaceReducer = jest.fn();
      store.dispatch = jest.fn();

      const dynamicReducer = state => state;

      attach(store, dynamicReducer);

      expect(wrapReducer).toHaveBeenCalledWith(expectedKey, dynamicReducer);
      expect(createDynamicReducer).toHaveBeenCalledWith({
        [expectedKey]: wrapReducer.mock.results[0].value
      });
      expect(reduceReducers).toHaveBeenCalledWith(
        staticReducer,
        createDynamicReducer.mock.results[0].value
      );
      expect(store.replaceReducer).toHaveBeenCalledWith(reduceReducers.mock.results[0].value);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: DYNAMIC_REDUCER_ATTACHED,
        key: expectedKey
      });
    });
  };

  testAttachReducer((store, dynamicReducer) => {
    const key = "one.two.three";
    store.attachReducer({ [key]: dynamicReducer });
  }, "one.two.three");

  testAttachReducer((store, dynamicReducer) => {
    store.attachReducer({ one: { two: { three: dynamicReducer } } });
  }, "one.two.three");
});
