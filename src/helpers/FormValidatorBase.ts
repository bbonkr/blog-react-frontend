import { IDictionary } from 'typings/IDictionary';
import { FormValidationResult } from './FormValidationResult';
export abstract class FormValidatorBase {
    public abstract validate(formData: IDictionary<any>): FormValidationResult;
}
