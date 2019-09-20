import { IValidationResult } from './IValidationResult';
import { IFormValidationResult } from './IFormValidationResult';
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
