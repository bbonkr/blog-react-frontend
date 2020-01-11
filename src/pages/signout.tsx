import React, { useEffect, useCallback, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { ContentWrapper } from "../styledComponents/Wrapper";
import { PageHeader, Button, Spin, Divider } from "antd";
import Router from "next/router";
import { actionTypes } from "../reducers/actionTypes";
import { RootState, UserState } from "../typings/reduxStates";
import {
    LOCAL_STORAGE_KEY_JWT,
    LOCAL_STORAGE_KEY_SAVED_AT
} from "../typings/constant";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { BaseAction } from "../typings/BaseAction";
import { PageProps } from "../typings/PageProps";
import Head from "next/head";
import { appOptions } from "../config/appOptions";

const SignOut: FunctionComponent = () => {
    const { me, signOutLoading, signOutReturnUrl } = useSelector<
        RootState,
        UserState
    >(s => s.user);

    useEffect(() => {
        window.sessionStorage.removeItem(LOCAL_STORAGE_KEY_JWT);
        window.localStorage.removeItem(LOCAL_STORAGE_KEY_JWT);
        window.sessionStorage.removeItem(LOCAL_STORAGE_KEY_SAVED_AT);
        window.localStorage.removeItem(LOCAL_STORAGE_KEY_SAVED_AT);
    }, []);

    useEffect(() => {
        if (!me) {
            Router.push(signOutReturnUrl || "/");
        }
    }, [me, signOutReturnUrl]);

    const onClickNavigateToHome = useCallback(
        e => {
            Router.push(signOutReturnUrl || "/");
        },
        [signOutReturnUrl]
    );

    return (
        <>
            <Head>
                <title>{`Sign out | ${appOptions.title}`}</title>
            </Head>
            <DefaultLayout>
                <ContentWrapper>
                    <PageHeader title="Sign out" />
                    <Divider />
                    <Spin spinning={signOutLoading}>
                        <p>
                            Click a 'Navigate to Home' button if does not
                            navigate to home.
                        </p>
                        <Button onClick={onClickNavigateToHome}>
                            Navigate to Home
                        </Button>
                    </Spin>
                </ContentWrapper>
            </DefaultLayout>
        </>
    );
};

SignOut.getInitialProps = async (
    context: NextPageContext & NextJSContext<RootState, BaseAction>
): Promise<PageProps> => {
    context.store.dispatch({
        type: actionTypes.SIGN_OUT_CALL
    });

    return {};
};

export default SignOut;
