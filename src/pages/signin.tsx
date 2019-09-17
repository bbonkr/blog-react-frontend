import React, {
    useState,
    useCallback,
    useEffect,
    FunctionComponent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Form, Input, Checkbox, Button, Icon, Row, Col } from 'antd';
import Router from 'next/router';
import PropTypes from 'prop-types';
import {
    ERROR_COLOR,
    ContentWrapper,
    ErrorMessageWrapper,
} from '../styledComponents/Wrapper';
import DefaultLayout from '../components/DefaultLayout';
import { actionTypes } from '../reducers/actionTypes';
import { SignInFormValidator } from '../helpers/SignInFormValidator';
import { IRootState, IUserState } from '../typings/reduxStates';

const validator = new SignInFormValidator();

const INPUT_EMAIL_PLACEHOLDER = 'Your email Address';
const INPUT_PASSWORD_PLACEHOLDER = 'Your password';

export interface ISignInProps {
    returnUrl?: string;
}

const SignIn: FunctionComponent<ISignInProps> = ({ returnUrl }) => {
    const dispatch = useDispatch();
    const { me, signInFailMessage } = useSelector<IRootState, IUserState>(
        (s) => s.user,
    );

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        if (me && me.id) {
            console.log('returnUrl', returnUrl);
            Router.push(!!returnUrl ? returnUrl : '/');
        } else {
            setEmail('');
            setEmailError('');
            setPassword('');
            setPasswordError('');
        }
    }, [me]);

    useEffect(() => {
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
    }, []);

    const onEmailChange = useCallback((e) => {
        const value = e.target.value;
        setEmail(value);
        const { message } = validator.checkUsername({ username: value });
        setEmailError(message);
    }, []);

    const onPasswordChange = useCallback((e) => {
        const value = e.target.value;
        setPassword(value);
        const { message } = validator.checkPassword({ password: value });
        setPasswordError(message);
    }, []);

    const onRememberChange = useCallback((e) => {
        setRemember(e.target.checked);
    }, []);

    const isSubmitButtonDisabled = useCallback(() => {
        return !!(emailError || passwordError);
    }, [emailError, passwordError]);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!isSubmitButtonDisabled()) {
                setEmailError('');
                setPasswordError('');

                const { valid } = validator.validate({
                    username: email,
                    password: password,
                });

                if (valid) {
                    dispatch({
                        type: actionTypes.SIGN_IN_CALL,
                        data: {
                            email: email,
                            password: password,
                            remember: remember,
                        },
                        returnUrl: returnUrl,
                    });
                }
            }
        },
        [
            dispatch,
            email,
            isSubmitButtonDisabled,
            password,
            remember,
            returnUrl,
        ],
    );

    if (me) {
        // TODO ADD Loading page
        return <ContentWrapper>Loading.</ContentWrapper>;
    }

    return (
        <DefaultLayout>
            <ContentWrapper>
                <Row type='flex' justify='center' align='middle'>
                    <Col xs={24} sm={24} md={12}>
                        {signInFailMessage && (
                            <ErrorMessageWrapper>
                                <h4>Please check your input.</h4>
                                {signInFailMessage}
                            </ErrorMessageWrapper>
                        )}
                        <Form onSubmit={onSubmit}>
                            <Form.Item>
                                <Input
                                    type='email'
                                    style={{ width: '100%' }}
                                    value={email}
                                    onChange={onEmailChange}
                                    placeholder={INPUT_EMAIL_PLACEHOLDER}
                                    prefix={
                                        <Icon
                                            type='mail'
                                            style={{
                                                color: 'rgba(0,0,0,0.25)',
                                            }}
                                        />
                                    }
                                />
                                {emailError && (
                                    <span>
                                        <Icon
                                            type='alert'
                                            style={{ color: ERROR_COLOR }}
                                        />
                                        <span style={{ color: ERROR_COLOR }}>
                                            {emailError}
                                        </span>
                                    </span>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Input.Password
                                    style={{ width: '100%' }}
                                    value={password}
                                    onChange={onPasswordChange}
                                    placeholder={INPUT_PASSWORD_PLACEHOLDER}
                                    prefix={
                                        <Icon
                                            type='lock'
                                            style={{
                                                color: 'rgba(0,0,0,0.25)',
                                            }}
                                        />
                                    }
                                />
                                {passwordError && (
                                    <span>
                                        <Icon
                                            type='alert'
                                            style={{ color: ERROR_COLOR }}
                                        />
                                        <span style={{ color: ERROR_COLOR }}>
                                            {passwordError}
                                        </span>
                                    </span>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Checkbox
                                    checked={remember}
                                    onChange={onRememberChange}>
                                    Remember me
                                </Checkbox>
                                <Link href='/requestresetpassword'>
                                    <a style={{ float: 'right' }}>
                                        Reset my password
                                    </a>
                                </Link>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    style={{ width: '100%' }}
                                    disabled={isSubmitButtonDisabled()}>
                                    Log in
                                </Button>
                                {'Or '}
                                <Link href='/signup'>
                                    <a>Register</a>
                                </Link>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </ContentWrapper>
        </DefaultLayout>
    );
};

SignIn.getInitialProps = async (context) => {
    let url = context.query.returnUrl;

    const state = context.store.getState();
    const { returnUrl } = state.settings;
    if (!url) {
        url = !!returnUrl ? returnUrl : '/';
    }

    context.store.dispatch({
        type: actionTypes.SIGN_IN_PREPARE,
    });

    return {
        doNotSetCurrentUrl: true,
        returnUrl: url,
    };
};

SignIn.propTypes = {
    returnUrl: PropTypes.string,
};

export default SignIn;
