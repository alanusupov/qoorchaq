import { IProduct } from "./../../api/shopApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useRef } from "react";

// export interface CartState<T> {
//   value: T;
// }
export interface CartState {
  cartItems: IProduct[];
}

const initialState: CartState = {
  cartItems: [],
};
// const itemsRef = useRef(items);
// itemsRef.current = items;
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartItems.push(action.payload);
    },
    addItemsToCart: (state, action: PayloadAction<IProduct[]>) => {
      state.cartItems = [...state.cartItems, ...action.payload];
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
    },
    // increment: state => {
    //   state.value += 1;
    // },
  },
});

export const { addToCart, removeFromCart, addItemsToCart } = cartSlice.actions;

export default cartSlice.reducer;
