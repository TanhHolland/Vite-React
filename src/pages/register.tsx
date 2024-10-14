import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { API_Register } from "../service/api.user.custom";
type FieldType = {
    name?: string;
    password?: string;
    email?: string;
    phone?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const App: React.FC = () => {
    const [form] = Form.useForm();
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const res = await API_Register(
                values.name!,
                values.email!,
                values.password!,
                values.phone!
            );
            console.log(res);
            if (res.data) {
                notification.success({
                    message: "Dang ky thanh cong",
                });
            }
        } catch (error: any) {
            console.log("Dang ky loi", error.response.data.message);
            notification.error({
                message: error.response.data.message,
            });
        }
    };
    return (
        <div className="h-screen flex center justify-center items-center">
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Fullname"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your fullname!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Phone"
                    name="phone"
                    rules={[
                        { required: true, message: "Please input your phone!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    or <a href="/login">Login now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};

export default App;
