import produce from 'immer';
import { ShowNotification } from '../components/ShowNotification';
import { actionTypes } from './actionTypes';
import { PostHandler } from './hanlders/post.handler';
import { IPostState } from '../typings/reduxStates';

export const initialState: IPostState = {
    /** posts */
    // posts: [],
    // /** posts loading */
    // loadingPosts: false,
    // hasMorePost: true,
    // loadPostErrorReason: '',
    // postsLimit: 10,
    // nextPageToken: '',
    // currentPage: 1,
    // searchKeyword: '',

    /** singlePost */
    // singlePost: null,
    // loadSinglePostErrorReason: '',
    /** post loading  */
    // loadingPost: false,
    // isSinglePost: false,
    // currentCategory: '',

    writingPost: false,

    // /** users posts */
    // usersPosts: [],
    // usersPostsPageToken: '',
    // loadingUsersPosts: false,
    // loadUsersPostsErrorReason: '',
    // hasMoreUsersPosts: false,
    // currentUser: '', // 현재 선택된 사용자; 데이터 소스 초기화에 사용

    /** users category posts */
    // userCategoryPosts: [],
    // userCategoryPostsPageToken: '',
    // userCategoryPostsLoading: false,
    // userCategoryPostsErrorReason: '',
    // userCategoryPostsHasMore: false,
    // userCategoryPostsKeyword: '',
    // currentUserCategory: '', // 현재 사용자 분류; `${user}${category}`; 데이터 소스 초기화에 사용
    // userCategoryPostsUser: null,
    // userCategoryPostsCategory: null,

    /** tag posts */
    // tagPosts: [],
    // tagPostsPageToken: '',
    // tagPostsLoading: false,
    // tagPostsErrorReason: '',
    // tagPostsHasMore: false,
    // tagPostsKeyword: '',
    // currentTag: null,
    // currentTagSlug: '',

    /** search posts */
    // searchPosts: [],
    // searchPostsPageToken: '',
    // searchPostsLoading: false,
    // searchPostsErrorReason: '',
    // searchPostsHasMore: false,
    // searchPostsKeyword: '',

    /** like post */
    likePostLoading: false,
    likePostErrorMessage: '',
};

/**
 * 글의 좋아요 사용자를 갱신합니다.
 * @param {*} source Array<Post> 또는 Post object
 * @param {*} update Likers 가 업데이트된 Post object
 */
const updatePostLikers = (source, update) => {
    if (source == null) {
        return;
    }

    let post: any = {};

    if (Array.isArray(source)) {
        // posts
        post = source.find((x) => x.id === update.id);
    } else {
        post = source;
    }

    if (post == null) {
        return;
    }

    post.likers = update.likers;
};

