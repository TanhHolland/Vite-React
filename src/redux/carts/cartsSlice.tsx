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
type Cart = {
    _id : string,
    product : Book,
    quantityAdd: number
}
let initialState: Cart[] = [];
export const cartsSlide = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCart: (state, action) => {
      let check = false;
      for(let i = 0; i < state.length; i++) {
        if(state[i]._id == action.payload._id) {
            state[i].quantityAdd += action.payload.quantityAdd;
            check = true;
        }
      }
      let cart : Cart = {
        _id : "123",

      }
      if(!check) state.push(action.payload);
    },
    removeCart: (state, action) => {
      
    },
  },
});
export const { addCart } = cartsSlide.actions;
export const selectUser = (state: RootState) => state.user;
export default cartsSlide.reducer;
