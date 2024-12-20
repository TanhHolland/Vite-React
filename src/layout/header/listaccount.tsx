import { useNavigate } from "react-router-dom";
import { API_Logout } from "../../service/api.user.custom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { removeUser } from "../../redux/user/userSlice";
import { notification } from "antd";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state)=> state.user.user);
    const navigate = useNavigate();
    const handleLogout = async () => {
      const res = await API_Logout();
      if(res.data) {
        navigate("/");
        dispatch(removeUser());
        notification.success({
          message : res.data.data
        })
      }
    }
    const handleNavInfor = () => {
      navigate(`/customer/${user.id}`);
    }
    return (
      <div className="flex flex-col w-52 bg-white rounded-lg [filter:drop-shadow(rgba(0,_0,_0,_0.2)_0px_1px_4px)] overflow-hidden">
        <span className="p-2 hover:bg-slate-200 cursor-pointer border-b-1" onClick={handleNavInfor}>
          Thông tin tài khoản
        </span>
        <span className="p-2 hover:bg-slate-200 cursor-pointer border-b-1">
          Đơn hàng của tôi
        </span>
        <span className="p-2 hover:bg-slate-200 cursor-pointer border-b-1">
          Trung tâm hỗ trợ
        </span>
        <span className="p-2 hover:bg-slate-200 cursor-pointer" onClick={handleLogout}>
          Đăng xuất
        </span>
      </div>
    );
  };
  export default App;
  