import React, { useCallback } from "react";
import TicketForm from "./TicketForm";
import Message from "../Message/Message";
import { Button, Container, Row } from "./styles/TicketFormElements";
import { useSelector, useDispatch } from "react-redux";
import {
  addPassenger,
  removePassenger,
  setFormData,
  sendFormData,
  isSendToggle,
} from "../../store/ticketFormSlice";

const TicketFormContainer = () => {
  const passengerNumber = useSelector((state) => state.ticketForm.passengers);
  const formData = useSelector((state) => state.ticketForm.formData);
  const message = useSelector((state) => state.ticketForm.messages.text);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(state);

  const onAddPassenger = (event) => {
    dispatch(addPassenger());
  };
  const onRemovePassenger = (event, number) => {
    dispatch(removePassenger({ number }));
  };
  const defaultPassengersCountHandler = () => {};

  // const sendDataHandler = (formData) => {

  //   dispatch(sendFormData(formData));
  // };
  const sendDataHandler = useCallback(
    (formData) => {
      dispatch(isSendToggle(true))
      dispatch(sendFormData(formData));
      dispatch(isSendToggle(false))
    },
    [dispatch]
  );
  const refs = {
    formAref: React.useRef(),
    formBref: React.useRef(),
    formCref: React.useRef(),
    formDref: React.useRef(),
  };

  React.useEffect(() => {
    let validatedFormCount = 0;
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key].validated) {
          validatedFormCount += 1;
        }
      }
    }
    if (validatedFormCount === passengerNumber.length) {

      sendDataHandler(formData);
    }
    
  }, [formData, passengerNumber.length, sendDataHandler]);

  async function handleSubmit() {
    passengerNumber.map((number) => {
      switch (number) {
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

  const handleChangeFormA = (data, resetForm) => {
    dispatch(setFormData({ ...formData, formA: data }));
    resetForm();
  };
  const handleChangeFormB = (data, resetForm) => {
    dispatch(setFormData({ ...formData, formB: data }));
    resetForm();
  };
  const handleChangeFormC = (data, resetForm) => {
    dispatch(setFormData({ ...formData, formC: data }));
    resetForm();
  };
  const handleChangeFormD = (data, resetForm) => {
    dispatch(setFormData({ ...formData, formD: data }));
    resetForm();
  };
  return (
    <React.Fragment>
      {passengerNumber.map((number) => {
        switch (number) {
          case 1:
            return (
              <TicketForm
                key={number}
                onChange={handleChangeFormA}
                refId={refs.formAref}
                passengerNumber={number}
                onRemovePassenger={onRemovePassenger}
              />
            );
          case 2:
            return (
              <TicketForm
                key={number}
                onChange={handleChangeFormB}
                refId={refs.formBref}
                passengerNumber={number}
                onRemovePassenger={onRemovePassenger}
              />
            );
          case 3:
            return (
              <TicketForm
                key={number}
                onChange={handleChangeFormC}
                refId={refs.formCref}
                passengerNumber={number}
                onRemovePassenger={onRemovePassenger}
              />
            );
          case 4:
            return (
              <TicketForm
                key={number}
                onChange={handleChangeFormD}
                refId={refs.formDref}
                passengerNumber={number}
                onRemovePassenger={onRemovePassenger}
                defaultPassengersCountHandler={defaultPassengersCountHandler}
              />
            );
          default:
            return "";
        }
      })}
      <Container>
        <Message message={message} />
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
