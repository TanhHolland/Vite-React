import { useAppSelector } from "../app/hook";
import { Navigate } from "react-router-dom";
import ErrorPage from "../pages/error";
const ProtectedAdmin = (props: any) => {
    const isAuthenticated = useAppSelector(
        (state) => state.user.isAuthenticated
    );
    const role = useAppSelector((state) => state.user.user.role);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (role !== "ADMIN") return <ErrorPage></ErrorPage>
    return props.children;
};
export default ProtectedAdmin;
