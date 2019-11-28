import { ValidationResultValue } from '../typings/ValidationResultValue';

import { ValidationResult } from './ValidationResult';
import { FormValidationResult } from './FormValidationResult';
import { FormValidatorBase } from './FormValidatorBase';
import {
    FormValidationResultValue,
    CategoryNameFormValue,
    CategorySlugFormValue,
    CategoryOrdinalFormValue,
    CategoryFormValue,
} from '../typings/ValidatorInputValues';
export class CategoryFormValidator extends FormValidatorBase {
    public checkName(formData: CategoryNameFormValue): ValidationResultValue {
        const { name } = formData;
        if (!name || name.trim().length === 0) {
            return ValidationResult.fail('Please input a Name of category.');
        }
        return ValidationResult.success;
    }
    public checkSlug(formData: CategorySlugFormValue): ValidationResultValue {
        const { slug } = formData;
        if (!slug || slug.trim().length === 0) {
            return ValidationResult.fail('Please input a Slug of category.');
        }
        return ValidationResult.success;
    }
    public checkOrdinal(
        formData: CategoryOrdinalFormValue,
    ): ValidationResultValue {
        const { ordinal } = formData;
        return ValidationResult.success;
    }
    public validate(formData: CategoryFormValue): FormValidationResultValue {
        const result = new FormValidationResult([
            this.checkName(formData),
            this.checkSlug(formData),
            this.checkOrdinal(formData),
        ]);
        return result;
    }
}
