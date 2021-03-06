import Validator from './validator';
import { ValidationResultValue } from '../typings/ValidationResultValue';
import { ValidationResult } from './ValidationResult';
import { FormValidatorBase } from './FormValidatorBase';
import {
    PASSWORD_LENGTH,
    USERNAME_MIN_LENGTH,
    DISPLAYNAME_MIN_LENGTH,
} from './formValidators';
import {
    EmailFormValue,
    PasswordFormValue,
    PasswordConfirmFormValue,
    UsernameFormValue,
    DisplayNameFormValue,
} from '../typings/ValidatorInputValues';

export abstract class FormValidator extends FormValidatorBase {
    /**
     * 비밀번호 유효성 검사를 실행합니다.
     * @param {string} password
     */
    public validatePassword(password: string): ValidationResultValue {
        if (!password || password.length === 0) {
            return ValidationResult.fail('Please input your password.');
        }
        if (password.length < PASSWORD_LENGTH) {
            return ValidationResult.fail(
                `Please input your password more than ${PASSWORD_LENGTH} characters.`,
            );
        }
        return ValidationResult.success;
    }
    public checkEmail(formValues: EmailFormValue): ValidationResultValue {
        const { email } = formValues;
        if (!email || email.trim().length === 0) {
            return ValidationResult.fail('Please input your email address');
        }
        if (!Validator.email(email)) {
            return ValidationResult.fail(
                'Please input a valid formatted email address',
            );
        }
        return ValidationResult.success;
    }
    public checkPassword(formValues: PasswordFormValue): ValidationResultValue {
        const { password } = formValues;
        return this.validatePassword(password.trim());
    }
    public checkPasswordConfirm(
        formValues: PasswordFormValue & PasswordConfirmFormValue,
    ): ValidationResultValue {
        const { password, passwordConfirm } = formValues;
        const result = this.validatePassword(passwordConfirm.trim());
        if (!result.valid) {
            return result;
        }
        if (password.trim() !== passwordConfirm.trim()) {
            return ValidationResult.fail('Please input same as password.');
        }
        return ValidationResult.success;
    }
    public checkUsername(formValues: UsernameFormValue): ValidationResultValue {
        const { username } = formValues;
        if (!username || username.trim().length === 0) {
            return ValidationResult.fail('Please input your username');
        }
        if (!/^[a-z][a-z0-9_-]+[a-z0-9]$/i.test(username)) {
            return ValidationResult.fail(
                'Please input your username with combining alphabet (lower-case), number, dash(-) and underscore(_). It should start with alphabet character. and it should end with alphabet or number character.',
            );
        }
        if (username.trim().length < USERNAME_MIN_LENGTH) {
            return ValidationResult.fail(
                `Please input your user name longer than ${USERNAME_MIN_LENGTH}`,
            );
        }
        return ValidationResult.success;
    }
    public checkDisplayName(
        formValues: DisplayNameFormValue,
    ): ValidationResultValue {
        const { displayName } = formValues;
        if (!displayName || displayName.trim().length === 0) {
            return ValidationResult.fail('Please input your display name.');
        }
        if (displayName.trim().length < DISPLAYNAME_MIN_LENGTH) {
            return ValidationResult.fail(
                `Please input your display name longer than ${DISPLAYNAME_MIN_LENGTH}`,
            );
        }
        return ValidationResult.success;
    }
}
