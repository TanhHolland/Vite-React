import { useAppDispatch, useAppSelector } from "../app/hook";
import { turnOnDark, turnOnLight } from "../redux/darkmode/darkmodeSlice";
import User from "./header/dropdownAvatar";
import { Avatar, Badge } from "antd";
export default function App() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(
        (state) => state.user.isAuthenticated
    );
    return (
        <header className="flex items-center">
            <div className="flex-col">
                <img
                    src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                    className="w-[96px] h-[40px]"
                />
                <span className="text-[14px] text-[rgb(0,_62,_161)] mt-[8px] font-semibold">
                    Tốt & Nhanh
                </span>
            </div>
            <div className="flex-1">
                <div className="w-full flex border-[1px] border-[solid] border-[rgb(221,221,227)] rounded-[8px] items-center">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
                        className="w-[20px] h-[20px] ml-[18px]"
                    />
                    <input
                        type="text"
                        className="border-[0px] px-[8px] py-0 font-normal text-[14px] leading-[150%] rounded-tl-[8px] rounded-bl-[8px] flex-1 outline-[none]"
                    />
                    <button>Tìm kiếm</button>
                </div>
                <div>
                    <span>điện gia dụng</span>
                    <span>xe cộ</span>
                    <span>mẹ & bé</span>
                    <span>khỏe đẹp</span>
                    <span>nhà cửa</span>
                    <span>sách</span>
                    <span>thể thao</span>
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex items-center">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png"
                        alt="Trang chu"
                        className="w-[24px] h-[24px]"
                    />
                    <a href="#!">Trang chủ</a>
                </div>
                <div className="flex items-center">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                        alt="Tai khoan"
                        className="w-[24px] h-[24px]"
                    />
                    <a href="#!">Tài khoản</a>
                </div>
                <div>
                    <Badge count={5}>
                        <Avatar shape="square" size="large" />
                    </Badge>
                </div>
            </div>
        </header>
    );
}
