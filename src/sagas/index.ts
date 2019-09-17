// import { all, call } from 'redux-saga/effects';
import { all, fork, call, takeLatest, put } from '@redux-saga/core/effects';
import user from './user';
import post from './post';
import category from './category';
import me from './me';

export function* rootSaga() {
    yield all([call(user), call(post), call(category), call(me)]);
}
