
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
 toggleMenu: false
}

export const mobileNavSlice = createSlice({
    name: 'mobileNav',
    initialState: initialState,
    reducers: {
      setToggle: (state) => {
        return {
            toggleMenu: !state.toggleMenu
        }
      }
    }
})


export const { setToggle } = mobileNavSlice.actions
export default mobileNavSlice.reducer