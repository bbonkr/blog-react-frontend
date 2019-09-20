import {
    IPostModel,
    ICategoryModel,
    ITagModel,
    IUserModel,
    IImageModel,
} from './dto';

export interface IRootState {
    user: IUserState;
    post: IPostState;
    category: ICategoryState;
    settings?: ISettingState;
    me: IMeState;
    posts: IPostsState;
    tagPosts: ITagPostsState;
    userCategoryPosts: IUserCategoryPostsState;
    searchPosts: ISearchPostsState;
    usersPosts: IUsersPostsState;
    singlePost: ISinglePostState;
}

export interface IMeState {
    myPost: IPostModel;
    postsLimit: number;
    hasMorePost: boolean;
    // searchKeyword?: string;
    nextPageToken?: string;
    postsCount: number;

    // category
    categories: ICategoryModel[];
    loadingCategories: boolean;
    loadCategoriesErrorReason?: string;
    hasMoreCategories: boolean;
    // categorySearchKeyword?: string;
    categoryNextPageToken?: string;
    categoryLimit: number;
    categoriesCount: number;
    categoriesCurrentPage: number;

    // tag
    tags: ITagModel[];
    myPosts: IPostModel[];

    loadingMyPost: boolean;
    loadingTags: boolean;
    loadingMyPosts: boolean;

    loadTagsErrorReason?: string;
    loadMyPostsErrorReason?: string;
    loadMyPostErrorReason?: string;
    writingPost: boolean;
    writePostErrorReason?: string;

    // media
    mediaFiles: IImageModel[];
    // mediaFilesNextPageToken?: string;
    mediaFilesSearchKeyword?: string;
    mediaFilesCurrentPage?: number;
    mediaFilesCount: number;
    mediaFilesLimit: number;
    hasMoreMediaFiles: boolean;
    loadingMediaFiles: boolean;
    loadMediaFilesErrorReason?: string;
    uploading: boolean;

    // menu
    sideMenuCollapsed: boolean;

    // liked
    likedPosts: IPostModel[];
    likedPostsLoading: boolean;
    likedPostsKeyword?: string;
    likedPostsErrorReason?: string;
    likedPostsLimit: number;
    likedPostsHasMore: boolean;
    likedPostsPageToken?: string;
    likedPostsTotal: number;
    likedPostPage?: number;

    // stat - general
    statGeneral: any;
    statGeneralLoading: boolean;
    statGeneralErrorReason?: string;

    statRead: any;
    statReadLoading: boolean;
    statReadErrorReason?: string;
}

export interface ICategoryState {
    categories: ICategoryModel[];
    loadingCategories: boolean;
}

export interface IPostState {
    /** posts */
    // posts: IPostModel[];
    // /** posts loading */
    // loadingPosts: boolean;
    // hasMorePost: boolean;
    // loadPostErrorReason?: string;
    // postsLimit: number;
    // nextPageToken: string;
    // currentPage: number;
    // searchKeyword: string;

    /** singlePost */
    // singlePost: IPostModel;
    // loadSinglePostErrorReason?: string;

    // /** post loading  */
    // loadingPost: boolean;
    // isSinglePost: boolean;
    // currentCategory?: string;

    writingPost: boolean;

    // /** users posts */
    // usersPosts: IPostModel[];
    // usersPostsPageToken?: string;
    // loadingUsersPosts: boolean;
    // loadUsersPostsErrorReason?: string;
    // hasMoreUsersPosts: boolean;
    // currentUser?: string; // 현재 선택된 사용자; 데이터 소스 초기화에 사용

    /** users category posts */
    // userCategoryPosts: IPostModel[];
    // userCategoryPostsPageToken?: string;
    // userCategoryPostsLoading: boolean;
    // userCategoryPostsErrorReason?: string;
    // userCategoryPostsHasMore: boolean;
    // userCategoryPostsKeyword?: string;
    // currentUserCategory?: string; // 현재 사용자 분류; `${user}${category}`; 데이터 소스 초기화에 사용
    // userCategoryPostsUser: IUserModel;
    // userCategoryPostsCategory: ICategoryModel;

