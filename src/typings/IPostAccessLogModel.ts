import { IDictionary } from './IDictionary';
import { IPostModel } from './IPostModel';
export interface IPostAccessLogModel extends IDictionary<any> {
    id: number;
    ipAddress?: string;
    userAgent?: string;
    userId?: number;
    postId?: number;
    post?: IPostModel;
    createdAt?: Date;
    updatedAt?: Date;
}
