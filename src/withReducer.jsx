import { ReactReduxContext } from "react-redux";
import PropTypes from "prop-types";
import React, { useContext } from "react";

const withReducer = reducer => Comp => {
  class WithReducerWrapper extends React.Component {
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount = () => {
      const { store, reducer: r } = this.props;

      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.assert(
          store.attachReducer,
          "'store.attachReducer' function is missing: Unable to attach reducer into the store."
        );
      }

      if (store.attachReducer) {
        store.attachReducer(r);
      }
    };

    render = () => {
      return this.props.children;
    };
  }

  WithReducerWrapper.propTypes = {
    store: PropTypes.shape({
      attachReducer: PropTypes.func
    }),
    reducer: PropTypes.shape({}),
    children: PropTypes.node
  };

  return props => {
    const { store } = useContext(ReactReduxContext);
    return (
      <WithReducerWrapper store={store} reducer={reducer}>
        <Comp {...props} />
      </WithReducerWrapper>
    );
  };
};

export default withReducer;
