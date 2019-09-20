import produce from 'immer';
import { ShowNotification } from '../components/ShowNotification';
import Router from 'next/router';
import { actionTypes } from './actionTypes';
import { IPostModel } from '../typings/dto';
import { IBlogAction } from '../typings/IBlogAction';
import { MeHanlder } from './hanlders/me.handler';
import { IMeState } from '../typings/reduxStates';

export const initialState: IMeState = {
    myPosts: [],
    postsLimit: 10,
    hasMorePost: false,
    // searchKeyword: '',
    nextPageToken: '',
    postsCount: 0,

    // category
    categories: [],
    loadingCategories: false,
    loadCategoriesErrorReason: '',
    hasMoreCategories: false,
    // categorySearchKeyword: '',
    categoryNextPageToken: '',
    categoryLimit: 10,
    categoriesCount: 0,
    categoriesCurrentPage: 1,

    // tag
    tags: [],
    myPost: null,
    loadingMyPost: false,

    loadingTags: false,
    loadingMyPosts: false,

    loadTagsErrorReason: '',
    loadMyPostsErrorReason: '',
    loadMyPostErrorReason: '',
    writingPost: false,
    writePostErrorReason: '',

    // media
    mediaFiles: [],
    // mediaFilesNextPageToken: '',
    mediaFilesSearchKeyword: '',
    mediaFilesCount: 0,
    mediaFilesLimit: 10,
    hasMoreMediaFiles: false,
    loadingMediaFiles: false,
    loadMediaFilesErrorReason: '',
    uploading: false,
    mediaFilesCurrentPage: 1,

    // menu
    sideMenuCollapsed: false,

    // liked
    likedPosts: [],
    likedPostsLoading: false,
    likedPostsKeyword: '',
    likedPostsErrorReason: '',
    likedPostsLimit: 3,
    likedPostsHasMore: false,
    likedPostsPageToken: '',
    likedPostsTotal: 0,

    // stat - general
    statGeneral: null,
    statGeneralLoading: false,
    statGeneralErrorReason: '',

    statRead: null,
    statReadLoading: false,
    statReadErrorReason: '',
};

