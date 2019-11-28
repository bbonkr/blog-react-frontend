import { Dictionary } from './Dictionary';

export interface PageProps extends Dictionary<any> {
    doNotSetCurrentUrl?: boolean;
    returnUrl?: string;
}
