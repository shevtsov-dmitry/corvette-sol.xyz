import { configureStore } from '@reduxjs/toolkit'
import navBarSlice from "./navBarSlice.js";

export const store = configureStore({
    reducer: {
        navBar: navBarSlice,
    },
})
