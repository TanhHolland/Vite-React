import { useRef, useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as NextButton,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import {
  API_CreateBook,
  API_FetchCategory,
} from "../../../../service/api.admin.custom";
import { notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
interface TypeCategory {
  key: string;
  label: string;
}
export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [categoryList, setCategoryList] = useState<TypeCategory[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await API_FetchCategory();
        if (response.data.data) {
          const list = response.data.data.map((item: string) => {
            let data = {
              key: item,
              label: item,
            };
            return data;
          });
          console.log(list);
          setCategoryList(list);
        }
      } catch (error: any) {
        console.log(error);
        notification.error({
          message: error.response.data.message,
        });
      }
    };
    fetchCategory();
  }, []);
  // Đặt kiểu `MutableRefObject<HTMLInputElement | null>` cho các ref
  const authorRef = useRef<HTMLInputElement | null>(null);
  const bookTitleRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const soldRef = useRef<HTMLInputElement | null>(null);
  const quantityRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    accept: "image/png, image/gif, image/jpeg",
    customRequest: dummyRequest,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleAddUser = async () => {
    const author = authorRef.current?.value;
    const bookTitle = bookTitleRef.current?.value;
    const price = priceRef.current?.value;
    const sold = soldRef.current?.value;
    const quantity = quantityRef.current?.value;
    const category = categoryRef.current?.value;
    if (author && bookTitle && price && sold && quantity && category) {
      try {
        const data = {
          thumbnail,
          slider,
          mainText: bookTitle,
          author,
          price,
          sold,
          quantity,
          category,
        };
        const response = await API_CreateBook(data);
        if (response.data.data) {
          notification.success({
            message: "Tao user thanh cong",
          });
        }
      } catch (error: any) {
        console.log(error);
        notification.error({
          message: error.response.data.message,
        });
      }
    } else {
      notification.error({
        message: "Khong duoc de trong thong tin",
      });
    }
  };

  return (
    <>
      <NextButton onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        ADD BOOK
      </NextButton>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add User
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-10 items-center">
                  <div>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                    </Upload>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <Input
                      ref={authorRef}
                      autoFocus
                      label="Author"
                      variant="bordered"
                    />
                    <Select
                      label="Category"
                      placeholder="Select an category"
                      className="max-w-xs"
                    >
                      {categoryList.map((item) => (
                        <SelectItem key={item.key}>{item.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      ref={bookTitleRef}
                      label="Book Title"
                      variant="bordered"
                    />
                    <Input ref={priceRef} label="Price" variant="bordered" />
                    <Input
                      ref={quantityRef}
                      label="Quantity"
                      variant="bordered"
                    />
                    <Input ref={soldRef} label="Sold" variant="bordered" />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <NextButton
                  color="primary"
                  type="submit"
                  onPress={handleAddUser}
                >
                  ADD
                </NextButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}