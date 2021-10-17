import React from "react";
import {Badge} from "antd";

export const Status = ({signed}) => {
  return(<Badge
    style={{display: "block"}}
    status={signed ? "success" : "warning"}
    text={signed ? "signed" : "didn't sign"}/>)
};