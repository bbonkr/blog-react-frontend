import { SearchPostsState } from '../typings/reduxStates';
import { BaseAction } from '../typings/BaseAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';
import { applyUpdatedPostLikers } from './helpers/updatePostLikers';

export const initialState: SearchPostsState = {
    searchPosts: [],
    searchPostsLoading: false,
    searchPostsErrorReason: '',
    searchPostsHasMore: false,
    searchPostsKeyword: '',
    postsLimit: 10, // todo 상수로 변경
    searchPostsCurrentPage: 1,
};

export const searchPosts = (
    state: SearchPostsState = initialState,
    action: BaseAction,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.LOAD_SEARCH_POSTS_CALL:
                draft.searchPostsLoading = true;
                draft.searchPostsErrorReason = '';
                draft.searchPosts = action.data.pageToken
                    ? draft.searchPosts
                    : [];
                draft.searchPostsHasMore = action.data.pageToken
                    ? draft.searchPostsHasMore
                    : true;
                break;
            case actionTypes.LOAD_SEARCH_POSTS_DONE:
                action.data.records.forEach((v) => {
                    const index = draft.searchPosts.findIndex(
                        (x) => x.id === v.id,
                    );
                    if (index < 0) {
                        draft.searchPosts.push(v);
                        // draft.searchPostsPageToken = `${v.id}`;
                    }
                });
                draft.searchPostsHasMore =
                    action.data.records.length === draft.postsLimit;
                draft.searchPostsCurrentPage = action.data.page;
                draft.searchPostsKeyword = action.data.keyword;
                draft.searchPostsLoading = false;
                break;
            case actionTypes.LOAD_SEARCH_POSTS_FAIL:
                draft.searchPostsLoading = false;
                draft.searchPostsErrorReason = action.message;
                break;
            case actionTypes.UPDATE_SEARCH_POSTS_LIKERS:
                applyUpdatedPostLikers(draft.searchPosts, action.data.post);
                break;
            default:
                break;
        }
    });
