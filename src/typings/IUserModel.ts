import { IDictionary } from './IDictionary';
import { ICategoryModel } from './ICategoryModel';
import { ICommentModel } from './ICommentModel';
import { IImageModel } from './IImageModel';
import { IPostModel } from './IPostModel';
export interface IUserModel extends IDictionary<any> {
    id: number;
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
    createdAt?: Date;
    updatedAt?: Date;
}
