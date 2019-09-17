import { IBlogAction } from '../../typings/IBlogAction';
import { IListResult } from '../../typings/IListResult';
import { IPostModel } from '../../typings/IPostModel';
import { IPostState } from '../../typings/reduxStates';

export interface IPostHandlerValue {
    draft: IPostState;
    action: IBlogAction;
}

export class PostHandler {
    private draft: IPostState;
    private action: IBlogAction;

    constructor(value: IPostHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    // public loadPostsCall(): void {
    //     this.internalLoadPostsCall();
    // }

    // public loadCategoryPostsCall(): void {
    //     this.internalLoadPostsCall();
    // }

    // public loadPostsDone(): void {
    //     this.internalLoadPostDone();
    // }

    // public loadCategoryPostsDone(): void {
    //     this.internalLoadPostDone();
    // }

    // public loadPostsFail(): void {
    //     this.internalLoadPostsFail();
    // }

    // public loadCategoryPostsFail(): void {
    //     this.internalLoadPostsFail();
    // }

    // public loadUsersPostsCall(): void {
    //     this.draft.usersPosts = this.action.data.pageToken
    //         ? this.draft.usersPosts
    //         : [];
    //     this.draft.hasMoreUsersPosts = this.action.data.pageToken
    //         ? this.draft.hasMoreUsersPosts
    //         : true;
    //     this.draft.loadingUsersPosts = true;
    //     this.draft.loadUsersPostsErrorReason = '';
    //     this.draft.currentUser = this.action.data.user;
    // }

    // public loadUsersPostsDone(): void {
    //     const { records } = this.action.data as IListResult<IPostModel>;
    //     records.forEach((v) => {
    //         const postIndex = this.draft.usersPosts.findIndex(
    //             (x) => x.id === v.id,
    //         );
    //         if (postIndex < 0) {
    //             this.draft.usersPosts.push(v);
    //             this.draft.usersPostsPageToken = `${v.id}`;
    //         }
    //     });
    //     this.draft.hasMoreUsersPosts =
    //         this.action.data.length === this.draft.postsLimit;
    //     this.draft.loadingUsersPosts = false;
    // }

    // public loadUsersPostsFail(): void {
    //     const { message } = this.action;
    //     this.draft.loadingUsersPosts = false;
    //     this.draft.loadUsersPostsErrorReason = message;
    // }

    // private internalLoadPostsCall(): void {
    //     this.draft.posts = this.action.data.page ? this.draft.posts : [];
    //     this.draft.hasMorePost = this.action.data.page
    //         ? this.draft.hasMorePost
    //         : true;
    //     this.draft.loadingPosts = true;
    //     this.draft.loadPostErrorReason = '';
    //     this.draft.isSinglePost = false;
    // }

    // private internalLoadPostDone(): void {
    //     const resultData = this.action.data as IListResult<IPostModel>;
    //     const { records, total, limit, keyword, page } = resultData;

    //     records.forEach((v) => {
    //         const postIndex = this.draft.posts.findIndex((x) => x.id === v.id);
    //         if (postIndex < 0) {
    //             this.draft.posts.push(v);
    //             this.draft.nextPageToken = `${v.id}`;
    //         }
    //     });

    //     this.draft.currentPage = page || 1;
    //     this.draft.hasMorePost =
    //         this.action.data.records.length === this.draft.postsLimit;
    //     this.draft.loadingPosts = false;
    //     this.draft.searchKeyword = keyword;

    //     if (resultData.hasOwnProperty('currentCategory')) {
    //         this.draft.currentCategory = resultData.currentCategory;
    //     }
    //     if (resultData.hasOwnProperty('currentTag')) {
    //         this.draft.currentTag = resultData.currentTag;
    //     }
    // }

    // private internalLoadPostsFail(): void {
    //     this.draft.loadingPosts = false;
    //     this.draft.loadPostErrorReason = this.action.message;
    // }
}
