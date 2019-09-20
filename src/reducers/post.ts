import produce from 'immer';
import { ShowNotification } from '../components/ShowNotification';
import { actionTypes } from './actionTypes';
import { PostHandler } from './hanlders/post.handler';
import { IPostState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';

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

const reducer = (state: IPostState = initialState, action: IBlogAction) =>
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
                draft.likePostLoading = false;
                draft.likePostErrorMessage = '';

                break;
            case actionTypes.ADD_LIKE_POST_FAIL:
                draft.likePostLoading = false;
                draft.likePostErrorMessage = action.message;

                ShowNotification({
                    title: 'Notification',
                    message: action.message,
                    onClick: null,
                    icon: null,
                });
                break;

            case actionTypes.REMOVE_LIKE_POST_CALL:
                draft.likePostLoading = true;
                draft.likePostErrorMessage = '';
                break;
            case actionTypes.REMOVE_LIKE_POST_DONE:
                draft.likePostLoading = false;
                draft.likePostErrorMessage = '';
                break;
            case actionTypes.REMOVE_LIKE_POST_FAIL:
                draft.likePostLoading = false;
                draft.likePostErrorMessage = action.message;

                ShowNotification({
                    title: 'Notification',
                    message: action.message,
                    onClick: null,
                    icon: null,
                });
                break;

            default:
                break;
        }
    });

export default reducer;
