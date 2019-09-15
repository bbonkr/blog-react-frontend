import { IDictionary } from 'typings/IDictionary';
import { IEmailFormValue } from './IEmailFormValue';
import { IUsernameFormValue } from './IUsernameFormValue';
import { IDisplayNameFormValue } from './IDisplayNameFormValue';
import { IPasswordFormValue } from './IPasswordFormValue';
import { IPasswordConfirmFormValue } from './IPasswordConfirmFormValue';
export interface ISignupFormValues
    extends IEmailFormValue,
        IUsernameFormValue,
        IDisplayNameFormValue,
        IPasswordFormValue,
        IPasswordConfirmFormValue,
        IDictionary<any> {}
