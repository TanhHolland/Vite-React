import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { API_DeleteUser } from "../../../../service/api.admin.custom";
import { notification } from "antd";
export default function App({ user }: any) {
  const deleteUser = async () => {
    try {
      const response = await API_DeleteUser(user._id);
      if (response.data.data) {
        notification.success({
          message: "Delete user thanh cong",
        });
      }
    } catch (error: any) {
      notification.error({
        message: error.response.data.message,
      });
    }
  };
  return <DeleteIcon onClick={deleteUser}/>;
}
