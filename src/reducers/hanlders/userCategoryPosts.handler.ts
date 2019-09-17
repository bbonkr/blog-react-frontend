import { IUserCategoryPostsState } from '../../typings/reduxStates';
import { IBlogAction } from '../../typings/IBlogAction';

export interface IUserCategoryPostsHandlerValue {
    draft: IUserCategoryPostsState;
    action: IBlogAction;
}

export class UserCategoryPostsHandler {
    private draft: IUserCategoryPostsState;
    private action: IBlogAction;

    constructor(value: IUserCategoryPostsHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    // LOAD_USER_CATEGORY_POSTS_CALL
    public loadUserCategoryPostsCall(): void {
        const { page, user, category, limit, keyword } = this.action.data;
        this.draft.userCategoryPostsLoading = true;
        this.draft.userCategoryPosts = page ? this.draft.userCategoryPosts : [];
        this.draft.userCategoryPostsHasMore = page
            ? this.draft.userCategoryPostsHasMore
            : true;
        this.draft.userCategoryPostsErrorReason = '';

        this.draft.currentUserCategory = `${user}${category}`;
        this.draft.userCategoryPostsKeyword = keyword;
        // draft.userCategoryPostsUser = null;
        // draft.userCategoryPostsCategory = null;
    }

    //LOAD_USER_CATEGORY_POSTS_DONE
    public loadUserCategoryPostsDone(): void {
        const {
            records,
            total,
            user,
            category,
            page,
            limit,
            keyword,
        } = this.action.data;

        records.forEach((v) => {
            const index = this.draft.userCategoryPosts.findIndex(
                (x) => x.id === v.id,
            );
            if (index < 0) {
                this.draft.userCategoryPosts.push(v);
                this.draft.userCategoryPostsPageToken = `${v.id}`;
            }
        });

        this.draft.userCategoryPostsHasMore =
            records.length === this.draft.postsLimit;

        this.draft.userCategoryPostsUser = user;
        this.draft.userCategoryPostsCategory = category;

        this.draft.currentPage = page;
        this.draft.userCategoryPostsLoading = false;
    }

    //LOAD_USER_CATEGORY_POSTS_FAIL
    public loadUserCategoryPostsFail(): void {
        const { message } = this.action;
        this.draft.userCategoryPostsErrorReason = message;
        this.draft.userCategoryPostsLoading = false;
    }
}
