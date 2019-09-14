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

function loadMyPostsApi(pageToken = '', limit = 10, keyword = '') {
    return http.get(
        `/me/posts?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`
    );
}

function* loadMyPosts(action) {
    try {
        const { pageToken, limit, keyword } = action.data;

        const result = yield call(
            loadMyPostsApi,
            pageToken || '',
            limit || 10,
            keyword,
        );
        yield put({
            type: actionTypes.LOAD_MY_POSTS_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_MY_POSTS_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadMyPosts() {
    yield takeLatest(actionTypes.LOAD_MY_POSTS_CALL, loadMyPosts);
}

function writePostApi(formData) {
    return http.post('/post', formData);
}

function* writePost(action) {
    try {
        const result = yield call(writePostApi, action.data);
        yield put({
            type: actionTypes.WRITE_POST_DONE,
            data: result.data,
        });
    } catch (e) {
        yield put({
            type: actionTypes.WRITE_POST_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchWritePost() {
    yield takeLatest(actionTypes.WRITE_POST_CALL, writePost);
}

function loadCategoriesApi(query) {
    const { pageToken, limit, keyword } = query;
    return http.get(
        `/me/categories?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`
    );
}

function* loadCategories(action) {
    try {
        const { pageToken, limit, keyword } = action.data;
        const result = yield call(loadCategoriesApi, {
            pageToken,
            limit,
            keyword,
        });
        yield put({
            type: actionTypes.LOAD_MY_CATEGORIES_DONE,
            data: {
                items: result.data.items,
                total: result.data.total,
            },
        });
    } catch (e) {
        yield put({
            type: actionTypes.LOAD_MY_CATEGORIES_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadCategories() {
    yield takeLatest(actionTypes.LOAD_MY_CATEGORIES_CALL, loadCategories);
}

function loadTagsApi() {
    return http.get('/tags');
}

function* loadTags(action) {
    try {
        const result = yield call(loadTagsApi);
        yield put({
            type: actionTypes.LOAD_MY_TAGS_DONE,
            data: result.data,
        });
    } catch (e) {
        yield put({
            type: actionTypes.LOAD_MY_TAGS_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadTags() {
    yield takeLatest(actionTypes.LOAD_MY_TAGS_CALL, loadTags);
}

function editPostApi(id, data) {
    return http.patch(`/post/${id}`, data);
}

function* editPost(action) {
    try {
        const result = yield call(editPostApi, action.id, action.data);
        yield put({
            type: actionTypes.EDIT_POST_DONE,
            data: result.data,
        });
    } catch (e) {
        yield put({
            type: actionTypes.EDIT_POST_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchEditPost() {
    yield takeLatest(actionTypes.EDIT_POST_CALL, editPost);
}

/**
 * 글을 삭제합니다.
 *
 * @param {number} id 글 식별자 Post.Id
 *
 */
function deletePostApi(id) {
    return http.delete(`/post/${id}`);
}

function* deletePost(action) {
    try {
        const result = yield call(deletePostApi, action.data);
        yield put({
            type: actionTypes.DELETE_POST_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.DELETE_POST_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchDeletePost() {
    yield takeLatest(actionTypes.DELETE_POST_CALL, deletePost);
}

function loadMyPostApi(id) {
    return http.get(`/me/post/${id}`);
}

function* loadMyPost(action) {
    try {
        const result = yield call(loadMyPostApi, action.data);

        yield put({
            type: actionTypes.LOAD_MY_POST_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_MY_POST_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadMyPost() {
    yield takeLatest(actionTypes.LOAD_MY_POST_CALL, loadMyPost);
}

function* writeNewPost(action) {
    try {
        yield put({
            type: actionTypes.WRITE_NEW_POST_DONE,
        });
    } catch (e) {
        yield put({
            type: actionTypes.WRITE_NEW_POST_FAIL,
            error: e,
        });
    }
}

function* watchWriteNewPost() {
    yield takeLatest(actionTypes.WRITE_NEW_POST_CALL, writeNewPost);
}

function uploadMyMediaFilesApi(data) {
    return http.post('/me/media', data);
}

function* uploadMyMediaFiles(action) {
    try {
        // console.log('==========> form data:', action.data);
        const result = yield call(uploadMyMediaFilesApi, action.data);

        yield put({
            type: actionTypes.UPLOAD_MY_MEDIA_FILES_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.UPLOAD_MY_MEDIA_FILES_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchUploadMyMediaFiles() {
    yield takeLatest(actionTypes.UPLOAD_MY_MEDIA_FILES_CALL, uploadMyMediaFiles);
}

function loadMediaFilesApi(pageToken, limit, keyword) {
    return http.get(
        `/me/media/?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`);
}

function* loadMediaFiles(action) {
    try {
        const { pageToken, limit, keyword } = action.data;
        const result = yield call(
            loadMediaFilesApi,
            pageToken || '',
            limit || 10,
            keyword || '',
        );
        yield put({
            type: actionTypes.LOAD_MY_MEDIA_FILES_DONE,
            data: result.data,
            mediaFilesNextPageToken: pageToken,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_MY_MEDIA_FILES_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadMediaFiles() {
    yield takeLatest(actionTypes.LOAD_MY_MEDIA_FILES_CALL, loadMediaFiles);
}

function deleteMediaFileApi(id) {
    return http.delete(`/me/media/${id}`);
}

function* deleteMediaFile(action) {
    try {
        const result = yield call(deleteMediaFileApi, action.data);
        yield put({
            type: actionTypes.DELETE_MY_MEDIA_FILES_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.DELETE_MY_MEDIA_FILES_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchDeleteMediaFile() {
    yield takeLatest(actionTypes.DELETE_MY_MEDIA_FILES_CALL, deleteMediaFile);
}

function editCategoryApi(formData) {
    if (!!formData.id) {
        return http.patch(`/me/category/${formData.id}`, formData);
    } else {
        return http.post('/me/category', formData);
    }
}

function* editCategory(action) {
    try {
        const result = yield call(editCategoryApi, action.data);
        yield put({
            type: actionTypes.EDIT_MY_CATEGORY_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.EDIT_MY_CATEGORY_FAIL,
            error: e,
            reason: e.respnse && e.response.data,
        });
    }
}

function* wacthEditCategory() {
    yield takeLatest(actionTypes.EDIT_MY_CATEGORY_CALL, editCategory);
}

function deleteCategoryApi(id) {
    return http.delete(`/me/category/${id}`);
}

function* deleteCategory(action) {
    try {
        const { id } = action.data;
        const result = yield call(deleteCategoryApi, id);
        yield put({
            type: actionTypes.DELETE_MY_CATEGORY_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.DELETE_MY_CATEGORY_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchDeleteCategory() {
    yield takeLatest(actionTypes.DELETE_MY_CATEGORY_CALL, deleteCategory);
}

function loadLikedPostsApi(query) {
    const { pageToken, limit, keyword } = query;

    return http.get(
        `/me/liked?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`
    );
}

function* loadLikedPosts(action) {
    try {
        const result = yield call(loadLikedPostsApi, action.data);
        yield put({
            type: actionTypes.LOAD_LIKED_POSTS_DONE,
            data: result.data,
            keyword: action.data.keyword,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_LIKED_POSTS_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadLikedPosts() {
    yield takeLatest(actionTypes.LOAD_LIKED_POSTS_CALL, loadLikedPosts);
}

function loadStatGeneralApi(query) {
    
    return http.get('/stat/general');
}

function* loadStatGeneral(action) {
    try {
        const result = yield call(loadStatGeneralApi, action.data);
        yield put({
            type: actionTypes.LOAD_STAT_GENERAL_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_STAT_GENERAL_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadStatGeneral() {
    yield takeLatest(actionTypes.LOAD_STAT_GENERAL_CALL, loadStatGeneral);
}

function loadStatReadApi(query) {
    return http.get('/stat/postread');
}

function* loadStatRead(action) {
    try {
        const result = yield call(loadStatReadApi, action.data);
        yield put({
            type: actionTypes.LOAD_STAT_READ_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: actionTypes.LOAD_STAT_READ_FAIL,
            error: e,
            reason: e.response && e.response.data,
        });
    }
}

function* watchLoadStatRead() {
    yield takeLatest(actionTypes.LOAD_STAT_READ_CALL, loadStatRead);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadMyPosts),
        fork(watchLoadMyPost),
        fork(watchWritePost),
        fork(watchEditPost),
        fork(watchDeletePost),
        fork(watchLoadCategories),
        fork(watchLoadTags),
        fork(watchWriteNewPost),
        fork(watchUploadMyMediaFiles),
        fork(watchLoadMediaFiles),
        fork(watchDeleteMediaFile),
        fork(wacthEditCategory),
        fork(watchDeleteCategory),
        fork(watchLoadLikedPosts),
        fork(watchLoadStatGeneral),
        fork(watchLoadStatRead),
    ]);
}
