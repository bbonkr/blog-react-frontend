import { IValidationResult } from '../typings/IValidationResult';
import { ValidationResult } from './ValidationResult';
import { FormValidationResult } from './FormValidationResult';
import { FormValidatorBase } from './FormValidatorBase';
import {
    IUsernameFormValue,
    IPasswordFormValue,
    ISignInFormValue,
} from '../typings/IValidatorInputValues';

export class SignInFormValidator extends FormValidatorBase {
    public checkUsername(formData: IUsernameFormValue): IValidationResult {
        const { username } = formData;
        if (!username || username.trim().length === 0) {
            return ValidationResult.fail(
                'Please Input your username or email address',
            );
        }
        return ValidationResult.success;
    }
    public checkPassword(formData: IPasswordFormValue): IValidationResult {
        const { password } = formData;
        if (!password || password.trim().length === 0) {
            return ValidationResult.fail('Please Input your password');
        }
        return ValidationResult.success;
    }
    public validate(formData: ISignInFormValue): FormValidationResult {
        const result = new FormValidationResult([
            this.checkUsername(formData),
            this.checkPassword(formData),
        ]);
        return result;
    }
}
