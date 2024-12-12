import { useState, useEffect } from "react";
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
type Props = {
  product: Book | undefined;
};
const App: React.FC<Props> = ({ product }) => {
  return (
    <img
      src={`${import.meta.env.VITE_LOCALHOST}/images/book/${product?.thumbnail}`}
    ></img>
  );
};

export default App;
