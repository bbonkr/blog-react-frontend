import produce from 'immer';
import { ShowNotification } from '../components/ShowNotification';
import Router from 'next/router';
import { actionTypes } from './actionTypes';
import { IPostModel } from '../typings/dto';
import { IBlogAction } from '../typings/IBlogAction';
import { MeHanlder } from './hanlders/me.handler';
import { IMeState } from '../typings/reduxStates';

export const initialState: IMeState = {
    // category
    // categories: [],
    // categoriesLoading: false,
    // categoriesErrorReason: '',
    // categoriesHasMore: false,
    // categoriesLimit: 10,
    // categoriesCount: 0,
    // categoriesCurrentPage: 1,

    // tag
    tags: [],
    loadingTags: false,

    // myPost: null,
    // loadingMyPost: false,

    TagsErrorReason: '',
    // myPostErrorReason: '',
    // myPostWriting: false,
    // writePostErrorReason: '',

    // media
    // mediaFiles: [],
    // // mediaFilesNextPageToken: '',
    // mediaFilesSearchKeyword: '',
    // mediaFilesCount: 0,
    // mediaFilesLimit: 10,
    // mediaFilesHasMore: false,
    // mediaFilesLoading: false,
    // mediaFilesErrorReason: '',
    // mediaFilesUploading: false,
    // mediaFilesCurrentPage: 1,

    // menu
    sideMenuCollapsed: false,

    // liked
    likedPosts: [],
    likedPostsLoading: false,
    likedPostsKeyword: '',
    likedPostsErrorReason: '',
    likedPostsLimit: 3,
    likedPostsHasMore: false,
    likedPostsTotal: 0,

    // stat - general
    statGeneral: null,
    statGeneralLoading: false,
    statGeneralErrorReason: '',

    statRead: null,
    statReadLoading: false,
    statReadErrorReason: '',
};

