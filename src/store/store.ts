import { useDispatch } from "react-redux";
import { configureStore, ThunkDispatch, Action } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["user/setUser"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["user.user"],
        // Ignore these paths in the state
        ignoredPaths: ["user.user"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
