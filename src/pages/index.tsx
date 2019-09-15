import React, { useCallback, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListExcerpt from '../components/ListExcerpt';
import { ContentWrapper } from '../styledComponents/Wrapper';
import DefaultLayout from '../components/DefaultLayout';
import { actionTypes } from '../reducers/actionTypes';
import { IRootState } from 'reducers';
import { IPostState } from 'reducers/post';
import { NextPageContext } from 'next';
import { NextJSContext } from 'next-redux-wrapper';
import { IBlogAction } from '../typings/IBlogAction';

const Home: FunctionComponent = () => {
    const dispatch = useDispatch();
    const {
        posts,
        nextPageToken,
        postsLimit,
        loadingPosts,
        hasMorePost,
    } = useSelector<IRootState, IPostState>((s) => s.post);

    const onClickLoadMorePosts = useCallback(() => {
        dispatch({
            type: actionTypes.LOAD_POSTS_CALL,
            data: {
                pageToken: nextPageToken,
                limit: postsLimit,
                keyword: '',
            },
        });
    }, [dispatch, nextPageToken, postsLimit]);

    return (
        <DefaultLayout>
            <ContentWrapper>
                <ListExcerpt
                    posts={posts}
                    loading={loadingPosts}
                    hasMore={hasMorePost}
                    loadMoreHandler={onClickLoadMorePosts}
                />
            </ContentWrapper>
        </DefaultLayout>
    );
};

// Home.defaultProps = {};

// Home.propTypes = {};

Home.getInitialProps = async (
    context: NextPageContext & NextJSContext<IRootState, IBlogAction>,
) => {
    const state = context.store.getState();

    const { postsLimit, posts } = state.post;

    if (context.isServer || !posts || posts.length === 0) {
        context.store.dispatch<IBlogAction>({
            type: actionTypes.LOAD_POSTS_CALL,
            data: {
                pageToken: null,
                limit: postsLimit,
                keyword: '',
            },
        });
    }
    return {};
};

export default Home;