const reducer = (state: IPostState = initialState, action) =>
    produce(state, (draft) => {
        // https://lannstark.github.io/nodejs/console/3
        // console.log('\u001b[34mdispatch ==> \u001b[0m', action.type);
        const handler = new PostHandler({ draft, action });

        switch (action.type) {
            // case actionTypes.LOAD_POSTS_CALL:
            //     handler.loadPostsCall();
            //     break;

            // todo LOAD_CATEGORY_POSTS_CALL 처리안됨. 사용처가 없으면 제거
            // case actionTypes.LOAD_CATEGORY_POSTS_CALL:
            //     handler.loadCategoryPostsCall();
            //     break;
            // // case actionTypes.LOAD_POSTS_DONE:
            // //     handler.loadPostsDone();
            // //     break;
            // case actionTypes.LOAD_CATEGORY_POSTS_DONE:
            //     handler.loadCategoryPostsDone();
            //     break;
            // // case actionTypes.LOAD_POSTS_FAIL:
            // //     handler.loadPostsFail();
            // //     break;
            // case actionTypes.LOAD_CATEGORY_POSTS_FAIL:
            //     handler.loadCategoryPostsFail();
            //     break;
            // LOAD_CATEGORY_POSTS_CALL 처리안됨. 사용처가 없으면 제거

            // users/:user/posts
            // case actionTypes.LOAD_USERS_POSTS_CALL:
            //     handler.loadUsersPostsCall();
            //     break;
            // case actionTypes.LOAD_USERS_POSTS_DONE:
            //     handler.loadUsersPostsDone();
            //     break;
            // case actionTypes.LOAD_USERS_POSTS_FAIL:
            //     // draft.loadingUsersPosts = false;
            //     // draft.loadUsersPostsErrorReason = action.reason;
            //     handler.loadUsersPostsFail();
            //     break;

            // case actionTypes.LOAD_USER_CATEGORY_POSTS_CALL:
            //     draft.userCategoryPostsLoading = true;
            //     draft.userCategoryPosts = action.data.pageToken
            //         ? draft.userCategoryPosts
            //         : [];
            //     draft.userCategoryPostsHasMore = action.data.pageToken
            //         ? draft.userCategoryPostsHasMore
            //         : true;
            //     draft.userCategoryPostsErrorReason = '';

            //     draft.currentUserCategory = `${action.data.user}${action.data.category}`;
            //     draft.userCategoryPostsKeyword = action.data.keyword;
            //     // draft.userCategoryPostsUser = null;
            //     // draft.userCategoryPostsCategory = null;
            //     break;
            // case actionTypes.LOAD_USER_CATEGORY_POSTS_DONE:
            //     action.data.records.forEach((v) => {
            //         const index = draft.userCategoryPosts.findIndex(
            //             (x) => x.id === v.id,
            //         );
            //         if (index < 0) {
            //             draft.userCategoryPosts.push(v);
            //             draft.userCategoryPostsPageToken = `${v.id}`;
            //         }
            //     });
            //     draft.userCategoryPostsHasMore =
            //         action.data.records.length === draft.postsLimit;
            //     draft.userCategoryPostsUser = action.data.user;
            //     draft.userCategoryPostsCategory = action.data.category;
            //     draft.userCategoryPostsLoading = false;
            //     break;
            // case actionTypes.LOAD_USER_CATEGORY_POSTS_FAIL:
            //     draft.userCategoryPostsErrorReason = action.reason;
            //     draft.userCategoryPostsLoading = false;
            //     break;
            // single post
            // case actionTypes.LOAD_SINGLE_POST_CALL:
            //     draft.singlePost = null;
            //     draft.isSinglePost = true;
            //     draft.loadSinglePostErrorReason = '';
            //     draft.loadingPost = true;
            //     break;
            // case actionTypes.LOAD_SINGLE_POST_DONE:
            //     draft.singlePost = action.data;
            //     draft.loadingPost = false;
            //     break;
            // case actionTypes.LOAD_SINGLE_POST_FAIL:
            //     draft.loadSinglePostErrorReason = action.reason;
            //     draft.loadingPost = false;
            //     break;
            // tag posts
            // case actionTypes.LOAD_TAG_POSTS_CALL:
            //     draft.tagPosts = action.data.pageToken ? draft.tagPosts : [];
            //     draft.hasMorePost = action.data.pageToken
            //         ? draft.tagPostsHasMore
            //         : true;
            //     draft.tagPostsLoading = true;
            //     draft.tagPostsErrorReason = '';
            //     break;
            // case actionTypes.LOAD_TAG_POSTS_DONE:
            //     action.data.records.forEach((v) => {
            //         const index = draft.tagPosts.findIndex(
            //             (x) => x.id === v.id,
            //         );
            //         if (index < 0) {
            //             draft.tagPosts.push(v);
            //             draft.tagPostsPageToken = `${v.id}`;
            //         }
            //     });
            //     draft.tagPostsHasMore =
            //         action.data.records.length === draft.postsLimit;
            //     draft.tagPostsLoading = false;
            //     draft.tagPostsKeyword = action.keyword;
            //     draft.currentTag = action.data.tag;
            //     draft.currentTagSlug = action.tag;
            //     break;
            // case actionTypes.LOAD_TAG_POSTS_FAIL:
            //     draft.tagPostsLoading = false;
            //     draft.tagPostsErrorReason = action.reason;
            //     break;
            // case actionTypes.LOAD_SEARCH_POSTS_CALL:
            //     draft.searchPostsLoading = true;
            //     draft.searchPostsErrorReason = '';
            //     draft.searchPosts = action.data.pageToken
            //         ? draft.searchPosts
            //         : [];
            //     draft.searchPostsHasMore = action.data.pageToken
            //         ? draft.searchPostsHasMore
            //         : true;
            //     break;
            // case actionTypes.LOAD_SEARCH_POSTS_DONE:
            //     draft.searchPostsLoading = false;
            //     action.data.records.forEach((v) => {
            //         const index = draft.searchPosts.findIndex(
            //             (x) => x.id === v.id,
            //         );
            //         if (index < 0) {
            //             draft.searchPosts.push(v);
            //             draft.searchPostsPageToken = `${v.id}`;
            //         }
            //     });
            //     draft.searchPostsHasMore =
            //         action.data.records.length === draft.postsLimit;
            //     draft.searchPostsKeyword = action.keyword;
            //     break;
            // case actionTypes.LOAD_SEARCH_POSTS_FAIL:
            //     draft.searchPostsLoading = false;
            //     draft.searchPostsErrorReason = action.reason;
            //     break;

            case actionTypes.ADD_LIKE_POST_CALL:
                draft.likePostLoading = true;
                draft.likePostErrorMessage = '';
                break;
            case actionTypes.ADD_LIKE_POST_DONE:
                // todo update posts like
                // updatePostLikers(draft.posts, action.data);
                // todo update single post like
                // updatePostLikers(draft.singlePost, action.data);
                // todo update usersPosts like
                // updatePostLikers(draft.usersPosts, action.data);
                // todo update tagPosts like
                // updatePostLikers(draft.tagPosts, action.data);
                // todo update userCategoryPosts like
                // updatePostLikers(draft.userCategoryPosts, action.data);
                // todo update searchPosts
                // updatePostLikers(draft.searchPosts, action.data);

                draft.likePostLoading = false;
                draft.likePostErrorMessage = '';

                break;
            case actionTypes.ADD_LIKE_POST_FAIL:
                draft.likePostLoading = false;
                draft.likePostErrorMessage = action.reason;

                ShowNotification({
                    title: 'Notification',
                    message: action.reason,
                    onClick: null,
                    icon: null,
                });
                break;

            case actionTypes.REMOVE_LIKE_POST_CALL:
                draft.likePostLoading = true;
                draft.likePostErrorMessage = '';
                break;
            case actionTypes.REMOVE_LIKE_POST_DONE:
                // todo update posts like
                // updatePostLikers(draft.posts, action.data);
                // todo update single post like
                // updatePostLikers(draft.singlePost, action.data);
                // todo update usersPosts like
                // updatePostLikers(draft.usersPosts, action.data);
                // todo update tagPosts like
                // updatePostLikers(draft.tagPosts, action.data);
                // todo update userCategoryPosts like
                // updatePostLikers(draft.userCategoryPosts, action.data);
                // todo update searchPosts
                // updatePostLikers(draft.searchPosts, action.data);

                draft.likePostLoading = false;
                draft.likePostErrorMessage = '';
                break;
            case actionTypes.REMOVE_LIKE_POST_FAIL:
                draft.likePostLoading = false;
                draft.likePostErrorMessage = action.reason;

                ShowNotification({
                    title: 'Notification',
                    message: action.reason,
                    onClick: null,
                    icon: null,
                });
                break;

            default:
                break;
        }
    });

export default reducer;
