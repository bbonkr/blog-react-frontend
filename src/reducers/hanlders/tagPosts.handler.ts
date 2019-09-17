import { ITagPostsState } from '../../typings/reduxStates';
import { IBlogAction } from '../../typings/IBlogAction';

export interface ITagPostsHandlerValue {
    draft: ITagPostsState;
    action: IBlogAction;
}

export class TagPostsHandler {
    private draft: ITagPostsState;
    private action: IBlogAction;

    constructor(value: ITagPostsHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    // LOAD_TAG_POSTS_CALL
    public loadTagPostsCall(): void {
        const { page, limit, keyword } = this.action.data;

        this.draft.tagPosts = page ? this.draft.tagPosts : [];
        this.draft.hasMorePost = page ? this.draft.tagPostsHasMore : true;
        this.draft.tagPostsLoading = true;
        this.draft.tagPostsErrorReason = '';
    }

    // LOAD_TAG_POSTS_DONE
    public loadTagPostsDone(): void {
        const { records, total, page, keyword, tag } = this.action.data;

        records.forEach((v) => {
            const index = this.draft.tagPosts.findIndex((x) => x.id === v.id);
            if (index < 0) {
                this.draft.tagPosts.push(v);
                this.draft.tagPostsPageToken = `${v.id}`;
            }
        });

        this.draft.tagPostsHasMore = records.length === this.draft.postsLimit;
        this.draft.tagPostsLoading = false;
        this.draft.tagPostsKeyword = keyword;
        this.draft.currentTag = tag;
        this.draft.currentTagSlug = tag.slug || '';
        this.draft.currentPage = page;
    }
    // LOAD_TAG_POSTS_FAIL
    public loadTagPostsFail(): void {
        this.draft.tagPostsLoading = false;
        this.draft.tagPostsErrorReason = this.action.message;
    }
}
