import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    ChipProps,
    Pagination,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { columns } from "./data";
import { API_FetchUserPage } from "../../service/api.admin.custom";
// Modal
import ModalCreateUser from "../usertable/component/modalCreateUser/modelCreateUer";
import ModalViewUser from "../usertable/component/modalViewUser/modalViewUser";
const statusColorMap: Record<string, ChipProps["color"]> = {
    true: "success",
    false: "danger",
};

export default function App() {
    interface User {
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        role: string;
        avatar: string;
        isActive: boolean;
    }
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const handlePagination = (page: number) => {
        setCurrentPage(page);
    };
    React.useEffect(() => {
        const fetchUsers = async () => {
            const res = await API_FetchUserPage(currentPage, 5);
            if (res.data && res.data.data) {
                setUsers(res.data.data.result);
                setTotalPage(res.data.data.meta.pages);
            }
        };
        fetchUsers();
    }, [currentPage]);

    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{
                            radius: "lg",
                            src: `${
                                import.meta.env.VITE_LOCALHOST
                            }/images/avatar/${user.avatar}`,
                        }}
                        description={user.email}
                        name={user.fullName}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">
                            {cellValue}
                        </p>
                        <p className="text-bold text-sm capitalize text-default-400">
                            {cellValue}
                        </p>
                    </div>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={
                            statusColorMap[
                                `${user.isActive ? "true" : "false"}`
                            ]
                        }
                        size="sm"
                        variant="flat"
                    >
                        {user.isActive ? "Active" : "Inactive"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ModalViewUser></ModalViewUser>
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    const TopContent = () => {
        return (
            <div className="ml-auto">
                <ModalCreateUser></ModalCreateUser>
            </div>
        );
    };
    const BottomContent = () => {
        return (
            <div className="flex justify-center">
                <Pagination
                    total={totalPage}
                    initialPage={1}
                    onChange={handlePagination}
                    page={currentPage}
                />
            </div>
        );
    };
    return (
        <Table
            aria-label="Example table with custom cells"
            bottomContent={<BottomContent />}
            topContent={<TopContent />}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