export const me = (state: IMeState = initialState, action: IBlogAction) =>
    produce(state, (draft) => {
        // https://lannstark.github.io/nodejs/console/3
        // console.log('\u001b[34mdispatch ==> \u001b[0m', action.type);
        const handler = new MeHanlder({ draft, action });
        switch (action.type) {
            // ==> myPosts.reducer
            // case actionTypes.LOAD_MY_POST_CALL:
            //     draft.loadingMyPost = true;
            //     draft.myPostErrorReason = '';
            //     break;
            // case actionTypes.LOAD_MY_POST_DONE:
            //     draft.loadingMyPost = false;
            //     draft.myPost = action.data.post as IPostModel;
            //     break;
            // case actionTypes.LOAD_MY_POST_FAIL:
            //     draft.loadingMyPost = false;
            //     draft.myPostErrorReason = action.message;
            //     break;

            // myCategories.reducer
            // case actionTypes.LOAD_MY_CATEGORIES_CALL:
            //     handler.loadMyCategoriesCall();
            //     break;
            // case actionTypes.LOAD_MY_CATEGORIES_DONE:
            //     handler.loadMyCategoriesDone(action);
            //     break;
            // case actionTypes.LOAD_MY_CATEGORIES_FAIL:
            //     handler.loadMyCategoriesFail();
            //     break;

            case actionTypes.LOAD_MY_TAGS_CALL:
                draft.loadingTags = true;
                break;
            case actionTypes.LOAD_MY_TAGS_DONE:
                handler.loadMyTagsDone(action);
                break;
            case actionTypes.LOAD_MY_TAGS_FAIL:
                draft.loadingTags = false;

                break;

            // ==> myPosts.reducer
            // case actionTypes.WRITE_POST_CALL:
            //     draft.myPostWriting = true;
            //     break;
            // case actionTypes.WRITE_POST_DONE:
            //     draft.myPostWriting = false;
            //     // draft.myPost = action.data;
            //     ShowNotification({
            //         title: 'Saved.',
            //         message: 'Your request is success.',
            //         onClick: null,
            //         icon: null,
            //     });

            //     Router.push(
            //         {
            //             pathname: '/me/write',
            //             query: { id: action.data.id },
            //         },
            //         `/me/write/${action.data.id}`,
            //     );
            //     break;
            // case actionTypes.WRITE_POST_FAIL:
            //     draft.myPostWriting = false;
            //     break;
            // case actionTypes.EDIT_POST_CALL:
            //     draft.myPostWriting = true;
            //     break;
            // case actionTypes.EDIT_POST_DONE:
            //     draft.myPostWriting = false;
            //     // draft.myPost = action.data;
            //     ShowNotification({
            //         title: 'Saved.',
            //         message: 'Your request is success.',
            //         onClick: null,
            //         icon: null,
            //     });
            //     Router.push(
            //         {
            //             pathname: '/me/write',
            //             query: { id: action.data.id },
            //         },
            //         `/me/write/${action.data.id}`,
            //     );
            //     break;
            // case actionTypes.EDIT_POST_FAIL:
            //     draft.myPostWriting = false;
            //     break;
            // case actionTypes.WRITE_NEW_POST_CALL:
            //     // draft.myPost = null;
            //     break;
            // case actionTypes.WRITE_NEW_POST_DONE:
            //     draft.myPost = null;
            //     break;
            // case actionTypes.WRITE_NEW_POST_FAIL:
            //     break;

            // ==> mediaFiles.reducer
            // case actionTypes.LOAD_MY_MEDIA_FILES_CALL:
            //     draft.mediaFiles = action.data.page ? draft.mediaFiles : [];
            //     draft.mediaFilesHasMore = action.data.page
            //         ? draft.mediaFilesHasMore
            //         : true;
            //     draft.mediaFilesLoading = true;
            //     draft.mediaFilesErrorReason = '';
            //     break;
            // case actionTypes.LOAD_MY_MEDIA_FILES_DONE:
            //     action.data.records.forEach((v) => {
            //         const mediaIndex = draft.mediaFiles.findIndex(
            //             (x) => x.id === v.id,
            //         );
            //         if (mediaIndex < 0) {
            //             draft.mediaFiles.push(v);
            //         }
            //     });

            //     draft.mediaFilesHasMore =
            //         action.data.records.length === draft.mediaFilesLimit;
            //     draft.mediaFilesLoading = false;
            //     draft.mediaFilesSearchKeyword = action.message;
            //     draft.mediaFilesCurrentPage = action.data.page;
            //     break;
            // case actionTypes.LOAD_MY_MEDIA_FILES_FAIL:
            //     draft.mediaFilesLoading = true;
            //     draft.mediaFilesErrorReason = action.message;
            //     break;
            // case actionTypes.UPLOAD_MY_MEDIA_FILES_CALL:
            //     draft.mediaFilesUploading = true;
            //     break;
            // case actionTypes.UPLOAD_MY_MEDIA_FILES_DONE:
            //     draft.mediaFiles = action.data.records.concat(draft.mediaFiles);
            //     draft.mediaFilesUploading = false;
            //     break;
            // case actionTypes.UPLOAD_MY_MEDIA_FILES_FAIL:
            //     draft.mediaFilesUploading = false;
            //     break;
            // case actionTypes.DELETE_MY_MEDIA_FILES_CALL:
            //     draft.mediaFilesUploading = true;
            //     break;
            // case actionTypes.DELETE_MY_MEDIA_FILES_DONE:
            //     const foundId = draft.mediaFiles.findIndex(
            //         (x) => x.id === action.data.id,
            //     );
            //     draft.mediaFiles.splice(foundId, 1);
            //     draft.mediaFilesUploading = false;
            //     break;
            // case actionTypes.DELETE_MY_MEDIA_FILES_FAIL:
            //     draft.mediaFilesUploading = false;
            //     break;

            // myCategories.reducer
            // // edit category
            // case actionTypes.EDIT_MY_CATEGORY_CALL:
            //     draft.categoriesLoading = true;
            //     break;
            // case actionTypes.EDIT_MY_CATEGORY_DONE:
            //     handler.editMyCategoryDone(action);
            //     break;
            // case actionTypes.EDIT_MY_CATEGORY_FAIL:
            //     draft.categoriesLoading = false;

            //     break;

            // // delete category
            // case actionTypes.DELETE_MY_CATEGORY_CALL:
            //     draft.categoriesLoading = true;
            //     break;
            // case actionTypes.DELETE_MY_CATEGORY_DONE:
            //     const foundDeletedCategoryIndex = draft.categories.findIndex(
            //         (v) => v.id === action.data.id,
            //     );
            //     draft.categories.splice(foundDeletedCategoryIndex, 1);

            //     draft.categories = draft.categories
            //         .sort((a, b) => {
            //             return a.ordinal > b.ordinal ? 1 : -1;
            //         })
            //         .map((v, i) => {
            //             v.ordinal = i + 1;
            //             return v;
            //         });
            //     draft.categoriesCount = draft.categoriesCount - 1;
            //     draft.categoriesLoading = false;
            //     break;
            // case actionTypes.DELETE_MY_CATEGORY_FAIL:
            //     draft.categoriesLoading = false;
            //     break;

            case actionTypes.SIDE_MENU_COLLAPSE:
                draft.sideMenuCollapsed = action.data.sideMenuCollapsed;
                break;

            case actionTypes.LOAD_LIKED_POSTS_CALL:
                draft.likedPostsLoading = true;
                draft.likedPosts = action.data.page ? draft.likedPosts : [];
                draft.likedPostsHasMore = action.data.page
                    ? draft.likedPostsHasMore
                    : true;
                draft.likedPostsErrorReason = '';
                break;
            case actionTypes.LOAD_LIKED_POSTS_DONE:
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
