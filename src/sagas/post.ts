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
import { IListResult } from '../typings/IListResult';
import { IPostModel } from '../typings/IPostModel';
import { IJsonResult } from '../typings/IJsonResult';
import { IBlogAction } from '../typings/IBlogAction';
import { IDictionary } from '../typings/IDictionary';

function loadPostsApi(query: IDictionary<any>) {
    const { page, pageToken, limit, keyword } = query;
    return http.get(
        `/posts?page=${page}pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadPosts(action) {
    try {
        const { page, pageToken, limit, keyword } = action.data;
        const result = yield call(loadPostsApi, {
            page: page,
            pageToken: pageToken,
            limit: limit || 10,
            keyword: keyword,
        });

        const resultData = result.data as IJsonResult<IListResult<IPostModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_POSTS_DONE,
                data: {
                    ...data,
                    page: page,
                    limit: limit,
                    keyword: keyword,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_POSTS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_POSTS_FAIL,
            error: e,
            message: e.response && e.response.data,
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
        const resultData = result.data as IJsonResult<IPostModel>;

        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_SINGLE_POST_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_SINGLE_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_SINGLE_POST_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchLoadSinglePost() {
    yield takeLatest(actionTypes.LOAD_SINGLE_POST_CALL, loadSinglePost);
}

// function loadCategoryPostsApi(
//     category,
//     pageToken = '',
//     limit = 10,
//     keyword = '',
// ) {
//     return http.get(
//         `/posts/category/${category}?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
//             keyword,
//         )}`,
//     );
// }

// function* loadCategoryPosts(action) {
//     try {
//         const { category, pageToken, limit, keyword } = action.data;
//         const result = yield call(
//             loadCategoryPostsApi,
//             category,
//             pageToken,
//             limit,
//             keyword,
//         );

//         const resultData = result.data as IJsonResult<IListResult<IPostModel>>;
//         const { success, data, message } = resultData;
//         if (success) {
//             yield put<IBlogAction>({
//                 type: actionTypes.LOAD_CATEGORY_POSTS_DONE,
//                 data: {
//                     ...data,
//                     currentCategory: category,
//                 },
//             });
//         } else {
//         }
//     } catch (e) {
//         console.error(e);
//         yield put<IBlogAction>({
//             type: actionTypes.LOAD_CATEGORY_POSTS_FAIL,
//             error: e,
//         });
//     }
// }

// function* watchLoadCategoryPosts() {
//     yield takeLatest(actionTypes.LOAD_CATEGORY_POSTS_CALL, loadCategoryPosts);
// }

function loadTagPostsApi(tag, pageToken = '', limit = 10, keyword = '') {
    return http.get(
        `/tags/${encodeURIComponent(
            tag,
        )}/posts?pageToken=${pageToken}&limit=${limit}&keyword=${encodeURIComponent(
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

        const resultData = result.data as IJsonResult<IListResult<IPostModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_TAG_POSTS_DONE,
                data: {
                    ...data,
                    currentTag: tag,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_TAG_POSTS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_TAG_POSTS_FAIL,
            error: e,
        });
    }
}

function* watchLoadTagPosts() {
    yield takeLatest(actionTypes.LOAD_TAG_POSTS_CALL, loadTagPosts);
}

function loadUsersPostsApi(query) {
    const { user, page = 1, limit = 10, keyword = '' } = query;
    return http.get(
        `/users/${user}/posts?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadUsersPosts(action) {
    try {
        const { user, page, limit, keyword } = action.data;
        const result = yield call(loadUsersPostsApi, {
            user: user,
            page: page,
            limit: limit || 10,
            keyword: keyword,
        });

        const resultData = result.data as IJsonResult<IListResult<IPostModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_USERS_POSTS_DONE,
                data: {
                    ...data, // { records, total, user }
                    page: page,
                    limit: limit,
                    keyword: keyword,
                    username: user,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_USERS_POSTS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_USERS_POSTS_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchLoadUsersPosts() {
    yield takeLatest(actionTypes.LOAD_USERS_POSTS_CALL, loadUsersPosts);
}

function loadUserCategoryPostsApi(query) {
    const { user, category, page = 1, limit, keyword } = query;

    return http.get(
        `/users/${user}/categories/${category}/posts?page=${page}&limit=${limit}&keyword=${keyword}`,
    );
}

function* loadUserCategoryPosts(action) {
    try {
        const { user, category, page, limit, keyword } = action.data;
        const result = yield call(loadUserCategoryPostsApi, action.data);
        const resultData = result.data as IJsonResult<IListResult<IPostModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_USER_CATEGORY_POSTS_DONE,
                data: {
                    // todo type result data
                    ...data, // { records, total, user, category }
                    page: page || 1,
                    limit: limit,
                    keyword: keyword,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_USER_CATEGORY_POSTS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        yield put<IBlogAction>({
            type: actionTypes.LOAD_USER_CATEGORY_POSTS_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchLaodUserCatetoryPosts() {
    yield takeLatest(
        actionTypes.LOAD_USER_CATEGORY_POSTS_CALL,
        loadUserCategoryPosts,
    );
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
        const resultData = result.data as IJsonResult<IListResult<IPostModel>>;
        const { success, data, message } = resultData;
        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_SEARCH_POSTS_DONE,
                data: {
                    ...data,
                    keyword: keyword,
                },
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.LOAD_SEARCH_POSTS_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_SEARCH_POSTS_FAIL,
            error: e,
            message: e.response && e.response.data,
        });
    }
}

function* watchLoadSearchPosts() {
    yield takeLatest(actionTypes.LOAD_SEARCH_POSTS_CALL, loadSearchPosts);
}

function addUserLikePostApi(data) {
    const { user, post } = data;
    return http.post(`/users/${user}/posts/${post}/like`, {});
}

function* addUserLikePost(action) {
    try {
        const result = yield call(addUserLikePostApi, action.data);

        const resultData = result.data as IJsonResult<IPostModel>;
        const { success, data, message } = resultData;

        if (success) {
            yield put<IBlogAction>({
                type: actionTypes.ADD_LIKE_POST_DONE,
                data: data,
            });
        } else {
            yield put<IBlogAction>({
                type: actionTypes.ADD_LIKE_POST_FAIL,
                error: new Error(message),
                message: message,
            });
        }
    } catch (e) {
        console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.ADD_LIKE_POST_FAIL,
            error: e,
            message: e.response && e.response.data,
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
        yield put<IBlogAction>({
            type: actionTypes.REMOVE_LIKE_POST_DONE,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.REMOVE_LIKE_POST_FAIL,
            error: e,
            message: e.response && e.response.data,
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
        // fork(watchLoadCategoryPosts),
        fork(watchLoadTagPosts),
        fork(watchLoadUsersPosts),
        fork(watchLaodUserCatetoryPosts),
        fork(watchLoadSearchPosts),
        fork(watchAddUserLikePost),
        fork(watchRemoveUserLikePost),
    ]);
}
