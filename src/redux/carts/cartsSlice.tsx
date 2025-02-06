import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
interface Book {
  _id: string;
  author: string;
  category: string;
  createdAt: string;
  mainText: string;
  price: number;
  quantity: number;
  slider: string[];
  sold: number;
  thumbnail: string;
  updatedAt: string;
  _v: number;
}
interface CartItems {
  cartItems : Cart[];
}
interface Cart {
  _id: string;
  product: Book;
  quantityAdd: number;
};
let initialState: CartItems = {
  cartItems : []
};
export const cartsSlide = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const { _id ,product, quantity }: {_id: string, product: Book; quantity: number } = action.payload;
      const existingItem : Cart | undefined = initialState.cartItems.find(item => item._id === _id);
      if(existingItem) {
        state.cartItems = initialState.cartItems.map((item)=> {

        })
      }
    },
    removeCart: (state, action) => {},
  },
});
export const { addCart } = cartsSlide.actions;
export const selectUser = (state: RootState) => state.user;
export default cartsSlide.reducer;
