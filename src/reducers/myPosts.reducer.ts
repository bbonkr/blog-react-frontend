import produce from 'immer';
import Router from 'next/router';
import { IMyPostsState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import { actionTypes } from './actionTypes';
import { MyPostsHanlder } from './hanlders/myPosts.handler';
import { IPostModel } from '../typings/dto';
import { ShowNotification } from '../components/ShowNotification';

export const initialMyPostsState: IMyPostsState = {
    // myPosts
    myPosts: [],
    myPostsLoading: false,
    myPostsLimit: 10,
    myPostsHasMore: false,
    myPostsSearchKeyword: '',
    myPostsCount: 0,
    myPostsCurrentPage: 1,
    myPostsErrorReason: '',

    myPost: null,
    myPostErrorReason: '',
    myPostLoading: false,

    myPostWriting: false,
    writePostErrorReason: '',
};

export const myPosts = (
    state: IMyPostsState = initialMyPostsState,
    action: IBlogAction,
) =>
    produce(state, (draft) => {
        const handler = new MyPostsHanlder({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_MY_POSTS_CALL:
                handler.loadMyPostCall();
                break;
            case actionTypes.LOAD_MY_POSTS_DONE:
                handler.loadMyPostsDone(action);
                break;
            case actionTypes.LOAD_MY_POSTS_FAIL:
                draft.myPostsLoading = false;
                draft.myPostsErrorReason = action.message;
                break;

            case actionTypes.DELETE_POST_CALL:
                draft.myPostsLoading = true;
                break;
            case actionTypes.DELETE_POST_DONE:
                const index = draft.myPosts.findIndex(
                    (x) => x.id === action.data.id,
                );
                draft.myPosts.splice(index, 1);
                draft.myPostsLoading = false;
                break;
            case actionTypes.DELETE_POST_FAIL:
                draft.myPostsLoading = false;
                break;

            case actionTypes.LOAD_MY_POST_CALL:
                draft.myPostLoading = true;
                draft.myPostErrorReason = '';
                break;
            case actionTypes.LOAD_MY_POST_DONE:
                draft.myPostLoading = false;
                draft.myPost = action.data.post as IPostModel;
                break;
            case actionTypes.LOAD_MY_POST_FAIL:
                draft.myPostLoading = false;
                draft.myPostErrorReason = action.message;
                break;

            case actionTypes.WRITE_POST_CALL:
                draft.myPostWriting = true;
                break;
            case actionTypes.WRITE_POST_DONE:
                draft.myPostWriting = false;
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
                draft.myPostWriting = false;
                break;
            case actionTypes.EDIT_POST_CALL:
                draft.myPostWriting = true;
                break;
            case actionTypes.EDIT_POST_DONE:
                draft.myPostWriting = false;
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
                draft.myPostWriting = false;
                break;
            case actionTypes.WRITE_NEW_POST_CALL:
                // draft.myPost = null;
                break;
            case actionTypes.WRITE_NEW_POST_DONE:
                draft.myPost = null;
                break;
            case actionTypes.WRITE_NEW_POST_FAIL:
                break;

            default:
                break;
        }
    });
