import { IDictionary } from '../typings/IDictionary';
import { IPasswordFormValue } from './IPasswordFormValue';
import { IPasswordConfirmFormValue } from './IPasswordConfirmFormValue';
import { ICurrentPasswordFormValue } from './ICurrentPasswordFormValue';
export interface IChangePasswordFormValues
    extends IPasswordFormValue,
        IPasswordConfirmFormValue,
        ICurrentPasswordFormValue,
        IDictionary<any> {}
