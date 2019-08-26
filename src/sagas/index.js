import { all, call } from 'redux-saga/effects';
import user from './user';
import post from './post';
import category from './category';
import me from './me';
import axios from 'axios';

// axios.defaults.baseURL = API_BASE_URL;
//'http://localhost:3000/api';

axios.defaults.baseURL = axios.defaults.baseURL || 'https://sample-blog.bbon.me/api';

export default function* rootSaga() {
    yield all([call(user), call(post), call(category), call(me)]);
}
