import React, { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    UserOutlined,
    BookOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import BookTable from "./booktable/booktable";
import UserTable from "./usertable/usertable";
const { Header, Sider, Content } = Layout;
const listComponent: any = [
    { key: "user", component: <UserTable /> },
    { key: "book", component: <BookTable /> },
];
const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [content,setContent] = useState(listComponent[0]);
    const onSelect: any = (e: any) => {
        const component = listComponent.find((item : any) => item.key === e.key );
        setContent(component);
    };
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    onSelect={onSelect}
                    defaultSelectedKeys={["user"]}
                    items={[
                        {
                            key: "user",
                            icon: <UserOutlined />,
                            label: "User",
                        },
                        {
                            key: "book",
                            icon: <BookOutlined />,
                            label: "Book",
                        },
                        // {
                        //     key: "logout",
                        //     icon: <LogoutOutlined />,
                        //     label: "Log out",
                        // },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: "100vh",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {content.component}
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
