import { IBlogAction } from '../../typings/IBlogAction';
import { IMeState } from '../../typings/reduxStates';
import {
    IListResult,
    IPostModel,
    ICategoryModel,
    ITagModel,
} from '../../typings/dto';

export interface IMeHandlerValue {
    draft: IMeState;
    action: IBlogAction;
}

export class MeHanlder {
    private draft: IMeState;
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
                this.draft.nextPageToken = `${v.id}`;
            }
        });
        this.draft.hasMorePost = action.data.length === this.draft.postsLimit;
        this.draft.loadingMyPosts = false;
        // draft.searchKeyword = action.keyword;
        this.draft.postsCount = resultData.total;
    }

    // LOAD_MY_CATEGORIES_CALL
    public loadMyCategoriesCall(): void {
        const { page, limit, keyword } = this.action.data;
        this.draft.loadingCategories = true;
        this.draft.categories = page ? this.draft.categories : [];
        this.draft.hasMoreCategories = page
            ? this.draft.hasMoreCategories
            : true;
        this.draft.loadCategoriesErrorReason = '';
    }

    // LOAD_MY_CATEGORIES_DONE
    public loadMyCategoriesDone(action: IBlogAction): void {
        this.draft.loadingCategories = false;
        // draft.categories = action.data;
        const actionData = action.data as IListResult<ICategoryModel>;
        const { records, total } = actionData;

        records.forEach((v) => {
            const postIndex = this.draft.categories.findIndex(
                (x) => x.id === v.id,
            );
            if (postIndex < 0) {
                this.draft.categories.push(v);
                // this.draft.categoryNextPageToken = `${v.id}`;
            }
        });
        this.draft.categoriesCount = total;
        this.draft.hasMoreCategories =
            records.length === this.draft.categoryLimit;
        // draft.categorySearchKeyword = action.keyword;
        // draft.categoriesCount = total;
    }

    // LOAD_MY_CATEGORIES_FAIL
    public loadMyCategoriesFail(): void {
        this.draft.loadingCategories = false;
        this.draft.loadCategoriesErrorReason = this.action.message;
    }

    public loadMyTagsDone(action: IBlogAction): void {
        const actionData = action.data as IListResult<ITagModel>;
        const { records, total } = actionData;
        this.draft.loadingTags = false;
        this.draft.tags = records;
    }

    public loadLikedPostsDone(action: IBlogAction): void {
        const actionData = action.data as IListResult<IPostModel>;
        const { total, records, keyword, page } = actionData;
        records.forEach((x) => {
            const post = this.draft.likedPosts.find(
                (v) => v.userId === x.userId && v.id === x.id,
            );
            if (!post) {
                this.draft.likedPosts.push(x);
                this.draft.likedPostsPageToken = `${x.userId}|${x.id}`;
            }
        });
        this.draft.likedPostsTotal = total;
        this.draft.likedPostsHasMore =
            records.length === this.draft.likedPostsLimit;
        this.draft.likedPostsKeyword = keyword;
        this.draft.likedPostsLoading = false;
        this.draft.likedPostPage = page;
    }

    public editMyCategoryDone(action: IBlogAction): void {
        const actionData = action.data as ICategoryModel;

        const foundCategoryIndex = this.draft.categories.findIndex(
            (v) => v.id === actionData.id,
        );
        if (foundCategoryIndex < 0) {
            this.draft.categories.push(actionData);
            this.draft.categoriesCount = this.draft.categoriesCount + 1;
        } else {
            this.draft.categories[foundCategoryIndex] = actionData;
        }

        this.draft.categories
            .filter(
                (v) =>
                    v.id !== actionData.id && v.ordinal >= actionData.ordinal,
            )
            .forEach((v) => {
                v.ordinal = v.ordinal + 1;
            });

        this.draft.categories = this.draft.categories
            .sort((a, b) => {
                return a.ordinal > b.ordinal ? 1 : -1;
            })
            .map((v, i) => {
                v.ordinal = i + 1;
                return v;
            });

        this.draft.loadingCategories = false;
    }
}
