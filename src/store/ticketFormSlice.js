import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ticketFormAPI } from "../api/api";

const { sendData } = ticketFormAPI;

export const sendFormData = createAsyncThunk(
  "ticketForm/sendData",
  async function (formData, { rejectWithValue, dispatch }) {
     
 const response = await sendData(formData).then(data => data ).catch((error) => {
        return rejectWithValue(error.message);
    })
     
    return response
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
      debugger;
      const length = state.passengers.length;
      length < 4 && state.passengers.push(length + 1);
    },
    removePassenger: (state, action) => {
      debugger;
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
    extraReducers: (builder) => {
        builder.addCase(sendFormData.fulfilled, (state, action) => {
                state.messages = {type:"reponse",text:action.payload}

          })
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
} = ticketFormSlice.actions;

export default ticketFormSlice.reducer;
