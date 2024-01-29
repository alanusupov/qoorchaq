import { auth } from "../../index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged, User } from "firebase/auth";
import { store } from "../store";

export interface IUserState {
  user: User | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload.user as User;
    },
    logoutUser: state => {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
