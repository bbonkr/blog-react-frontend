import { BaseAction } from '../../typings/BaseAction';
import { MeState } from '../../typings/reduxStates';
import {
    ListResult,
    PostModel,
    CategoryModel,
    TagModel,
} from '../../typings/dto';

export interface IMeHandlerValue {
    draft: MeState;
    action: BaseAction;
}

export class MeHanlder {
    private draft: MeState;
    private action: BaseAction;

    constructor(value: IMeHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    public loadMyTagsDone(action: BaseAction): void {
        const actionData = action.data as ListResult<TagModel>;
        const { records, total } = actionData;
        this.draft.loadingTags = false;
        this.draft.tags = records;
    }

    public loadLikedPostsDone(action: BaseAction): void {
        const actionData = action.data as ListResult<PostModel>;
        const { total, records, keyword, page } = actionData;
        records.forEach((x) => {
            const post = this.draft.likedPosts.find(
                (v) => v.userId === x.userId && v.id === x.id,
            );
            if (!post) {
                this.draft.likedPosts.push(x);
                // this.draft.likedPostsPageToken = `${x.userId}|${x.id}`;
            }
        });
        this.draft.likedPostsTotal = total;
        this.draft.likedPostsHasMore =
            records.length === this.draft.likedPostsLimit;
        this.draft.likedPostsKeyword = keyword;
        this.draft.likedPostsLoading = false;
        this.draft.likedPostPage = page;
    }

    // public editMyCategoryDone(action: IBlogAction): void {
    //     const actionData = action.data as ICategoryModel;

    //     const foundCategoryIndex = this.draft.categories.findIndex(
    //         (v) => v.id === actionData.id,
    //     );
    //     if (foundCategoryIndex < 0) {
    //         this.draft.categories.push(actionData);
    //         this.draft.categoriesCount = this.draft.categoriesCount + 1;
    //     } else {
    //         this.draft.categories[foundCategoryIndex] = actionData;
    //     }

    //     this.draft.categories
    //         .filter(
    //             (v) =>
    //                 v.id !== actionData.id && v.ordinal >= actionData.ordinal,
    //         )
    //         .forEach((v) => {
    //             v.ordinal = v.ordinal + 1;
    //         });

    //     this.draft.categories = this.draft.categories
    //         .sort((a, b) => {
    //             return a.ordinal > b.ordinal ? 1 : -1;
    //         })
    //         .map((v, i) => {
    //             v.ordinal = i + 1;
    //             return v;
    //         });

    //     this.draft.categoriesLoading = false;
    // }
}
