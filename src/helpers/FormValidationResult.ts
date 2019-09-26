import { IValidationResult } from '../typings/IValidationResult';
import { IFormValidationResult } from '../typings/IValidatorInputValues';

export class FormValidationResult implements IFormValidationResult {
    public valid: boolean;
    public messages: string[];
    constructor(value: IValidationResult[]) {
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
