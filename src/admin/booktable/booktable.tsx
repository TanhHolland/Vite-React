import React, { useRef, useState, useCallback, useMemo } from "react";
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
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { columns } from "./data";
import { API_FetchUserWithParams } from "../../service/api.admin.custom";
import { notification } from "antd";
import * as XLSX from "xlsx";
// Modal
import ModalCreateBook from "./component/ModalCreateBook/modelCreateBook";
import ModalViewBook from "./component/ModalViewBook/modalViewBook";
import PopoverDeleteBook from "./component/PopoverDeleteBook/popoverDeleteBook";
import ModalUploadFile from "./component/ModalUploadFile/ModalUploadFile";
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
  const handlePagination = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const [name, setName] = useState(""); // State để giữ giá trị name
  const [email, setEmail] = useState(""); // State để giữ giá trị email
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  ); // select sort
  const selectedArrayValueSort = React.useMemo(
    () => Array.from(selectedKeys).map((key: any) => key.replaceAll("_", " ")),
    [selectedKeys]
  );
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = API_FetchUserWithParams(
          currentPage,
          5,
          name,
          email,
          selectedArrayValueSort
        );
        res.then((data) => {
          // console.log(data.data.data.result);
          setUsers(data.data.data.result);
          setTotalPage(data.data.data.meta.pages);
        });
      } catch (error: any) {
        notification.error({
          message: error.response.data.message,
        });
      }
    };
    fetchUsers();
  }, [currentPage, name, email, selectedArrayValueSort]);
  const searchNameRef = useRef<HTMLInputElement | null>(null);
  const searchEmailRef = useRef<HTMLInputElement | null>(null);
  const fetchUsersWithParam = useCallback(() => {
    setName(searchNameRef.current?.value || "");
    setEmail(searchEmailRef.current?.value || "");
    setCurrentPage(1);
  }, []);
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: `${import.meta.env.VITE_LOCALHOST}/images/avatar/${
                user.avatar
              }`,
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
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {cellValue}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[`${user.isActive ? "true" : "false"}`]}
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
                <ModalViewBook user={user}></ModalViewBook>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <PopoverDeleteBook user={user}></PopoverDeleteBook>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const handleExportFile = useCallback(() => {
    /* generate worksheet and workbook */
    console.log(users);
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Demo");
    /* fix headers */
    // XLSX.utils.sheet_add_aoa(worksheet, [["ID", "Name",]], {
    //   origin: "A1",
    // });
    /* create an XLSX file and try to save to Presidents.xlsx */
    XLSX.writeFile(workbook, `UserPage_${currentPage}.xlsx`, {
      compression: true,
    });
  }, []);
  const TopContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Input
            className="w-full sm:max-w-[50%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            ref={searchNameRef}
          />
          <Input
            className="w-full sm:max-w-[50%]"
            placeholder="Search by email"
            startContent={<SearchIcon />}
            ref={searchEmailRef}
          />
        </div>
        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button variant="flat">Sort</Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem key="fullName">Name</DropdownItem>
              <DropdownItem key="email">Email</DropdownItem>
              <DropdownItem key="phone">Phone</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            type="submit"
            startContent={<SearchIcon />}
            onPress={fetchUsersWithParam}
          >
            Search
          </Button>
          <ModalCreateBook />
          <ModalUploadFile />
          <Button color="secondary" onPress={() => handleExportFile()}>
            Export
          </Button>
        </div>
      </div>
    );
  }, [fetchUsersWithParam, selectedKeys]);
  const BottomContent = useMemo(() => {
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
  }, [totalPage, currentPage]);
  return (
    <Table
      aria-label="Example table with custom cells"
      bottomContent={BottomContent}
      topContent={TopContent}
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
