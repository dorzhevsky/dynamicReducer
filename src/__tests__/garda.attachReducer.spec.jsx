import React from "react";
import constant from "lodash/constant";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import attachReducer from "../attachReducer";

describe("attachReducer", () => {
  it("When store.attachReducer function is present then it should be called when component mounts", async () => {
    const reducer = state => state;
    const store = createStore(reducer, undefined);
    store.attachReducer = jest.fn();
    const params = { one: state => state };
    const Hoc = attachReducer(params)(constant("Text"));
    const { findByText } = render(
      <Provider store={store}>
        <Hoc />
      </Provider>
    );
    expect(store.attachReducer).toHaveBeenCalledWith(params);
    expect(await findByText("Text")).toBeTruthy();
  });

  it("When store.attachReducer is undefined then component should render itself without errors", async () => {
    const reducer = state => state;
    const store = createStore(reducer, undefined);
    const params = { one: state => state };
    const Hoc = attachReducer(params)(constant("Text"));
    const { findByText } = render(
      <Provider store={store}>
        <Hoc />
      </Provider>
    );
    expect(await findByText("Text")).toBeTruthy();
  });
});
