import { useAppDispatch, useAppSelector } from "../app/hook";
import { turnOnDark, turnOnLight } from "../redux/darkmode/darkmodeSlice";
import { removeUser, updateUser } from "../redux/user/userSlice";
import { Avatar, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import ListAccount from "./header/listaccount";
export default function App() {
    const isAuthenticated = useAppSelector(
        (state) => state.user.isAuthenticated
    );
    return (
        <header className="flex items-start px-[20px] py-[20px] gap-[48px] border-solid border-b-1">
            <a href="/">
                <div className="flex flex-col items-center">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                        className="w-[96px] h-[40px]"
                    />
                    <span className="text-[14px] text-[rgb(0,_62,_161)] mt-[8px] font-semibold">
                        Tốt & Nhanh
                    </span>
                </div>
            </a>
            <div className="w-1/2">
                <div className="w-full flex border-[1px] border-[solid] border-[rgb(221,221,227)] rounded-[8px] items-center overflow-hidden">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
                        className="w-[20px] h-[20px] ml-[18px]"
                    />
                    <input
                        type="text"
                        className="ml-[12px] focus:outline-none flex-1 py-[8px]"
                    />
                    <button className="text-[rgb(10,_104,_255)] hover:bg-[#CEE1FF] px-[20px] cursor-pointer h-full py-[8px] relative">
                        Tìm kiếm
                        <span className="absolute block h-[24px] top-[50%] left-[8px] border-l-[1px] -translate-y-1/2"></span>
                    </button>
                </div>
                <div className="mt-[8px] gap-[12px] flex text-[14px] text-[rgb(128,_128,_137)]">
                    <a href="#!" className="">
                        điện gia dụng
                    </a>
                    <a href="#!" className="">
                        xe cộ
                    </a>
                    <a href="#!" className="">
                        mẹ & bé
                    </a>
                    <a href="#!" className="">
                        khỏe đẹp
                    </a>
                    <a href="#!" className="">
                        nhà cửa
                    </a>
                    <a href="#!" className="">
                        sách
                    </a>
                    <a href="#!" className="">
                        thể thao
                    </a>
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex items-center py-[8px] px-[16px] gap-[5px] cursor-pointer group hover:bg-slate-300 rounded-lg">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png"
                        alt="Trang chu"
                        className="w-[24px] h-[24px] rounded-full"
                    />
                    <a href="/" className="text-[rgb(128,_128,_137)]">
                        Trang chủ
                    </a>
                </div>
                <div className="flex items-center py-[8px] px-[16px] gap-[5px] relative cursor-pointer group hover:bg-slate-300 rounded-lg">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                        alt="Tai khoan"
                        className="w-[24px] h-[24px] rounded-full"
                    />
                    <a href={isAuthenticated ? "#!" : "/login"} className="text-[rgb(128,_128,_137)]">
                        Tài khoản
                    </a>
                    {isAuthenticated && (
                        <div className="absolute hidden group-hover:block -left-20 z-10 -bottom-40">
                            <ListAccount />
                        </div>
                    )}
                </div>
                <button className="hover:bg-slate-300 rounded-lg p-[8px]">
                    <Badge count={0}>
                        <ShoppingCartOutlined
                            style={{ fontSize: "25px" }}
                            type="setting"
                        />
                    </Badge>
                </button>
            </div>
        </header>
    );
}
