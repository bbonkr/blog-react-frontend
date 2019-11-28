import { MyCategoriesState } from '../../typings/reduxStates';
import { BaseAction } from '../../typings/BaseAction';
import { ListResult, CategoryModel } from '../../typings/dto';

export interface IMyCategoriesHandlerValue {
    draft: MyCategoriesState;
    action: BaseAction;
}

export class MyCategoriesHandler {
    private draft: MyCategoriesState;
    private action: BaseAction;

    constructor(value: IMyCategoriesHandlerValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    // LOAD_MY_CATEGORIES_CALL
    public loadMyCategoriesCall(): void {
        const { page, limit, keyword } = this.action.data;
        this.draft.categoriesLoading = true;
        this.draft.categories = page ? this.draft.categories : [];
        this.draft.categoriesHasMore = page
            ? this.draft.categoriesHasMore
            : true;
        this.draft.categoriesErrorReason = '';
    }

    // LOAD_MY_CATEGORIES_DONE
    public loadMyCategoriesDone(action: BaseAction): void {
        this.draft.categoriesLoading = false;
        const actionData = action.data as ListResult<CategoryModel>;
        const { records, total, page } = actionData;

        records.forEach((v) => {
            const postIndex = this.draft.categories.findIndex(
                (x) => x.id === v.id,
            );
            if (postIndex < 0) {
                this.draft.categories.push(v);
            }
        });
        this.draft.categoriesCount = total;
        this.draft.categoriesHasMore =
            records.length === this.draft.categoriesLimit;
        this.draft.categoriesCurrentPage = page;
    }

    // LOAD_MY_CATEGORIES_FAIL
    public loadMyCategoriesFail(): void {
        this.draft.categoriesLoading = false;
        this.draft.categoriesErrorReason = this.action.message;
    }

    // EDIT_MY_CATEGORY_DONE
    public editMyCategoryDone(action: BaseAction): void {
        const { category } = action.data;

        const foundCategoryIndex = this.draft.categories.findIndex(
            (v) => v.id === category.id,
        );
        if (foundCategoryIndex < 0) {
            this.draft.categories.push(category);
            this.draft.categoriesCount = this.draft.categoriesCount + 1;
        } else {
            this.draft.categories[foundCategoryIndex] = category;
        }

        this.draft.categories
            .filter(
                (v) => v.id !== category.id && v.ordinal >= category.ordinal,
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

        this.draft.categoriesLoading = false;
    }

    // DELETE_MY_CATEGORY_DONE
    public deleteMyCategoryDone() {
        const { id } = this.action.data;
        const foundDeletedCategoryIndex = this.draft.categories.findIndex(
            (v) => v.id === id,
        );
        this.draft.categories.splice(foundDeletedCategoryIndex, 1);

        this.draft.categories = this.draft.categories
            .sort((a, b) => {
                return a.ordinal > b.ordinal ? 1 : -1;
            })
            .map((v, i) => {
                v.ordinal = i + 1;
                return v;
            });
        this.draft.categoriesCount = this.draft.categoriesCount - 1;
        this.draft.categoriesLoading = false;
    }
}
