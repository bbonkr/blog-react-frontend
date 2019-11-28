import { ValidationResultValue } from '../typings/ValidationResultValue';

export class ValidationResult implements ValidationResultValue {
    /**
     * 성공
     */
    public static success: ValidationResultValue = new ValidationResult({
        valid: true,
    });
    /**
     * 실패
     * @param message 실패 메시지
     */
    public static fail(message: string): ValidationResultValue {
        return new ValidationResult({
            valid: false,
            message: message,
        });
    }
    public valid: boolean;
    public message?: string;
    constructor(value: ValidationResultValue) {
        this.valid = value && value.valid;
        this.message = value && value.message;
    }
}
