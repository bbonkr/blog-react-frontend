import produce from 'immer';
import { actionTypes } from './actionTypes';
import { CategoryModel } from '../typings/dto';
import { CategoryState } from '../typings/reduxStates';
import { BaseAction } from '../typings/BaseAction';
import { CategoryHanlder } from './hanlders/category.handler';

export const initialState: CategoryState = {
    categories: [],
    loadingCategories: false,
};

// export const LOAD_CATEGORIES_CALL = 'LOAD_CATEGORIES_CALL';
// export const LOAD_CATEGORIES_DONE = 'LOAD_CATEGORIES_DONE';
// export const LOAD_CATEGORIES_FAIL = 'LOAD_CATEGORIES_FAIL';

const reducer = (state = initialState, action: BaseAction) =>
    produce(state, (draft) => {
        // console.log('\u001b[34mdispatch ==> \u001b[0m', action.type);
        const handler = new CategoryHanlder({ draft, action });

        switch (action.type) {
            case actionTypes.LOAD_CATEGORIES_CALL:
                draft.categories = [];
                draft.loadingCategories = true;
                break;
            case actionTypes.LOAD_CATEGORIES_DONE:
                // draft.categories = action.data;
                // draft.loadingCategories = false;
                handler.loadCategoriesDone();
                break;
            case actionTypes.LOAD_CATEGORIES_FAIL:
                draft.loadingCategories = false;
                break;
            default:
                break;
        }
    });

export default reducer;
