import { IDictionary } from '../typings/IDictionary';
import { IUsernameFormValue } from './IUsernameFormValue';
import { IPasswordFormValue } from './IPasswordFormValue';
export interface ISignInFormValue extends IUsernameFormValue, IPasswordFormValue, IDictionary<any> {
}
