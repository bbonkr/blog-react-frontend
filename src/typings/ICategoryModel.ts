import { IDictionary } from './IDictionary';
import { IUserModel } from './IUserModel';
import { IPostModel } from './IPostModel';
export interface ICategoryModel extends IDictionary<any> {
    id: number;
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
    createdAt?: Date;
    updatedAt?: Date;
}
