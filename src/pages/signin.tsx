import React, {
    useState,
    useCallback,
    useEffect,
    FunctionComponent
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
    Form,
    Input,
    Checkbox,
    Button,
    Icon,
    Row,
    Col,
    PageHeader,
    Divider
} from "antd";
import Router from "next/router";
import {
    ERROR_COLOR,
    ContentWrapper,
    ErrorMessageWrapper
} from "../styledComponents/Wrapper";
import DefaultLayout from "../components/DefaultLayout";
import { actionTypes } from "../reducers/actionTypes";
import { SignInFormValidator } from "../helpers/SignInFormValidator";
import { RootState, UserState, SettingState } from "../typings/reduxStates";
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

const validator = new SignInFormValidator();

const INPUT_EMAIL_PLACEHOLDER = "Username or email address";
const INPUT_PASSWORD_PLACEHOLDER = "Your password";

export interface SignInPageProps extends PageProps {
    returnUrl?: string;
}

const SignIn: FunctionComponent<SignInPageProps> = ({ returnUrl }) => {
    const dispatch = useDispatch();
    const { me, signInFailMessage, token } = useSelector<RootState, UserState>(
        s => s.user
    );
    const { currentUrl } = useSelector<RootState, SettingState>(
        s => s.settings
    );

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        if (me && me.id) {
            // console.log('returnUrl', returnUrl);
            let storage: Storage;
            if (remember) {
                storage = window.localStorage;
            } else {
                storage = window.sessionStorage;
            }

            const jwt = storage.getItem(LOCAL_STORAGE_KEY_JWT);
            if (!jwt || jwt !== token) {
                storage.setItem(LOCAL_STORAGE_KEY_JWT, token);
                storage.setItem(
                    LOCAL_STORAGE_KEY_SAVED_AT,
                    new Date().getUTCMilliseconds().toString()
                );
            }

            Router.push(returnUrl || currentUrl || "/");
        } else {
            setEmail("");
            setEmailError("");
            setPassword("");
            setPasswordError("");
        }
    }, [me, token, currentUrl]);

    useEffect(() => {
        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
    }, []);

    const onEmailChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            const value = e.target.value;
            setEmail(value);
            const { message } = validator.checkUsername({ username: value });
            setEmailError(message);
        },
        []
    );

    const onPasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            const value = e.target.value;
            setPassword(value);
            const { message } = validator.checkPassword({ password: value });
            setPasswordError(message);
        },
        []
    );

    const onRememberChange = useCallback(e => {
        setRemember(e.target.checked);
    }, []);

    const isSubmitButtonDisabled = useCallback(() => {
        return !!(emailError || passwordError);
    }, [emailError, passwordError]);

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>): void => {
            e.preventDefault();

            if (!isSubmitButtonDisabled()) {
                setEmailError("");
                setPasswordError("");

                const { valid } = validator.validate({
                    username: email,
                    password: password
                });

                if (valid) {
                    dispatch({
                        type: actionTypes.SIGN_IN_CALL,
                        data: {
                            email: email,
                            password: password,
                            remember: remember,
                            returnUrl: returnUrl
                        }
                    });
                }
            }
        },
        [dispatch, email, isSubmitButtonDisabled, password, remember, returnUrl]
    );

    if (me) {
        // TODO ADD Loading page
        return <ContentWrapper>Loading.</ContentWrapper>;
    }

    return (
        <>
            <Head>
                <title>{`Sign in | ${appOptions.title}`}</title>
            </Head>
            <DefaultLayout>
                <ContentWrapper>
                    <PageHeader title="Sign in" />
                    <Divider />
                    <Row type="flex" justify="center" align="middle">
                        <Col xs={24} sm={24} md={12}>
                            {signInFailMessage && (
                                <ErrorMessageWrapper>
                                    <h4>Please check your input.</h4>
                                    {signInFailMessage}
                                </ErrorMessageWrapper>
                            )}
                            <Form onSubmit={onSubmit}>
                                <Form.Item
                                    hasFeedback={true}
                                    help={emailError}
                                    validateStatus={
                                        !emailError ? "success" : "error"
                                    }
                                >
                                    <Input
                                        type="text"
                                        style={{ width: "100%" }}
                                        value={email}
                                        onChange={onEmailChange}
                                        placeholder={INPUT_EMAIL_PLACEHOLDER}
                                        prefix={
                                            <Icon
                                                type="mail"
                                                style={{
                                                    color: "rgba(0,0,0,0.25)"
                                                }}
                                            />
                                        }
                                    />
                                    {/* {emailError && (
                                    <span>
                                        <Icon
                                            type='alert'
                                            style={{ color: ERROR_COLOR }}
                                        />
                                        <span style={{ color: ERROR_COLOR }}>
                                            {emailError}
                                        </span>
                                    </span>
                                )} */}
                                </Form.Item>
                                <Form.Item
                                    hasFeedback={true}
                                    help={passwordError}
                                    validateStatus={
                                        !passwordError ? "success" : "error"
                                    }
                                >
                                    <Input.Password
                                        type="password"
                                        style={{ width: "100%" }}
                                        value={password}
                                        onChange={onPasswordChange}
                                        placeholder={INPUT_PASSWORD_PLACEHOLDER}
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: "rgba(0,0,0,0.25)"
                                                }}
                                            />
                                        }
                                    />
                                    {/* {passwordError && (
                                    <span>
                                        <Icon
                                            type='alert'
                                            style={{ color: ERROR_COLOR }}
                                        />
                                        <span style={{ color: ERROR_COLOR }}>
                                            {passwordError}
                                        </span>
                                    </span>
                                )} */}
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox
                                        checked={remember}
                                        onChange={onRememberChange}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link href="/requestresetpassword">
                                        <a style={{ float: "right" }}>
                                            Reset my password
                                        </a>
                                    </Link>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: "100%" }}
                                        disabled={isSubmitButtonDisabled()}
                                    >
                                        Log in
                                    </Button>
                                    {"Or "}
                                    <Link href="/signup">
                                        <a>Register</a>
                                    </Link>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </ContentWrapper>
            </DefaultLayout>
        </>
    );
};

SignIn.getInitialProps = async (
    context: NextPageContext & NextJSContext<RootState, BaseAction>
): Promise<SignInPageProps> => {
    let url = context.query.returnUrl as string;

    const state = context.store.getState();
    const { currentUrl } = state.settings;
    if (!url) {
        url = !!currentUrl ? currentUrl : "/";
    }

    context.store.dispatch({
        type: actionTypes.SIGN_IN_PREPARE
    });

    return {
        doNotSetCurrentUrl: true,
        returnUrl: url
    };
};

export default SignIn;
