import { IDictionary } from 'typings/IDictionary';
import { ICategoryNameFormValue } from './ICategoryNameFormValue';
import { ICategorySlugFormValue } from './ICategorySlugFormValue';
import { ICategoryOrdinalFormValue } from './ICategoryOrdinalFormValue';
export interface ICategoryFormValue
    extends ICategoryNameFormValue,
        ICategorySlugFormValue,
        ICategoryOrdinalFormValue,
        IDictionary<any> {}
