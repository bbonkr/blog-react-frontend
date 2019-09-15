import { IDictionary } from './IDictionary';
import { IUserModel } from './IUserModel';
import { IPostModel } from './IPostModel';
export interface ICommentModel extends IDictionary<any> {
    id: number;
    markdown?: string;
    html?: string;
    text?: string;
    userId?: number;
    user?: IUserModel;
    postId?: number;
    post?: IPostModel;
    createdAt?: Date;
    updatedAt?: Date;
}
