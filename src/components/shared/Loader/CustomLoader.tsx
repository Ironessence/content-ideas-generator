import React from "react";
import styles from "./CustomLoader.module.scss";

interface CustomLoaderProps {
  size?: number;
}

const CustomLoader = ({ size }: CustomLoaderProps) => {
  return (
    <div className={`${size ? `h-[${size}px] w-[${size}px]` : "h-[20px] w-[20px]"}`}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default CustomLoader;
