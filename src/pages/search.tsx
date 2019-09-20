import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Divider, Spin } from 'antd';
import ListExcerpt from '../components/ListExcerpt';
import { ContentWrapper } from '../styledComponents/Wrapper';
import DefaultLayout from '../components/DefaultLayout';
import { actionTypes } from '../reducers/actionTypes';
import { IRootState, ISearchPostsState } from '../typings/reduxStates';
import Helmet from 'react-helmet';
import { appOptions } from '../config/appOptions';

const KEYWORD_INPUT_PLACEHOLDER = 'Searching keyword';

const Search = ({ keyword }) => {
    const siteName = appOptions.title;
    const dispatch = useDispatch();
    const [keywordText, setKeywordText] = useState(keyword);
    const {
        searchPosts,
        searchPostsHasMore,
        searchPostsLoading,
        searchPostsKeyword,
        postsLimit,
        searchPostsCurrentPage,
    } = useSelector<IRootState, ISearchPostsState>((s) => s.searchPosts);

    const onChangeKeyword = useCallback((e) => {
        setKeywordText(e.target.value);
    }, []);

    const onSearch = useCallback(
        (value, e) => {
            if (value) {
                dispatch({
                    type: actionTypes.LOAD_SEARCH_POSTS_CALL,
                    data: {
                        page: 1,
                        limit: postsLimit,
                        keyword: value,
                    },
                });
            }
        },
        [dispatch, postsLimit],
    );

    const loadMoreHandler = useCallback(() => {
        const pageToken =
            searchPosts &&
            searchPosts.length > 0 &&
            searchPosts[searchPosts.length - 1].id;
        dispatch({
            type: actionTypes.LOAD_SEARCH_POSTS_CALL,
            data: {
                page: (searchPostsCurrentPage || 0) + 1,
                limit: postsLimit,
                keyword: searchPostsKeyword,
            },
        });
    }, [dispatch, postsLimit, searchPosts, searchPostsKeyword]);

    return (
        <>
            <Helmet title={`${searchPostsKeyword} | ${siteName}`} />
            <DefaultLayout>
                <ContentWrapper>
                    <Spin spinning={searchPostsLoading}>
                        <Input.Search
                            enterButton
                            name='keyword'
                            value={keywordText}
                            onChange={onChangeKeyword}
                            onSearch={onSearch}
                            placeholder={KEYWORD_INPUT_PLACEHOLDER}
                        />

                        <Divider />
                        <ListExcerpt
                            posts={searchPosts}
                            hasMore={searchPostsHasMore}
                            loading={searchPostsLoading}
                            loadMoreHandler={loadMoreHandler}
                        />
                    </Spin>
                </ContentWrapper>
            </DefaultLayout>
        </>
    );
};

Search.getInitialProps = async (context) => {
    const keyword = decodeURIComponent(context.query.keyword);

    if (keyword) {
        const state = context.store.getState();
        const { postsLimit } = state.searchPosts;
        context.store.dispatch({
            type: actionTypes.LOAD_SEARCH_POSTS_CALL,
            data: {
                page: null,
                limit: postsLimit,
                keyword: keyword,
            },
        });
    }

    return {
        keyword,
    };
};

export default Search;
