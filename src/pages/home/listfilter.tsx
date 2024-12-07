const App: React.FC = () => {
  return (
    <div className="absolute flex flex-col -bottom-44 -left-20 z-10 w-52 bg-white rounded-lg [filter:drop-shadow(rgba(0,_0,_0,_0.2)_0px_1px_4px)] overflow-hidden">
      <span className="p-2 hover:bg-slate-200 cursor-pointer border-b-1">
        Bán chạy
      </span>
      <span className="p-2 hover:bg-slate-200 cursor-pointer border-b-1">
        Hàng mới
      </span>
      <span className="p-2 hover:bg-slate-200 cursor-pointer border-b-1">
        Giá thấp đến cao
      </span>
      <span className="p-2 hover:bg-slate-200 cursor-pointer">
        Giá cao đến thấp
      </span>
    </div>
  );
};
export default App;
