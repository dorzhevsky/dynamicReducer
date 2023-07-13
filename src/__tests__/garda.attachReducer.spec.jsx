import React from "react";
import constant from "lodash/constant";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import attachReducer from "../attachReducer";

describe("attachReducer", () => {
  it("Проверяем, что при маунте компонента вызывается attachReducer", async () => {
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

  it("Проверяем, что при маунте компонента не вызывается attachReducer при ее отсутсвии", async () => {
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
