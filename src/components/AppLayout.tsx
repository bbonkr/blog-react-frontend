import React, {
    FunctionComponent,
    useEffect,
    useState,
    useCallback
} from "react";
import Router from "next/router";
import { BackTop, Affix, Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, UserState } from "../typings/reduxStates";
import { actionTypes } from "../reducers/actionTypes";
import {
    LOCAL_STORAGE_KEY_JWT,
    LOCAL_STORAGE_KEY_SAVED_AT
} from "../typings/constant";

import Head from "next/head";
import { appOptions } from "../config/appOptions";
import { trackPageView } from "../helpers/trackPageView";
import { BaseAction } from "../typings/BaseAction";
import { IPageviewParameters } from "../@types/global";

export interface AppLayoutProps {
    children: React.ReactNode;
}

/**
 * 기초 레이아웃을 컴포넌트입니다.
 *
 * @param {element} 내부에 렌더링될 요소
 */
const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
    const dispatch = useDispatch();
    const { me, token } = useSelector<RootState, UserState>(s => s.user);
    const [verticalScrollPercent, setVerticalScrollPercent] = useState(0);
    const [visibleScrollPercent, setVisibleScrollPercent] = useState(false);

    useEffect(() => {
        // console.info('[APP]: AppLayout componentDidMount');
        const handleRouteChangeComplete = url => {
            // console.info(`[ROUTER]: routeChangeComplete ==> ${url}`);

            const { href, pathname } = window.location;
            const { title } = window.document;
            // trackPageView(url);
            dispatch({
                type: actionTypes.TRACE_GOOGLE_ANALYTICS,
                data: {
                    page_title: title,
                    page_location: href,
                    page_path: pathname
                } as IPageviewParameters
            });
        };

        if (!token) {
            let jwt: string;
            const jwtLocalStorage = window.localStorage.getItem(
                LOCAL_STORAGE_KEY_JWT
            );
            const jwtLocalStorageSavedAt = window.localStorage.getItem(
                LOCAL_STORAGE_KEY_SAVED_AT
            );

            const jwtSessionStorage = window.sessionStorage.getItem(
                LOCAL_STORAGE_KEY_JWT
            );
            const jwtSessionStorageSavedAt = window.sessionStorage.getItem(
                LOCAL_STORAGE_KEY_SAVED_AT
            );

            if (jwtLocalStorage && jwtSessionStorage) {
                const l = parseInt(jwtLocalStorageSavedAt, 10);
                const s = parseInt(jwtSessionStorageSavedAt, 10);

                if (l > s) {
                    jwt = jwtLocalStorage;
                } else {
                    jwt = jwtSessionStorage;
                }
            } else if (jwtLocalStorage) {
                jwt = jwtLocalStorage;
            } else if (jwtSessionStorage) {
                jwt = jwtSessionStorage;
            } else {
                jwt = null;
            }

            if (jwt) {
                dispatch({
                    type: actionTypes.SET_JWT,
                    data: {
                        token: jwt
                    }
                });
            }
        }

        const onScroll = (e: Event): any => {
            // console.debug('[APP] scroll: ');
        };

        // console.info('[_app]: componentDidMount ==> Hit');
        Router.events.on("routeChangeComplete", handleRouteChangeComplete);

        window.addEventListener("scroll", onScroll, false);

        setVerticalScrollPercent(0);

        return () => {
            // console.info('[_app]: componentWillUnmount ==> Hit');

            window.removeEventListener("scroll", onScroll);
            Router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, []);

    const onContentDivScroll = useCallback(
        (event: React.UIEvent<HTMLDivElement>): void => {
            setVisibleScrollPercent(true);
            const element: HTMLDivElement = event.target as HTMLDivElement;
            // console.debug(
            //     `[APP] scrollHeight: ${
            //         element.scrollTop
            //     } / ${element.scrollHeight -
            //         element.scrollTop} / ${(element.scrollTop /
            //         (element.scrollHeight - element.clientHeight)) *
            //         100}`,
            // );

            setVerticalScrollPercent(
                (element.scrollTop /
                    (element.scrollHeight - element.clientHeight)) *
                    100
            );
        },
        [verticalScrollPercent]
    );

    useEffect(() => {
        if (!me && token) {
            dispatch({
                type: actionTypes.ME_CALL
            });
        }
    }, [me, token]);

    // console.info('[APP] AppLayout render');
    // console.debug('[APP] verticalScrollPercent: ', verticalScrollPercent);
    return (
        <>
            <Head>
                <title>{appOptions.title}</title>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width,minimum-scale=1,initial-scale=1"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
                <meta
                    name="description"
                    content={appOptions.description || appOptions.title}
                />
                <meta name="og:title" content={appOptions.title} />
                <meta name="og:site_name" content={appOptions.title} />
                <meta
                    name="og:description"
                    content={appOptions.description || appOptions.title}
                />
                <meta name="og:type" content="website" />
                {appOptions.fbAdmin && (
                    <meta name="fb:admins" content={appOptions.fbAdmin} />
                )}
                <link
                    href="/favicon.ico"
                    rel="shortcut icon"
                    type="image/x-icon"
                />
                <link
                    href="/bbon-icon.png"
                    rel="apple-touch-icon"
                    sizes="512x512"
                />
            </Head>
            <div
                style={{
                    minHeight: "100vh"
                }}
                onScroll={onContentDivScroll}
            >
                <div
                    style={{
                        padding: 0,
                        margin: 0,
                        top: 0,
                        width: "100%",
                        height: "2px",
                        position: "fixed",
                        zIndex: 100,
                        backgroundColor: "#6d6d6d",
                        visibility: visibleScrollPercent ? "visible" : "hidden",
                        display: visibleScrollPercent ? "block" : "none"
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#ef6233",
                            width: `${verticalScrollPercent}%`,
                            height: "2px"
                        }}
                    ></div>
                </div>
                <div>{children}</div>
            </div>
        </>
    );
};

export default AppLayout;
// export default withSize({
//     noPlaceholder: true,
//     refreshRate: 32,
//     refreshMode: 'throttle',
// })(AppLayout);
