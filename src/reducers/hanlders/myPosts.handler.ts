import { IMyPostsState } from '../../typings/reduxStates';
import { IBlogAction } from '../../typings/IBlogAction';
import { IListResult, IPostModel } from '../../typings/dto';

export interface IMeHandlerValue {
    draft: IMyPostsState;
    action: IBlogAction;
}

export class MyPostsHanlder {
    private draft: IMyPostsState;
    private action: IBlogAction;

    constructor(value: IMeHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    public loadMyPostCall(): void {
        this.draft.myPosts = this.action.data.pageToken
            ? this.draft.myPosts
            : [];
        this.draft.hasMorePost = this.action.data.pageToken
            ? this.draft.hasMorePost
            : true;
        this.draft.loadingMyPosts = true;
        this.draft.loadMyPostsErrorReason = '';
    }

    public loadMyPostsDone(action: IBlogAction): void {
        this.draft.loadingMyPosts = false;

        const resultData: IListResult<IPostModel> = action.data as IListResult<
            IPostModel
        >;

        resultData.records.forEach((v) => {
            const postIndex = this.draft.myPosts.findIndex(
                (x) => x.id === v.id,
            );
            if (postIndex < 0) {
                this.draft.myPosts.push(v);
            }
        });
        this.draft.hasMorePost = action.data.length === this.draft.postsLimit;
        this.draft.loadingMyPosts = false;
        this.draft.postsCount = resultData.total;
        this.draft.postsCurrentPage = resultData.page;
    }
}
