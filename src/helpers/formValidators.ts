import Validator from './validator';
import { IDictionary } from 'reducers/IDictionary';

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

export interface IEmailFormValue extends IDictionary<any> {
    email: string;
}
export interface IUsernameFormValue extends IDictionary<any> {
    username: string;
}
export interface IDisplayNameFormValue extends IDictionary<any> {
    displayName: string;
}

export interface IPasswordFormValue extends IDictionary<any> {
    password: string;
}

export interface IPasswordConfirmFormValue extends IDictionary<any> {
    passwordConfirm: string;
}

export interface ICurrentPasswordFormValue extends IDictionary<any> {
    currentPassword: string;
}

export interface ISignupFormValues extends 
    IEmailFormValue,
    IUsernameFormValue, 
    IDisplayNameFormValue, 
    IPasswordFormValue, 
    IPasswordConfirmFormValue,
    IDictionary<any> {
    // username: string;
    // email: string;
    // displayName: string;
    // password: string;
    // passwordConfirm: string;
}

export abstract class FormValidatorBase {
    abstract validate(formData: IDictionary<any>): FormValidationResult; 
} 

export abstract class FormValidator extends FormValidatorBase {
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

export interface IChangeInfoFormValues extends IUsernameFormValue, IDisplayNameFormValue, IEmailFormValue, IDictionary<any> {
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

export interface IChangePasswordFormValues extends IPasswordFormValue, IPasswordConfirmFormValue, ICurrentPasswordFormValue, IDictionary<any> {

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

export interface ITitleFormValue extends IDictionary<any> {
    title: string;
}

export interface IMarkdownFormValue extends IDictionary<any> {
    markdown: string;
}

export interface ICategoriesFormValue extends IDictionary<any> {
    categories: any[];
}

export interface ITagsFormValue extends IDictionary<any>{
    tags?: any[];
}

export interface IWriteformValue extends ITitleFormValue, IMarkdownFormValue,ICategoriesFormValue, ITagsFormValue, IDictionary<any> {
    
}

export class WriteFormValaidator extends FormValidatorBase {

    public checkTitle(formData:ITitleFormValue ): IValidationResult {
        const { title } = formData;

        if (!title || title.trim().length === 0) {
            return ValidationResult.fail( 'Please input a title');
        }

        return ValidationResult.success;
    }

    public checkMarkdown(formData:IMarkdownFormValue ): IValidationResult {
        const { markdown } = formData;

        if (!markdown || markdown.trim().length === 0) {
            return ValidationResult.fail( 'Please write a your content.');
        }

        return ValidationResult.success;
    }

    public checkCategory(formData:ICategoriesFormValue ): IValidationResult {
        const { categories } = formData;
        if (!categories || categories.length === 0) {
            return ValidationResult.fail( 'Please select a category at least one.');
        }
        return ValidationResult.success;
    }

    public validate(formData: IWriteformValue): FormValidationResult {
        const result = new FormValidationResult([
            this.checkTitle(formData),
            this.checkMarkdown(formData),
            this.checkCategory(formData),
        ]);

        return result;
    }
}

export interface ICategoryNameFormValue extends IDictionary<any> {
    name: string;
}

export interface ICategorySlugFormValue extends IDictionary<any> {
    slug?: string;
}

export interface ICategoryOrdinalFormValue extends IDictionary<any> {
    ordinal?: number;
}

export interface ICategoryFormValue extends 
    ICategoryNameFormValue, 
    ICategorySlugFormValue,
    ICategoryOrdinalFormValue,
    IDictionary<any> {

}

export class CategoryFormValidator extends FormValidatorBase {
    public checkName(formData: ICategoryNameFormValue): IValidationResult {
        const { name } = formData;

        if (!name || name.trim().length === 0) {
            return ValidationResult.fail( 'Please input a Name of category.');
        }

        return ValidationResult.success;
    }
    
    public checkSlug(formData: ICategorySlugFormValue): IValidationResult {
        const { slug } = formData;

        if (!slug || slug.trim().length === 0) {
            return ValidationResult.fail( 'Please input a Slug of category.');
        }

        return ValidationResult.success;
    }

    public checkOrdinal(formData: ICategoryOrdinalFormValue): IValidationResult {
        const { ordinal } = formData;

        return ValidationResult.success;
    }

    public validate(formData: ICategoryFormValue): IFormValidationResult {
        const result= new FormValidationResult([
            this.checkName(formData),
            this.checkSlug(formData),
            this.checkOrdinal(formData),
        ]);

        return result;
    }

}