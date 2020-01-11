import { ValidationResultValue } from '../typings/ValidationResultValue';
import { FormValidationResultValue } from '../typings/ValidatorInputValues';

export class FormValidationResult implements FormValidationResultValue {
    public valid: boolean;
    public messages: string[];
    constructor(value: ValidationResultValue[]) {
        this.valid = true;
        this.messages = [];
        value.forEach((v) => {
            this.valid = this.valid && v.valid;
            if (!v.valid) {
                this.messages.push(v.message);
            }
        });
    }
}
