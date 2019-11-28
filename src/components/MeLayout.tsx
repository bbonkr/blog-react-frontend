import React, {
    useState,
    useCallback,
    useEffect,
    FunctionComponent
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Icon, Drawer } from "antd";
import Router from "next/router";
import UserAvatar from "./UserAvatar";
import { actionTypes } from "../reducers/actionTypes";
import { RootState, UserState, MeState } from "../typings/reduxStates";
import Head from "next/head";
import { appOptions } from "../config/appOptions";
const { Sider } = Layout;

const menusSide = [
    {
        key: "dashboard",
        caption: "Dashboard",
        path: "/me",
        pathAs: "",
        icon: "dashboard"
    },
    {
        key: "posts",
        caption: "Posts",
        path: "/me/posts",
        pathAs: "",
        icon: "book"
    },
    {
        key: "write",
        caption: "New Post",
        path: "/me/write?id=",
        pathAs: "",
        icon: "edit"
    },
    {
        key: "category",
        caption: "Categories",
        path: "/me/category",
        pathAs: "",
        icon: "container"
    },
    {
        key: "media",
        caption: "Media",
        path: "/me/media",
        pathAs: "",
        icon: "picture"
    },
    {
        key: "liked",
        caption: "Liked",
        path: "/me/liked",
        pathAs: "",
        icon: "heart"
    },
    {
        key: "settings",
        caption: "Settings",
        path: "/me/settings",
        pathAs: "",
        icon: "setting"
    },
    {
        key: "changeinfo",
        caption: "Change Information",
        path: "/me/changeinfo",
        pathAs: "",
        icon: "user"
    },
    {
        key: "changepassword",
        caption: "Change Password",
        path: "/me/changepassword",
        pathAs: "",
        icon: "lock"
    }
];

export interface MeLayoutPorps {
    children: React.ReactNode;
}

const MeLayout: FunctionComponent<MeLayoutPorps> = ({ children }) => {
    const dispatch = useDispatch();
    const { me } = useSelector<RootState, UserState>(state => state.user);
    const { sideMenuCollapsed } = useSelector<RootState, MeState>(s => s.me);

    // const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [selectedMenuKeys, setSelectedMenuKeys] = useState([]);

    useEffect(() => {
        if (me) {
            const { pathname } = Router;
            const index = pathname.indexOf("?");
            let pathnameOnly = pathname;
            if (index > 0) {
                pathnameOnly = pathnameOnly.slice(0, index);
            }
            const paths = pathnameOnly.split("/").filter(c => !!c);

            let key = "dashboard";
            if (paths.length > 0) {
                key = paths[paths.length - 1];
            }

            setSelectedMenuKeys([key]);
        }
    }, [me]);

    const onCollapse = useCallback(
        collapsed => {
            // setMenuCollapsed(collapsed);
            dispatch({
                type: actionTypes.SIDE_MENU_COLLAPSE,
                data: {
                    sideMenuCollapsed: collapsed
                }
            });
        },
        [dispatch]
    );
    // const onBreakPoint = useCallback((broken) => {}, []);
    const onClickMenu = useCallback(({ key }) => {
        switch (key.toLowerCase()) {
            case "home":
                Router.push("/");
                break;
            case "me":
                Router.push("/me");
                // setSelectedMenuKeys([key]);
                break;
            case "posts":
                Router.push("/me/posts");
                // setSelectedMenuKeys([key]);
                break;
            case "signout":
                // dispatch({
                //     type: SIGN_OUT_CALL,
                //     returnUrl: '/',
                // });
                Router.push("/signout");
                break;
            default:
                break;
        }
    }, []);

    const onClickSideMenu = useCallback(menu => {
        const { key } = menu;
        const current = menusSide.find(v => v.key === key);
        const { path, pathAs } = current;
        if (!!path) {
            Router.push(path, pathAs || path);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{`${me && me.displayName}'s content management | ${
                    appOptions.title
                }`}</title>
            </Head>
            <Layout style={{ minHeight: "100%" }}>
                <Layout.Header
                    style={{ position: "fixed", zIndex: 500, width: "100%" }}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: "64px" }}
                        defaultSelectedKeys={["me"]}
                        selectedKeys={selectedMenuKeys}
                        onClick={onClickMenu}
                    >
                        <Menu.Item key="home">NodeBlog</Menu.Item>
                        <Menu.Item key="me">
                            <Icon type="user" /> <span>Me</span>
                        </Menu.Item>
                        <Menu.Item key="posts">
                            <Icon type="container" /> <span>Posts</span>
                        </Menu.Item>
                        <Menu.Item key="signout">Sign out</Menu.Item>
                    </Menu>
                </Layout.Header>
                <Layout.Content
                    style={{
                        marginTop: "64px",
                        minHeight: "100vh"
                    }}
                >
                    <Layout style={{ minHeight: "100vh" }}>
                        <Drawer
                            placement="left"
                            closable={false}
                            visible={false}
                            bodyStyle={{ padding: 0 }}
                        ></Drawer>

                        <Sider
                            collapsible={true}
                            collapsed={sideMenuCollapsed}
                            onCollapse={onCollapse}
                        >
                            <div
                                style={{
                                    textAlign: "center",
                                    color: "#9f9f9f",
                                    padding: "1.0rem"
                                }}
                            >
                                <UserAvatar user={me} />

                                <div>
                                    {!sideMenuCollapsed && me && me.username}
                                </div>
                                <div>
                                    {!sideMenuCollapsed && me && me.displayName}
                                </div>
                            </div>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={["me"]}
                                selectedKeys={selectedMenuKeys}
                                onClick={onClickSideMenu}
                            >
                                {menusSide.map(v => {
                                    return (
                                        <Menu.Item key={v.key}>
                                            {v.icon && <Icon type={v.icon} />}
                                            <span>{v.caption}</span>
                                        </Menu.Item>
                                    );
                                })}
                            </Menu>
                        </Sider>

                        <Layout style={{ minHeight: "100vh" }}>
                            {/* <Layout.Header /> */}
                            <Layout.Content>
                                <article>{children}</article>
                            </Layout.Content>
                        </Layout>
                    </Layout>
                </Layout.Content>
                <Layout.Footer />
            </Layout>
        </>
    );
};

export default MeLayout;
