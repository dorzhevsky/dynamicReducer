import { createStore } from "redux";
import identity from "lodash/identity";
import dynamicReducerEnhancer from "../dynamicReducerEnhancer";
import { DYNAMIC_REDUCER_ATTACHED } from "../constants";
import dynamicReducer from "../dynamicReducer";

jest.mock("../dynamicReducer");

const mockDynamicReducer = jest.fn(() => identity);
dynamicReducer.mockImplementation(mockDynamicReducer);

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
      const store = createStore(
        staticReducer,
        undefined,
        dynamicReducerEnhancer({
          createDynamicReducer,
          reduceReducers
        })
      );
      store.replaceReducer = jest.fn();
      store.dispatch = jest.fn();

      const dynamicReducer = state => state;

      attach(store, dynamicReducer);

      expect(mockDynamicReducer).toHaveBeenCalledWith(expectedKey, dynamicReducer);
      expect(createDynamicReducer).toHaveBeenCalledWith({
        [expectedKey]: mockDynamicReducer.mock.results[0].value
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
