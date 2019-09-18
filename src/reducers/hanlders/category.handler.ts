import { ICategoryState } from '../../typings/reduxStates';
import { IBlogAction } from '../../typings/IBlogAction';
import { IListResult, ICategoryModel } from '../../typings/dto';

export interface ICategoryHanlderValue {
    draft: ICategoryState;
    action: IBlogAction;
}

export class CategoryHanlder {
    private draft: ICategoryState;
    private action: IBlogAction;

    constructor(value: ICategoryHanlderValue) {
        this.draft = value.draft;
        this.action = value.action;
    }

    public loadCategoriesDone(): void {
        const actionData = this.action.data as IListResult<ICategoryModel>;
        const { records, total } = actionData;
        this.draft.categories = records;
        this.draft.loadingCategories = false;
    }
}