    /** tag posts */
    // tagPosts: IPostModel[];
    // tagPostsPageToken?: string;
    // tagPostsLoading: boolean;
    // tagPostsErrorReason?: string;
    // tagPostsHasMore: boolean;
    // tagPostsKeyword?: string;
    // currentTag?: ITagModel;
    // currentTagSlug?: string;

    /** search posts */
    // searchPosts: IPostModel[];
    // searchPostsPageToken?: string;
    // searchPostsLoading: boolean;
    // searchPostsErrorReason?: string;
    // searchPostsHasMore: boolean;
    // searchPostsKeyword?: string;

    /** like post */
    likePostLoading: boolean;
    likePostErrorMessage?: string;
}

export interface ISettingState {
    currentUrl: string;
    // baseUrl: string;
}

export interface IUserState {
    me: IUserModel;
    signInFailMessage?: string;
    signInInProcess: boolean;
    token?: string;

    // sign Up
    signUpFailMessage: string;
    signUpInProcess: boolean;
    signUpSuccess: boolean;

    loadingChangePassword: boolean;
    changePasswordSuccess: boolean;

    loadingChangeInfo: boolean;
    changeInfoSuccess: boolean;

    // sign out
    signOutLoading: boolean;
    signOutErrorReason?: string;
    signOutReturnUrl?: string;

    // verify email
    verifyEmailInfo: any; // todo type email
    verifyEmailLoading: boolean;
    verifyEmailErrorReason?: string;

    // make verify email code
    makeVerifyEmailLoading: boolean;
    makeVerifyEmailErrorReason?: string;

    // request reset password
    requestResetPasswordLoading: boolean;
    requestResetPasswordErrorReason?: string;

    // reset password
    resetPasswordLoading: boolean;
    resetPasswordErrorReason?: string;
    resetPasswordSuccess: boolean;

    // unregister
    unregisterLoading: boolean;
    unregisterErrorReason?: string;
    unregisterSuccess: boolean;
}

export interface IPostsState {
    posts: IPostModel[];
    /** posts loading */
    loadingPosts: boolean;
    hasMorePost: boolean;
    loadPostErrorReason?: string;
    postsLimit: number;
    nextPageToken: string;
    currentPage?: number;
    searchKeyword: string;
}

export interface ITagPostsState {
    /** tag posts */
    tagPosts: IPostModel[];
    tagPostsPageToken: string;
    tagPostsLoading: boolean;
    tagPostsErrorReason?: string;
    tagPostsHasMore: boolean;
    tagPostsKeyword: string;
    currentTag: ITagModel;
    currentTagSlug: string;
    hasMorePost: boolean;
    postsLimit: number;
    currentPage?: number;
}

export interface IUserCategoryPostsState {
    userCategoryPosts: IPostModel[];
    userCategoryPostsPageToken?: string;
    userCategoryPostsLoading: boolean;
    userCategoryPostsErrorReason?: string;
    userCategoryPostsHasMore: boolean;
    userCategoryPostsKeyword?: string;
    currentUserCategory?: string; // 현재 사용자 분류; `${user}${category}`; 데이터 소스 초기화에 사용
    userCategoryPostsUser: IUserModel;
    userCategoryPostsCategory: ICategoryModel;
    postsLimit: number;
    currentPage?: number;
}

export interface ISearchPostsState {
    /** search posts */
    searchPosts: IPostModel[];
    searchPostsPageToken?: string;
    searchPostsLoading: boolean;
    searchPostsErrorReason?: string;
    searchPostsHasMore: boolean;
    searchPostsKeyword?: string;
    postsLimit: number;
    searchPostsCurrentPage: number;
}

export interface IUsersPostsState {
    /** users posts */
    usersPosts: IPostModel[];
    // usersPostsPageToken?: string;
    currentPage?: number;
    loadingUsersPosts: boolean;
    loadUsersPostsErrorReason?: string;
    hasMoreUsersPosts: boolean;
    currentUser?: IUserModel;
    currentUsername?: string; // 현재 선택된 사용자; 데이터 소스 초기화에 사용
    postsLimit: number;
}

export interface ISinglePostState {
    singlePost?: IPostModel;
    loadSinglePostErrorReason?: string;

    /** post loading  */
    loadingPost: boolean;
    // isSinglePost: boolean;
    // currentCategory?: string;
}
