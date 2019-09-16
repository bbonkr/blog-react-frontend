import { IDictionary } from './IDictionary';
import { IUserModel } from './IUserModel';
import { IPostModel } from './IPostModel';
import { IModelBase } from './IModelBase';
export interface IImageModel extends IModelBase {
    src?: string;
    // path: string;
    fileName?: string;
    fileExtension?: string;
    size?: number;
    contentType?: string;
    userId?: number;
    user?: IUserModel;
    posts?: IPostModel[];
}
