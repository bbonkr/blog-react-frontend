import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import { http } from './httpHelper';
import { actionTypes } from '../reducers/actionTypes';
import { IBlogAction } from '../typings/IBlogAction';
import { IJsonResult, IListResult, ICategoryModel } from '../typings/dto';

function loadCategoriesApi() {
    return http().get('/category');
}

function* loadCategories(action?: IBlogAction) {
    try {
        const result = yield call(loadCategoriesApi);
        const resultData = result.data as IJsonResult<
            IListResult<ICategoryModel>
        >;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_CATEGORIES_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_CATEGORIES_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_CATEGORIES_FAIL,
            error: e,
        });
    }
}

function* watchLoadCategories() {
    yield takeLatest(actionTypes.LOAD_CATEGORIES_CALL, loadCategories);
}

export default function* postSaga() {
    yield all([fork(watchLoadCategories)]);
}
