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
import { http } from './httpHelper';
import { actionTypes } from '../reducers/actionTypes';
import { Dictionary } from '../typings/Dictionary';
import { AxiosResponse } from 'axios';
import {
    JsonResult,
    ListResult,
    PostModel,
    CategoryModel,
    TagModel,
    ImageModel,
} from '../typings/dto';
import { BaseAction } from '../typings/BaseAction';

function loadMyPostsApi(query) {
    const { page, limit, keyword } = query;

    return http().get(
        `/me/posts?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadMyPosts(action: BaseAction) {
    try {
        const { page, limit, keyword } = action.data;

        const result = yield call(loadMyPostsApi, {
            page: page || '1',
            limit: limit || 10,
            keyword: keyword,
        });

        const resultData = result.data as JsonResult<ListResult<PostModel>>;
        const { success, data, message } = resultData;

        if (!success) {
            throw new Error(message);
        }

        yield put<BaseAction>({
            type: actionTypes.LOAD_MY_POSTS_DONE,
            data: {
                ...data,
                page: page || 1,
            },
        });
    } catch (e) {
        // console.error(e);
        yield put<BaseAction>({
            type: actionTypes.LOAD_MY_POSTS_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchLoadMyPosts() {
    yield takeLatest(actionTypes.LOAD_MY_POSTS_CALL, loadMyPosts);
}

function writePostApi(formData) {
    return http().post('/me/post', formData);
}

function* writePost(action) {
    try {
        const result = yield call(writePostApi, action.data);
        const resultData = result.data as JsonResult<PostModel>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.WRITE_POST_DONE,
                data: data,
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.WRITE_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        yield put<BaseAction>({
            type: actionTypes.WRITE_POST_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchWritePost() {
    yield takeLatest(actionTypes.WRITE_POST_CALL, writePost);
}

function loadCategoriesApi(query) {
    const { limit, keyword, page } = query;

    return http().get(
        `/me/categories?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadCategories(action: BaseAction) {
    try {
        const { limit, keyword, page } = action.data;
        // console.debug('[DEBUG]: category ==> ', action.data);
        const result: AxiosResponse<
            JsonResult<ListResult<CategoryModel>>
        > = yield call(loadCategoriesApi, {
            page: page || 1,
            limit: limit || 10,
            keyword: keyword || '',
        });

        const { success, data, message } = result.data;

        // console.debug('[DEBUG]: categories ==> ', data);

        if (!success) {
            throw new Error(message);
        }

        yield put<BaseAction>({
            type: actionTypes.LOAD_MY_CATEGORIES_DONE,
            data: {
                ...data,
                page: page || 1,
            },
        });
    } catch (e) {
        console.error(e);
        yield put<BaseAction>({
            type: actionTypes.LOAD_MY_CATEGORIES_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchLoadCategories() {
    yield takeLatest(actionTypes.LOAD_MY_CATEGORIES_CALL, loadCategories);
}

function loadTagsApi() {
    return http().get('/me/tags');
}

function* loadTags(action) {
    try {
        const result: AxiosResponse<
            JsonResult<ListResult<TagModel>>
        > = yield call(loadTagsApi);
        // const resultData = result.data as IJsonResult<IListResult<ITagModel>>;
        const { success, data, message } = result.data;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.LOAD_MY_TAGS_DONE,
                data: data,
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.LOAD_MY_TAGS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        yield put<BaseAction>({
            type: actionTypes.LOAD_MY_TAGS_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchLoadTags() {
    yield takeLatest(actionTypes.LOAD_MY_TAGS_CALL, loadTags);
}

function editPostApi(id, data) {
    return http().patch(`/me/post/${id}`, data);
}

function* editPost(action) {
    try {
        const result = yield call(editPostApi, action.id, action.data);
        const resultData = result.data as JsonResult<PostModel>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.EDIT_POST_DONE,
                data: data,
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.EDIT_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        yield put<BaseAction>({
            type: actionTypes.EDIT_POST_FAIL,
            error: e,
            message: e.message,
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
    return http().delete(`/me/post/${id}`);
}

function* deletePost(action) {
    try {
        const result = yield call(deletePostApi, action.data);
        const resultData = result.data as JsonResult<number>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.DELETE_POST_DONE,
                data: { id: data },
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.DELETE_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<BaseAction>({
            type: actionTypes.DELETE_POST_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchDeletePost() {
    yield takeLatest(actionTypes.DELETE_POST_CALL, deletePost);
}

function loadMyPostApi(query) {
    const { id } = query;
    return http().get(`/me/post/${id}`);
}

function* loadMyPost(action) {
    try {
        const { id } = action.data;
        const result: AxiosResponse<JsonResult<PostModel>> = yield call(
            loadMyPostApi,
            { id },
        );

        const { success, data, message } = result.data;
        if (!success) {
            yield put<BaseAction>({
                type: actionTypes.LOAD_MY_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }

        yield put<BaseAction>({
            type: actionTypes.LOAD_MY_POST_DONE,
            data: {
                post: data,
            },
        });
    } catch (e) {
        // console.error(e);
        yield put<BaseAction>({
            type: actionTypes.LOAD_MY_POST_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchLoadMyPost() {
    yield takeLatest(actionTypes.LOAD_MY_POST_CALL, loadMyPost);
}

function* writeNewPost(action) {
    try {
        yield put<BaseAction>({
            type: actionTypes.WRITE_NEW_POST_DONE,
        });
    } catch (e) {
        yield put<BaseAction>({
            type: actionTypes.WRITE_NEW_POST_FAIL,
            error: e,
        });
    }
}

function* watchWriteNewPost() {
    yield takeLatest(actionTypes.WRITE_NEW_POST_CALL, writeNewPost);
}

function uploadMyMediaFilesApi(data) {
    return http().post('/me/media', data);
}

function* uploadMyMediaFiles(action) {
    try {
        // console.log('==========> form data:', action.data);
        const result = yield call(uploadMyMediaFilesApi, action.data);
        const resultData = result.data as JsonResult<ListResult<ImageModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.UPLOAD_MY_MEDIA_FILES_DONE,
                data: {
                    ...data,
                },
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.UPLOAD_MY_MEDIA_FILES_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<BaseAction>({
            type: actionTypes.UPLOAD_MY_MEDIA_FILES_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchUploadMyMediaFiles() {
    yield takeLatest(
        actionTypes.UPLOAD_MY_MEDIA_FILES_CALL,
        uploadMyMediaFiles,
    );
}

function loadMediaFilesApi(query) {
    const { page, limit, keyword } = query;
    return http().get(
        `/me/media/?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadMediaFiles(action) {
    try {
        const { page, limit, keyword } = action.data;
        const result = yield call(loadMediaFilesApi, {
            page: page || 1,
            limit: limit || 10,
            keyword: keyword || '',
        });

        const resultData = result.data as JsonResult<ListResult<ImageModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.LOAD_MY_MEDIA_FILES_DONE,
                data: {
                    ...data,
                    page: page || 1,
                },
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.LOAD_MY_MEDIA_FILES_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        console.error(e);
        yield put<BaseAction>({
            type: actionTypes.LOAD_MY_MEDIA_FILES_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchLoadMediaFiles() {
    yield takeLatest(actionTypes.LOAD_MY_MEDIA_FILES_CALL, loadMediaFiles);
}

function deleteMediaFileApi(id) {
    return http().delete(`/me/media/${id}`);
}

function* deleteMediaFile(action) {
    try {
        const { id } = action.data;
        const result: AxiosResponse<JsonResult<number>> = yield call(
            deleteMediaFileApi,
            id,
        );

        const { success, data, message } = result.data;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.DELETE_MY_MEDIA_FILES_DONE,
                data: {
                    id: data,
                },
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.DELETE_MY_MEDIA_FILES_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        console.error(e);
        yield put<BaseAction>({
            type: actionTypes.DELETE_MY_MEDIA_FILES_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchDeleteMediaFile() {
    yield takeLatest(actionTypes.DELETE_MY_MEDIA_FILES_CALL, deleteMediaFile);
}

function editCategoryApi(formData) {
    if (!!formData.id) {
        return http().patch(`/me/category/${formData.id}`, formData);
    } else {
        return http().post('/me/category', formData);
    }
}

function* editCategory(action) {
    try {
        const result = yield call(editCategoryApi, action.data);
        const resultData = result.data as JsonResult<CategoryModel>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.EDIT_MY_CATEGORY_DONE,
                data: {
                    category: data,
                },
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.EDIT_MY_CATEGORY_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<BaseAction>({
            type: actionTypes.EDIT_MY_CATEGORY_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* wacthEditCategory() {
    yield takeLatest(actionTypes.EDIT_MY_CATEGORY_CALL, editCategory);
}

function deleteCategoryApi(id) {
    return http().delete(`/me/category/${id}`);
}

function* deleteCategory(action) {
    try {
        const { id } = action.data;
        const result: AxiosResponse<JsonResult<number>> = yield call(
            deleteCategoryApi,
            id,
        );

        const { success, data, message } = result.data;
        if (!success) {
            throw new Error(message);
        }

        yield put<BaseAction>({
            type: actionTypes.DELETE_MY_CATEGORY_DONE,
            data: {
                id: data,
            },
        });
    } catch (e) {
        // console.error(e);
        yield put<BaseAction>({
            type: actionTypes.DELETE_MY_CATEGORY_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchDeleteCategory() {
    yield takeLatest(actionTypes.DELETE_MY_CATEGORY_CALL, deleteCategory);
}

function loadLikedPostsApi(query) {
    const { limit, keyword, page } = query;

    return http().get(
        `/me/liked?&page=${page}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadLikedPosts(action) {
    try {
        const { limit, keyword, page } = action.data;

        const result = yield call(loadLikedPostsApi, {
            page: page || 1,
            limit: limit || 10,
            keyword: keyword || '',
        });

        const resultData = result.data as JsonResult<ListResult<PostModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.LOAD_LIKED_POSTS_DONE,
                data: {
                    ...data,
                    keyword: keyword,
                    page: page || 1,
                },
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.LOAD_LIKED_POSTS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<BaseAction>({
            type: actionTypes.LOAD_LIKED_POSTS_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchLoadLikedPosts() {
    yield takeLatest(actionTypes.LOAD_LIKED_POSTS_CALL, loadLikedPosts);
}

function loadStatGeneralApi(query) {
    return http().get('/me/stat/general');
}

function* loadStatGeneral(action) {
    try {
        const result = yield call(loadStatGeneralApi, action.data);
        const resultData = result.data as JsonResult<Dictionary<any>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.LOAD_STAT_GENERAL_DONE,
                data: data,
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.LOAD_STAT_GENERAL_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<BaseAction>({
            type: actionTypes.LOAD_STAT_GENERAL_FAIL,
            error: e,
            message: e.message,
        });
    }
}

function* watchLoadStatGeneral() {
    yield takeLatest(actionTypes.LOAD_STAT_GENERAL_CALL, loadStatGeneral);
}

function loadStatReadApi(query) {
    return http().get('/me/stat/postread');
}

function* loadStatRead(action) {
    try {
        const result = yield call(loadStatReadApi, action.data);
        const resultData = result.data as JsonResult<Dictionary<any>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<BaseAction>({
                type: actionTypes.LOAD_STAT_READ_DONE,
                data: data,
            });
        } else {
            yield put<BaseAction>({
                type: actionTypes.LOAD_STAT_READ_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<BaseAction>({
            type: actionTypes.LOAD_STAT_READ_FAIL,
            error: e,
            message: e.message,
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
