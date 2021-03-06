import { UsersPostsState } from '../../typings/reduxStates';
import { BaseAction } from '../../typings/BaseAction';
import { ListResult, PostModel } from '../../typings/dto';
import { applyUpdatedPostLikers } from '../helpers/updatePostLikers';

export interface IUserHandlerValue {
    draft: UsersPostsState;
    action: BaseAction;
}

export class UsersPostsHandler {
    private draft: UsersPostsState;
    private action: BaseAction;

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
            .data as ListResult<PostModel>;
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

    // UPDATE_USERS_POSTS_LIKERS
    public updateUsersPostsLikers() {
        applyUpdatedPostLikers(this.draft.usersPosts, this.action.data.post);
    }
}
