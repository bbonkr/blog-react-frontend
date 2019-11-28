import React, {
    useEffect,
    useState,
    useCallback,
    FunctionComponent
} from "react";
import Link from "next/link";
import {
    Menu,
    Input,
    Button,
    Modal,
    Layout,
    Icon,
    Typography,
    Divider,
    Affix,
    Progress,
    Spin,
    Drawer
} from "antd";
import { useSelector } from "react-redux";
import Router from "next/router";
import SubMenu from "antd/lib/menu/SubMenu";
import UserAvatar from "./UserAvatar";
import { RootState, UserState, SettingState } from "../typings/reduxStates";
import { appOptions } from "../config/appOptions";
import { PageProps } from "../typings/PageProps";

export interface DefaultLayoutProps extends PageProps {
    children: React.ReactNode;
}

/**
 * 기본 레이아웃 컴포넌트입니다.
 *
 * @param {element} 자식 요소
 */
const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({
    children
    // size,
}) => {
    // const dispatch = useDispatch();
    // const { width } = size;
    const { me } = useSelector<RootState, UserState>(s => s.user);
    const { currentUrl } = useSelector<RootState, SettingState>(
        state => state.settings
    );

    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [searchKeywordText, setSearchKeywordText] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSmall, setIsSmall] = useState(false);
    const [documentElementWidth, setDocumentElementWidth] = useState(0);

    const [drawerCollapsed, setDrawerCollapsed] = useState(true);

    useEffect(() => {
        setDocumentElementWidth(document.documentElement.clientWidth);
        setIsSmall(documentElementWidth <= 576);

        const onResize = () => {
            setDocumentElementWidth(
                window.document.documentElement.clientWidth
            );
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        if (documentElementWidth) {
            setIsSmall(documentElementWidth <= 576);
        }
    }, [documentElementWidth]);

    useEffect(() => {
        setIsLoggedIn(!!me);
    }, [me]);

    const onClickShowSearchModal = useCallback(() => {
        setSearchKeywordText("");
        setSearchModalVisible(true);
    }, []);

    const onSearchModalCancel = useCallback(() => {
        setSearchModalVisible(false);
    }, []);

    const onChangeSearchKeywordText = useCallback(e => {
        setSearchKeywordText(e.target.value);
    }, []);

    const onSearch = useCallback(async (value, e) => {
        e.preventDefault();

        if (value) {
            setSearchModalVisible(false);
            await Router.push(
                {
                    pathname: "/search",
                    query: { keyword: value }
                },
                `/search/${encodeURIComponent(value)}`
            );
        }
    }, []);

    const onClickBarIcon = useCallback(
        e => {
            const collapsed = drawerCollapsed;
            setDrawerCollapsed(!collapsed);
        },
        [drawerCollapsed]
    );

    // const onClickSignOut = useCallback(
    //     e => {
    //         dispatch({
    //             type: SIGN_OUT_CALL,
    //             returnUrl: currentUrl,
    //         });
    //     },
    //     [currentUrl, dispatch],
    // );

    // console.info('[APP] DefaultLayout render');
    const menu: React.ReactNode = (
        <Menu theme="light" mode="inline" defaultSelectedKeys={["home"]}>
            <Menu.Item key="home">
                <Link href="/">
                    <a>{appOptions.title}</a>
                </Link>
            </Menu.Item>
            <div style={{ padding: "0.3rem 0.6rem" }}>
                <Input.Search
                    value={searchKeywordText}
                    onChange={onChangeSearchKeywordText}
                    onSearch={onSearch}
                />
            </div>
            <Menu.Item key="recently">
                <Link href="/">
                    <a>Recently posts</a>
                </Link>
            </Menu.Item>
            <Menu.Item key="profile">
                <Link href="/me">
                    <a>Profile</a>
                </Link>
            </Menu.Item>
            {/* <Menu.Item key='search'>
                <Button
                    icon='search'
                    style={{ verticalAlign: 'middle' }}
                    onClick={onClickShowSearchModal}>
                    Search
                </Button>
            </Menu.Item> */}
            {!isLoggedIn && (
                <Menu.Item key="signin">
                    <Link
                        href={{
                            pathname: "/signin",
                            query: {
                                returnUrl: currentUrl
                            }
                        }}
                    >
                        <a>Sign in</a>
                    </Link>
                </Menu.Item>
            )}
            {!isLoggedIn && (
                <Menu.Item key="signup">
                    <Link href="/signup">
                        <a>Sign up</a>
                    </Link>
                </Menu.Item>
            )}
            {isLoggedIn && (
                <SubMenu
                    key="user"
                    title={<UserAvatar user={me} showDisplayName={true} />}
                >
                    <Menu.Item key="user-me">
                        <Link href="/me">
                            <a>Profile</a>
                        </Link>
                    </Menu.Item>
                    {/* <Menu.Item onClick={onClickSignOut}>
                                    Sign out
                                </Menu.Item> */}
                    <Menu.Item>
                        <Link href="/signout">
                            <a>Sign out</a>
                        </Link>
                    </Menu.Item>
                </SubMenu>
            )}
        </Menu>
    );

    if (!documentElementWidth) {
        return (
            <div style={{ position: "fixed", top: "50%", left: "50%" }}>
                <Spin spinning={true} />
            </div>
        );
    }

    return (
        <>
            <Layout>
                <Layout.Sider
                    width={200}
                    hidden={isSmall}
                    style={{
                        overflow: "auth",
                        height: "100vh",
                        position: "fixed",
                        left: 0
                    }}
                >
                    {menu}
                </Layout.Sider>
                <Layout
                    style={{
                        marginLeft: isSmall ? 0 : 200,
                        height: "100vh"
                    }}
                >
                    <Layout.Header
                        hidden={!isSmall}
                        style={{
                            paddingLeft: "1rem",
                            width: "100%"
                        }}
                    >
                        <Typography.Title
                            level={1}
                            style={{ color: "#efefef" }}
                        >
                            <Icon
                                className="trigger"
                                type={
                                    drawerCollapsed
                                        ? "menu-unfold"
                                        : "menu-fold"
                                }
                                onClick={onClickBarIcon}
                            />
                            <Divider type="vertical" />
                            {appOptions.title}
                        </Typography.Title>
                    </Layout.Header>
                    <Layout.Content>{children}</Layout.Content>
                </Layout>
            </Layout>
            <Drawer
                visible={!drawerCollapsed}
                closable={false}
                placement="left"
                getContainer={false}
                bodyStyle={{ padding: 0, margin: 0 }}
                onClose={e => setDrawerCollapsed(true)}
            >
                {menu}
            </Drawer>
        </>
    );
};

export default DefaultLayout;