const reducer = (state: IMeState = initialState, action: IBlogAction) =>
    produce(state, (draft) => {
        // https://lannstark.github.io/nodejs/console/3
        // console.log('\u001b[34mdispatch ==> \u001b[0m', action.type);
        const handler = new MeHanlder({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_MY_POSTS_CALL:
                // draft.myPosts = action.data.pageToken ? draft.myPosts : [];
                // draft.hasMorePost = action.data.pageToken
                //     ? draft.hasMorePost
                //     : true;
                // draft.loadingMyPosts = true;
                // draft.loadMyPostsErrorReason = '';
                handler.loadMyPostCall();
                break;
            case actionTypes.LOAD_MY_POSTS_DONE:
                // draft.loadingMyPosts = false;

                // const resultData: IListResult<
                //     IPostModel
                // > = action.data as IListResult<IPostModel>;

                // resultData.records.forEach((v) => {
                //     const postIndex = draft.myPosts.findIndex(
                //         (x) => x.id === v.id,
                //     );
                //     if (postIndex < 0) {
                //         draft.myPosts.push(v);
                //         draft.nextPageToken = `${v.id}`;
                //     }
                // });
                // draft.hasMorePost = action.data.length === draft.postsLimit;
                // draft.loadingMyPosts = false;
                // // draft.searchKeyword = action.keyword;
                // draft.postsCount = resultData.total;
                handler.loadMyPostsDone(action);
                break;
            case actionTypes.LOAD_MY_POSTS_FAIL:
                draft.loadingMyPosts = false;
                draft.loadMyPostsErrorReason = action.message;
                break;

            case actionTypes.LOAD_MY_POST_CALL:
                draft.loadingMyPost = true;
                draft.loadMyPostErrorReason = '';
                break;
            case actionTypes.LOAD_MY_POST_DONE:
                draft.loadingMyPost = false;
                draft.myPost = action.data as IPostModel;
                break;
            case actionTypes.LOAD_MY_POST_FAIL:
                draft.loadingMyPost = false;
                draft.loadMyPostErrorReason = action.message;
                break;

            case actionTypes.LOAD_MY_CATEGORIES_CALL:
                // draft.loadingCategories = true;
                // draft.categories = action.data.pageToken
                //     ? draft.categories
                //     : [];
                // draft.hasMoreCategories = action.data.pageToken
                //     ? draft.hasMoreCategories
                //     : true;
                // draft.loadCategoriesErrorReason = '';
                handler.loadMyCategoriesCall();
                break;
            case actionTypes.LOAD_MY_CATEGORIES_DONE:
                // draft.loadingCategories = false;
                // // draft.categories = action.data;
                // const { records, total } = action.data as IListResult<
                //     ICategoryModel
                // >;

                // records.forEach((v) => {
                //     const postIndex = draft.categories.findIndex(
                //         (x) => x.id === v.id,
                //     );
                //     if (postIndex < 0) {
                //         draft.categories.push(v);
                //         draft.categoryNextPageToken = `${v.id}`;
                //     }
                // });
                // draft.categoriesCount = total;
                // draft.hasMoreCategories =
                //     action.data.items.length === draft.categoryLimit;
                // // draft.categorySearchKeyword = action.keyword;
                // // draft.categoriesCount = total;
                handler.loadMyCategoriesDone(action);
                break;
            case actionTypes.LOAD_MY_CATEGORIES_FAIL:
                // draft.loadingCategories = false;
                // draft.loadCategoriesErrorReason = action.message;
                handler.loadMyCategoriesFail();
                break;

            case actionTypes.LOAD_MY_TAGS_CALL:
                draft.loadingTags = true;
                break;
            case actionTypes.LOAD_MY_TAGS_DONE:
                // const { records, totla } = action.data as IListResult<
                //     ITagModel
                // >;
                // draft.loadingTags = false;
                // draft.tags = records;
                handler.loadMyTagsDone(action);
                break;
            case actionTypes.LOAD_MY_TAGS_FAIL:
                draft.loadingTags = false;
                break;

            case actionTypes.WRITE_POST_CALL:
                draft.writingPost = true;
                break;
            case actionTypes.WRITE_POST_DONE:
                draft.writingPost = false;
                // draft.myPost = action.data;
                ShowNotification({
                    title: 'Saved.',
                    message: 'Your request is success.',
                    onClick: null,
                    icon: null,
                });

                Router.push(
                    {
                        pathname: '/me/write',
                        query: { id: action.data.id },
                    },
                    `/me/write/${action.data.id}`,
                );
                break;
            case actionTypes.WRITE_POST_FAIL:
                draft.writingPost = false;
                break;
            case actionTypes.EDIT_POST_CALL:
                draft.writingPost = true;
                break;
            case actionTypes.EDIT_POST_DONE:
                draft.writingPost = false;
                // draft.myPost = action.data;
                ShowNotification({
                    title: 'Saved.',
                    message: 'Your request is success.',
                    onClick: null,
                    icon: null,
                });
                Router.push(
                    {
                        pathname: '/me/write',
                        query: { id: action.data.id },
                    },
                    `/me/write/${action.data.id}`,
                );
                break;
            case actionTypes.EDIT_POST_FAIL:
                draft.writingPost = false;
                break;
            case actionTypes.WRITE_NEW_POST_CALL:
                // draft.myPost = null;
                break;
            case actionTypes.WRITE_NEW_POST_DONE:
                draft.myPost = null;
                break;
            case actionTypes.WRITE_NEW_POST_FAIL:
                break;

            case actionTypes.DELETE_POST_CALL:
                draft.loadingMyPosts = true;
                break;
            case actionTypes.DELETE_POST_DONE:
                const index = draft.myPosts.findIndex(
                    (x) => x.id === action.data.id,
                );
                draft.myPosts.splice(index, 1);
                draft.loadingMyPosts = false;
                break;
            case actionTypes.DELETE_POST_FAIL:
                // console.log(action.reason);
                draft.loadingMyPosts = false;
                break;

            case actionTypes.LOAD_MY_MEDIA_FILES_CALL:
                draft.mediaFiles = action.data.page ? draft.mediaFiles : [];
                draft.hasMoreMediaFiles = action.data.page
                    ? draft.hasMoreMediaFiles
                    : true;
                draft.loadingMediaFiles = true;
                draft.loadMediaFilesErrorReason = '';
                break;
            case actionTypes.LOAD_MY_MEDIA_FILES_DONE:
                action.data.records.forEach((v) => {
                    const mediaIndex = draft.mediaFiles.findIndex(
                        (x) => x.id === v.id,
                    );
                    if (mediaIndex < 0) {
                        draft.mediaFiles.push(v);
                    }
                });

                draft.hasMoreMediaFiles =
                    action.data.records.length === draft.mediaFilesLimit;
                draft.loadingMediaFiles = false;
                draft.mediaFilesSearchKeyword = action.message;
                draft.mediaFilesCurrentPage = action.data.page;
                break;
            case actionTypes.LOAD_MY_MEDIA_FILES_FAIL:
                draft.loadingMediaFiles = true;
                draft.loadMediaFilesErrorReason = action.message;
                break;
            case actionTypes.UPLOAD_MY_MEDIA_FILES_CALL:
                draft.uploading = true;
                break;
            case actionTypes.UPLOAD_MY_MEDIA_FILES_DONE:
                draft.mediaFiles = action.data.records.concat(draft.mediaFiles);
                draft.uploading = false;
                break;
            case actionTypes.UPLOAD_MY_MEDIA_FILES_FAIL:
                draft.uploading = false;
                break;
            case actionTypes.DELETE_MY_MEDIA_FILES_CALL:
                draft.uploading = true;
                break;
            case actionTypes.DELETE_MY_MEDIA_FILES_DONE:
                const foundId = draft.mediaFiles.findIndex(
                    (x) => x.id === action.data.id,
                );
                draft.mediaFiles.splice(foundId, 1);
                draft.uploading = false;
                break;
            case actionTypes.DELETE_MY_MEDIA_FILES_FAIL:
                draft.uploading = false;
                break;

            // edit category
            case actionTypes.EDIT_MY_CATEGORY_CALL:
                draft.loadingCategories = true;
                break;
            case actionTypes.EDIT_MY_CATEGORY_DONE:
                // const foundCategoryIndex = draft.categories.findIndex(
                //     (v) => v.id === action.data.id,
                // );
                // if (foundCategoryIndex < 0) {
                //     draft.categories.push(action.data);
                //     draft.categoriesCount = draft.categoriesCount + 1;
                // } else {
                //     draft.categories[foundCategoryIndex] = action.data;
                // }

                // draft.categories
                //     .filter(
                //         (v) =>
                //             v.id !== action.data.id &&
                //             v.ordinal >= action.data.ordinal,
                //     )
                //     .forEach((v) => {
                //         v.ordinal = v.ordinal + 1;
                //     });

                // draft.categories = draft.categories
                //     .sort((a, b) => {
                //         return a.ordinal > b.ordinal ? 1 : -1;
                //     })
                //     .map((v, i) => {
                //         v.ordinal = i + 1;
                //         return v;
                //     });

                // draft.loadingCategories = false;
                handler.editMyCategoryDone(action);
                break;
            case actionTypes.EDIT_MY_CATEGORY_FAIL:
                draft.loadingCategories = false;

                break;

            // delete category
            case actionTypes.DELETE_MY_CATEGORY_CALL:
                draft.loadingCategories = true;
                break;
            case actionTypes.DELETE_MY_CATEGORY_DONE:
                const foundDeletedCategoryIndex = draft.categories.findIndex(
                    (v) => v.id === action.data.id,
                );
                draft.categories.splice(foundDeletedCategoryIndex, 1);

                draft.categories = draft.categories
                    .sort((a, b) => {
                        return a.ordinal > b.ordinal ? 1 : -1;
                    })
                    .map((v, i) => {
                        v.ordinal = i + 1;
                        return v;
                    });
                draft.categoriesCount = draft.categoriesCount - 1;
                draft.loadingCategories = false;
                break;
            case actionTypes.DELETE_MY_CATEGORY_FAIL:
                draft.loadingCategories = false;
                break;

            case actionTypes.SIDE_MENU_COLLAPSE:
                draft.sideMenuCollapsed = action.data.sideMenuCollapsed;
                break;

            case actionTypes.LOAD_LIKED_POSTS_CALL:
                draft.likedPostsLoading = true;
                draft.likedPosts = action.data.pageToken
                    ? draft.likedPosts
                    : [];
                draft.likedPostsHasMore = action.data.pageToken
                    ? draft.likedPostsHasMore
                    : true;
                draft.likedPostsErrorReason = '';
                break;
            case actionTypes.LOAD_LIKED_POSTS_DONE:
                // action.data.records.forEach((x) => {
                //     const post = draft.likedPosts.find(
                //         (v) => v.UserId === x.UserId && v.PostId === x.PostId,
                //     );
                //     if (!post) {
                //         draft.likedPosts.push(x);
                //         draft.likedPostsPageToken = `${x.UserId}|${x.PostId}`;
                //     }
                // });
                // draft.likedPostsTotal = action.data.total;
                // draft.likedPostsHasMore =
                //     action.data.records.length === draft.likedPostsLimit;
                // draft.likedPostsKeyword = action.keyword;
                // draft.likedPostsLoading = false;
                handler.loadLikedPostsDone(action);
                break;
            case actionTypes.LOAD_LIKED_POSTS_FAIL:
                draft.likedPostsLoading = false;
                draft.likedPostsErrorReason = action.message;
                break;

            // 통계
            case actionTypes.LOAD_STAT_GENERAL_CALL:
                draft.statGeneralLoading = true;
                break;
            case actionTypes.LOAD_STAT_GENERAL_DONE:
                draft.statGeneral = action.data;
                draft.statGeneralLoading = false;
                break;
            case actionTypes.LOAD_STAT_GENERAL_FAIL:
                draft.statGeneralLoading = false;
                draft.statGeneralErrorReason = action.message;
                break;

            // 통계 읽은수
            case actionTypes.LOAD_STAT_READ_CALL:
                draft.statReadLoading = true;
                break;
            case actionTypes.LOAD_STAT_READ_DONE:
                draft.statRead = action.data;
                draft.statReadLoading = false;
                break;
            case actionTypes.LOAD_STAT_READ_FAIL:
                draft.statReadErrorReason = action.message;
                draft.statReadLoading = false;
                break;

            default:
                break;
        }
    });

export default reducer;
