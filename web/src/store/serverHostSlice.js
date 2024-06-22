import { createSlice } from '@reduxjs/toolkit'

export const serverHostSlice = createSlice({
    name: 'serverHost',
    initialState: {
        // serverHost: "http://localhost:8080", //env
        serverHost: "https://corvette-sol.xyz:8080",
    },
})

export default serverHostSlice.reducer
