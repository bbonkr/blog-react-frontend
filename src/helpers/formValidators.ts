import Validator from './validator';

const USERNAME_MIN_LENGTH = 3;
const DISPLAYNAME_MIN_LENGTH = 3;
const PASSWORD_LENGTH = 4;

export interface IValidationResult {
    valid: boolean;
    message?: string;
}

export interface IFormValidationResult {
    valid: boolean;
    messages: string[];
}

export class ValidationResult implements IValidationResult {
    /**
     * 성공
     */
    public static success:ValidationResult = new ValidationResult({
        valid: true,
    });

    /**
     * 실패
     * @param message 실패 메시지
     */
    public static fail(message: string) : ValidationResult {
        return new ValidationResult({
            valid: false,
            message: message
        });
    }

    public valid: boolean;
    public message?: string;

    constructor(value: IValidationResult){
        this.valid = value && value.valid;
        this.message = value && value.message;
    }
}

export class FormValidationResult implements IFormValidationResult {
    public valid: boolean;    
    public messages: string[];

    constructor(value: IValidationResult[]){
        this.valid = true;
        this.messages = [];
        
        value.forEach((v) => {
            this.valid = this.valid && v.valid;
            if(!v.valid){
                this.messages.push(v.message);
            }
        });
    }
}

export interface IEmailFormValue {
    email: string;
}
export interface IUsernameFormValue {
    username: string;
}
export interface IDisplayNameFormValue {
    displayName: string;
}

export interface IPasswordFormValue {
    password: string;
}

export interface IPasswordConfirmFormValue {
    passwordConfirm: string;
}

export interface ICurrentPasswordFormValue {
    currentPassword: string;
}

export interface ISignupFormValues extends 
    IEmailFormValue,
    IUsernameFormValue, 
    IDisplayNameFormValue, 
    IPasswordFormValue, 
    IPasswordConfirmFormValue {
    // username: string;
    // email: string;
    // displayName: string;
    // password: string;
    // passwordConfirm: string;
}

export class FormValidator {
    /**
     * 비밀번호 유효성 검사를 실행합니다.
     * @param {string} password
     */
    public validatePassword(password: string): IValidationResult {
        if (!password || password.length === 0) {
            return ValidationResult.fail( 'Please input your password.');
        }

        if (password.length < PASSWORD_LENGTH) {
            return ValidationResult.fail( `Please input your password more than ${PASSWORD_LENGTH} characters.`);
        }

        return ValidationResult.success;
    }

    public checkEmail(formValues: IEmailFormValue): IValidationResult {
        const { email } = formValues;
        if (!email || email.trim().length === 0) {
            return ValidationResult.fail('Please input your email address');
        }

        if (!Validator.email(email)) {
            return ValidationResult.fail( 'Please input a valid formatted email address');
        }

        return ValidationResult.success;
    }

    public checkPassword(formValues: IPasswordFormValue): IValidationResult {
        const { password } = formValues;

        return this.validatePassword(password.trim());
    }

    public checkPasswordConfirm(formValues: IPasswordFormValue & IPasswordConfirmFormValue): IValidationResult {
        const { password, passwordConfirm } = formValues;

        const result = this.validatePassword(passwordConfirm.trim());

        if (!result.valid) {
            return result;
        }

        if (password.trim() !== passwordConfirm.trim()) {
            return ValidationResult.fail( 'Please input same as password.');
        }

        return ValidationResult.success;
    }

    public checkUsername(formValues: IUsernameFormValue): IValidationResult {
        const { username } = formValues;
        if (!username || username.trim().length === 0) {
            return ValidationResult.fail( 'Please input your username');
        }

        if (!/^[a-z][a-z0-9_-]+[a-z0-9]$/i.test(username)) {
            return ValidationResult.fail('Please input your username with combining alphabet (lower-case), number, dash(-) and underscore(_). It should start with alphabet character. and it should end with alphabet or number character.');
        }

        if (username.trim().length < USERNAME_MIN_LENGTH) {
            return ValidationResult.fail( `Please input your user name longer than ${USERNAME_MIN_LENGTH}`);
        }

        return ValidationResult.success;
    }

    public checkDisplayName(formValues: IDisplayNameFormValue): IValidationResult {
        const { displayName } = formValues;

        if (!displayName || displayName.trim().length === 0) {
            return ValidationResult.fail( 'Please input your display name.');
        }

        if (displayName.trim().length < DISPLAYNAME_MIN_LENGTH) {
            return ValidationResult.fail( `Please input your display name longer than ${DISPLAYNAME_MIN_LENGTH}`);
        }

        return ValidationResult.success;
    }
}

export class SignUpFormValidator extends FormValidator {
    public validate(formValues: ISignupFormValues): IFormValidationResult {
        const validationResult: IFormValidationResult = new FormValidationResult([
            this.checkEmail(formValues),
            this.checkPassword(formValues),
            this.checkPasswordConfirm(formValues),
            this.checkUsername(formValues),
            this.checkDisplayName(formValues)
        ]);

        return validationResult;
    }
}

export interface IChangeInfoFormValues extends IUsernameFormValue, IDisplayNameFormValue, IEmailFormValue {
} 

export class ChangeInfoValidator extends FormValidator {
    
    validate(formData: IChangeInfoFormValues) {
        const result: FormValidationResult = new FormValidationResult([
            this.checkEmail(formData),
            this.checkUsername(formData),
            this.checkDisplayName(formData)
        ]);
       
        return result;
    }
}

export interface IChangePasswordFormValues extends IPasswordFormValue, IPasswordConfirmFormValue, ICurrentPasswordFormValue {

}

export class ChangePasswordValidator extends FormValidator {
    validate(formData: IChangePasswordFormValues) {
        const result: FormValidationResult = new FormValidationResult([
            this.checkPassword({password: formData.currentPassword}),
            this.checkPassword(formData),
            this.checkPasswordConfirm(formData),
        ]);

        return result;
    }
}