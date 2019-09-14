import {
    all,
    fork,
    call,
    delay,
    takeLatest,
    put,
    actionChannel,
    throttle,
} from 'redux-saga/effects';
// import axios from 'axios';
import {http} from './httpHelper';
import { actionTypes } from 'reducers/actionTypes';

function loadCategoriesApi() {
    return http.get('/category');
}

function* loadCategories(action) {
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
