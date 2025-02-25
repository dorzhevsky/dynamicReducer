import React from "react";
import useAttachReducer from "./useAttachReducer";

const attachReducer = reducer => Comp => {
  return props => {
    const { ret, attached } = useAttachReducer(reducer, props);
    if (attached) {
      return <Comp {...props} {...ret} />;
    }
    return null;
  };
};

export default attachReducer;
