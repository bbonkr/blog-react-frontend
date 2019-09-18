import React, { useEffect, useCallback, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { ContentWrapper } from '../styledComponents/Wrapper';
import { PageHeader, Button, Spin, Divider } from 'antd';
import Router from 'next/router';
import { actionTypes } from '../reducers/actionTypes';
import { IRootState, IUserState } from '../typings/reduxStates';
import { LOCAL_STORAGE_KEY_JWT } from '../typings/constant';

const SignOut: FunctionComponent = () => {
    const { me, signOutLoading, signOutReturnUrl } = useSelector<
        IRootState,
        IUserState
    >((s) => s.user);

    useEffect(() => {
        if (!me) {
            window.localStorage.removeItem(LOCAL_STORAGE_KEY_JWT);

            Router.push(signOutReturnUrl || '/');
        }
    }, [me, signOutReturnUrl]);

    const onClickNavigateToHome = useCallback(
        (e) => {
            Router.push(signOutReturnUrl || '/');
        },
        [signOutReturnUrl],
    );

    return (
        <DefaultLayout>
            <ContentWrapper>
                <PageHeader title='Sign out' />
                <Divider />
                <Spin spinning={signOutLoading}>
                    <p>
                        Click a 'Navigate to Home' button if does not navigate
                        to home.
                    </p>
                    <Button onClick={onClickNavigateToHome}>
                        Navigate to Home
                    </Button>
                </Spin>
            </ContentWrapper>
        </DefaultLayout>
    );
};

SignOut.getInitialProps = async (context) => {
    context.store.dispatch({
        type: actionTypes.SIGN_OUT_CALL,
    });

    return {};
};

export default SignOut;
