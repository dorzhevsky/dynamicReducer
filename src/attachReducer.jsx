import React from "react";
import useAttachReducer from "./useAttachReducer";

const attachReducer = reducer => Comp => {
  return props => {
    const ret = useAttachReducer(reducer, props);
    return <Comp {...props} {...ret} />;
  };
};

export default attachReducer;
