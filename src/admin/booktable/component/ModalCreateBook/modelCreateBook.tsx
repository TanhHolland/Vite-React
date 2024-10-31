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
import { PlusIcon } from "./PlusIcon";
import { API_CreateUser } from "../../../../service/api.admin.custom";
import { notification } from "antd";
export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);

  // Đặt kiểu `MutableRefObject<HTMLInputElement | null>` cho các ref
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleAddUser = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;
    const phone = phoneRef.current?.value;
    if (email && password && name && phone) {
      try {
        const response = await API_CreateUser(name, email, password, phone);
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
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        ADD USER
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add User
              </ModalHeader>
              <ModalBody>
                <Input
                  ref={emailRef}
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  ref={passwordRef}
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
                  ref={nameRef}
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                />
                <Input
                  ref={phoneRef}
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Phone"
                  placeholder="Enter your phone"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" onPress={handleAddUser}>
                  ADD
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
