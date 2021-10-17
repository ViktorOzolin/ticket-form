import React from "react";
import { Spinner } from "./styles/Spinner.styled";

const Loader = (props) => {
  return (
    <Spinner {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>
  );
};

export default Loader;
