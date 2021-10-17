import React from "react";
import TicketForm from "./TicketForm";
import { ticketFormAPI } from "../../api/api";
import { Button, Container, Row } from "./styles/TicketFormElements";
import Message from "../Message/Message";
const TicketFormContainer = ({
  passengerNumber,
  onAddPassenger,
  onRemovePassenger,
  fetchToggleHandler,
  defaultPassengersCountHandler,
  setMessageHandler,
  messages,
}) => {
  const initialState = {
    formA: { values: null, validated: false },
    formB: { values: null, validated: false },
    formC: { values: null, validated: false },
    formD: { values: null, validated: false },
  };
  const [formData, setFormData] = React.useState(initialState);

  // const formAref = React.useRef();
  // const formBref = React.useRef();
  // const formCref = React.useRef();
  // const formDref = React.useRef();

  const refs = {
    formAref: React.useRef(),
    formBref: React.useRef(),
    formCref: React.useRef(),
    formDref: React.useRef(),
  };

  React.useEffect(() => {
    let isMounted = true;
    let validatedFormCount = 0;
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key].validated) {
          validatedFormCount += 1;
        }
      }
    }
    if (validatedFormCount === passengerNumber.length) {
      if (isMounted) {
        fetchToggleHandler(true);
        ticketFormAPI
          .sendData(formData)
          .then((response) => {
            let message = {
              type: "ok",
              message: "Места успешно зарезервированны!",
            };
            setMessageHandler(message);
            fetchToggleHandler(false);
          })
          .catch((error) => {
            let message = {
              type: "error",
              message: "Ошибка отправки данных на сервер",
            };
            setMessageHandler(message);
            fetchToggleHandler(false);
            console.log(error);
          });
        defaultPassengersCountHandler();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [
    formData,
    defaultPassengersCountHandler,
    fetchToggleHandler,
    passengerNumber,
    setMessageHandler,
  ]);
  async function handleSubmit() {
    passengerNumber.map((item) => {
      switch (item) {
        case 1:
          return refs.formAref.current.Submit();
        case 2:
          return refs.formBref.current.Submit();
        case 3:
          return refs.formCref.current.Submit();
        case 4:
          return refs.formDref.current.Submit();
        default:
          return "";
      }
    });
  }

  function handleChangeFormA(data, resetForm) {
    setFormData({ ...formData, formA: data });
    resetForm();
  }
  function handleChangeFormB(data, resetForm) {
    setFormData({ ...formData, formB: data });
    resetForm();
  }
  function handleChangeFormC(data, resetForm) {
    setFormData({ ...formData, formC: data });
    resetForm();
  }
  function handleChangeFormD(data, resetForm) {
    setFormData({ ...formData, formD: data });
    resetForm();
  }
  return (
    <React.Fragment>
      {passengerNumber.map((item) => {
        switch (item) {
          case 1:
            return (
              <TicketForm
                key={item}
                onChange={handleChangeFormA}
                refId={refs.formAref}
                passengerNumber={item}
                onRemovePassenger={onRemovePassenger}
              />
            );
          case 2:
            return (
              <TicketForm
                key={item}
                onChange={handleChangeFormB}
                refId={refs.formBref}
                passengerNumber={item}
                onRemovePassenger={onRemovePassenger}
              />
            );
          case 3:
            return (
              <TicketForm
                key={item}
                onChange={handleChangeFormC}
                refId={refs.formCref}
                passengerNumber={item}
                onRemovePassenger={onRemovePassenger}
              />
            );
          case 4:
            return (
              <TicketForm
                key={item}
                onChange={handleChangeFormD}
                refId={refs.formDref}
                passengerNumber={item}
                onRemovePassenger={onRemovePassenger}
                defaultPassengersCountHandler={defaultPassengersCountHandler}
              />
            );
          default:
            return "";
        }
      })}
      <Container>
        <Message message={messages} />
        <Row justify="space-between">
          <Button
            disabled={passengerNumber.length === 4}
            onClick={onAddPassenger}
          >
            Добавить пассажира
          </Button>
          <Button
            backgroundColor="#4a4ed1"
            color="#fff"
            onClick={handleSubmit}
            type="button"
          >
            Зарезервировать
          </Button>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default TicketFormContainer;
