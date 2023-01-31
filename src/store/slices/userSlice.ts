import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

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
    removeUser: state => {
      state.user = null;
    },
  },
});
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
