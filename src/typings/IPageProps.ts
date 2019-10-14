import { IDictionary } from './IDictionary';

export interface IPageProps extends IDictionary<any> {
    doNotSetCurrentUrl?: boolean;
    returnUrl?: string;
}
