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

  const formAref = React.useRef();
  const formBref = React.useRef();
  const formCref = React.useRef();
  const formDref = React.useRef();

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
            setMessageHandler("Места успешно зарезервированны!");
            fetchToggleHandler(false);
          })
          .catch((error) => {
            setMessageHandler("Ошибка отправки данных на сервер");
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
    const length = passengerNumber.length;
    const refsSubmit = {
      1:
        typeof formAref.current === "undefined"
          ? null
          : await formAref.current.Submit,
      2:
        typeof formBref.current === "undefined"
          ? null
          : await formBref.current.Submit,
      3:
        typeof formCref.current === "undefined"
          ? null
          : await formCref.current.Submit,
      4:
        typeof formDref.current === "undefined"
          ? null
          : await formDref.current.Submit,
    };
    for (let i = 1; i <= length; i++) {
      refsSubmit[i]();
    }
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
  console.log(messages);
  return (
    <React.Fragment>
      {passengerNumber.map((item) => {
        switch (item) {
          case 1:
            return (
              <TicketForm
                key={item}
                onChange={handleChangeFormA}
                refId={formAref}
                passengerNumber={item}
                onRemovePassenger={onRemovePassenger}
              />
            );
          case 2:
            return (
              <TicketForm
                key={item}
                onChange={handleChangeFormB}
                refId={formBref}
                passengerNumber={item}
                onRemovePassenger={onRemovePassenger}
              />
            );
          case 3:
            return (
              <TicketForm
                key={item}
                onChange={handleChangeFormC}
                refId={formCref}
                passengerNumber={item}
                onRemovePassenger={onRemovePassenger}
              />
            );
          case 4:
            return (
              <TicketForm
                key={item}
                onChange={handleChangeFormD}
                refId={formDref}
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
