import { IDictionary } from 'typings/IDictionary';
import { IEmailFormValue } from './IEmailFormValue';
import { IUsernameFormValue } from './IUsernameFormValue';
import { IDisplayNameFormValue } from './IDisplayNameFormValue';
export interface IChangeInfoFormValues
    extends IUsernameFormValue,
        IDisplayNameFormValue,
        IEmailFormValue,
        IDictionary<any> {}
