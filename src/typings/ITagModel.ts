import { IDictionary } from './IDictionary';
import { IPostModel } from './IPostModel';
export interface ITagModel extends IDictionary<any> {
    id: number;
    name?: string;
    slug?: string;
    posts?: IPostModel[];
    createdAt?: Date;
    updatedAt?: Date;
}
