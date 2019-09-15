import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
// import axios from 'axios';
import { http } from './httpHelper';
import { actionTypes } from '../reducers/actionTypes';
import { IBlogAction } from 'typings/IBlogAction';

function loadCategoriesApi() {
    return http.get('/category');
}

function* loadCategories(action?: IBlogAction) {
    try {
        const result = yield call(loadCategoriesApi);
        yield put({
            type: actionTypes.LOAD_CATEGORIES_DONE,
            data: result.data,
        });
    } catch (e) {
        // console.error(e);
        yield put({
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
