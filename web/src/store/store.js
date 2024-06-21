import { configureStore } from '@reduxjs/toolkit'
import navBarSlice from './navBarSlice.js'
import homeBtnSlice from './homeBtnSlice.js'

export const store = configureStore({
    reducer: {
        navBar: navBarSlice,
        homeBtn: homeBtnSlice,
    },
})
