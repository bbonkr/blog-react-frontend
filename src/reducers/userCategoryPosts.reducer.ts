import { IUserCategoryPostsState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';
import { UserCategoryPostsHandler } from './hanlders/userCategoryPosts.handler';

export const initialState: IUserCategoryPostsState = {
    userCategoryPosts: [],
    userCategoryPostsPageToken: '',
    userCategoryPostsLoading: false,
    userCategoryPostsErrorReason: '',
    userCategoryPostsHasMore: false,
    userCategoryPostsKeyword: '',
    currentUserCategory: '', // 현재 사용자 분류; `${user}${category}`; 데이터 소스 초기화에 사용
    userCategoryPostsUser: null,
    userCategoryPostsCategory: null,
    postsLimit: 10, // TODO 상수로 변경
};

const reducer = (
    state: IUserCategoryPostsState = initialState,
    action: IBlogAction,
) =>
    produce(state, (draft) => {
        const handler = new UserCategoryPostsHandler({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_USER_CATEGORY_POSTS_CALL:
                // const { page } = action.data;
                // draft.userCategoryPostsLoading = true;
                // draft.userCategoryPosts = action.data.pageToken
                //     ? draft.userCategoryPosts
                //     : [];
                // draft.userCategoryPostsHasMore = action.data.pageToken
                //     ? draft.userCategoryPostsHasMore
                //     : true;
                // draft.userCategoryPostsErrorReason = '';

                // draft.currentUserCategory = `${action.data.user}${action.data.category}`;
                // draft.userCategoryPostsKeyword = action.data.keyword;
                // // draft.userCategoryPostsUser = null;
                // // draft.userCategoryPostsCategory = null;
                handler.loadUserCategoryPostsCall();
                break;
            case actionTypes.LOAD_USER_CATEGORY_POSTS_DONE:
                // const {
                //     records,
                //     total,
                //     user,
                //     category,
                //     page,
                //     limit,
                //     keyword,
                // } = action.data;

                // records.forEach((v) => {
                //     const index = draft.userCategoryPosts.findIndex(
                //         (x) => x.id === v.id,
                //     );
                //     if (index < 0) {
                //         draft.userCategoryPosts.push(v);
                //         draft.userCategoryPostsPageToken = `${v.id}`;
                //     }
                // });

                // draft.userCategoryPostsHasMore =
                //     records.length === draft.postsLimit;

                // draft.userCategoryPostsUser = user;
                // draft.userCategoryPostsCategory = category;

                // draft.currentPage = page;
                // draft.userCategoryPostsLoading = false;
                handler.loadUserCategoryPostsDone();
                break;
            case actionTypes.LOAD_USER_CATEGORY_POSTS_FAIL:
                // draft.userCategoryPostsErrorReason = action.message;
                // draft.userCategoryPostsLoading = false;
                handler.loadUserCategoryPostsFail();
                break;
            case actionTypes.UPDATE_CATEGORY_POSTS_LIKERS:
                handler.updateCategoryPostsLikers();
                break;
            default:
                break;
        }
    });

export default reducer;
