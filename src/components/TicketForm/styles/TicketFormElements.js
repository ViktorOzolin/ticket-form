import styled from "styled-components";

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: ${(props) => props.display};
  padding: 10px;
`;
export const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: ${(props) => props.justify};
`;
export const Button = styled.button`
  background-color: ${(props) => props.backgroundColor || "#fff"};
  color: ${(props) => props.color || "#666"};
  border: 1px solid #2d3091;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 12px;
  outline: 0;
  border-radius: 4px;
  width: 20%;
  cursor: pointer;
  transition: 0.5s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  &:hover {
    background-color: #2d3091;
    color: #f2f2f2;
  }
  &: active {
    background-color: #1f2054;
    color: #f2f2f2;
  }
  &:disabled,
  &[disabled] {
    border: 1px solid #ededed;
    background-color: #f1f1f1;
    color: #d7d7d7;
  }
`;
export const Title = styled.h1`
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => props.color || "#e21a1a"};
`;
export const Required = styled.span`
  color: red;
`;
export const RequiredText = styled.span`
  font-size: 11px;
  position: absolute;
  top: 65px;
  color: red;
`;
export const Form = styled.form`
  width: 100%;
`;
export const Select = styled.select`
  width: 100%;
  padding: 9px 12px;
  border-radius: 4px;
  background-color: #fff;
  background-image: none;
  box-shadow: 0px 0px 6px 0px #e3e3e3e8;
  border: ${(props) =>
    props.error ? "1px solid #ff8a8a" : "1px solid #e9e9e9"};
  &:focus {
    border: ${(props) =>
      props.error ? "1px solid #ff8a8a" : "1px solid #ccc"};
  }
`;
export const Input = styled.input`
  display: block;
  width: 100%;
  outline: 0;
  padding: 7px 20px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  box-shadow: 0px 0px 6px 0px #e3e3e3e8;
  border: ${(props) =>
    props.error ? "1px solid #ff8a8a" : "1px solid #e9e9e9"};
  border-radius: 4px;
  &:focus {
    border: ${(props) =>
      props.error ? "1px solid #ff8a8a" : "1px solid #ccc"};
  }
`;
export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 10px;
`;
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
`;
export const Field = styled.div`
  display: flex;
  padding: 0 10px;
  align-self: flex-end;
  flex-direction: ${(props) => props.direction || "column"};
  width: ${(props) => props.width || "33.33%"};
  border-bottom: ${(props) => props.borderBottom};
  position: relative;
`;

export const DatePicker = styled.input`
  &::-webkit-datetime-edit-day-field {
    display: none;
  }
  &::-webkit-datetime-edit {
  }
  &::-webkit-datetime-edit-fields-wrapper {
  }
  &::-webkit-datetime-edit-text {
  }
  &::-webkit-datetime-edit-month-field {
  }
  &::-webkit-datetime-edit-day-field {
  }
  &::-webkit-datetime-edit-year-field {
  }
  &::-webkit-inner-spin-button {
  }
  &::-webkit-calendar-picker-indicator {
  }
`;
