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
import {http} from './httpHelper';
import { actionTypes } from 'reducers/actionTypes';

function loadPostsApi(pageToken = '', limit = 10, keyword = '') {
    return http.get(
        `/posts?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadPosts(action) {
    try {
        const { pageToken, limit, keyword } = action.data;
        const result = yield call(
            loadPostsApi,
            pageToken,
            limit || 10,
            keyword,
        );

        yield put({
            type: actionTypes.LOAD_POSTS_DONE,
            data: result.data,
            limit: limit,
            keyword: keyword,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_POSTS_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadPosts() {
    yield takeLatest(actionTypes.LOAD_POSTS_CALL, loadPosts);
}

function loadSinglePostApi(user, slug) {
    return http.get(`/users/${user}/posts/${encodeURIComponent(slug)}`);
}

function* loadSinglePost(action) {
    try {
        const { user, slug } = action.data;
        const result = yield call(loadSinglePostApi, user, slug);

        yield put({
            type: actionTypes.LOAD_SINGLE_POST_DONE,
            data: result.data,
        });
    } catch (e) {
        // console.error(e);
        yield put({
            type: actionTypes.LOAD_SINGLE_POST_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadSinglePost() {
    yield takeLatest(actionTypes.LOAD_SINGLE_POST_CALL, loadSinglePost);
}

function loadCategoryPostsApi(
    category,
    pageToken = '',
    limit = 10,
    keyword = '',
) {
    return http.get(
        `/posts/category/${category}?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadCategoryPosts(action) {
    try {
        const { category, pageToken, limit, keyword } = action.data;
        const result = yield call(
            loadCategoryPostsApi,
            category,
            pageToken,
            limit,
            keyword,
        );
        yield put({
            type: actionTypes.LOAD_CATEGORY_POSTS_DONE,
            data: result.data,
            currentCategory: category,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_CATEGORY_POSTS_FAIL,
            error: e,
        });
    }
}

function* watchLoadCategoryPosts() {
    yield takeLatest(actionTypes.LOAD_CATEGORY_POSTS_CALL, loadCategoryPosts);
}

function loadTagPostsApi(tag, pageToken = '', limit = 10, keyword = '') {
    return http.get(
        `/posts/tag/${encodeURIComponent(
            tag,
        )}?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadTagPosts(action) {
    try {
        const { tag, pageToken, limit, keyword } = action.data;
        const result = yield call(
            loadTagPostsApi,
            tag,
            pageToken,
            limit,
            keyword,
        );
        yield put({
            type: actionTypes.LOAD_TAG_POSTS_DONE,
            data: result.data,
            currentTag: tag,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_TAG_POSTS_FAIL,
            error: e,
        });
    }
}

function* watchLoadTagPosts() {
    yield takeLatest(actionTypes.LOAD_TAG_POSTS_CALL, loadTagPosts);
}

function loadUsersPostsApi(user, pageToken = '', limit = 10, keyword = '') {
    return http.get(
        `/users/${user}/posts?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadUsersPosts(action) {
    try {
        const { user, pageToken, limit, keyword } = action.data;
        const result = yield call(
            loadUsersPostsApi,
            user,
            pageToken,
            limit || 10,
            keyword,
        );
        yield put({
            type: actionTypes.LOAD_USERS_POSTS_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_USERS_POSTS_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadUsersPosts() {
    yield takeLatest(actionTypes.LOAD_USERS_POSTS_CALL, loadUsersPosts);
}

function loadUserCategoryPostsApi(query) {
    const { user, category, pageToken, limit, keyword } = query;
    return http.get(
        `/users/${user}/categories/${category}/posts?pageToken=${pageToken}&limit=${limit}&keyword=${keyword}`
    );
}

function* loadUserCategoryPosts(action) {
    try {
        const result = yield call(loadUserCategoryPostsApi, action.data);
        yield put({
            type: actionTypes.LOAD_USER_CATEGORY_POSTS_DONE,
            data: result.data,
        });
    } catch (e) {
        yield put({
            type: actionTypes.LOAD_USER_CATEGORY_POSTS_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLaodUserCatetoryPosts() {
    yield takeLatest(actionTypes.LOAD_USER_CATEGORY_POSTS_CALL, loadUserCategoryPosts);
}

function loadSearchPostsApi(query) {
    const { pageToken, limit, keyword } = query;
    return http.get(
        `/posts?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadSearchPosts(action) {
    try {
        const { keyword } = action.data;
        const result = yield call(loadSearchPostsApi, action.data);
        yield put({
            type: actionTypes.LOAD_SEARCH_POSTS_DONE,
            data: result.data,
            keyword: keyword,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_SEARCH_POSTS_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadSearchPosts() {
    yield takeLatest(actionTypes.LOAD_SEARCH_POSTS_CALL, loadSearchPosts);
}

function addUserLikePostApi(data) {
    const { user, post } = data;
    return http.post(
        `/users/${user}/posts/${post}/like`,
        {},
    );
}

function* addUserLikePost(action) {
    try {
        const result = yield call(addUserLikePostApi, action.data);
        yield put({
            type: actionTypes.ADD_LIKE_POST_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.ADD_LIKE_POST_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchAddUserLikePost() {
    yield takeLatest(actionTypes.ADD_LIKE_POST_CALL, addUserLikePost);
}

function removeUserLikePostApi(data) {
    const { user, post } = data;
    return http.delete(`/users/${user}/posts/${post}/like`);
}

function* removeUserLikePost(action) {
    try {
        const result = yield call(removeUserLikePostApi, action.data);
        yield put({
            type: actionTypes.REMOVE_LIKE_POST_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.REMOVE_LIKE_POST_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchRemoveUserLikePost() {
    yield takeLatest(actionTypes.REMOVE_LIKE_POST_CALL, removeUserLikePost);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchLoadSinglePost),
        fork(watchLoadCategoryPosts),
        fork(watchLoadTagPosts),
        fork(watchLoadUsersPosts),
        fork(watchLaodUserCatetoryPosts),
        fork(watchLoadSearchPosts),
        fork(watchAddUserLikePost),
        fork(watchRemoveUserLikePost),
    ]);
}
