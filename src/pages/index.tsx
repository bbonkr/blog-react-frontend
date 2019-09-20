import React, { useCallback, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListExcerpt from '../components/ListExcerpt';
import { ContentWrapper } from '../styledComponents/Wrapper';
import DefaultLayout from '../components/DefaultLayout';
import { actionTypes } from '../reducers/actionTypes';
import { NextPageContext } from 'next';
import { NextJSContext } from 'next-redux-wrapper';
import { IBlogAction } from '../typings/IBlogAction';
import { IRootState, IPostsState } from '../typings/reduxStates';
import { Spin } from 'antd';
import { appOptions } from '../config/appOptions';
import Helmet from 'react-helmet';

const Home: FunctionComponent = () => {
    const siteName = appOptions.title;
    const dispatch = useDispatch();
    const {
        posts,
        // nextPageToken,
        currentPage,
        postsLimit,
        loadingPosts,
        hasMorePost,
    } = useSelector<IRootState, IPostsState>((s) => s.posts);

    const onClickLoadMorePosts = useCallback(() => {
        const nextPageToken =
            posts && posts.length > 0 && posts[posts.length - 1].id;

        dispatch({
            type: actionTypes.LOAD_POSTS_CALL,
            data: {
                // pageToken: nextPageToken,
                page: (currentPage || 0) + 1,
                limit: postsLimit,
                keyword: '',
            },
        });
    }, [dispatch, currentPage, postsLimit]);

    return (
        <>
            <Helmet title={`${siteName}`} />
            <DefaultLayout>
                <ContentWrapper>
                    <Spin spinning={loadingPosts}>
                        <ListExcerpt
                            posts={posts}
                            loading={loadingPosts}
                            hasMore={hasMorePost}
                            loadMoreHandler={onClickLoadMorePosts}
                        />
                    </Spin>
                </ContentWrapper>
            </DefaultLayout>
        </>
    );
};

// Home.defaultProps = {};

// Home.propTypes = {};

Home.getInitialProps = async (
    context: NextPageContext & NextJSContext<IRootState, IBlogAction>,
) => {
    const state = context.store.getState();

    const { postsLimit, posts } = state.posts;

    if (context.isServer || !posts || posts.length === 0) {
        context.store.dispatch<IBlogAction>({
            type: actionTypes.LOAD_POSTS_CALL,
            data: {
                pageToken: null,
                page: null,
                limit: postsLimit,
                keyword: '',
            },
        });
    }
    return {};
};

export default Home;
