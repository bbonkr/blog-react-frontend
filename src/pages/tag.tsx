import React, { useCallback, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Divider, PageHeader, Spin } from 'antd';
import ListExcerpt from '../components/ListExcerpt';
import DefaultLayout from '../components/DefaultLayout';
import { ContentWrapper } from '../styledComponents/Wrapper';
import { actionTypes } from '../reducers/actionTypes';
import { IRootState, ITagPostsState } from '../typings/reduxStates';
import Helmet from 'react-helmet';
import { appOptions } from '../config/appOptions';

export interface ITagProps {
    slug: string;
}

const Tag: FunctionComponent<ITagProps> = ({ slug }) => {
    const siteName = appOptions.title;
    const dispatch = useDispatch();
    const {
        tagPosts,
        tagPostsLoading,
        tagPostsHasMore,
        postsLimit,
        currentTag,
        currentPage,
    } = useSelector<IRootState, ITagPostsState>((s) => s.tagPosts);

    const loadMoreHandler = useCallback(() => {
        dispatch({
            type: actionTypes.LOAD_TAG_POSTS_CALL,
            data: {
                page: (currentPage || 0) + 1,
                limit: postsLimit || 10,
                keyword: '',
                tag: slug,
            },
        });
    }, [dispatch, currentPage, postsLimit, slug]);
    return (
        <>
            <Helmet title={`${currentTag && currentTag.name} | ${siteName}`} />
            <DefaultLayout>
                <ContentWrapper>
                    <Spin spinning={tagPostsLoading}>
                        <PageHeader
                            title={`TAG: ${!!currentTag && currentTag.name}`}
                        />
                        <Divider />
                        <ListExcerpt
                            posts={tagPosts}
                            hasMore={tagPostsHasMore}
                            loading={tagPostsLoading}
                            loadMoreHandler={loadMoreHandler}
                        />
                    </Spin>
                </ContentWrapper>
            </DefaultLayout>
        </>
    );
};

// Tag.propTypes = {
//     slug: PropTypes.string.isRequired,
// };

Tag.getInitialProps = async (context) => {
    const state = context.store.getState();
    const slug = decodeURIComponent(context.query.slug);
    const {
        postsLimit,
        tagPosts,
        currentTagSlug,
    }: ITagPostsState = state.tagPosts;

    if (
        context.isServer ||
        !tagPosts ||
        tagPosts.length === 0 ||
        slug !== currentTagSlug
    ) {
        context.store.dispatch({
            type: actionTypes.LOAD_TAG_POSTS_CALL,
            data: {
                // page: null,
                // pageToken: null,
                limit: postsLimit,
                keyword: '',
                tag: slug,
            },
        });
    }

    return { slug };
};

export default Tag;
