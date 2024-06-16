import { createSlice } from '@reduxjs/toolkit'

export const navBarSlice = createSlice({
    name: 'navBar',
    initialState: {
        isDimmed: false,
    },
    reducers: {
        setIsNavBarDimmed: (state, action) => {
            state.isDimmed = action.payload
        },
    },
})

export const { setIsNavBarDimmed } = navBarSlice.actions
export default navBarSlice.reducer
