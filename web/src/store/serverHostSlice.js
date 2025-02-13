import { createSlice } from '@reduxjs/toolkit'

export const serverHostSlice = createSlice({
    name: 'serverHost',
    initialState: {
        serverHost: "http://localhost:8080", //env
        // serverHost: "https://corvette-ton.fun:8080",
    },
})

export default serverHostSlice.reducer
