import { IDictionary } from '../typings/IDictionary';
import { ITitleFormValue } from './ITitleFormValue';
import { IMarkdownFormValue } from './IMarkdownFormValue';
import { ICategoriesFormValue } from './ICategoriesFormValue';
import { ITagsFormValue } from './ITagsFormValue';
export interface IWriteformValue
    extends ITitleFormValue,
        IMarkdownFormValue,
        ICategoriesFormValue,
        ITagsFormValue,
        IDictionary<any> {}
