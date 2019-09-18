import { IUsersPostsState } from '../../typings/reduxStates';
import { IBlogAction } from '../../typings/IBlogAction';
import { IListResult, IPostModel } from '../../typings/dto';

export interface IUserHandlerValue {
    draft: IUsersPostsState;
    action: IBlogAction;
}

export class UsersPostsHandler {
    private draft: IUsersPostsState;
    private action: IBlogAction;

    constructor(value: IUserHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    public loadUsersPostsCall(): void {
        const { page } = this.action.data;
        this.draft.usersPosts = page ? this.draft.usersPosts : [];
        this.draft.hasMoreUsersPosts = page
            ? this.draft.hasMoreUsersPosts
            : true;
        this.draft.loadingUsersPosts = true;
        this.draft.loadUsersPostsErrorReason = '';
        // this.draft.currentUser = this.action.data.user;
    }

    public loadUsersPostsDone(): void {
        const { records, total, user, page, username } = this.action
            .data as IListResult<IPostModel>;
        records.forEach((v) => {
            const postIndex = this.draft.usersPosts.findIndex(
                (x) => x.id === v.id,
            );
            if (postIndex < 0) {
                this.draft.usersPosts.push(v);
                // this.draft.usersPostsPageToken = `${v.id}`;
            }
        });
        this.draft.hasMoreUsersPosts = records.length === this.draft.postsLimit;

        this.draft.currentUser = user;
        this.draft.currentUsername = username;
        this.draft.currentPage = page;
        this.draft.loadingUsersPosts = false;
    }

    public loadUsersPostsFail(): void {
        const { message } = this.action;
        this.draft.loadingUsersPosts = false;
        this.draft.loadUsersPostsErrorReason = message;
    }
}
