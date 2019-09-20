import { IValidationResult } from './IValidationResult';
import { ValidationResult } from './ValidationResult';
import { FormValidationResult } from './FormValidationResult';
import { FormValidatorBase } from './FormValidatorBase';
import { ITitleFormValue } from './ITitleFormValue';
import { IMarkdownFormValue } from './IMarkdownFormValue';
import { ICategoriesFormValue } from './ICategoriesFormValue';
import { IWriteformValue } from './IWriteformValue';
export class WriteFormValaidator extends FormValidatorBase {
    public checkTitle(formData: ITitleFormValue): IValidationResult {
        const { title } = formData;
        if (!title || title.trim().length === 0) {
            return ValidationResult.fail('Please input a title');
        }
        return ValidationResult.success;
    }
    public checkMarkdown(formData: IMarkdownFormValue): IValidationResult {
        const { markdown } = formData;
        if (!markdown || markdown.trim().length === 0) {
            return ValidationResult.fail('Please write a your content.');
        }
        return ValidationResult.success;
    }
    public checkCategory(formData: ICategoriesFormValue): IValidationResult {
        const { categories } = formData;
        if (!categories || categories.length === 0) {
            return ValidationResult.fail('Please select a category at least one.');
        }
        return ValidationResult.success;
    }
    public validate(formData: IWriteformValue): FormValidationResult {
        const result = new FormValidationResult([
            this.checkTitle(formData),
            this.checkMarkdown(formData),
            this.checkCategory(formData),
        ]);
        return result;
    }
}
