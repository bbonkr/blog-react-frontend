import { IDictionary } from './IDictionary';

export interface IListResult<T> extends IDictionary<any> {
    records: T[];
    total: number;
}
