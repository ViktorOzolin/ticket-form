import React, { useState } from "react";
import Loader from "./components/Loader/Loader";
import TicketFormContainer from "./components/TicketForm/TicketFormContainer";
import { Global } from "./globalStyles";

const App = () => {
  const [passengers, setPassengers] = useState([1]);
  const [isFetching, setIsFetching] = useState(false);
  const [messages, setMessages] = useState({type: "", message: ""});
  const onAddPassenger = (event) => {
    event.preventDefault();
    if (passengers.length < 4) {
      setPassengers((prev) => {
        return [...prev, Number(prev[prev.length - 1]) + 1];
      });
    }
  };
  const onRemovePassenger = (event, number) => {
    event.preventDefault();
    setPassengers((prev) => {
      return prev.filter((e) => e !== number);
    });
  };
  const defaultPassengersCountHandler = () => {
    setPassengers([1]);
  };
  const fetchToggleHandler = (isFetch) => {
    setIsFetching(isFetch);
  };
  const setMessageHandler = (message) => {
    setMessages(prev => ({
      ...message
    }));
  };
  return (
    <div className="App">
      <Global />
      {isFetching ? (
        <Loader color="#606060" />
      ) : (
        <TicketFormContainer
          passengerNumber={passengers}
          onAddPassenger={onAddPassenger}
          onRemovePassenger={onRemovePassenger}
          fetchToggleHandler={fetchToggleHandler}
          defaultPassengersCountHandler={defaultPassengersCountHandler}
          messages={messages.message}
          setMessageHandler={setMessageHandler}
        />
      )}
    </div>
  );
};

export default App;
