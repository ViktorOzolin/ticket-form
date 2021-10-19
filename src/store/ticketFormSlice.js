import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ticketFormAPI } from "../api/api";

const { sendData } = ticketFormAPI;

export const sendFormData = createAsyncThunk(
  "ticketForm/sendData",
  async function (formData, { rejectWithValue, dispatch }) {
    try {
      const response = await sendData(formData);
      if (response.statusText !== "OK") {
        throw new Error("Ошибка сервера. Не удалось отправить данные");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ticketFormSlice = createSlice({
  name: "ticketForm",
  initialState: {
    formData: {
      formA: { values: null, validated: false },
      formB: { values: null, validated: false },
      formC: { values: null, validated: false },
      formD: { values: null, validated: false },
    },
    passengers: [1],
    isSending: false,
    messages: {
      type: "",
      text: "",
    },
  },
  reducers: {
    addPassenger: (state, action) => {
      const length = state.passengers.length;
      length < 4 && state.passengers.push(length + 1);
    },
    removePassenger: (state, action) => {
      state.passengers = state.passengers.filter(
        (passenger) => passenger !== action.payload.number
      );
    },
    isSendToggle: (state, action) => {
      state.isSending = action.payload;
    },
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    defaultPassengersCount: (state, action) => {
      state.passengers = [1];
    },
  },
  extraReducers: {
    [sendFormData.pending]: (state, action) => {
      state.isSending = true;
    },
    [sendFormData.fulfilled]: (state, action) => {
      state.formData = {
        formA: { values: null, validated: false },
        formB: { values: null, validated: false },
        formC: { values: null, validated: false },
        formD: { values: null, validated: false },
      };
      state.messages = {
        type: "response",
        text: "Места успешно зарезервированны!",
      };
      state.isSending = false;
    },
    [sendFormData.rejected]: (state, action) => {
      state.formData = {
        formA: { values: null, validated: false },
        formB: { values: null, validated: false },
        formC: { values: null, validated: false },
        formD: { values: null, validated: false },
      };
      state.messages = { type: "error", text: action.payload };
      state.isSending = false;
    },
  },
});
console.log(ticketFormSlice);
export const {
  addPassenger,
  removePassenger,
  isSendToggle,
  setMessage,
  setFormData,
  defaultPassengersCount,
} = ticketFormSlice.actions;

export default ticketFormSlice.reducer;
