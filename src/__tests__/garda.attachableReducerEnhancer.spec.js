import { createStore } from "redux";
import identity from "lodash/identity";
import attachableReducerEnhancer from "../attachableReducerEnhancer";
import { ATTACHABLE_REDUCER_ATTACHED } from "../constants";
import createAttachedReducer from "../createAttachedReducer";

jest.mock("../createAttachedReducer");

const mockCreateAttachedReducer = jest.fn(() => identity);
createAttachedReducer.mockImplementation(mockCreateAttachedReducer);

describe("attachableReducerEnhancer", () => {
  it("attachableReducerEnhancer должен обогащать стор доп. функцией attachReducer", () => {
    const reducer = state => state;
    const store = createStore(reducer, undefined, attachableReducerEnhancer());
    expect(store.attachReducer).toBeDefined();
  });

  const testAttachReducer = (attach, expectedKey) => {
    it("Attach редьюсера", () => {      
      const staticReducer = state => state;
      const createAttachedReducersReducer = jest.fn(() => identity);
      const reduceReducers = jest.fn(() => identity);
      const store = createStore(
        staticReducer,
        undefined,
        attachableReducerEnhancer({
          createAttachedReducersReducer,
          reduceReducers
        })
      );
      store.replaceReducer = jest.fn();
      store.dispatch = jest.fn();

      const dynamicallyAttachedReducer = state => state;

      attach(store, dynamicallyAttachedReducer);

      expect(mockCreateAttachedReducer).toHaveBeenCalledWith(expectedKey, dynamicallyAttachedReducer);
      expect(createAttachedReducersReducer).toHaveBeenCalledWith({
        [expectedKey]: mockCreateAttachedReducer.mock.results[0].value
      });
      expect(reduceReducers).toHaveBeenCalledWith(
        staticReducer,
        createAttachedReducersReducer.mock.results[0].value
      );
      expect(store.replaceReducer).toHaveBeenCalledWith(reduceReducers.mock.results[0].value);
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
