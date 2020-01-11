import { ValidationResultValue } from '../typings/ValidationResultValue';
import { ValidationResult } from './ValidationResult';
import { FormValidationResult } from './FormValidationResult';
import { FormValidatorBase } from './FormValidatorBase';
import {
    TitleFormValue,
    MarkdownFormValue,
    CategoriesFormValue,
    WriteFormValue,
} from '../typings/ValidatorInputValues';

export class WriteFormValaidator extends FormValidatorBase {
    public checkTitle(formData: TitleFormValue): ValidationResultValue {
        const { title } = formData;
        if (!title || title.trim().length === 0) {
            return ValidationResult.fail('Please input a title');
        }
        return ValidationResult.success;
    }
    public checkMarkdown(formData: MarkdownFormValue): ValidationResultValue {
        const { markdown } = formData;
        if (!markdown || markdown.trim().length === 0) {
            return ValidationResult.fail('Please write a your content.');
        }
        return ValidationResult.success;
    }
    public checkCategory(formData: CategoriesFormValue): ValidationResultValue {
        const { categories } = formData;
        if (!categories || categories.length === 0) {
            return ValidationResult.fail(
                'Please select a category at least one.',
            );
        }
        return ValidationResult.success;
    }
    public validate(formData: WriteFormValue): FormValidationResult {
        const result = new FormValidationResult([
            this.checkTitle(formData),
            this.checkMarkdown(formData),
            this.checkCategory(formData),
        ]);
        return result;
    }
}
