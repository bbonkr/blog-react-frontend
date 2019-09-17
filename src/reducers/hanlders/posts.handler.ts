import { IBlogAction } from '../../typings/IBlogAction';
import { IListResult } from '../../typings/IListResult';
import { IPostModel } from '../../typings/IPostModel';
import { IPostsState } from '../../typings/reduxStates';

export interface IPostHandlerValue {
    draft: IPostsState;
    action: IBlogAction;
}

export class PostsHandler {
    private draft: IPostsState;
    private action: IBlogAction;

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
        const resultData = this.action.data as IListResult<IPostModel>;
        const { records, total, limit, keyword, page } = resultData;

        records.forEach((v) => {
            const postIndex = this.draft.posts.findIndex((x) => x.id === v.id);
            if (postIndex < 0) {
                this.draft.posts.push(v);
                this.draft.nextPageToken = `${v.id}`;
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
}
