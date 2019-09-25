import React, { useCallback, FunctionComponent, useMemo } from 'react';
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
import { IPageProps } from '../typings/IPageProps';
import { IPostModel } from '../typings/dto';
import Head from 'next/head';
import { Store } from 'redux';

export interface IHomePageProps extends IPageProps {
    // posts: IPostModel[];
    // currentPage?: number;
    // postsLimit: number;
    // loadingPosts: boolean;
    // hasMorePost: boolean;
}

const Home: FunctionComponent<IHomePageProps> = (
    {
        // posts,
        // currentPage,
        // postsLimit,
        // loadingPosts,
        // hasMorePost,
    },
) => {
    const dispatch = useDispatch();
    const {
        posts,
        currentPage,
        postsLimit,
        loadingPosts,
        hasMorePost,
    } = useSelector<IRootState, IPostsState>((s) => s.posts);

    const onClickLoadMorePosts = useCallback(() => {
        dispatch({
            type: actionTypes.LOAD_POSTS_CALL,
            data: {
                page: (currentPage || 0) + 1,
                limit: postsLimit,
                keyword: '',
            },
        });
    }, [dispatch, currentPage, postsLimit]);

    const title: string = useMemo(() => {
        return appOptions.title;
    }, []);
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
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

Home.getInitialProps = async (
    context: NextPageContext & NextJSContext<IRootState, IBlogAction>,
): Promise<IHomePageProps> => {
    const store: Store<IRootState, IBlogAction> = context.store;
    const state = store.getState();

    const {
        posts,
        currentPage,
        postsLimit,
        loadingPosts,
        hasMorePost,
    } = state.posts;

    if (context.isServer || !posts || posts.length === 0) {
        store.dispatch<IBlogAction>({
            type: actionTypes.LOAD_POSTS_CALL,
            data: {
                page: null,
                limit: postsLimit,
                keyword: '',
            },
        });
    }
    return {
        // posts,
        // currentPage,
        // postsLimit,
        // loadingPosts,
        // hasMorePost,
    };
};

export default Home;
