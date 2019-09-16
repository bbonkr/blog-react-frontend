import { IUserState } from '../../typings/reduxStates';
import { IBlogAction } from '../../typings/IBlogAction';
import { IUserModel } from '../../typings/IUserModel';

export interface IUserHandlerValue {
    draft: IUserState;
    action: IBlogAction;
}

export class UserHandler {
    private draft: IUserState;
    private action: IBlogAction;

    constructor(value: IUserHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    public signInDone(): void {
        const actionData = this.action.data as IUserModel;
        this.draft.signInInProcess = false;
        this.draft.me = actionData;
    }

    public meDone(): void {
        const actionData = this.action.data as IUserModel;
        this.draft.me = actionData;
    }

    public signOutDone(): void {
        const { message, returnUrl } = this.action.data;
        this.draft.me = null;
        this.draft.signOutLoading = false;
        this.draft.signOutReturnUrl = returnUrl || '/';
    }

    public changeInfoDone(): void {
        const actionData = this.action.data as IUserModel;

        this.draft.loadingChangeInfo = false;
        this.draft.changeInfoSuccess = true;
        this.draft.me = actionData;
    }
}
