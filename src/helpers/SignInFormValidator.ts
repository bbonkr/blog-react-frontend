import { ValidationResultValue } from '../typings/ValidationResultValue';
import { ValidationResult } from './ValidationResult';
import { FormValidationResult } from './FormValidationResult';
import { FormValidatorBase } from './FormValidatorBase';
import {
    UsernameFormValue,
    PasswordFormValue,
    SignInFormValue,
} from '../typings/ValidatorInputValues';

export class SignInFormValidator extends FormValidatorBase {
    public checkUsername(formData: UsernameFormValue): ValidationResultValue {
        const { username } = formData;
        if (!username || username.trim().length === 0) {
            return ValidationResult.fail(
                'Please Input your username or email address',
            );
        }
        return ValidationResult.success;
    }
    public checkPassword(formData: PasswordFormValue): ValidationResultValue {
        const { password } = formData;
        if (!password || password.trim().length === 0) {
            return ValidationResult.fail('Please Input your password');
        }
        return ValidationResult.success;
    }
    public validate(formData: SignInFormValue): FormValidationResult {
        const result = new FormValidationResult([
            this.checkUsername(formData),
            this.checkPassword(formData),
        ]);
        return result;
    }
}
