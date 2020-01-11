import { CategoryState } from '../../typings/reduxStates';
import { BaseAction } from '../../typings/BaseAction';
import { ListResult, CategoryModel } from '../../typings/dto';

export interface ICategoryHanlderValue {
    draft: CategoryState;
    action: BaseAction;
}

export class CategoryHanlder {
    private draft: CategoryState;
    private action: BaseAction;

    constructor(value: ICategoryHanlderValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    public loadCategoriesDone(): void {
        const actionData = this.action.data as ListResult<CategoryModel>;
        const { records, total } = actionData;
        this.draft.categories = records;
        this.draft.loadingCategories = false;
    }
}
