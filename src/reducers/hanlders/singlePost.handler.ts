import { ISinglePostState } from '../../typings/reduxStates';
import { IBlogAction } from '../../typings/IBlogAction';
import { IPostModel } from '../../typings/dto';
import { applyUpdatedPostLikers } from '../helpers/updatePostLikers';

export interface ISinglePostHandlerValue {
    draft: ISinglePostState;
    action: IBlogAction;
}

export class SinglePostHandler {
    private draft: ISinglePostState;
    private action: IBlogAction;

    constructor(value: ISinglePostHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    // LOAD_SINGLE_POST_CALL
    public loadSinglePostCall(): void {
        this.draft.singlePost = null;
        // this.draft.isSinglePost = true;
        this.draft.loadSinglePostErrorReason = '';
        this.draft.loadingPost = true;
    }

    // LOAD_SINGLE_POST_DONE
    public loadSinglePostDone(): void {
        this.draft.singlePost = this.action.data.post as IPostModel;
        this.draft.loadingPost = false;
    }

    // LOAD_SINGLE_POST_FAIL
    public loadSinglePostFail(): void {
        this.draft.loadSinglePostErrorReason = this.action.message;
        this.draft.loadingPost = false;
    }

    // UPDATE_SINGLE_POST_LIKERS
    public updateSinglePostLikers(): void {
        applyUpdatedPostLikers(this.draft.singlePost, this.action.data.post);
    }
}
