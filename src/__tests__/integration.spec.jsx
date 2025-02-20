/* eslint-disable react/prop-types */
import React from "react";
import constant from "lodash/constant";
import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";
import { render } from "@testing-library/react";
import { createSelector } from "reselect";
import attachReducer from "../attachReducer";
import useAttachReducer from "../useAttachReducer";
import attachableReducerEnhancer from "../attachableReducerEnhancer";

describe("integration", () => {
  it("Integration with react-redux useSelector", async () => {
    const C = () => {
      const s = useSelector(state => state.one);
      return s;
    };
    const reducer = constant(0);
    const store = createStore(reducer, undefined, attachableReducerEnhancer());
    const params = { one: constant("Text") };
    const Hoc = attachReducer(params)(C);
    const { findByText } = render(
      <Provider store={store}>
        <Hoc />
      </Provider>
    );
    expect(await findByText("Text")).toBeTruthy();
  });

  it("Integration with reselect", async () => {
    const selector = createSelector(
      state => state.one,
      one => {
        // eslint-disable-next-line lodash/prefer-lodash-method
        return one.toUpperCase();
      }
    );
    const C = () => {
      const s = useSelector(selector);
      return s;
    };
    const reducer = constant(0);
    const store = createStore(reducer, undefined, attachableReducerEnhancer());
    const params = { one: constant("Text") };
    const Hoc = attachReducer(params)(C);
    const { findByText } = render(
      <Provider store={store}>
        <Hoc />
      </Provider>
    );
    expect(await findByText("TEXT")).toBeTruthy();
  });

  it("Attach reducer with function as argument", async () => {
    const C = props => {
      const s = useSelector(props.selector);
      return (
        <>
          <div>{s}</div>
          <div>{props.something}</div>
        </>
      );
    };
    const reducer = constant(0);
    const store = createStore(reducer, undefined, attachableReducerEnhancer());
    const Hoc = attachReducer((attach, props) => {
      attach({ [props.namespace]: constant("Text") });
      return { selector: state => state[props.namespace] };
    })(C);
    const { findByText } = render(
      <Provider store={store}>
        <Hoc namespace="storeKey" something="World" />
      </Provider>
    );
    expect(await findByText("Text")).toBeTruthy();
    expect(await findByText("World")).toBeTruthy();
  });

  it("Attach reducer as a hook", async () => {
    const C = props => {
      useAttachReducer(attach => {
        attach({ [props.namespace]: constant("Text") });
      });
      const s = useSelector(state => state[props.namespace]);
      return (
        <>
          <div>{s}</div>
          <div>{props.something}</div>
        </>
      );
    };
    const reducer = constant(0);
    const store = createStore(reducer, undefined, attachableReducerEnhancer());
    const { findByText } = render(
      <Provider store={store}>
        <C namespace="storeKey" something="World" />
      </Provider>
    );
    expect(await findByText("Text")).toBeTruthy();
    expect(await findByText("World")).toBeTruthy();
  });
});
