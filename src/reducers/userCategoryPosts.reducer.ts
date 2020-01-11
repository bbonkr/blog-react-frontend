import { UserCategoryPostsState } from '../typings/reduxStates';
import { BaseAction } from '../typings/BaseAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';
import { UserCategoryPostsHandler } from './hanlders/userCategoryPosts.handler';

export const initialState: UserCategoryPostsState = {
    userCategoryPosts: [],
    userCategoryPostsLoading: false,
    userCategoryPostsErrorReason: '',
    userCategoryPostsHasMore: false,
    userCategoryPostsKeyword: '',
    currentUserCategory: '', // 현재 사용자 분류; `${user}${category}`; 데이터 소스 초기화에 사용
    userCategoryPostsUser: null,
    userCategoryPostsCategory: null,
    postsLimit: 10, // TODO 상수로 변경
};

export const userCategoryPosts = (
    state: UserCategoryPostsState = initialState,
    action: BaseAction,
) =>
    produce(state, (draft) => {
        const handler = new UserCategoryPostsHandler({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_USER_CATEGORY_POSTS_CALL:
                handler.loadUserCategoryPostsCall();
                break;
            case actionTypes.LOAD_USER_CATEGORY_POSTS_DONE:
                handler.loadUserCategoryPostsDone();
                break;
            case actionTypes.LOAD_USER_CATEGORY_POSTS_FAIL:
                handler.loadUserCategoryPostsFail();
                break;
            case actionTypes.UPDATE_CATEGORY_POSTS_LIKERS:
                handler.updateCategoryPostsLikers();
                break;
            default:
                break;
        }
    });
