import React from "react";
import Loader from "./components/Loader/Loader";
import TicketFormContainer from "./components/TicketForm/TicketFormContainer";
import { Global } from "./globalStyles";
import { useSelector } from "react-redux";
const App = () => {
  const isSending = useSelector((state) => state.ticketForm.isSending);

  return (
    <div className="App">
      <Global />
      {isSending ? <Loader color="#606060" /> : <TicketFormContainer />}
    </div>
  );
};

export default App;
