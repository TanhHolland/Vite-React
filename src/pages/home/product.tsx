import React from "react";
import { Rate } from "antd";
import { Link } from "react-router-dom";
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
type ProductProps = {
  product: Book;
};
const App: React.FC<ProductProps> = ({ product }) => {
  return (
    <Link to={`/book/${product._id}`}>
      <div className="pb-2 bg-white rounded-lg overflow-hidden h-full flex flex-col">
        <div className="w-full h-[236px] relative">
          <img
            src={`${import.meta.env.VITE_LOCALHOST}/images/book/${
              product.thumbnail
            }`}
            alt={product.mainText}
            className="object-cover w-full h-full absolute"
          />
          <img
            src="https://salt.tikicdn.com/ts/upload/c2/bc/6d/ff18cc8968e2bbb43f7ac58efbfafdff.png"
            alt=""
            className="object-contain left-0 bottom-0 absolute"
          />
        </div>
        <div className="px-3 flex flex-col flex-1">
          <div className="flex items-center gap-2 mt-1">
            <h3 className="text-[rgb(255,_66,_78)] text-lg font-semibold">
              {product.price + " ₫"}
            </h3>
            <span className="px-1 bg-[rgb(245,_245,_250)] rounded-lg text-sm font-medium">
              -18%
            </span>
          </div>
          {/* Content */}
          <div className="mt-4 justify-between flex flex-col flex-1 gap-2">
            <div>
              <h3 className="text-sm text-[rgb(128,_128,_137)]">{product.author}</h3>
              <p className="break-words text-base leading-6	line-clamp-3">
                Combo Bộ sách Tiếng Việt cho người nước ngoài chương trình Sơ
                cấp và Khám phá tiếng Việt hiện đại
              </p>
              <div className="flex items-center gap-3 mt-2">
                <Rate disabled defaultValue={5} style={{ fontSize: "10px" }} />
                <span className="text-sm text-[rgb(128,_128,_137)]">
                  Da ban {product.sold}
                </span>
              </div>
            </div>
            {/* Neu co */}
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nemo quibusdam excepturi autem temporibus accusamus quod nostrum veritatis iste veniam mollitia accusantium quaerat culpa asperiores voluptatem quis, rerum officiis totam!</p> */}
            {/*  */}
            <div className="flex items-center gap-1 border-t-1 pt-[6px]">
              <img
                src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                alt="now"
                className="w-[32px]"
              />
              <span className="text-sm font-normal text-[rgb(128,_128,_137)]">
                Giao chieu mai
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default App;
