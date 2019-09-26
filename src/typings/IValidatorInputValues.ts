import { IDictionary } from './IDictionary';
export interface IPasswordConfirmFormValue extends IDictionary<any> {
    passwordConfirm: string;
}
export interface ICategoriesFormValue extends IDictionary<any> {
    categories: any[];
}

export interface IEmailFormValue extends IDictionary<any> {
    email: string;
}

export interface ICurrentPasswordFormValue extends IDictionary<any> {
    currentPassword: string;
}
export interface ICategoryNameFormValue extends IDictionary<any> {
    name: string;
}
export interface ICategoryOrdinalFormValue extends IDictionary<any> {
    ordinal?: number;
}
export interface ICategorySlugFormValue extends IDictionary<any> {
    slug?: string;
}
export interface IFormValidationResult {
    valid: boolean;
    messages: string[];
}

export interface IChangePasswordFormValues
    extends IPasswordFormValue,
        IPasswordConfirmFormValue,
        ICurrentPasswordFormValue,
        IDictionary<any> {}

export interface ICategoryFormValue
    extends ICategoryNameFormValue,
        ICategorySlugFormValue,
        ICategoryOrdinalFormValue,
        IDictionary<any> {}
export interface IChangeInfoFormValues
    extends IUsernameFormValue,
        IDisplayNameFormValue,
        IEmailFormValue,
        IDictionary<any> {}

export interface IDisplayNameFormValue extends IDictionary<any> {
    displayName: string;
}

export interface IMarkdownFormValue extends IDictionary<any> {
    markdown: string;
}

export interface IPasswordFormValue extends IDictionary<any> {
    password: string;
}
export interface ISignInFormValue
    extends IUsernameFormValue,
        IPasswordFormValue,
        IDictionary<any> {}

export interface ISignupFormValues
    extends IEmailFormValue,
        IUsernameFormValue,
        IDisplayNameFormValue,
        IPasswordFormValue,
        IPasswordConfirmFormValue,
        IDictionary<any> {}

export interface ITagsFormValue extends IDictionary<any> {
    tags?: any[];
}
export interface ITitleFormValue extends IDictionary<any> {
    title: string;
}
export interface IUsernameFormValue extends IDictionary<any> {
    username: string;
}

export interface IWriteformValue
    extends ITitleFormValue,
        IMarkdownFormValue,
        ICategoriesFormValue,
        ITagsFormValue,
        IDictionary<any> {}
