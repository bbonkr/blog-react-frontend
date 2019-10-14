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
import { IBlogAction } from '../typings/IBlogAction';
import { IDictionary } from '../typings/IDictionary';
import { IJsonResult, IListResult, IPostModel } from '../typings/dto';
import { AxiosResponse } from 'axios';

function loadPostsApi(query: IDictionary<any>) {
    const { page, limit, keyword } = query;
    return http().get(
        `/posts?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadPosts(action) {
    try {
        const { page, limit, keyword } = action.data;
        const result = yield call(loadPostsApi, {
            page: page,
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
            message: (e.response && e.response.data) || e.message,
        });
    }
}

function* watchLoadPosts() {
    yield takeLatest(actionTypes.LOAD_POSTS_CALL, loadPosts);
}

function loadSinglePostApi(user, slug) {
    return http().get(`/users/${user}/posts/${encodeURIComponent(slug)}`);
}

function* loadSinglePost(action) {
    try {
        const { user, slug } = action.data;
        const result = yield call(loadSinglePostApi, user, slug);
        const resultData = result.data as IJsonResult<IPostModel>;

        const { success, data, message } = resultData;
        if (!success) {
            throw new Error(message);
        }

        yield put<IBlogAction>({
            type: actionTypes.LOAD_SINGLE_POST_DONE,
            data: {
                post: data,
            },
        });
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_SINGLE_POST_FAIL,
            error: e,
            message: (e.response && e.response.data) || e.message,
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
//     return http().get(
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

function loadTagPostsApi(query) {
    const { tag, page, limit, keyword } = query;

    return http().get(
        `/tags/${encodeURIComponent(
            tag,
        )}/posts?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadTagPosts(action) {
    try {
        const { tag, page, limit, keyword } = action.data;
        const result: AxiosResponse<IListResult<IPostModel>> = yield call(
            loadTagPostsApi,
            {
                page: page || 1,
                tag: tag,
                limit: limit || 10,
                keyword: keyword,
            },
        );

        const { success, data, message } = result.data;
        if (!success) {
            throw new Error(message);
        }

        yield put<IBlogAction>({
            type: actionTypes.LOAD_TAG_POSTS_DONE,
            data: {
                ...data,
                page: page || 1,
            },
        });
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
    return http().get(
        `/users/${user}/posts?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadUsersPosts(action) {
    try {
        const { user, page, limit, keyword } = action.data;
        const result: AxiosResponse<
            IJsonResult<IListResult<IPostModel>>
        > = yield call(loadUsersPostsApi, {
            user: user,
            page: page || 1,
            limit: limit || 10,
            keyword: keyword,
        });

        const { success, data, message } = result.data;
        if (!success) {
            throw new Error(message);
        }

        yield put<IBlogAction>({
            type: actionTypes.LOAD_USERS_POSTS_DONE,
            data: {
                ...data, // { records, total, user }
                page: page || 1,
                limit: limit || 10,
                keyword: keyword,
                username: user,
            },
        });
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_USERS_POSTS_FAIL,
            error: e,
            message: (e.response && e.response.data) || e.message,
        });
    }
}

function* watchLoadUsersPosts() {
    yield takeLatest(actionTypes.LOAD_USERS_POSTS_CALL, loadUsersPosts);
}

function loadUserCategoryPostsApi(query) {
    const { user, category, page, limit, keyword } = query;

    return http().get(
        `/users/${user}/categories/${category}/posts?page=${page}&limit=${limit}&keyword=${keyword}`,
    );
}

function* loadUserCategoryPosts(action) {
    try {
        const { user, category, page, limit, keyword } = action.data;
        const result = yield call(loadUserCategoryPostsApi, {
            user: user,
            category: category,
            page: page || 1,
            limit: limit || 10,
            keyword: keyword,
        });
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
            message: (e.response && e.response.data) || e.message,
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
    const { page, pageToken, limit, keyword } = query;
    return http().get(
        `/posts?page=${page}&limit=${limit}&keyword=${encodeURIComponent(
            keyword,
        )}`,
    );
}

function* loadSearchPosts(action) {
    try {
        const { page, keyword } = action.data;
        const result: AxiosResponse<
            IJsonResult<IListResult<IPostModel>>
        > = yield call(loadSearchPostsApi, {
            ...action.data,
            page: action.data.page || 1,
        });
        const { success, data, message } = result.data;

        if (!success) {
            throw new Error(message);
        }
        yield put<IBlogAction>({
            type: actionTypes.LOAD_SEARCH_POSTS_DONE,
            data: {
                ...data,
                keyword: keyword,
                page: page,
            },
        });
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.LOAD_SEARCH_POSTS_FAIL,
            error: e,
            message: (e.response && e.response.data) || e.message,
        });
    }
}

function* watchLoadSearchPosts() {
    yield takeLatest(actionTypes.LOAD_SEARCH_POSTS_CALL, loadSearchPosts);
}

function addUserLikePostApi(data) {
    const { user, post } = data;
    return http().post(`/users/${user}/posts/${post}/like`, {});
}

function* addUserLikePost(action) {
    try {
        const result = yield call(addUserLikePostApi, action.data);

        const resultData = result.data as IJsonResult<IPostModel>;
        const { success, data, message } = resultData;

        if (!success) {
            throw new Error(message);
        }

        yield put<IBlogAction>({
            type: actionTypes.ADD_LIKE_POST_DONE,
            data: data,
        });

        // 좋아요 업데이트
        yield put<IBlogAction>({
            type: actionTypes.UPDATE_CATEGORY_POSTS_LIKERS,
            data: {
                post: data,
            },
        });

        yield put<IBlogAction>({
            type: actionTypes.UPDATE_POSTS_LIKERS,
            data: {
                post: data,
            },
        });
        yield put<IBlogAction>({
            type: actionTypes.UPDATE_SEARCH_POSTS_LIKERS,
            data: {
                post: data,
            },
        });
        yield put<IBlogAction>({
            type: actionTypes.UPDATE_SINGLE_POST_LIKERS,
            data: {
                post: data,
            },
        });

        yield put<IBlogAction>({
            type: actionTypes.UPDATE_TAG_POSTS_LIKERS,
            data: {
                post: data,
            },
        });
        yield put<IBlogAction>({
            type: actionTypes.UPDATE_USERS_POSTS_LIKERS,
            data: {
                post: data,
            },
        });
    } catch (e) {
        console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.ADD_LIKE_POST_FAIL,
            error: e,
            message: (e.response && e.response.data) || e.message,
        });
    }
}

function* watchAddUserLikePost() {
    yield takeLatest(actionTypes.ADD_LIKE_POST_CALL, addUserLikePost);
}

function removeUserLikePostApi(data) {
    const { user, post } = data;
    return http().delete(`/users/${user}/posts/${post}/like`);
}

function* removeUserLikePost(action) {
    try {
        const result: AxiosResponse<IJsonResult<IPostModel>> = yield call(
            removeUserLikePostApi,
            action.data,
        );
        const { success, data, message } = result.data;

        if (!success) {
            throw new Error(message);
        }

        yield put<IBlogAction>({
            type: actionTypes.REMOVE_LIKE_POST_DONE,
            data: result.data,
        });

        // 좋아요 업데이트
        yield put<IBlogAction>({
            type: actionTypes.UPDATE_CATEGORY_POSTS_LIKERS,
            data: {
                post: data,
            },
        });

        yield put<IBlogAction>({
            type: actionTypes.UPDATE_POSTS_LIKERS,
            data: {
                post: data,
            },
        });
        yield put<IBlogAction>({
            type: actionTypes.UPDATE_SEARCH_POSTS_LIKERS,
            data: {
                post: data,
            },
        });
        yield put<IBlogAction>({
            type: actionTypes.UPDATE_SINGLE_POST_LIKERS,
            data: {
                post: data,
            },
        });

        yield put<IBlogAction>({
            type: actionTypes.UPDATE_TAG_POSTS_LIKERS,
            data: {
                post: data,
            },
        });
        yield put<IBlogAction>({
            type: actionTypes.UPDATE_USERS_POSTS_LIKERS,
            data: {
                post: data,
            },
        });
    } catch (e) {
        // console.error(e);
        yield put<IBlogAction>({
            type: actionTypes.REMOVE_LIKE_POST_FAIL,
            error: e,
            message: (e.response && e.response.data) || e.message,
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
