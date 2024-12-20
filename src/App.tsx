import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./pages/error";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Book from "./pages/book";
import Customer from "./pages/customer";
import { useAppDispatch } from "./app/hook";
import { API_FetchAccount } from "./service/api.user.custom";
import { updateUser } from "./redux/user/userSlice";
import Loading from "./component/loading";
import RootAdmin from "./routes/RootAdmin";
import Admin from "./admin/admin";
import ProtectedAdmin from "./ProtectedRoute/ProtectedAdmin";
function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API_FetchAccount();
                setLoading(false);
                dispatch(updateUser(res.data.data.user));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root></Root>,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>,
                    errorElement: <ErrorPage></ErrorPage>,
                },
                {
                    path: "/book/:id",
                    element: <Book></Book>,
                    errorElement: <ErrorPage></ErrorPage>,
                },
                {
                    path: "/customer/:id",
                    element: <Customer></Customer>,
                    errorElement: <ErrorPage></ErrorPage>,
                }
            ],
        },
        {
            path: "/admin",
            element: (
                <ProtectedAdmin>
                    <RootAdmin></RootAdmin>
                </ProtectedAdmin>
            ),
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                {
                    path: "/admin",
                    element: <Admin></Admin>,
                    errorElement: <ErrorPage></ErrorPage>,
                },
            ],
        },
        {
            path: "/login",
            element: <Login></Login>,
            errorElement: <ErrorPage></ErrorPage>,
        },
        {
            path: "/register",
            element: <Register></Register>,
            errorElement: <ErrorPage></ErrorPage>,
        },
    ]);
    return (
        <>
            {loading ? <Loading></Loading> : <RouterProvider router={router} />}
        </>
    );
}

export default App;
