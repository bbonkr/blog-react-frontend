import { MyPostsState } from '../../typings/reduxStates';
import { BaseAction } from '../../typings/BaseAction';
import { ListResult, PostModel } from '../../typings/dto';

export interface IMeHandlerValue {
    draft: MyPostsState;
    action: BaseAction;
}

export class MyPostsHanlder {
    private draft: MyPostsState;
    private action: BaseAction;

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

    public loadMyPostsDone(action: BaseAction): void {
        this.draft.myPostsLoading = false;

        const resultData: ListResult<PostModel> = action.data as ListResult<
            PostModel
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
