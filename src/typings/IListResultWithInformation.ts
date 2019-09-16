import { IListResult } from './IListResult';
import { IDictionary } from './IDictionary';
export interface IListResultWithInformation<T>
    extends IListResult<T>,
        IDictionary<any> {}
