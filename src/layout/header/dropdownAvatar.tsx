import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Avatar,
} from "@nextui-org/react";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { API_Logout } from "../../service/api.user.custom";
import { notification } from "antd";
import { removeUser } from "../../redux/user/userSlice";
export default function App() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        try {
            const res = await API_Logout();
            if (res.data) {
                notification.success({
                    message: "Dang xuat thanh cong",
                });
                console.log(res.data);
                dispatch(removeUser());
            }

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={`${import.meta.env.VITE_LOCALHOST}/images/avatar/${
                        user.user.avatar
                    }`}
                />
            </DropdownTrigger>
            <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
            >
                <DropdownSection title="" showDivider>
                    <DropdownItem key="information">Trang cá nhân</DropdownItem>
                    <DropdownItem key="setting">Cài đặt</DropdownItem>
                </DropdownSection>
                <DropdownSection title="" showDivider>
                    <DropdownItem key="write-blogs">Viết Blogs</DropdownItem>
                    <DropdownItem key="my-blogs">Bài viết của tôi</DropdownItem>
                    <DropdownItem key="save-blogs">
                        Bài viết đã lưu
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection>
                    <DropdownItem
                        key="logout"
                        className="text-danger"
                        color="danger"
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}
