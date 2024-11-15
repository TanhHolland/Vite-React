import { DeleteIcon } from "./DeleteIcon";
import { API_DeleteBook } from "../../../../service/api.admin.custom";
import { notification } from "antd";
export default function App({ book }: any) {
  const deleteBook = async () => {
    try {
      const response = await API_DeleteBook(book._id);
      if (response.data.data) {
        notification.success({
          message: "Delete Book thanh cong",
        });
      }
    } catch (error: any) {
      notification.error({
        message: error.response.data.message,
      });
    }
  };
  return <DeleteIcon onClick={deleteBook}/>;
}
