import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
interface DarkMode {
    value : String
}

const initialState: DarkMode = {
    value : 'dark'
}
export const darkModeSlide = createSlice({
    name: "user",
    initialState,
    reducers: {
        turnOnLight : (state) => {
            state.value = 'light';
        },
        turnOnDark : (state) =>{
            state.value = 'dark';
        }
    },
});
export const { turnOnDark, turnOnLight } = darkModeSlide.actions;
export const selectDarkMode = (state: RootState) => state.darkMode;
export default darkModeSlide.reducer;