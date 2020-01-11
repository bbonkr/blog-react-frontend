import { Dictionary } from './Dictionary';

interface ModelBase {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CategoryModel extends ModelBase {
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
    user?: UserModel;
    posts?: PostModel[];
}

export interface CommentModel extends ModelBase {
    markdown?: string;
    html?: string;
    text?: string;
    userId?: number;
    user?: UserModel;
    postId?: number;
    post?: PostModel;
}

export interface ImageModel extends ModelBase {
    src?: string;
    // path: string;
    fileName?: string;
    fileExtension?: string;
    size?: number;
    contentType?: string;
    userId?: number;
    user?: UserModel;
    posts?: PostModel[];
}

export interface PostAccessLogModel extends ModelBase {
    ipAddress?: string;
    userAgent?: string;
    userId?: number;
    postId?: number;
    post?: PostModel;
}

export interface PostModel extends ModelBase {
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
    user?: UserModel;
    categories?: CategoryModel[];
    comments?: CommentModel[];
    accessLogs?: PostAccessLogModel[];
    images?: ImageModel[];
    tags?: TagModel[];
    likers?: UserModel[];
}

export interface TagModel extends ModelBase {
    name?: string;
    slug?: string;
    posts?: PostModel[];
}

export interface UserModel extends ModelBase {
    username?: string;
    displayName?: string;
    email?: string;
    //  password?: string;
    isEmailConfirmed?: boolean;
    photo?: string;
    categories?: CategoryModel[];
    comments?: CommentModel[];
    images?: ImageModel[];
    posts?: PostModel[];
    likedPosts?: PostModel[];
}

export interface JsonResult<T> {
    success: boolean;
    data?: T | null;
    message?: string;
}

export interface ListResult<T> extends Dictionary<any> {
    records: T[];
    total: number;
}

export interface IListResultWithInformation<T>
    extends ListResult<T>,
    Dictionary<any> { }

export interface ISigninResult extends Dictionary<any> {
    user?: UserModel;
    token?: string;
}
