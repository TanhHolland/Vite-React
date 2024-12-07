import { FilterOutlined } from "@ant-design/icons";
import Product from "./product";
import React from "react";
import FilterProduct from "./listfilter";
const App: React.FC = () => {
  const classButton =
    "border-solid px-[12px] py-[6px] border-[rgb(221,_221,_227)] rounded-2xl border-1";
  const [isFilter, setIsFilter] = React.useState<boolean>(false);
  const handleFilter = () => {
    setIsFilter(!isFilter);
  }
  return (
    <section className="flex gap-[20px] px-[40px] pt-[20px] items-start">
      <div className="bg-white text-[rgb(39,_39,_42)] flex flex-col rounded-lg h-full">
        <span className="font-semibold border-solid border-b-1 p-5">
          Khám phá theo danh mục
        </span>
        <div className="flex flex-col p-4 gap-1 text-xs">
          <a href="#!">123</a>
          <a href="#!">123</a>
          <a href="#!">123</a>
          <a href="#!">123</a>
          <a href="#!">123</a>
          <a href="#!">123</a>
        </div>
      </div>
      <div className="text-[rgb(39,_39,_42)] flex flex-col flex-1 gap-7">
        <span className="text-3xl font-semibold p-5 bg-white rounded-lg">
          Nhà sách Tiki
        </span>
        <div className="background">
          <span className="font-semibold">Tất cả sản phẩm</span>
          <div className="flex mt-2">
            {/*  */}
            <div className="flex overflow-hidden relative">
              <div className="shrink-0">
                <span className="text-[rgb(128,_128,_137)] text-[12px]">
                  Thương hiệu
                </span>
                <div className="gap-2 flex items-center border-solid border-[rgb(221,_221,_227)] border-r-[1px] pr-3">
                  <button className={classButton}>Deli</button>
                  <button className={classButton}>Thiên long</button>
                  <button className={classButton}>Hồng hà</button>
                  <button className={classButton}>Magix</button>
                  <button className="border-solid py-[6px] px-[6px] border-[rgb(221,_221,_227)] rounded-full border-1">
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/catalog/arrow.svg"
                      alt=""
                      className="w-[24px]"
                    />
                  </button>
                </div>
              </div>
              <div className="pl-3 shrink-0">
                <span className="text-[rgb(128,_128,_137)] text-[12px]">
                  Thương hiệu
                </span>
                <div className="gap-2 flex items-center border-solid border-[rgb(221,_221,_227)] border-r-[1px] pr-3">
                  <button className={classButton}>Nhà sách vĩnh tụy</button>
                  <button className={classButton}>Bamboo book</button>
                  <button className={classButton}>Nhà sách fahasa</button>
                  <button className={classButton}>infor book</button>
                  <button className="border-solid py-[6px] px-[6px] border-[rgb(221,_221,_227)] rounded-full border-1">
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/catalog/arrow.svg"
                      alt=""
                      className="w-[24px]"
                    />
                  </button>
                </div>
              </div>
              <div className="shrink-0">
                <span className="text-[rgb(128,_128,_137)] text-[12px]">
                  Giao hàng
                </span>
                <div className="gap-2 flex items-center border-solid border-[rgb(221,_221,_227)] border-r-[1px] pr-3">
                  <button className={classButton}>Hàng nội địa</button>
                  <button className={classButton}>Hàng quốc tế</button>
                  <button className="border-solid py-[6px] px-[6px] border-[rgb(221,_221,_227)] rounded-full border-1">
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/catalog/arrow.svg"
                      alt=""
                      className="w-[24px]"
                    />
                  </button>
                </div>
              </div>
              <button className="absolute right-0 -rotate-90 top-2/4 -translate-y-1/4 h-[45px] w-[30px]">
                <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/50 to-white"></div>
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/catalog/arrow.svg"
                  alt=""
                  className="w-[30px] relative z-10"
                />
              </button>
            </div>
            <div className="shrink-0 flex ml-5 relative">
              <div className="h-[30px] border-solid border-1 mt-7"></div>
              <div className="flex items-center gap-1 ml-3 px-[12px] py-[6px] hover:bg-slate-50 border-solid border-[rgb(221,_221,_227)] border-1 rounded-xl mt-6 cursor-pointer" onClick={handleFilter}>
                <FilterOutlined style={{ fontSize: "20px" }} type="setting" />
                <span>Tất cả</span>
              </div>
              {isFilter && <FilterProduct></FilterProduct>}
            </div>
          </div>
        </div>
        {/* Display san pham */}
        <div className="grid grid-cols-4 gap-3 auto-rows-[minmax(500px,max-content)]">
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
        </div>
      </div>
    </section>
  );
};
export default App;
