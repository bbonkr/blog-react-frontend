import { Dictionary } from './Dictionary';
export interface PasswordConfirmFormValue extends Dictionary<any> {
    passwordConfirm: string;
}
export interface CategoriesFormValue extends Dictionary<any> {
    categories: any[];
}

export interface EmailFormValue extends Dictionary<any> {
    email: string;
}

export interface CurrentPasswordFormValue extends Dictionary<any> {
    currentPassword: string;
}
export interface CategoryNameFormValue extends Dictionary<any> {
    name: string;
}
export interface CategoryOrdinalFormValue extends Dictionary<any> {
    ordinal?: number;
}
export interface CategorySlugFormValue extends Dictionary<any> {
    slug?: string;
}
export interface FormValidationResultValue {
    valid: boolean;
    messages: string[];
}

export interface ChangePasswordFormValues
    extends PasswordFormValue,
    PasswordConfirmFormValue,
    CurrentPasswordFormValue,
    Dictionary<any> { }

export interface CategoryFormValue
    extends CategoryNameFormValue,
    CategorySlugFormValue,
    CategoryOrdinalFormValue,
    Dictionary<any> { }
export interface ChangeInfoFormValues
    extends UsernameFormValue,
    DisplayNameFormValue,
    EmailFormValue,
    Dictionary<any> { }

export interface DisplayNameFormValue extends Dictionary<any> {
    displayName: string;
}

export interface MarkdownFormValue extends Dictionary<any> {
    markdown: string;
}

export interface PasswordFormValue extends Dictionary<any> {
    password: string;
}
export interface SignInFormValue
    extends UsernameFormValue,
    PasswordFormValue,
    Dictionary<any> { }

export interface SignupFormValues
    extends EmailFormValue,
    UsernameFormValue,
    DisplayNameFormValue,
    PasswordFormValue,
    PasswordConfirmFormValue,
    Dictionary<any> { }

export interface TagsFormValue extends Dictionary<any> {
    tags?: any[];
}
export interface TitleFormValue extends Dictionary<any> {
    title: string;
}
export interface UsernameFormValue extends Dictionary<any> {
    username: string;
}

export interface WriteFormValue
    extends TitleFormValue,
    MarkdownFormValue,
    CategoriesFormValue,
    TagsFormValue,
    Dictionary<any> { }
