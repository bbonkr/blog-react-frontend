import { IValidationResult } from '../typings/IValidationResult';

export class ValidationResult implements IValidationResult {
    /**
     * 성공
     */
    public static success: ValidationResult = new ValidationResult({
        valid: true,
    });
    /**
     * 실패
     * @param message 실패 메시지
     */
    public static fail(message: string): ValidationResult {
        return new ValidationResult({
            valid: false,
            message: message,
        });
    }
    public valid: boolean;
    public message?: string;
    constructor(value: IValidationResult) {
        this.valid = value && value.valid;
        this.message = value && value.message;
    }
}
