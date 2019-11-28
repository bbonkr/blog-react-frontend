import React, { useEffect, useCallback, FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { PageHeader, Button, Form, Spin, Alert, Divider } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import { ContentWrapper } from "../styledComponents/Wrapper";
import Router from "next/router";
import { actionTypes } from "../reducers/actionTypes";
import { RootState, UserState } from "../typings/reduxStates";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { BaseAction } from "../typings/BaseAction";
import { PageProps } from "../typings/PageProps";
import Head from "next/head";
import { appOptions } from "../config/appOptions";

export interface VerifyEmailPageProps extends PageProps {
    email: string;
    code: string;
}

const VerifyEmail: FunctionComponent<VerifyEmailPageProps> = ({
    email,
    code
}) => {
    const dispatch = useDispatch();

    // TODO 로그인을 하지 않은 상태이면?
    const {
        verifyEmailInfo,
        verifyEmailLoading,
        verifyEmailErrorReason
    } = useSelector<RootState, UserState>(s => s.user);

    useEffect(() => {
        if (!!code) {
            dispatch({
                type: actionTypes.VERIFY_EMAIL_CALL,
                data: {
                    email: email,
                    code: code
                }
            });
        }
    }, [code, dispatch, email]);

    const onClickGoToHome = useCallback(() => {
        Router.push("/");
    }, []);

    const onSubmitRetry = useCallback(e => {
        e.preventDefault();
    }, []);

    return (
        <>
            <Head>
                <title>{`Verify e-mail | ${appOptions.title}`}</title>
            </Head>
            <DefaultLayout>
                <ContentWrapper>
                    <PageHeader title="Verify Email" />
                    <Divider />
                    <Spin spinning={verifyEmailLoading}>
                        <Alert
                            message={
                                !!verifyEmailErrorReason ? "Warning" : "Success"
                            }
                            type={
                                !!verifyEmailErrorReason ? "warning" : "success"
                            }
                            showIcon={true}
                            description={
                                !!verifyEmailErrorReason ? (
                                    <div>
                                        {" "}
                                        <div>{verifyEmailErrorReason}</div>{" "}
                                        <Form onSubmit={onSubmitRetry}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Retry
                                            </Button>
                                        </Form>
                                    </div>
                                ) : (
                                    <div>
                                        <div>{"Your email was verified."}</div>
                                        <div>
                                            <Button onClick={onClickGoToHome}>
                                                Go to home
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }
                        />
                    </Spin>
                </ContentWrapper>
            </DefaultLayout>
        </>
    );
};

VerifyEmail.getInitialProps = async (
    context: NextPageContext & NextJSContext<RootState, BaseAction>
): Promise<VerifyEmailPageProps> => {
    const email: string = context.query.email as string;
    const code: string = context.query.email as string;

    return { email, code };
};

export default VerifyEmail;
