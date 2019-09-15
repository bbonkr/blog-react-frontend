import { IValidationResult } from './IValidationResult';
import { IFormValidationResult } from './IFormValidationResult';
import { ValidationResult } from './ValidationResult';
import { FormValidationResult } from './FormValidationResult';
import { FormValidatorBase } from './FormValidatorBase';
import { ICategoryNameFormValue } from './ICategoryNameFormValue';
import { ICategorySlugFormValue } from './ICategorySlugFormValue';
import { ICategoryOrdinalFormValue } from './ICategoryOrdinalFormValue';
import { ICategoryFormValue } from './ICategoryFormValue';
export class CategoryFormValidator extends FormValidatorBase {
    public checkName(formData: ICategoryNameFormValue): IValidationResult {
        const { name } = formData;
        if (!name || name.trim().length === 0) {
            return ValidationResult.fail('Please input a Name of category.');
        }
        return ValidationResult.success;
    }
    public checkSlug(formData: ICategorySlugFormValue): IValidationResult {
        const { slug } = formData;
        if (!slug || slug.trim().length === 0) {
            return ValidationResult.fail('Please input a Slug of category.');
        }
        return ValidationResult.success;
    }
    public checkOrdinal(
        formData: ICategoryOrdinalFormValue,
    ): IValidationResult {
        const { ordinal } = formData;
        return ValidationResult.success;
    }
    public validate(formData: ICategoryFormValue): IFormValidationResult {
        const result = new FormValidationResult([
            this.checkName(formData),
            this.checkSlug(formData),
            this.checkOrdinal(formData),
        ]);
        return result;
    }
}
