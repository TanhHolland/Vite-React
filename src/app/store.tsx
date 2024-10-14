import { configureStore } from "@reduxjs/toolkit";
import userSlide from "../redux/user/userSlice";
import darkModeSlice from "../redux/darkmode/darkmodeSlice";
export const store = configureStore({
    reducer: {
        user: userSlide,
        darkMode : darkModeSlice
    },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
