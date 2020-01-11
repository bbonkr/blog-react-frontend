import React, { Fragment } from "react";
import App, { AppContext, AppInitialProps } from "next/app";
import Router from "next/router";
import { Store } from "redux";
import withRedux, { NextJSAppContext, NextJSContext } from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { Provider } from "react-redux";
import Helmet, { HelmetProps } from "react-helmet";
import AppLayout from "../components/AppLayout";
import { configureStore } from "../store";
import { normalizeReturnUrl } from "../helpers/stringHelper";
import { appOptions } from "../config/appOptions";
import { PageProps } from "../typings/PageProps";
import { actionTypes } from "../reducers/actionTypes";
import { RootState } from "../typings/reduxStates";
import { BaseAction } from "../typings/BaseAction";
import { NextPageContext } from "next";
import { trackPageView } from "../helpers/trackPageView";

import "antd/dist/antd.css";
import "../styles/styles.scss";

export interface BlogAppPageProps extends PageProps {
    Component: Element;
    store: Store;
    pageProps?: PageProps;
    returnUrl?: string;
}

// type BlogAppContext = AppContext & NextJSAppContext;

class BlogApp extends App<BlogAppPageProps> {
    public static async getInitialProps(
        context: AppContext & NextJSAppContext
    ): Promise<AppInitialProps> {
        const ctx: NextPageContext & NextJSContext<RootState, BaseAction> =
            context.ctx;
        const Component = context.Component;

        let pageProps: PageProps = {};

        const state = ctx.store.getState();
        const cookie = ctx.isServer ? ctx.req.headers.cookie : "";

        const { me, token } = state.user;
        let url: string = "";

        // HTTP 요청시 쿠키 추가
        // if (ctx.isServer && cookie) {
        if (ctx.isServer) {
            // axios.defaults.headers.Cookie = cookie;

            if (!me && token) {
                ctx.store.dispatch({
                    type: actionTypes.ME_CALL
                });
            }
        }

        if (Component.getInitialProps) {
            pageProps = (await Component.getInitialProps(ctx)) || {};
        }

        if (pageProps.doNotSetCurrentUrl) {
            // signIn page
            url = ctx.query.returnUrl as string;
        } else {
            url = ctx.isServer
                ? ctx.req.url
                : !!ctx.asPath
                ? ctx.asPath
                : normalizeReturnUrl(ctx.pathname, ctx.query);

            ctx.store.dispatch({
                type: actionTypes.SET_CURRENT_URL,
                data: { url }
            });
        }

        pageProps.returnUrl = url;
        pageProps.me = me;
        pageProps.token = token;

        // console.debug('[APP] _app getInitailProps pageProps: ', pageProps);
        // console.debug('[APP] _app getInitailProps url: ', url);

        return { pageProps };
    }

    public render() {
        const { Component, store, pageProps, returnUrl } = this.props;
        const fbAdmin = appOptions.fbAdmin;
        const siteName = appOptions.title || "blog Service";

        const helmetProps: HelmetProps = {
            title: siteName,
            htmlAttributes: { lang: "ko" },
            meta: [
                { charSet: "UTF-8" },
                {
                    name: "viewport",
                    content:
                        "width=device-width,minimum-scale=1,initial-scale=1"
                },
                { httpEquiv: "X-UA-Compatible", content: "IE-edge" },
                { name: "description", content: siteName },
                { name: "og:title", content: siteName },
                { name: "og:site_name", content: "" },
                { name: "og:description", content: siteName },
                { name: "og:type", content: "website" },
                { name: "fb:admins", content: fbAdmin },
                {
                    name: "og:site_name",
                    content: siteName
                }
            ],
            link: [
                {
                    rel: "shortcut icon",
                    href: "/favicon.ico",
                    type: "image/x-icon"
                },
                {
                    rel: "apple-touch-icon",
                    href: "/bbon-icon.png",
                    sizes: "512x512"
                },
                // users-posts users
                {
                    rel: "me",
                    href: "https://www.facebook.com/bbonkr"
                },
                {
                    rel: "author",
                    type: "text/plain",
                    href: "/humans.txt"
                }
            ],
            script: [
                {
                    src:
                        "https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.2/antd.js"
                }
            ]
        };

        return (
            <Fragment>
                <Provider store={store}>
                    {/* <Helmet htmlAttributes={helmetProps} /> */}
                    <AppLayout>
                        <Component {...pageProps} returnUrl={returnUrl} />
                    </AppLayout>
                </Provider>
            </Fragment>
        );
    }
}

export default withRedux(configureStore)(withReduxSaga(BlogApp));
