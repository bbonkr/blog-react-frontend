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
import {http} from './httpHelper';
import { actionTypes } from 'reducers/actionTypes';


function getMyInfoApi() {
    return http.get('/me');
}

function* getMyInfo(action) {
    try {
        const result = yield call(getMyInfoApi);
        yield put({
            type: actionTypes.ME_DONE,
            data: result.data,
        });
    } catch (e) {
        // console.error(e);
        yield put({
            type: actionTypes.ME_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchGetMyInfo() {
    yield takeLatest(actionTypes.ME_CALL, getMyInfo);
}

function signInApi(data) {

    return http.post('/account/signin', data);
}

function* signIn(action) {
    try {
        const result = yield call(signInApi, action.data);

        console.log('response: ==> ', result);

        yield put({
            type: actionTypes.SIGN_IN_DONE,
            data: result.data,
            returnUrl: action.returnUrl,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.SIGN_IN_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchSignIn() {
    yield takeLatest(actionTypes.SIGN_IN_CALL, signIn);
}

function signOutApi() {
    return http.post('/account/signout', {});
}

function* signOut(action) {
    try {
        const result = yield call(signOutApi);
        yield put({
            type: actionTypes.SIGN_OUT_DONE,
            data: result.data,
            returnUrl: action.returnUrl,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.SIGN_OUT_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchSignOut() {
    yield takeLatest(actionTypes.SIGN_OUT_CALL, signOut);
}

function signUpApi(formData) {
    return http.post('/user', formData);
}

function* signUp(action) {
    try {
        const result = yield call(signUpApi, action.data);
        yield put({
            type: actionTypes.SIGN_UP_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.SIGN_UP_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchSignUp() {
    yield takeLatest(actionTypes.SIGN_UP_CALL, signUp);
}

function changePasswordApi(formData) {
    return http.patch('/user/changepassword', formData);
}

function* changePassword(action) {
    try {
        const result = yield call(changePasswordApi, action.data);
        yield put({
            type: actionTypes.CHANGE_PASSWORD_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.CHANGE_PASSWORD_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchChangePassword() {
    yield takeLatest(actionTypes.CHANGE_PASSWORD_CALL, changePassword);
}

function changeInfoApi(formData) {
    return http.patch('/user/info', formData);
}

function* changeInfo(action) {
    try {
        const result = yield call(changeInfoApi, action.data);
        yield put({
            type: actionTypes.CHANGE_INFO_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.CHANGE_INFO_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchChangeInfo() {
    yield takeLatest(actionTypes.CHANGE_INFO_CALL, changeInfo);
}

function verifyEmailApi(formData) {
    return http.post('/user/verifyemail', formData);
}

function* verifyEmail(action) {
    try {
        const result = yield call(verifyEmailApi, action.data);
        yield put({
            type: actionTypes.VERIFY_EMAIL_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.VERIFY_EMAIL_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* wacthVerifyEmail() {
    yield takeLatest(actionTypes.VERIFY_EMAIL_CALL, verifyEmail);
}

function makeVerifyEmaiApi() {
    return http.post('/user/makeverifyemail', {});
}

function* makeVerifyEmail(action) {
    try {
        const result = yield call(makeVerifyEmaiApi);
        yield put({
            type: actionTypes.MAKE_VERIFY_EMAIL_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.MAKE_VERIFY_EMAIL_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchMakeVerifyEmail() {
    yield takeLatest(actionTypes.MAKE_VERIFY_EMAIL_CALL, makeVerifyEmail);
}

function requestResetPasswordApi(formData) {
    return http.post('/user/requestresetpassword', formData);
}

function* requestResetPassword(action) {
    try {
        const result = yield call(requestResetPasswordApi, action.data);
        yield put({
            type: actionTypes.REQUEST_RESET_PASSWORD_DONE,
            data: result,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.REQUEST_RESET_PASSWORD_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchRequestResetPassword() {
    yield takeLatest(actionTypes.REQUEST_RESET_PASSWORD_CALL, requestResetPassword);
}

function resetPasswordApi(formData) {
    return http.post('/user/resetpassword', formData);
}

function* resetPassword(action) {
    try {
        const result = yield call(resetPasswordApi, action.data);
        yield put({
            type: actionTypes.RESET_PASSWORD_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.RESET_PASSWORD_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchResetPassword() {
    yield takeLatest(actionTypes.RESET_PASSWORD_CALL, resetPassword);
}

function unregisterApi(formData) {
    return http.post('/user/unregister', formData);
}

function* unregister(action) {
    try {
        const result = yield call(unregisterApi, action.data);
        yield put({
            type: actionTypes.UNREGISTER_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.UNREGISTER_FAIL,
            error: e,
            reason: e.response && e.response.data,
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
