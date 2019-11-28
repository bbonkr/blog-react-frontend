import { FormValidationResult } from './FormValidationResult';
import { FormValidator } from './FormValidator';
import { ChangePasswordFormValues } from '../typings/ValidatorInputValues';

export class ChangePasswordValidator extends FormValidator {
    public validate(formData: ChangePasswordFormValues) {
        const result: FormValidationResult = new FormValidationResult([
            this.checkPassword({ password: formData.currentPassword }),
            this.checkPassword(formData),
            this.checkPasswordConfirm(formData),
        ]);
        return result;
    }
}
