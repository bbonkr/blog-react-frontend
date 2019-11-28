import React, { Component, FunctionComponent, useEffect } from "react";
import Router from "next/router";
import { Spin } from "antd";
import { normalizeReturnUrl } from "../helpers/stringHelper";
import { NextJSContext } from "next-redux-wrapper";
import { NextPageContext } from "next";
import { RootState, UserState } from "../typings/reduxStates";
import { BaseAction } from "../typings/BaseAction";
import { UserModel } from "../typings/dto";
import { PageProps } from "../typings/PageProps";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

export interface WithAuthProps extends PageProps {
    me: UserModel;
    returnUrl?: string;
}

export interface WithAuthState {
    loading: boolean;
}

const getDisplayName = Component =>
    Component.displayName || Component.name || "Component";

export const withAuth = WrappedComponent => {
    class AuthComponent extends Component<WithAuthProps, WithAuthState> {
        public static displayName = `withAuthSync(${getDisplayName(
            WrappedComponent
        )})`;

        public static async getInitialProps(
            ctx: NextPageContext & NextJSContext<RootState, BaseAction>
        ): Promise<WithAuthProps> {
            // console.debug('[APP] withAuth getInitialProps');

            const state: RootState = ctx.store.getState();

            const { me } = state.user;
            // const { currentUrl } = state.settings;

            // console.debug(
            //     '[APP] withAuth getInitialProps ==>           me: ',
            //     me,
            // );
            // console.debug(
            //     '[APP] withAuth getInitialProps ==>   currentUrl: ',
            //     currentUrl,
            // );

            let pageProps: PageProps = {};

            if (WrappedComponent.getInitialProps) {
                pageProps = (await WrappedComponent.getInitialProps(ctx)) || {};
            }

            return {
                ...pageProps,
                me: me
                // returnUrl: currentUrl,
            };
        }

        constructor(props) {
            super(props);

            this.state = { loading: true };
        }

        public componentDidMount() {
            // console.debug('[APP] withAuth componentDidMount');
            // console.debug('[APP] withAuth properties: ', this.props);
            // console.debug(
            //     '[APP] withAuth properties ==> returnUrl: ',
            //     this.props.returnUrl,
            // );

            if (!this.props.me) {
                // const returnUrl = encodeURIComponent(
                //     this.props.returnUrl || '/',
                // );

                // Router.push(`/signin?returnUrl=${returnUrl}`);
                Router.push(`/signin`);
            } else {
                this.setState({ loading: false });
            }
        }

        public render() {
            // console.debug('[APP] withAuth render');
            if (this.state.loading) {
                return <Loading />;
            }
            return <WrappedComponent {...this.props} />;
        }
    }

    return AuthComponent;
};
