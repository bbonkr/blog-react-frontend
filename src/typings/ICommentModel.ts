import { IDictionary } from './IDictionary';
import { IUserModel } from './IUserModel';
import { IPostModel } from './IPostModel';
import { IModelBase } from './IModelBase';
export interface ICommentModel extends IModelBase {
    markdown?: string;
    html?: string;
    text?: string;
    userId?: number;
    user?: IUserModel;
    postId?: number;
    post?: IPostModel;
}
