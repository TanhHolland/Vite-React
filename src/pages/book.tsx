import React from "react";
import SliderBook from "./book/sliderBook";
import Text from "./book/text";
import { API_FetchBookWithId } from "../service/api.user.custom";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { addCart } from "../redux/carts/cartsSlice";
const App: React.FC = () => {
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
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.carts);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<Book>();
  const [count, setCount] = React.useState<number>(1);
  const handleIncrease = () => {
    setCount((count) => count + 1);
  };
  const handleDecrease = () => {
    if (count == 1) return;
    setCount((count) => count - 1);
  };
  // console.log(carts);
  const handleChangeInput = (e: any) => {
    if (!product) return;
    if (/^\d*$/.test(e.target.value) && +e.target.value <= product?.quantity) {
      setCount(e.target.value);
    }
  };
  React.useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        const res = await API_FetchBookWithId(id);
        if (res.data && res.data.data) {
          setProduct(res.data.data);
        }
      }
    };
    fetchBook();
  }, []);
  return (
    <div className="flex items-start bg-[#F5F5FA] py-4 gap-5 justify-center">
      {/* cot 1 */}
      <div className="max-w-[400px] rounded-lg p-4 bg-white">
        <SliderBook product={product}></SliderBook>
      </div>
      {/* cot 2 */}
      <div className="flex flex-col gap-5 w-1/3">
        <div className="bg-white rounded-lg p-3 flex flex-col gap-3">
          <p>
            Tác giả:{" "}
            <span className="text-[rgb(13,_92,_182)]">{product?.author}</span>
          </p>
          <h3 className="text-[rgb(39,_39,_42)] text-xl font-medium">
            {product?.mainText} ({product?.author})
          </h3>
          <p className="text-[rgb(120,_120,_120)] text-sm">
            Đã bán {product?.sold}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-[rgb(255,_66,_78)] font-semibold">
              {product?.price + " ₫"}
            </span>
            <span className="rounded-lg bg-[rgb(245,_245,_250)] font-normal text-xs px-1">
              -23%
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3">
          <span className="font-semibold">Thông tin vận chuyển</span>
          <p>Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</p>
        </div>
        <div className="bg-white rounded-lg p-3">
          <span className="font-semibold">Ưu đãi khác</span>
          <p>5 Mã giảm giá</p>
        </div>
        <div className="bg-white rounded-lg p-3 gap-3 flex flex-col">
          <span className="font-semibold">Thông tin chi tiết</span>
          <div className="flex items-center justify-between border-solid border-b-1 pb-2">
            <span className="text-[rgb(128,_128,_137)]">Công ty phát hành</span>
            <span>Alpha books</span>
          </div>
          <div className="flex items-center justify-between border-solid border-b-1 pb-2">
            <span className="text-[rgb(128,_128,_137)]">Ngày xuất bản</span>
            <span>2024-08-13 10:10:41</span>
          </div>
          <div className="flex items-center justify-between border-solid border-b-1 pb-2">
            <span className="text-[rgb(128,_128,_137)]">Kích thước</span>
            <span>15 x 15 cm</span>
          </div>
          <div className="flex items-center justify-between border-solid border-b-1 pb-2">
            <span className="text-[rgb(128,_128,_137)]">Loại bìa</span>
            <span>Bìa mềm</span>
          </div>
          <div className="flex items-center justify-between border-solid border-b-1 pb-2">
            <span className="text-[rgb(128,_128,_137)]">Số trang</span>
            <span>208</span>
          </div>
          <div className="flex items-center justify-between pb-2">
            <span className="text-[rgb(128,_128,_137)]">Nhà xuất bản</span>
            <span>Nhà Xuất Bản Công Thương</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3">
          <span className="font-semibold">Mô tả sản phẩm</span>
          <div className="h-[250px] overflow-hidden py-4 relative">
            <Text></Text>
            <div className="h-[200px] absolute w-full bottom-0 left-0 bg-[linear-gradient(rgba(255,_255,_255,_0),_rgb(255,_255,_255))]"></div>
          </div>
          <a
            className="block w-full text-[rgb(24,_158,_255)] text-center"
            href="#!"
          >
            Xem thêm
          </a>
        </div>
      </div>
      {/* cot 3 */}
      <div className="bg-white rounded-lg p-3 flex flex-col gap-3 w-[360px]">
        <span className="font-semibold">Số lượng</span>
        <span className="text-[rgb(128,_128,_137)]">
          Còn {product?.quantity} sản phẩm
        </span>
        <div className="flex items-center gap-2">
          <button
            className="rounded cursor-pointer border-1 border-solid h-[32px] px-1"
            onClick={handleDecrease}
          >
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
              alt=""
            />
          </button>
          <input
            type="text"
            className="outline-none rounded border-1 border-solid p-1 text-center h-[32px] px-1 w-[40px]"
            value={count}
            onChange={handleChangeInput}
          />
          <button
            className="rounded cursor-pointer border-1 border-solid p-1 h-[32px] px-1"
            onClick={handleIncrease}
          >
            <img
              src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
              alt=""
            />
          </button>
        </div>
        <span className="font-semibold">Tạm tính</span>
        <span className="font-semibold text-2xl">
          {product?.price ? product.price * count + " ₫" : "0 ₫"}
        </span>
        <div className="flex flex-col gap-2">
          <button className="bg-[rgb(255,-66,_78)] rounded cursor-pointer p-2 text-[rgb(255,_255,_255)]">
            Mua ngay
          </button>
          <button
            className="rounded cursor-pointer p-2 text-[rgb(10,_104,_255)] border-1 border-solid border-[rgb(10,_104,_255)]"
            onClick={() =>
              dispatch(addCart({ _id: id, product: product, quantity: count }))
            }
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;
