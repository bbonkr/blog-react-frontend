import { IDictionary } from './IDictionary';

export interface IModelBase {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

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

export interface ICommentModel extends IModelBase {
    markdown?: string;
    html?: string;
    text?: string;
    userId?: number;
    user?: IUserModel;
    postId?: number;
    post?: IPostModel;
}

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

export interface IPostAccessLogModel extends IModelBase {
    ipAddress?: string;
    userAgent?: string;
    userId?: number;
    postId?: number;
    post?: IPostModel;
}

export interface IPostModel extends IModelBase {
    title?: string;
    slug?: string;
    markdown?: string;
    html?: string;
    text?: string;
    excerpt?: string;
    coverImage?: string;
    isPublished?: boolean;
    isPrivate?: string;
    // password: string;
    isPinned?: boolean;
    // isDeleted: boolean;
    deletedAt?: Date;
    userId?: number;
    user?: IUserModel;
    categories?: ICategoryModel[];
    comments?: ICommentModel[];
    accessLogs?: IPostAccessLogModel[];
    images?: IImageModel[];
    tags?: ITagModel[];
    likers?: IUserModel[];
}

export interface ITagModel extends IModelBase {
    name?: string;
    slug?: string;
    posts?: IPostModel[];
}

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

export interface IJsonResult<T> {
    success: boolean;
    data?: T | null;
    message?: string;
}

export interface IListResult<T> extends IDictionary<any> {
    records: T[];
    total: number;
}

export interface IListResultWithInformation<T>
    extends IListResult<T>,
        IDictionary<any> {}

export interface ISigninResult extends IDictionary<any> {
    user?: IUserModel;
    token?: string;
}
