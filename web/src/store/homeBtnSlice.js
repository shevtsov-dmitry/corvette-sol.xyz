import { createSlice } from '@reduxjs/toolkit'

export const homeBtnSlice = createSlice({
    name: 'homeBtn',
    initialState: {
        isHomeBtnVisible: false,
    },
    reducers: {
        setIsHomeBtnVisible: (state, action) => {
            state.isHomeBtnVisible = action.payload
        }
    },
})

export const { setIsHomeBtnVisible } = homeBtnSlice.actions
export default homeBtnSlice.reducer
