import { IDictionary } from './IDictionary';
import { ICategoryModel } from './ICategoryModel';
import { ICommentModel } from './ICommentModel';
import { IImageModel } from './IImageModel';
import { IPostModel } from './IPostModel';
import { IModelBase } from './IModelBase';

export interface IUserModel extends IModelBase {
    username?: string;
    displayName?: string;
    email?: string;
    //  password?: string;
    isEmailConfirmed?: boolean;
    photo?: string;
    categories?: ICategoryModel[];
    comments?: ICommentModel[];
    images?: IImageModel[];
    posts?: IPostModel[];
    likedPosts?: IPostModel[];
}
