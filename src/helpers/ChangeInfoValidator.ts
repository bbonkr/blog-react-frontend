import { FormValidationResult } from './FormValidationResult';
import { FormValidator } from './FormValidator';
import { ChangeInfoFormValues } from '../typings/ValidatorInputValues';
export class ChangeInfoValidator extends FormValidator {
    public validate(formData: ChangeInfoFormValues) {
        const result: FormValidationResult = new FormValidationResult([
            this.checkEmail(formData),
            this.checkUsername(formData),
            this.checkDisplayName(formData),
        ]);
        return result;
    }
}
