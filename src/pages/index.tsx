import React, { useCallback, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListExcerpt from '../components/ListExcerpt';
import { ContentWrapper } from '../styledComponents/Wrapper';
import DefaultLayout from '../components/DefaultLayout';
import { actionTypes } from '../reducers/actionTypes';
import { NextPageContext } from 'next';
import { NextJSContext } from 'next-redux-wrapper';
import { IBlogAction } from '../typings/IBlogAction';
import { IRootState, IPostState } from '../typings/reduxStates';

const Home: FunctionComponent = () => {
    const dispatch = useDispatch();
    const {
        posts,
        // nextPageToken,
        currentPage,
        postsLimit,
        loadingPosts,
        hasMorePost,
    } = useSelector<IRootState, IPostState>((s) => s.post);

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
                page: null,
                limit: postsLimit,
                keyword: '',
            },
        });
    }
    return {};
};

export default Home;
