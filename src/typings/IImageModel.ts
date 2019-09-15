import { IDictionary } from './IDictionary';
import { IUserModel } from './IUserModel';
import { IPostModel } from './IPostModel';
export interface IImageModel extends IDictionary<any> {
    id: number;
    src?: string;
    // path: string;
    fileName?: string;
    fileExtension?: string;
    size?: number;
    contentType?: string;
    userId?: number;
    user?: IUserModel;
    posts?: IPostModel[];
    createdAt?: Date;
    updatedAt?: Date;
}
