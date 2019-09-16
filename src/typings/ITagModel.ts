import { IDictionary } from './IDictionary';
import { IPostModel } from './IPostModel';
import { IModelBase } from './IModelBase';
export interface ITagModel extends IModelBase {
    name?: string;
    slug?: string;
    posts?: IPostModel[];
}
