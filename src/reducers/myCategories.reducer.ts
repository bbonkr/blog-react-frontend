import { IMyCategoriesState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import produce from 'immer';
import { actionTypes } from './actionTypes';
import { MyCategoriesHandler } from './hanlders/myCategories.handler';

export const initialMyCategoriesState: IMyCategoriesState = {
    categories: [],
    categoriesLoading: false,
    categoriesErrorReason: '',
    categoriesHasMore: false,
    categoriesLimit: 10,
    categoriesCount: 0,
    categoriesCurrentPage: 1,
};

export const myCategories = (
    state: IMyCategoriesState = initialMyCategoriesState,
    action: IBlogAction,
) =>
    produce(state, (draft) => {
        const handler = new MyCategoriesHandler({ draft, action });
        switch (action.type) {
            case actionTypes.LOAD_MY_CATEGORIES_CALL:
                handler.loadMyCategoriesCall();
                break;
            case actionTypes.LOAD_MY_CATEGORIES_DONE:
                handler.loadMyCategoriesDone(action);
                break;
            case actionTypes.LOAD_MY_CATEGORIES_FAIL:
                handler.loadMyCategoriesFail();
                break;

            // edit category
            case actionTypes.EDIT_MY_CATEGORY_CALL:
                draft.categoriesLoading = true;
                break;
            case actionTypes.EDIT_MY_CATEGORY_DONE:
                handler.editMyCategoryDone(action);
                break;
            case actionTypes.EDIT_MY_CATEGORY_FAIL:
                draft.categoriesLoading = false;
                draft.categoriesErrorReason = action.message;
                break;

            // delete category
            case actionTypes.DELETE_MY_CATEGORY_CALL:
                draft.categoriesLoading = true;
                break;
            case actionTypes.DELETE_MY_CATEGORY_DONE:
                handler.deleteMyCategoryDone();
                break;
            case actionTypes.DELETE_MY_CATEGORY_FAIL:
                draft.categoriesLoading = false;
                draft.categoriesErrorReason = action.message;
                break;
            default:
                break;
        }
    });
