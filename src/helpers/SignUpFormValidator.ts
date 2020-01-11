import { FormValidationResult } from './FormValidationResult';
import { FormValidator } from './FormValidator';
import {
    SignupFormValues,
    FormValidationResultValue,
} from '../typings/ValidatorInputValues';

export class SignUpFormValidator extends FormValidator {
    public validate(formValues: SignupFormValues): FormValidationResultValue {
        const validationResult: FormValidationResultValue = new FormValidationResult(
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
