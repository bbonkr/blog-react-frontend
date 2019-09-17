// import {
//     all,
//     fork,
//     call,
//     delay,
//     takeLatest,
//     put,
//     actionChannel,
//     throttle,
// } from 'redux-saga/effects';
import {
    all,
    fork,
    call,
    delay,
    takeLatest,
    put,
    actionChannel,
    throttle,
} from '@redux-saga/core/effects';
import { http } from './httpHelper';
import { actionTypes } from '../reducers/actionTypes';
import { IJsonResult } from '../typings/IJsonResult';
import { IListResult } from '../typings/IListResult';
import { IPostModel } from '../typings/IPostModel';
import { IImageModel } from '../typings/IImageModel';
import { IBlogAction } from '../typings/IBlogAction';
import { ITagModel } from '../typings/ITagModel';
import { ICategoryModel } from '../typings/ICategoryModel';
import { IDictionary } from '../typings/IDictionary';

function loadMyPostsApi(query) {
    const { pageToken, limit, keyword } = query;

    return http.get(
        `/me/posts?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadMyPosts(action) {
    try {
        const { pageToken, limit, keyword } = action.data;

        const result = yield call(loadMyPostsApi, {
            pageToken: pageToken || '',
            limit: limit || 10,
            keyword: keyword,
        });

        const resultData = result.data as IJsonResult<IListResult<IPostModel>>;
        const { success, data, message } = resultData;

        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_POSTS_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_POSTS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_MY_POSTS_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchLoadMyPosts() {
    yield takeLatest(actionTypes.LOAD_MY_POSTS_CALL, loadMyPosts);
}

function writePostApi(formData) {
    return http.post('/me/post', formData);
}

function* writePost(action) {
    try {
        const result = yield call(writePostApi, action.data);
        const resultData = result.data as IJsonResult<IPostModel>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.WRITE_POST_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.WRITE_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        yield put<IBlogAction>({
            type: actionTypes.WRITE_POST_FAIL,
            error: e,
            message: e.response && e.response.data,
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
        )}`,
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
        const resultData = result.data as IJsonResult<
            IListResult<ICategoryModel>
        >;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_CATEGORIES_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_CATEGORIES_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        yield put<IBlogAction>({
            type: actionTypes.LOAD_MY_CATEGORIES_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchLoadCategories() {
    yield takeLatest(actionTypes.LOAD_MY_CATEGORIES_CALL, loadCategories);
}

function loadTagsApi() {
    return http.get('/me/tags');
}

function* loadTags(action) {
    try {
        const result = yield call(loadTagsApi);
        const resultData = result.data as IJsonResult<IListResult<ITagModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_TAGS_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_TAGS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        yield put<IBlogAction>({
            type: actionTypes.LOAD_MY_TAGS_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchLoadTags() {
    yield takeLatest(actionTypes.LOAD_MY_TAGS_CALL, loadTags);
}

function editPostApi(id, data) {
    return http.patch(`/me/post/${id}`, data);
}

function* editPost(action) {
    try {
        const result = yield call(editPostApi, action.id, action.data);
        const resultData = result.data as IJsonResult<IPostModel>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.EDIT_POST_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.EDIT_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        yield put<IBlogAction>({
            type: actionTypes.EDIT_POST_FAIL,
            error: e,
            message: e.response && e.response.data,
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
    return http.delete(`/me/post/${id}`);
}

function* deletePost(action) {
    try {
        const result = yield call(deletePostApi, action.data);
        const resultData = result.data as IJsonResult<number>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.DELETE_POST_DONE,
                data: { id: data },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.DELETE_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.DELETE_POST_FAIL,
            error: e,
            message: e.response && e.response.data,
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
        const resultData = result.data as IJsonResult<IPostModel>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_POST_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_MY_POST_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchLoadMyPost() {
    yield takeLatest(actionTypes.LOAD_MY_POST_CALL, loadMyPost);
}

function* writeNewPost(action) {
    try {
        yield put<IBlogAction>({
            type: actionTypes.WRITE_NEW_POST_DONE,
        });
    } catch (e) {
        yield put<IBlogAction>({
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
        const resultData = result.data as IJsonResult<IListResult<IImageModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.UPLOAD_MY_MEDIA_FILES_DONE,
                data: {
                    ...data,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.UPLOAD_MY_MEDIA_FILES_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.UPLOAD_MY_MEDIA_FILES_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchUploadMyMediaFiles() {
    yield takeLatest(
        actionTypes.UPLOAD_MY_MEDIA_FILES_CALL,
        uploadMyMediaFiles,
    );
}

function loadMediaFilesApi(pageToken, limit, keyword) {
    return http.get(
        `/me/media/?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
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

        const resultData = result.data as IJsonResult<IListResult<IImageModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_MEDIA_FILES_DONE,
                data: {
                    ...data,
                    mediaFilesNextPageToken: pageToken,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_MY_MEDIA_FILES_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_MY_MEDIA_FILES_FAIL,
            error: e,
            message: e.response && e.response.data,
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
        const resultData = result.data as IJsonResult<number>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.DELETE_MY_MEDIA_FILES_DONE,
                data: {
                    id: data,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.DELETE_MY_MEDIA_FILES_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.DELETE_MY_MEDIA_FILES_FAIL,
            error: e,
            message: e.response && e.response.data,
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
        const resultData = result.data as IJsonResult<ICategoryModel>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.EDIT_MY_CATEGORY_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.EDIT_MY_CATEGORY_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.EDIT_MY_CATEGORY_FAIL,
            error: e,
            message: e.respnse && e.response.data,
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
        const resultData = result.data as IJsonResult<number>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.DELETE_MY_CATEGORY_DONE,
                data: {
                    id: data,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.DELETE_MY_CATEGORY_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.DELETE_MY_CATEGORY_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchDeleteCategory() {
    yield takeLatest(actionTypes.DELETE_MY_CATEGORY_CALL, deleteCategory);
}

function loadLikedPostsApi(query) {
    const { pageToken, limit, keyword, page } = query;

    return http.get(
        `/me/liked?pageToken=${pageToken}&page=${page ||
            '1'}&limit=${limit}&keyword=${encodeURIComponent(keyword)}`,
    );
}

function* loadLikedPosts(action) {
    try {
        const { pageToken, limit, keyword, page } = action.data;

        const result = yield call(loadLikedPostsApi, action.data);

        const resultData = result.data as IJsonResult<IListResult<IPostModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_LIKED_POSTS_DONE,
                data: {
                    ...data,
                    keyword: keyword,
                    page: page,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_LIKED_POSTS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_LIKED_POSTS_FAIL,
            error: e,
            message: e.response && e.response.data,
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
        const resultData = result.data as IJsonResult<IDictionary<any>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_STAT_GENERAL_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_STAT_GENERAL_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_STAT_GENERAL_FAIL,
            error: e,
            message: e.response && e.response.data,
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
        const resultData = result.data as IJsonResult<IDictionary<any>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_STAT_READ_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_STAT_READ_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_STAT_READ_FAIL,
            error: e,
            message: e.response && e.response.data,
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
