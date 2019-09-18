import produce from 'immer';
import { ShowNotification } from '../components/ShowNotification';
import { actionTypes } from './actionTypes';
import { PostHandler } from './hanlders/post.handler';
import { IPostState } from '../typings/reduxStates';

export const initialState: IPostState = {
    writingPost: false,

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
