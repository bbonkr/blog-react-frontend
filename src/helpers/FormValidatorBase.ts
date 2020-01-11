import { Dictionary } from '../typings/Dictionary';
import { FormValidationResult } from './FormValidationResult';
export abstract class FormValidatorBase {
    public abstract validate(formData: Dictionary<any>): FormValidationResult;
}
