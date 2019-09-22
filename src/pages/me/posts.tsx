import React, { useState, useCallback, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Table, Modal, Button, Icon, PageHeader } from 'antd';
import MeLayout from '../../components/MeLayout';
import { ContentWrapper } from '../../styledComponents/Wrapper';
import { withAuth } from '../../utils/auth';
import moment from 'moment';
import { formatNumber } from '../../helpers/stringHelper';
import Router from 'next/router';
import { actionTypes } from '../../reducers/actionTypes';
import { IRootState, IMeState, IMyPostsState } from '../../typings/reduxStates';

const Posts: FunctionComponent = () => {
    const dispatch = useDispatch();
    const {
        myPosts,
        postsCount,
        loadingMyPosts,
        postsLimit,
        postsCurrentPage,
    } = useSelector<IRootState, IMyPostsState>((state) => state.myPosts);

    const [currentPage, setCurrentPage] = useState(1);

    const onChangePagination = useCallback(
        (current, size) => {
            setCurrentPage(current);
            dispatch({
                type: actionTypes.LOAD_MY_POSTS_CALL,
                data: {
                    // pageToken: nextPageToken,
                    page: current,
                    limit: size || postsLimit || 10,
                    keyword: '',
                },
            });
        },
        [postsLimit],
    );

    const onShowSizeChangePagination = useCallback((current, size) => {
        setCurrentPage(current);
        dispatch({
            type: actionTypes.LOAD_MY_POSTS_CALL,
            data: {
                // pageToken: nextPageToken,
                page: current,
                limit: size || postsLimit || 10,
                keyword: '',
            },
        });
    }, []);

    const onClickNewPost = useCallback(() => {
        Router.push('/me/write');
    }, []);

    const onClickEditPost = useCallback(
        (post) => () => {
            Router.push({ pathname: '/me/write', query: { id: post.id } });
        },
        [],
    );

    const onClickDeletePost = useCallback(
        (post) => () => {
            Modal.confirm({
                title: 'Do you want to delete this post?',
                content: post.title,
                onOk: () => {
                    dispatch({
                        type: actionTypes.DELETE_POST_CALL,
                        data: post.id,
                    });
                },
                onCancel: null,
            });
        },
        [],
    );

    const columns = [
        {
            key: 'title',
            title: 'title',
            dataIndex: 'title',
            render: (text, record, index) => {
                return (
                    <span onClick={onClickEditPost(record)}>{text}</span>
                    // <Link
                    //     href={{
                    //         pathname: '/me/write',
                    //         query: { id: record.id },
                    //     }}>
                    //     <a title={`Click to edit the ${text} post`}>{text}</a>
                    // </Link>
                );
            },
            whidh: '40%',
        },
        {
            key: 'createdAt',
            title: 'Created',
            dataIndex: 'createdAt',
            render: (createdAt) => (
                <span>
                    {moment(
                        new Date(createdAt),
                        'YYYY-MM-DD HH:mm:ss',
                    ).fromNow()}
                </span>
            ),
            whidh: '20%',
        },
        {
            key: 'categories',
            title: 'Categories',
            dataIndex: 'categories',
            render: (categories) => (
                <span>
                    {categories.map((category) => {
                        return <Tag key={category.slug}>{category.name}</Tag>;
                    })}
                </span>
            ),
            whidh: '20%',
        },
        {
            key: 'tags',
            title: 'Tags',
            dataIndex: 'tags',
            render: (tags) => (
                <span>
                    {tags.map((tag) => {
                        return <Tag key={tag.slug}>{tag.name}</Tag>;
                    })}
                </span>
            ),
            whidh: '20%',
        },
    ];
    return (
        <MeLayout>
            <ContentWrapper>
                <PageHeader title='Posts' />
                <div>
                    <Table
                        title={(currentPageData) => {
                            return (
                                <div>
                                    <div>
                                        <Button
                                            type='primary'
                                            onClick={onClickNewPost}>
                                            New Post
                                        </Button>
                                    </div>
                                    <div>{`Total: ${formatNumber(
                                        postsCount,
                                    )}`}</div>
                                </div>
                            );
                        }}
                        rowKey={(record) => record.id}
                        dataSource={myPosts}
                        columns={columns}
                        loading={loadingMyPosts}
                        pagination={{
                            total: postsCount,
                            current: currentPage,
                            defaultCurrent: 1,
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30', '50', '100'],
                            onChange: onChangePagination,
                            onShowSizeChange: onShowSizeChangePagination,
                            position: 'both',
                        }}
                        expandedRowRender={(record) => {
                            return (
                                <div>
                                    <Button.Group>
                                        <Button
                                            onClick={onClickEditPost(record)}>
                                            <span>
                                                <Icon type='edit' /> Edit
                                            </span>
                                        </Button>
                                        <Button
                                            type='danger'
                                            onClick={onClickDeletePost(record)}>
                                            <span>
                                                <Icon type='delete' /> Delete
                                            </span>
                                        </Button>
                                    </Button.Group>
                                </div>
                            );
                        }}
                    />
                </div>
            </ContentWrapper>
        </MeLayout>
    );
};

Posts.getInitialProps = async (context) => {
    const state = context.store.getState();
    const { postsLimit, myPosts } = state.me;
    const lastPost =
        myPosts && myPosts.length > 0 && myPosts[myPosts.length - 1];

    context.store.dispatch({
        type: actionTypes.LOAD_MY_POSTS_CALL,
        data: {
            page: null,
            limit: postsLimit || 10,
            keyword: '',
        },
    });

    return {};
};

export default withAuth(Posts);
