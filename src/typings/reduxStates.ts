import {
    PostModel,
    CategoryModel,
    TagModel,
    UserModel,
    ImageModel,
} from './dto';

export interface RootState {
    user: UserState;
    post: PostState;
    category: CategoryState;
    settings?: SettingState;
    me: MeState;
    myPosts: MyPostsState;
    myCategories: MyCategoriesState;
    mediaFiles: MediaFilesState;
    posts: PostsState;
    tagPosts: TagPostsState;
    userCategoryPosts: UserCategoryPostsState;
    searchPosts: SearchPostsState;
    usersPosts: UsersPostsState;
    singlePost: SinglePostState;
}

export interface MeState {
    // myPost: IPostModel;
    // loadingMyPost: boolean;

    // myPosts
    // myPosts: IPostModel[];
    // loadingMyPosts: boolean;
    // postsLimit: number;
    // hasMorePost: boolean;
    // searchKeyword?: string;
    // postsCount: number;
    // postsCurrentPage?: number;
    // loadMyPostsErrorReason?: string;

    // category
    // categories: ICategoryModel[];
    // categoriesLoading: boolean;
    // categoriesErrorReason?: string;
    // categoriesHasMore: boolean;
    //   categoriesLimit: number;
    // categoriesCount: number;
    // categoriesCurrentPage: number;

    // tag
    tags: TagModel[];
    loadingTags: boolean;

    TagsErrorReason?: string;

    // myPostErrorReason?: string;
    // myPostWriting: boolean;
    // writePostErrorReason?: string;

    // // media
    // mediaFiles: IImageModel[];
    // // mediaFilesNextPageToken?: string;
    // mediaFilesSearchKeyword?: string;
    // mediaFilesCurrentPage?: number;
    // mediaFilesCount: number;
    // mediaFilesLimit: number;
    // mediaFilesHasMore: boolean;
    // mediaFilesLoading: boolean;
    // mediaFilesErrorReason?: string;
    // mediaFilesUploading: boolean;

    // menu
    sideMenuCollapsed: boolean;

    // liked
    likedPosts: PostModel[];
    likedPostsLoading: boolean;
    likedPostsKeyword?: string;
    likedPostsErrorReason?: string;
    likedPostsLimit: number;
    likedPostsHasMore: boolean;
    // likedPostsPageToken?: string;
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

export interface CategoryState {
    categories: CategoryModel[];
    loadingCategories: boolean;
}

export interface PostState {
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

export interface SettingState {
    currentUrl: string;
    // baseUrl: string;
}

export interface UserState {
    me: UserModel;
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

export interface PostsState {
    posts: PostModel[];
    /** posts loading */
    loadingPosts: boolean;
    hasMorePost: boolean;
    loadPostErrorReason?: string;
    postsLimit: number;
    // nextPageToken: string;
    currentPage?: number;
    searchKeyword: string;
}

export interface TagPostsState {
    /** tag posts */
    tagPosts: PostModel[];
    // tagPostsPageToken: string;
    tagPostsLoading: boolean;
    tagPostsErrorReason?: string;
    tagPostsHasMore: boolean;
    tagPostsKeyword: string;
    currentTag: TagModel;
    currentTagSlug: string;
    hasMorePost: boolean;
    postsLimit: number;
    currentPage?: number;
}

export interface UserCategoryPostsState {
    userCategoryPosts: PostModel[];
    // userCategoryPostsPageToken?: string;
    userCategoryPostsLoading: boolean;
    userCategoryPostsErrorReason?: string;
    userCategoryPostsHasMore: boolean;
    userCategoryPostsKeyword?: string;
    currentUserCategory?: string; // 현재 사용자 분류; `${user}${category}`; 데이터 소스 초기화에 사용
    userCategoryPostsUser: UserModel;
    userCategoryPostsCategory: CategoryModel;
    postsLimit: number;
    currentPage?: number;
}

export interface SearchPostsState {
    /** search posts */
    searchPosts: PostModel[];
    // searchPostsPageToken?: string;
    searchPostsLoading: boolean;
    searchPostsErrorReason?: string;
    searchPostsHasMore: boolean;
    searchPostsKeyword?: string;
    postsLimit: number;
    searchPostsCurrentPage: number;
}

export interface UsersPostsState {
    /** users posts */
    usersPosts: PostModel[];
    // usersPostsPageToken?: string;
    currentPage?: number;
    loadingUsersPosts: boolean;
    loadUsersPostsErrorReason?: string;
    hasMoreUsersPosts: boolean;
    currentUser?: UserModel;
    currentUsername?: string; // 현재 선택된 사용자; 데이터 소스 초기화에 사용
    postsLimit: number;
}

export interface SinglePostState {
    singlePost?: PostModel;
    loadSinglePostErrorReason?: string;

    /** post loading  */
    loadingPost: boolean;
    // isSinglePost: boolean;
    // currentCategory?: string;
}

export interface MyPostsState {
    // myPosts
    myPosts: PostModel[];
    myPostsLoading: boolean;
    myPostsLimit: number;
    myPostsHasMore: boolean;
    myPostsSearchKeyword?: string;
    myPostsCount: number;
    myPostsCurrentPage?: number;
    myPostsErrorReason?: string;

    // myPost
    myPost: PostModel;
    myPostLoading: boolean;
    myPostErrorReason?: string;

    myPostWriting: boolean;
    writePostErrorReason?: string;
}

export interface MyCategoriesState {
    categories: CategoryModel[];
    categoriesLoading: boolean;
    categoriesErrorReason?: string;
    categoriesHasMore: boolean;
    categoriesLimit: number;
    categoriesCount: number;
    categoriesCurrentPage: number;
}

export interface MediaFilesState {
    // media
    mediaFiles: ImageModel[];
    // mediaFilesNextPageToken?: string;
    mediaFilesSearchKeyword?: string;
    mediaFilesCurrentPage?: number;
    mediaFilesCount: number;
    mediaFilesLimit: number;
    mediaFilesHasMore: boolean;
    mediaFilesLoading: boolean;
    mediaFilesErrorReason?: string;
    mediaFilesUploading: boolean;
}
