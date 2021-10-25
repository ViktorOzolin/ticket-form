import React, { useCallback } from "react";
import TicketForm from "./TicketForm";
import Modal from "../Modal/Modal";
import { Button, Container, Row } from "./styles/TicketFormElements";
import { useSelector, useDispatch } from "react-redux";
import {
  addPassenger,
  removePassenger,
  setFormData,
  sendFormData,
} from "../../store/ticketFormSlice";

const TicketFormContainer = () => {
  const passengerNumber = useSelector((state) => state.ticketForm.passengers);
  const formData = useSelector((state) => state.ticketForm.formData);
  const message = useSelector((state) => state.ticketForm.messages);
  const dispatch = useDispatch();
  const [refs, setRefs] = React.useState([]);

  const onAddPassenger = () => {
    dispatch(addPassenger());
  };
  const onRemovePassenger = (number) => {
    dispatch(removePassenger({ number }));
  };
  const sendDataHandler = useCallback(
    (formData) => {
      dispatch(sendFormData(formData));
    },
    [dispatch]
  );
  function handleSubmit() {
    passengerNumber.map(async (number) => {
      return await refs[number - 1].current.Submit();
    });
  }

  React.useEffect(() => {
    setRefs((refs) =>
      passengerNumber
        .map((_, i) => refs[i] || React.createRef())
    );
  }, [passengerNumber]);

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

  return (
    <React.Fragment>
      {passengerNumber.map((number) => {
        return (
          <TicketForm
            key={number}
            onChange={(data) => {
              dispatch(setFormData({ ...formData, [`form${number}`]: data }));
            }}
            refId={refs[number - 1]}
            passengerNumber={number}
            onRemovePassenger={onRemovePassenger}
          />
        );
      })}
      <Container>
        <Modal message={message} />
        <Row justify="space-between" flexDirection="row" height="45px">
          <Button onClick={onAddPassenger}>Добавить пассажира</Button>
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
