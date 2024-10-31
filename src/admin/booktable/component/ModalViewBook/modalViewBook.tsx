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
export default function App({ user }: any) {
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
        const response = await API_UpdateUser(user._id, name, phone);
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
                View User
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-10 items-center">
                  <div>
                    <Image
                      width={300}
                      alt="NextUI hero Image"
                      src={`${import.meta.env.VITE_URL_IMAGE}/${user.avatar}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <Input
                      isDisabled
                      value={user.email}
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                    />
                    <Input
                      isDisabled
                      value={user.email}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label="toggle password visibility"
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      label="Password"
                      placeholder="Enter your password"
                      type={isVisible ? "text" : "password"}
                      variant="bordered"
                    />
                    <Input
                      isDisabled={isDisabled}
                      ref={nameRef}
                      defaultValue={user.fullName}
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Name"
                      placeholder="Enter your name"
                      variant="bordered"
                    />
                    <Input
                      isDisabled={isDisabled}
                      ref={phoneRef}
                      defaultValue={user.phone}
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Phone"
                      placeholder="Enter your phone"
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
