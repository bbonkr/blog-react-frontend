import { FormValidationResult } from './FormValidationResult';
import { FormValidator } from './FormValidator';
import { IChangePasswordFormValues } from './IChangePasswordFormValues';
export class ChangePasswordValidator extends FormValidator {
    public validate(formData: IChangePasswordFormValues) {
        const result: FormValidationResult = new FormValidationResult([
            this.checkPassword({ password: formData.currentPassword }),
            this.checkPassword(formData),
            this.checkPasswordConfirm(formData),
        ]);
        return result;
    }
}
