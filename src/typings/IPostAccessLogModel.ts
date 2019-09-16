import { IDictionary } from './IDictionary';
import { IPostModel } from './IPostModel';
import { IModelBase } from './IModelBase';

export interface IPostAccessLogModel extends IModelBase {
    ipAddress?: string;
    userAgent?: string;
    userId?: number;
    postId?: number;
    post?: IPostModel;
}
