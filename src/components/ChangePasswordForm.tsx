import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { ChangePasswordValidator } from '../helpers/ChangePasswordValidator';
import { actionTypes } from '../reducers/actionTypes';
import { RootState, UserState } from '../typings/reduxStates';

const validator: ChangePasswordValidator = new ChangePasswordValidator();

const ChangePasswordForm = () => {
    const dispatch = useDispatch();
    const { loadingChangePassword, changePasswordSuccess } = useSelector<
        RootState,
        UserState
    >((s) => s.user);
    const [currentPassword, setCurrentPassword] = useState('');
    const [
        currentPasswordErrorMessage,
        setCurrentPasswordErrorMessage,
    ] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [
        passwordConfirmErrorMessage,
        setPasswordConfirmErrorMessage,
    ] = useState('');
    // const [canChange, setCanChange] = useState(false);

    const reset = () => {
        setCurrentPassword('');
        setCurrentPasswordErrorMessage('');
        setPassword('');
        setPasswordErrorMessage('');
        setPasswordConfirm('');
        setPasswordConfirmErrorMessage('');
    };

    useEffect(() => {
        if (changePasswordSuccess) {
            reset();
        }
    }, [changePasswordSuccess]);

    const onChangeCurrentPassword = useCallback((e) => {
        const newValue = e.target.value;
        setCurrentPassword(newValue);

        const { message } = validator.checkPassword({
            password: newValue,
        });
        setCurrentPasswordErrorMessage(message);
    }, []);

    const onChangePassword = useCallback((e) => {
        const newValue = e.target.value;
        setPassword(newValue);
        const { message } = validator.checkPassword({
            password: newValue,
        });
        setPasswordErrorMessage(message);
    }, []);

    const onChangePasswordConfirm = useCallback(
        (e) => {
            const newValue = e.target.value;
            setPasswordConfirm(newValue);
            const { message } = validator.checkPasswordConfirm({
                password: password,
                passwordConfirm: newValue,
            });
            setPasswordConfirmErrorMessage(message);
        },
        [password],
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const formData = {
                currentPassword: currentPassword.trim(),
                password: password.trim(),
                passwordConfirm: passwordConfirm.trim(),
            };
            const result = validator.validate(formData);
            if (result.valid) {
                dispatch({
                    type: actionTypes.CHANGE_PASSWORD_CALL,
                    data: formData,
                });
            }
        },
        [currentPassword, dispatch, password, passwordConfirm],
    );

    return (
        <Form onSubmit={onSubmit}>
            <Form.Item
                label='Current password'
                hasFeedback={true}
                help={currentPasswordErrorMessage}
                validateStatus={
                    !currentPasswordErrorMessage ? 'success' : 'error'
                }>
                <Input.Password
                    value={currentPassword}
                    onChange={onChangeCurrentPassword}
                />
            </Form.Item>
            <Form.Item
                label='Password'
                hasFeedback={true}
                help={passwordErrorMessage}
                validateStatus={!passwordErrorMessage ? 'success' : 'error'}>
                <Input.Password value={password} onChange={onChangePassword} />
            </Form.Item>
            <Form.Item
                label='Password again'
                hasFeedback={true}
                help={passwordConfirmErrorMessage}
                validateStatus={
                    !passwordConfirmErrorMessage ? 'success' : 'error'
                }>
                <Input.Password
                    value={passwordConfirm}
                    onChange={onChangePasswordConfirm}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={loadingChangePassword}>
                    Change Password
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePasswordForm;
