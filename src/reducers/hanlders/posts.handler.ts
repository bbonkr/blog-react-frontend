import { BaseAction } from '../../typings/BaseAction';
import { ListResult, PostModel } from '../../typings/dto';
import { PostsState } from '../../typings/reduxStates';
import { applyUpdatedPostLikers } from '../helpers/updatePostLikers';

export interface IPostHandlerValue {
    draft: PostsState;
    action: BaseAction;
}

export class PostsHandler {
    private draft: PostsState;
    private action: BaseAction;

    constructor(value: IPostHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    public loadPostsCall(): void {
        this.draft.posts = this.action.data.page ? this.draft.posts : [];
        this.draft.hasMorePost = this.action.data.page
            ? this.draft.hasMorePost
            : true;
        this.draft.loadingPosts = true;
        this.draft.loadPostErrorReason = '';
        // this.draft.isSinglePost = false;
    }

    public loadPostsDone(): void {
        const resultData = this.action.data as ListResult<PostModel>;
        const { records, total, limit, keyword, page } = resultData;

        records.forEach((v) => {
            const postIndex = this.draft.posts.findIndex((x) => x.id === v.id);
            if (postIndex < 0) {
                this.draft.posts.push(v);
            }
        });

        this.draft.currentPage = page || 1;
        this.draft.hasMorePost =
            this.action.data.records.length === this.draft.postsLimit;
        this.draft.loadingPosts = false;
        this.draft.searchKeyword = keyword;

        // if (resultData.hasOwnProperty('currentCategory')) {
        //     this.draft.currentCategory = resultData.currentCategory;
        // }
        // if (resultData.hasOwnProperty('currentTag')) {
        //     this.draft.currentTag = resultData.currentTag;
        // }
    }

    public loadPostsFail(): void {
        this.draft.loadingPosts = false;
        this.draft.loadPostErrorReason = this.action.message;
    }

    // UPDATE_POSTS_LIKERS
    public updatePostsLikers(): void {
        applyUpdatedPostLikers(this.draft.posts, this.action.data.post);
    }
}
