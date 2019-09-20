import React, {
    useState,
    useEffect,
    useCallback,
    FunctionComponent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import Router from 'next/router';
import { ErrorMessageWrapper } from '../styledComponents/Wrapper';
import { actionTypes } from '../reducers/actionTypes';
import { SignUpFormValidator } from '../helpers/SignUpFormValidator';
import { IRootState, IUserState } from '../typings/reduxStates';

const formValidator = new SignUpFormValidator();

const PLACEHOLDER_EMAIL = 'Input your email address';
const PLACEHOLDER_PASSWORD = 'Input your password';
const PLACEHOLDER_PASSWORD_CONFIRM = 'Input your password again';
const PLACEHOLDER_USERNAME = 'Input your name name';
const PLACEHOLDER_DISPLAYNAME = 'Input your display name';

const LABEL_EMAIL = 'E-mail';
const LABEL_PASSWORD = 'Password';
const LABEL_PASSWORD_CONFIRM = 'Confirm Password';
const LABEL_USERNAME = 'User name';
const LABEL_DISPLAYNAME = 'Display name';

const SignUpForm: FunctionComponent = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [
        passwordConfirmErrorMessage,
        setPasswordConfirmErrorMessage,
    ] = useState('');
    const [username, setUsername] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState('');

    const [agreement, setAgreement] = useState(false);
    // const [agreementErrorMessage, setAgreementErrorMessage] = useState('');

    // const [errorMessage, setErrorMessage] = useState('');
    // const [confirmDirty, setConfirmDirty] = useState(false);
    const {
        me,
        signUpInProcess,
        signUpFailMessage,
        signUpSuccess,
    } = useSelector<IRootState, IUserState>((s) => s.user);

    useEffect(() => {
        if (signUpSuccess) {
            // Router.push('/me');
            Router.push('/signin');
        }
    }, [signUpSuccess]);

    const onChangeEmail = useCallback((e) => {
        const newValue = e.target.value;
        setEmail(newValue);

        const { message } = formValidator.checkEmail({ email: newValue });
        setEmailErrorMessage(message);
    }, []);

    const onChangePassword = useCallback(
        (e) => {
            const newValue = e.target.value;
            setPassword(newValue);

            const { message } = formValidator.checkPassword({
                password: newValue,
            });
            setPasswordErrorMessage(message);
        },
        [passwordConfirm],
    );

    const onChangePasswordConfirm = useCallback(
        (e) => {
            const newValue = e.target.value;
            setPasswordConfirm(newValue);

            const { message } = formValidator.checkPasswordConfirm({
                password: password,
                passwordConfirm: newValue,
            });
            setPasswordConfirmErrorMessage(message);
        },
        [password],
    );

    const onChangeUsername = useCallback((e) => {
        const newValue = e.target.value;
        setUsername(newValue);

        const { message } = formValidator.checkUsername({
            username: newValue,
        });
        setUsernameErrorMessage(message);
    }, []);

    const onChangeDisplayName = useCallback((e) => {
        const newValue = e.target.value;
        setDisplayName(newValue);
        const { message } = formValidator.checkDisplayName({
            displayName: newValue,
        });
        setDisplayNameErrorMessage(message);
    }, []);

    const onChangeAgreement = useCallback((e) => {
        setAgreement(e.target.checked);
    }, []);

    const isFormValid = useCallback(() => {
        const formValues = {
            email,
            password,
            passwordConfirm,
            username,
            displayName,
        };
        const { valid } = formValidator.validate(formValues);
        return valid && agreement;
    }, [email, password, passwordConfirm, username, displayName, agreement]);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const formValues = {
                email,
                password,
                passwordConfirm,
                username,
                displayName,
            };
            const { valid } = formValidator.validate(formValues);

            // console.log('valid: ', valid);
            // console.log('messages: ', messages);

            if (valid) {
                dispatch({
                    type: actionTypes.SIGN_UP_CALL,
                    data: formValues,
                });
            }
        },
        [email, password, passwordConfirm, username, displayName, dispatch],
    );

    if (me) {
        return <div>Loading ...</div>;
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Item
                label={LABEL_EMAIL}
                hasFeedback={true}
                validateStatus={!emailErrorMessage ? 'success' : 'error'}
                help={emailErrorMessage}>
                <Input
                    type='email'
                    value={email}
                    onChange={onChangeEmail}
                    placeholder={PLACEHOLDER_EMAIL}
                />
            </Form.Item>
            <Form.Item
                label={LABEL_PASSWORD}
                hasFeedback={true}
                validateStatus={!passwordErrorMessage ? 'success' : 'error'}
                help={passwordErrorMessage}>
                <Input.Password
                    value={password}
                    onChange={onChangePassword}
                    placeholder={PLACEHOLDER_PASSWORD}
                />
            </Form.Item>
            <Form.Item
                label={LABEL_PASSWORD_CONFIRM}
                hasFeedback={true}
                validateStatus={
                    !passwordConfirmErrorMessage ? 'success' : 'error'
                }
                help={passwordConfirmErrorMessage}>
                <Input.Password
                    value={passwordConfirm}
                    onChange={onChangePasswordConfirm}
                    placeholder={PLACEHOLDER_PASSWORD_CONFIRM}
                />
            </Form.Item>
            <Form.Item
                label={LABEL_USERNAME}
                hasFeedback={true}
                validateStatus={!usernameErrorMessage ? 'success' : 'error'}
                help={usernameErrorMessage}>
                <Input
                    value={username}
                    onChange={onChangeUsername}
                    placeholder={PLACEHOLDER_USERNAME}
                />
            </Form.Item>
            <Form.Item
                label={LABEL_DISPLAYNAME}
                hasFeedback={true}
                validateStatus={!displayNameErrorMessage ? 'success' : 'error'}
                help={displayNameErrorMessage}>
                <Input
                    value={displayName}
                    onChange={onChangeDisplayName}
                    placeholder={PLACEHOLDER_DISPLAYNAME}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox checked={agreement} onChange={onChangeAgreement}>
                    I have read the agreement
                </Checkbox>
                {!!signUpFailMessage && (
                    <ErrorMessageWrapper>
                        {signUpFailMessage}
                    </ErrorMessageWrapper>
                )}
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    disabled={!isFormValid()}
                    loading={signUpInProcess}>
                    Sign up
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignUpForm;
