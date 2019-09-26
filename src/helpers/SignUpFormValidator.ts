import { FormValidationResult } from './FormValidationResult';
import { FormValidator } from './FormValidator';
import {
    ISignupFormValues,
    IFormValidationResult,
} from '../typings/IValidatorInputValues';

export class SignUpFormValidator extends FormValidator {
    public validate(formValues: ISignupFormValues): IFormValidationResult {
        const validationResult: IFormValidationResult = new FormValidationResult(
            [
                this.checkEmail(formValues),
                this.checkPassword(formValues),
                this.checkPasswordConfirm(formValues),
                this.checkUsername(formValues),
                this.checkDisplayName(formValues),
            ],
        );
        return validationResult;
    }
}
