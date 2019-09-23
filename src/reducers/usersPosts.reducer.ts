import { IUsersPostsState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';
import { UsersPostsHandler } from './hanlders/usersPosts.handler';

export const initialState: IUsersPostsState = {
    /** users posts */
    usersPosts: [],
    loadingUsersPosts: false,
    loadUsersPostsErrorReason: '',
    hasMoreUsersPosts: false,
    currentUser: null, // 현재 선택된 사용자; 데이터 소스 초기화에 사용
    currentUsername: '',
    currentPage: 1,
    postsLimit: 10, // TODO 상수로 변경
};

export const usersPosts = (
    state: IUsersPostsState = initialState,
    action: IBlogAction,
) =>
    produce(state, (draft) => {
        const handler = new UsersPostsHandler({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_USERS_POSTS_CALL:
                handler.loadUsersPostsCall();
                break;
            case actionTypes.LOAD_USERS_POSTS_DONE:
                handler.loadUsersPostsDone();
                break;
            case actionTypes.LOAD_USERS_POSTS_FAIL:
                // draft.loadingUsersPosts = false;
                // draft.loadUsersPostsErrorReason = action.reason;
                handler.loadUsersPostsFail();
                break;
            case actionTypes.UPDATE_USERS_POSTS_LIKERS:
                handler.updateUsersPostsLikers();
                break;
            default:
                break;
        }
    });
