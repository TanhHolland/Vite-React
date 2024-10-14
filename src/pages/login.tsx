import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, notification } from "antd";
import { API_Login } from "../service/api.user.custom";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/user/userSlice";
import { useAppDispatch } from "../app/hook";
const App: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onFinish = async (values: any) => {
        try {
            const res = await API_Login(values.username, values.password);
            // console.log(res);
            if (res.data) {
                notification.success({
                    message: "Dang nhap thanh cong",
                });
                localStorage.setItem(
                    "access_token",
                    res.data.data.access_token
                );
                dispatch(updateUser(res.data.data.user));
                // console.log(res.data.data.user);
                navigate("/");
            }
        } catch (error: any) {
            console.log(error);
            notification.error({
                message: error.response.data.message,
            });
        }
    };

    return (
        <div className="h-screen justify-center items-center flex">
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360 }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    or <a href="/register">Register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};

export default App;
