import { FormValidationResult } from './FormValidationResult';
import { FormValidator } from './FormValidator';
import { IChangeInfoFormValues } from '../typings/IValidatorInputValues';
export class ChangeInfoValidator extends FormValidator {
    public validate(formData: IChangeInfoFormValues) {
        const result: FormValidationResult = new FormValidationResult([
            this.checkEmail(formData),
            this.checkUsername(formData),
            this.checkDisplayName(formData),
        ]);
        return result;
    }
}
