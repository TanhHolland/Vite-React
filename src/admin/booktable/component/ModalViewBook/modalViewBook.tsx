import { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeIcon } from "./EyeIcon";
import { Image } from "@nextui-org/react";
import { notification } from "antd";
import { API_UpdateUser } from "../../../../service/api.admin.custom";
export default function App({ book }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const handleUpdateUser = async () => {
    const name = nameRef?.current?.value;
    const phone = phoneRef?.current?.value;
    if (name && phone) {
      try {
        const response = await API_UpdateUser(book._id, name, phone);
        if (response.data.data) {
          notification.success({
            message: "Update user thanh cong",
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
      <EyeIcon onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                View Book
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-10 items-center">
                  <div>
                    <Image
                      width={300}
                      alt="NextUI hero Image"
                      src={`${import.meta.env.VITE_URL_IMAGE_BOOK}/${
                        book.thumbnail
                      }`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <Input
                      isDisabled={isDisabled}
                      value={book.author}
                      autoFocus
                      label="Author"
                      placeholder="Enter your author"
                      variant="bordered"
                    />
                    <Input
                      isDisabled={isDisabled}
                      value={book.category}
                      label="Category"
                      placeholder="Enter your category"
                      variant="bordered"
                    />
                    <Input
                      isDisabled={isDisabled}
                      ref={nameRef}
                      defaultValue={book.mainText}
                      label="Book Title"
                      placeholder="Enter your bookTitle"
                      variant="bordered"
                    />
                    <Input
                      isDisabled
                      ref={phoneRef}
                      defaultValue={book.createdAt}
                      label="Create At"
                      variant="bordered"
                    />
                    <Input
                      isDisabled
                      ref={phoneRef}
                      defaultValue={book.updatedAt}
                      label="Update At"
                      variant="bordered"
                    />
                    <Input
                      isDisabled={isDisabled}
                      ref={phoneRef}
                      defaultValue={book.price}
                      label="Price"
                      variant="bordered"
                    />
                    <Input
                      isDisabled
                      ref={phoneRef}
                      defaultValue={book.quantity}
                      label="Quantity"
                      variant="bordered"
                    />
                    <Input
                      isDisabled
                      ref={phoneRef}
                      defaultValue={book.sold}
                      label="Sold"
                      variant="bordered"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={handleUpdateUser}>
                  Update
                </Button>
                <Button
                  color="primary"
                  onClick={() => setIsDisabled(!isDisabled)}
                >
                  {isDisabled ? "Edit" : "View"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}