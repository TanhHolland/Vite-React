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
  Image,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { columns } from "./data";
import { API_FetchBookWithParams } from "../../service/api.admin.custom";
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
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const handlePagination = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const [bookTitle, setBookTitle] = useState(""); // State để giữ giá trị book
  const [author, setAuthor] = useState(""); // State để giữ giá trị author
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  ); // select sort
  const selectedArrayValueSort = React.useMemo(
    () => Array.from(selectedKeys).map((key: any) => key.replaceAll("_", " ")),
    [selectedKeys]
  );
  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = API_FetchBookWithParams(
          currentPage,
          5,
          bookTitle,
          author,
          selectedArrayValueSort
        );
        res.then((data) => {
          // console.log(data.data.data.result);
          setBooks(data.data.data.result);
          setTotalPage(data.data.data.meta.pages);
        });
      } catch (error: any) {
        notification.error({
          message: error.response.data.message,
        });
      }
    };
    fetchBooks();
  }, [currentPage, bookTitle, author, selectedArrayValueSort]);
  const searchBookTitleRef = useRef<HTMLInputElement | null>(null);
  const searchAuthorRef = useRef<HTMLInputElement | null>(null);
  const fetchUsersWithParam = useCallback(() => {
    setBookTitle(searchBookTitleRef.current?.value || "");
    setAuthor(searchAuthorRef.current?.value || "");
    setCurrentPage(1);
  }, []);
  const renderCell = React.useCallback((book: Book, columnKey: React.Key) => {
    const cellValue = book[columnKey as keyof Book];

    switch (columnKey) {
      case "thumbnail":
        return (
          // `${import.meta.env.VITE_LOCALHOST}/images/avatar/${user.avatar}`
          <Image
            width={300}
            alt={book.mainText}
            src={`${import.meta.env.VITE_LOCALHOST}/images/book/${
              book.thumbnail
            }`}
          />
        );
      case "mainText":
        return <span>{book.mainText}</span>;
      case "category":
        return <span>{book.category}</span>;
      case "author":
        return <span>{book.author}</span>;
      case "price":
        return <span>{book.price}</span>;
      case "quantity":
        return <span>{book.quantity}</span>;
      case "updatedAt":
        const isoDate = book.updatedAt;
        const date = new Date(isoDate);
        // Chuyển đổi thành định dạng dễ đọc
        const readableDate = date.toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return <span>{readableDate}</span>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <ModalViewBook book={book}></ModalViewBook>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <PopoverDeleteBook book={book}></PopoverDeleteBook>
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
    // console.log(books);
    const worksheet = XLSX.utils.json_to_sheet(books);
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
            placeholder="Search by Book Title..."
            startContent={<SearchIcon />}
            ref={searchBookTitleRef}
          />
          <Input
            className="w-full sm:max-w-[50%]"
            placeholder="Search by Author"
            startContent={<SearchIcon />}
            ref={searchAuthorRef}
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
              <DropdownItem key="updatedAt">Update</DropdownItem>
              <DropdownItem key="price">Price</DropdownItem>
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
      <TableBody items={books}>
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
