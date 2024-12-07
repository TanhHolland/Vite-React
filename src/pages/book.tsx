import React from "react";
import SliderBook from "./book/sliderBook";
const App: React.FC = () => {
  return (
    <div className="flex">
      <div className="max-w-[400px]">
        <SliderBook></SliderBook>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
export default App;
