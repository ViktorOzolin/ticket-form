import { configureStore } from "@reduxjs/toolkit";
import ticketFormReducer from "./ticketFormSlice";


export default configureStore({
    reducer: {
        ticketForm: ticketFormReducer
    }
});