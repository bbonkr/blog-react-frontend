import { UserState } from '../../typings/reduxStates';
import { BaseAction } from '../../typings/BaseAction';
import { ISigninResult, UserModel } from '../../typings/dto';
import { ShowNotification } from '../../components/ShowNotification';

export interface IUserHandlerValue {
    draft: UserState;
    action: BaseAction;
}

export class UserHandler {
    private draft: UserState;
    private action: BaseAction;

    constructor(value: IUserHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    public signInDone(): void {
        const actionData = this.action.data as ISigninResult;
        const { user, token } = actionData;
        this.draft.signInInProcess = false;
        this.draft.me = user;
        this.draft.token = token;
    }

    public meDone(): void {
        const actionData = this.action.data as UserModel;
        this.draft.me = actionData;
    }

    public signOutDone(): void {
        const { message, returnUrl } = this.action.data;
        this.draft.me = null;
        this.draft.token = null;
        this.draft.signOutLoading = false;
        this.draft.signOutReturnUrl = returnUrl || '/';
    }

    // SIGN_UP_CALL
    public signUpCall(): void {
        this.draft.signUpFailMessage = '';
        this.draft.signUpInProcess = true;
        this.draft.signUpSuccess = false;
    }

    // SIGN_UP_DONE
    public signUpDone(): void {
        const { user, token } = this.action.data;

        this.draft.me = user;
        this.draft.token = token;

        this.draft.signUpSuccess = true;
        this.draft.signUpInProcess = false;
    }

    // SIGN_UP_FAIL
    public signUpFail(): void {
        this.draft.signUpInProcess = false;
        this.draft.signUpSuccess = false;
        this.draft.signUpFailMessage = this.action.message;
    }

    // REQUEST_VERIFY_EMAIL_CALL
    public makeVerifyEmailCall(): void {
        this.draft.makeVerifyEmailErrorReason = '';
        this.draft.makeVerifyEmailLoading = true;
    }
    // REQUEST_VERIFY_EMAIL_DONE
    public makeVerifyEmailDone(): void {
        this.draft.makeVerifyEmailLoading = false;
        ShowNotification({
            title: 'Success',
            message: this.action.message,
            icon: null,
            onClick: null,
        });
    }
    //  REQUEST_VERIFY_EMAIL_FAIL
    public makeVerifyEmailFail(): void {
        this.draft.makeVerifyEmailErrorReason = this.action.message;
        this.draft.makeVerifyEmailLoading = false;
        ShowNotification({
            title: 'Fail to make verify email code.',
            message: this.action.message,
            icon: null,
            onClick: null,
        });
    }

    // CHANGE_INFO_DONE
    public changeInfoDone(): void {
        const actionData = this.action.data as UserModel;

        this.draft.loadingChangeInfo = false;
        this.draft.changeInfoSuccess = true;
        this.draft.me = actionData;
    }
}
