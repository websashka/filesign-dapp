import React from "react";
import {UploadOutlined} from "@ant-design/icons";
import styles from "./components.module.less";

export const Uploader = React.forwardRef(({}, ref) => {
  return(<label>
    <UploadOutlined className={styles.upload__icon}/>
    <input type="file" ref={ref} className={styles.upload__input}/>
  </label>);
})