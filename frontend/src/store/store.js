import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice.js";
export const store = configureStore({
    reducer: {
        user: user
    }
});