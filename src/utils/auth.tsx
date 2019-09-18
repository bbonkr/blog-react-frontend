import React, { Component } from 'react';
import Router from 'next/router';
import { Spin } from 'antd';
import { normalizeReturnUrl } from '../helpers/stringHelper';
import { NextJSContext } from 'next-redux-wrapper';
import { NextPageContext } from 'next';
import { IRootState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import { IUserModel } from '../typings/dto';

export interface IWithAuthProps {
    me: IUserModel;
    returnUrl?: string;
}

export interface IWithAuthState {
    loading: boolean;
}

export const withAuth = (WrappedComponent) => {
    return class extends Component<IWithAuthProps, IWithAuthState> {
        public static async getInitialProps(
            ctx: NextPageContext & NextJSContext<IRootState, IBlogAction>,
        ) {
            // const url = ctx.isServer
            //     ? ctx.req.url
            //     : !!ctx.asPath
            //     ? ctx.asPath
            //     : normalizeReturnUrl(ctx.pathname, ctx.query);

            // console.log('withAuth ==> url: ', url);

            const state = ctx.store.getState();
            // const { store } = ctx;
            const { me } = state.user;
            let pageProps = {};

            if (WrappedComponent.getInitialProps) {
                pageProps = (await WrappedComponent.getInitialProps(ctx)) || {};
            }

            return {
                ...pageProps,
                me,
                // returnUrl: url,
            };
        }

        constructor(props) {
            super(props);

            this.state = { loading: true };
        }

        public componentDidMount() {
            if (!this.props.me) {
                const returnUrl = encodeURIComponent(
                    !!this.props.returnUrl ? this.props.returnUrl : '/',
                );

                Router.push(`/signin?returnUrl=${returnUrl}`);
            }

            this.setState({ loading: false });
        }

        public render() {
            if (this.state.loading) {
                // TODO Add loading page
                return <Spin spinning={true}>Loading...</Spin>;
            }
            return <WrappedComponent {...this.props} />;
        }
    };
};
