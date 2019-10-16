import {
    all,
    fork,
    call,
    delay,
    takeLatest,
    put,
    actionChannel,
    throttle,
} from 'redux-saga/effects';
import { http } from './httpHelper';
import { actionTypes } from '../reducers/actionTypes';
import { IBlogAction } from '../typings/IBlogAction';
import { ISigninResult, IJsonResult, IUserModel } from '../typings/dto';
import { AxiosResponse } from 'axios';

function getMyInfoApi() {
    return http().get('/me');
}

function* getMyInfo(action: IBlogAction) {
    try {
        const result: AxiosResponse<IJsonResult<IUserModel>> = yield call(
            getMyInfoApi,
        );

        const { success, data, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.ME_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.ME_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.ME_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchGetMyInfo() {
    yield takeLatest(actionTypes.ME_CALL, getMyInfo);
}

function signInApi(data) {
    return http().post('/account/signin', data);
}

function* signIn(action) {
    try {
        const { email, password, returnUrl } = action.data;
        const result: AxiosResponse<IJsonResult<ISigninResult>> = yield call(
            signInApi,
            {
                username: email,
                password: password,
            },
        );

        // console.debug(result.data);

        const { success, data, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.SIGN_IN_DONE,
                data: {
                    ...data,
                    returnUrl: returnUrl,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.SIGN_IN_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.SIGN_IN_FAIL,
            error: e,
            message: (e.response && e.response.data) || e.message,
        });
    }
}

function* watchSignIn() {
    yield takeLatest(actionTypes.SIGN_IN_CALL, signIn);
}

function signOutApi() {
    return http().post('/account/signout', {});
}

function* signOut(action) {
    try {
        const result: AxiosResponse<IJsonResult<string>> = yield call(
            signOutApi,
        );
        const { success, data, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.SIGN_OUT_DONE,
                data: {
                    message: data,
                    returnUrl: action.returnUrl,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.SIGN_OUT_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.SIGN_OUT_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchSignOut() {
    yield takeLatest(actionTypes.SIGN_OUT_CALL, signOut);
}

function signUpApi(formData) {
    return http().post('/account/register', formData);
}

function* signUp(action) {
    try {
        const result: AxiosResponse<IJsonResult<ISigninResult>> = yield call(
            signUpApi,
            action.data,
        );

        const { success, data, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.SIGN_UP_DONE,
                data: data, // {user, token }
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.SIGN_UP_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.SIGN_UP_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchSignUp() {
    yield takeLatest(actionTypes.SIGN_UP_CALL, signUp);
}

function changePasswordApi(formData) {
    return http().patch('/account/changepassword', formData);
}

function* changePassword(action) {
    try {
        const result: AxiosResponse<IJsonResult<IUserModel>> = yield call(
            changePasswordApi,
            action.data,
        );
        const { success, data, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.CHANGE_PASSWORD_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.CHANGE_PASSWORD_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.CHANGE_PASSWORD_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchChangePassword() {
    yield takeLatest(actionTypes.CHANGE_PASSWORD_CALL, changePassword);
}

function changeInfoApi(formData) {
    return http().patch('/account/info', formData);
}

function* changeInfo(action) {
    try {
        const result: AxiosResponse<IJsonResult<IUserModel>> = yield call(
            changeInfoApi,
            action.data,
        );
        const { success, data, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.CHANGE_INFO_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.CHANGE_INFO_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.CHANGE_INFO_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchChangeInfo() {
    yield takeLatest(actionTypes.CHANGE_INFO_CALL, changeInfo);
}

function verifyEmailApi(formData) {
    return http().post('/account/verifyemail', formData);
}

function* verifyEmail(action) {
    try {
        const result: AxiosResponse<IJsonResult<IUserModel>> = yield call(
            verifyEmailApi,
            action.data,
        );
        const { success, data, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.VERIFY_EMAIL_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.VERIFY_EMAIL_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.VERIFY_EMAIL_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* wacthVerifyEmail() {
    yield takeLatest(actionTypes.VERIFY_EMAIL_CALL, verifyEmail);
}

function requestVerifyEmaiApi() {
    return http().post('/account/requestverifyemail', {});
}

function* requestVerifyEmail(action) {
    try {
        const result: AxiosResponse<IJsonResult<any>> = yield call(
            requestVerifyEmaiApi,
        );
        const { success, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.REQUEST_VERIFY_EMAIL_DONE,
                message: message,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.REQUEST_VERIFY_EMAIL_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.REQUEST_VERIFY_EMAIL_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchMakeVerifyEmail() {
    yield takeLatest(actionTypes.REQUEST_VERIFY_EMAIL_CALL, requestVerifyEmail);
}

function requestResetPasswordApi(formData) {
    return http().post('/account/requestresetpassword', formData);
}

function* requestResetPassword(action) {
    try {
        const result: AxiosResponse<IJsonResult<any>> = yield call(
            requestResetPasswordApi,
            action.data,
        );
        const { success, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.REQUEST_RESET_PASSWORD_DONE,
                message: message,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.REQUEST_RESET_PASSWORD_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.REQUEST_RESET_PASSWORD_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchRequestResetPassword() {
    yield takeLatest(
        actionTypes.REQUEST_RESET_PASSWORD_CALL,
        requestResetPassword,
    );
}

function resetPasswordApi(formData) {
    return http().post('/user/resetpassword', formData);
}

function* resetPassword(action) {
    try {
        const result: AxiosResponse<IJsonResult<any>> = yield call(
            resetPasswordApi,
            action.data,
        );
        const { success, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.RESET_PASSWORD_DONE,
                message: message,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.RESET_PASSWORD_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.RESET_PASSWORD_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchResetPassword() {
    yield takeLatest(actionTypes.RESET_PASSWORD_CALL, resetPassword);
}

function unregisterApi(formData) {
    return http().post('/account/unregister', formData);
}

function* unregister(action) {
    try {
        const result: AxiosResponse<IJsonResult<any>> = yield call(
            unregisterApi,
            action.data,
        );
        const { success, message } = result.data;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.UNREGISTER_DONE,
                message: message,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.UNREGISTER_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.UNREGISTER_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchUnregister() {
    yield takeLatest(actionTypes.UNREGISTER_CALL, unregister);
}

export default function* postSaga() {
    yield all([
        fork(watchGetMyInfo),
        fork(watchSignIn),
        fork(watchSignOut),
        fork(watchSignUp),
        fork(watchChangePassword),
        fork(watchChangeInfo),
        fork(wacthVerifyEmail),
        fork(watchMakeVerifyEmail),
        fork(watchRequestResetPassword),
        fork(watchResetPassword),
        fork(watchUnregister),
    ]);
}
