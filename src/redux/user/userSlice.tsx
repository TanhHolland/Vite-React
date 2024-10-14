import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
interface User {
    isAuthenticated: boolean;
    user: {
        avatar: string;
        email: string;
        fullName: string;
        id: string;
        phone: string;
        role: string;
    };
}
const initialState: User = {
    isAuthenticated: false,
    user: {
        avatar: "",
        email: "",
        fullName: "",
        id: "",
        phone: "",
        role: "",
    },
};
export const userSlide = createSlice({
    name: "user",
    initialState,
    reducers: {
        removeUser: (state) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user.avatar = "";
            state.user.email = "";
            state.user.fullName = "";
            state.user.id = "";
            state.user.phone = "";
            state.user.role = "";
        },
        updateUser: (state, action) => {
            state.isAuthenticated = true;
            state.user.avatar = action.payload.avatar;
            state.user.email = action.payload.email;
            state.user.fullName = action.payload.fullName;
            state.user.id = action.payload.id;
            state.user.phone = action.payload.phone;
            state.user.role = action.payload.role;
        },
    },
});
export const { removeUser, updateUser } = userSlide.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlide.reducer;
