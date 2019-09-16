import { IDictionary } from './IDictionary';
import { IUserModel } from './IUserModel';
import { IPostModel } from './IPostModel';
import { IModelBase } from './IModelBase';
export interface ICategoryModel extends IModelBase {
    /**
     * 이름
     */
    name?: string;
    /**
     * 슬러그
     */
    slug?: string;
    /**
     * 출력순서
     */
    ordinal?: number;
    userId?: number;
    user?: IUserModel;
    posts?: IPostModel[];
}
