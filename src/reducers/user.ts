import produce from 'immer';
import { ShowNotification } from '../components/ShowNotification';
import { actionTypes } from './actionTypes';
import { IUserState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import { UserHandler } from './hanlders/user.handler';

export const initialState: IUserState = {
    me: null,
    signInFailMessage: '',
    signInInProcess: false,
    token: '',

    // sign Up
    signUpFailMessage: '',
    signUpInProcess: false,
    signUpSuccess: false,

    loadingChangePassword: false,
    changePasswordSuccess: false,

    loadingChangeInfo: false,
    changeInfoSuccess: false,

    // sign out
    signOutLoading: false,
    signOutErrorReason: '',
    signOutReturnUrl: '',

    // verify email
    verifyEmailInfo: {},
    verifyEmailLoading: false,
    verifyEmailErrorReason: '',

    // make verify email code
    makeVerifyEmailLoading: false,
    makeVerifyEmailErrorReason: '',

    // request reset password
    requestResetPasswordLoading: false,
    requestResetPasswordErrorReason: '',

    // reset password
    resetPasswordLoading: false,
    resetPasswordErrorReason: '',
    resetPasswordSuccess: false,

    // unregister
    unregisterLoading: false,
    unregisterErrorReason: '',
    unregisterSuccess: false,
};

const reducer = (state: IUserState = initialState, action: IBlogAction) =>
    produce(state, (draft) => {
        // console.log('\u001b[34mdispatch ==> \u001b[0m', action.type);

        const handler = new UserHandler({ draft, action });

        switch (action.type) {
            case actionTypes.SIGN_IN_PREPARE:
                draft.signInFailMessage = '';
                break;
            case actionTypes.SIGN_IN_CALL:
                draft.signInInProcess = true;
                break;
            case actionTypes.SIGN_IN_DONE:
                // draft.signInInProcess = false;
                // draft.me = action.data;
                handler.signInDone();
                break;
            case actionTypes.SIGN_IN_FAIL:
                draft.signInInProcess = false;
                draft.signInFailMessage = action.message;
                break;
            case actionTypes.SIGN_OUT_CALL:
                draft.signOutLoading = true;
                break;
            case actionTypes.SIGN_OUT_DONE:
                // draft.me = null;
                // // Router.push(!!action.returnUrl ? action.returnUrl : '/');
                // draft.signOutLoading = false;
                // draft.signOutReturnUrl = !!action.returnUrl
                //     ? action.returnUrl
                //     : '/';
                handler.signOutDone();
                break;
            case actionTypes.SIGN_OUT_FAIL:
                draft.signOutLoading = false;
                draft.signOutErrorReason = action.message;
                break;
            case actionTypes.ME_CALL:
                break;
            case actionTypes.ME_DONE:
                // draft.me = action.data;
                handler.meDone();
                break;
            case actionTypes.ME_FAIL:
                break;
            case actionTypes.SIGN_UP_CALL:
                // draft.signUpFailMessage = '';
                // draft.signUpInProcess = true;
                // draft.signUpSuccess = false;
                handler.signUpCall();
                break;
            case actionTypes.SIGN_UP_DONE:
                // draft.signUpInProcess = false;
                // // draft.me = action.data;
                // draft.signUpSuccess = true;
                handler.signUpDone();
                break;
            case actionTypes.SIGN_UP_FAIL:
                // draft.signUpInProcess = false;
                // draft.signUpSuccess = false;
                // draft.signUpFailMessage = action.message;
                handler.signUpFail();
                break;
            case actionTypes.CHANGE_PASSWORD_CALL:
                draft.loadingChangePassword = true;
                draft.changePasswordSuccess = false;
                break;
            case actionTypes.CHANGE_PASSWORD_DONE:
                draft.loadingChangePassword = false;
                draft.changePasswordSuccess = true;
                ShowNotification({
                    title: 'Your password was Changed.',
                    message: '',
                    onClick: null,
                    icon: null,
                });
                break;
            case actionTypes.CHANGE_PASSWORD_FAIL:
                draft.loadingChangePassword = false;
                draft.changePasswordSuccess = false;
                ShowNotification({
                    title: 'Fail to change a password.',
                    message: action.message,
                    onClick: null,
                    icon: null,
                });
                break;
            case actionTypes.CHANGE_INFO_CALL:
                draft.loadingChangeInfo = true;
                draft.changeInfoSuccess = false;
                break;
            case actionTypes.CHANGE_INFO_DONE:
                // draft.loadingChangeInfo = false;
                // draft.changeInfoSuccess = true;
                // draft.me = action.data;
                handler.changeInfoDone();
                break;
            case actionTypes.CHANGE_INFO_FAIL:
                draft.loadingChangeInfo = false;
                draft.changeInfoSuccess = false;
                ShowNotification({
                    title: 'Fail to change account information',
                    message: action.message,
                    icon: null,
                    onClick: null,
                });
                break;

            case actionTypes.VERIFY_EMAIL_CALL:
                draft.verifyEmailLoading = true;
                draft.verifyEmailInfo = {};
                draft.verifyEmailErrorReason = '';
                break;
            case actionTypes.VERIFY_EMAIL_DONE:
                draft.verifyEmailInfo = action.data;
                draft.verifyEmailLoading = false;

                if (draft.me) {
                    draft.me.isEmailConfirmed = true;
                }
                break;
            case actionTypes.VERIFY_EMAIL_FAIL:
                draft.verifyEmailErrorReason = action.message;
                draft.verifyEmailLoading = false;
                break;

            case actionTypes.REQUEST_VERIFY_EMAIL_CALL:
                // draft.makeVerifyEmailErrorReason = '';
                // draft.makeVerifyEmailLoading = true;
                handler.makeVerifyEmailCall();
                break;
            case actionTypes.REQUEST_VERIFY_EMAIL_DONE:
                // draft.makeVerifyEmailLoading = false;
                handler.makeVerifyEmailDone();
                break;
            case actionTypes.REQUEST_VERIFY_EMAIL_FAIL:
                // draft.makeVerifyEmailErrorReason = action.message;
                // draft.makeVerifyEmailLoading = false;
                // ShowNotification({
                //     title: 'Fail to make verify email code.',
                //     message: action.message,
                //     icon: null,
                //     onClick: null,
                // });
                handler.makeVerifyEmailFail();
                break;

            case actionTypes.REQUEST_RESET_PASSWORD_CALL:
                draft.requestResetPasswordLoading = true;
                draft.requestResetPasswordErrorReason = '';
                break;
            case actionTypes.REQUEST_RESET_PASSWORD_DONE:
                draft.requestResetPasswordLoading = false;
                draft.requestResetPasswordErrorReason = '';
                ShowNotification({
                    title: 'Sent email that Reset password link.',
                    message: 'Please check your mailbox.',
                    icon: null,
                    onClick: null,
                });
                break;
            case actionTypes.REQUEST_RESET_PASSWORD_FAIL:
                draft.requestResetPasswordLoading = false;
                draft.requestResetPasswordErrorReason = action.message;
                ShowNotification({
                    title: 'Fail a request to reset password.',
                    message: action.message,
                    icon: null,
                    onClick: null,
                });
                break;

            case actionTypes.RESET_PASSWORD_CALL:
                draft.resetPasswordLoading = true;
                draft.resetPasswordErrorReason = '';
                draft.resetPasswordSuccess = false;
                break;
            case actionTypes.RESET_PASSWORD_DONE:
                draft.resetPasswordLoading = false;
                draft.resetPasswordErrorReason = '';
                draft.resetPasswordSuccess = true;
                break;
            case actionTypes.RESET_PASSWORD_FAIL:
                draft.resetPasswordLoading = false;
                draft.resetPasswordErrorReason = action.message;
                ShowNotification({
                    title: 'Fail to reset password.',
                    message: action.message,
                    icon: null,
                    onClick: null,
                });
                break;
            case actionTypes.UNREGISTER_CALL:
                draft.unregisterLoading = true;
                draft.unregisterSuccess = false;
                break;
            case actionTypes.UNREGISTER_DONE:
                draft.unregisterLoading = false;
                // draft.me = null;
                draft.unregisterSuccess = true;
                // ShowNotification({
                //     title: 'Farewell my friend. Hope to See you again soon.',
                // });
                break;
            case actionTypes.UNREGISTER_FAIL:
                draft.unregisterLoading = false;
                draft.unregisterErrorReason = action.message;
                draft.unregisterSuccess = false;
                break;

            case actionTypes.SET_JWT:
                draft.token = action.data.token;
                break;

            default:
                break;
        }
    });

export default reducer;
