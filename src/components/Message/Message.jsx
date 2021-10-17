import React, { useState, useEffect } from "react";

import { StyledMessage } from "./styles/Message.styled";

const Message = ({ message }) => {
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    let isMount = true;
    if (message) setIsView(true);
    if (isMount) {
      setTimeout(() => {
        setIsView(false);
      }, 3000);
    }

    return () => {
      isMount = false;
    };
  }, [message]);
  return (
    <React.Fragment>
      {isView && <StyledMessage>{message}</StyledMessage>}
    </React.Fragment>
  );
};

export default Message;
