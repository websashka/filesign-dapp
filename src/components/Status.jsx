import React from "react";
import {Badge} from "antd";

export const Status = ({status}) => {
  return(<Badge
    status={status === "signed" ? "success" : "warning"}
    text={status === "signed" ? "signed" : "did n't sign"}/>)
};