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
        this.draft.myPostsHasMore = this.action.data.pageToken
            ? this.draft.myPostsHasMore
            : true;
        this.draft.myPostsLoading = true;
        this.draft.myPostsErrorReason = '';
    }

    public loadMyPostsDone(action: IBlogAction): void {
        this.draft.myPostsLoading = false;

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
        this.draft.myPostsHasMore =
            action.data.length === this.draft.myPostsLimit;
        this.draft.myPostsLoading = false;
        this.draft.myPostsCount = resultData.total;
        this.draft.myPostsCurrentPage = resultData.page;
    }
}
