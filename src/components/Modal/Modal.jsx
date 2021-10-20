import React, { useState, useEffect } from "react";

import { StyledModal } from "./styles/Modal.styled";

const Modal = ({ message }) => {
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    if (message.text) setIsView(true);
    setTimeout(() => {
      setIsView(false);
    }, 3000);
  }, [message.text]);
  return (
    <React.Fragment>
      {isView && (
        <StyledModal color={message.type}>
          <p>{message.text}</p>
        </StyledModal>
      )}
    </React.Fragment>
  );
};

export default Modal;
