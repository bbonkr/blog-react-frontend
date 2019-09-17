/**
 * users/:user/posts
 */
import React, { useCallback, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DefaultLayout from '../../components/DefaultLayout';
import { ContentWrapper } from '../../styledComponents/Wrapper';
import ListExcerpt from '../../components/ListExcerpt';
import { actionTypes } from '../../reducers/actionTypes';
import { IUserModel } from '../../typings/IUserModel';
import { IRootState, IUsersPostsState } from '../../typings/reduxStates';
import { PageHeader, Divider, Spin } from 'antd';
import LinkUsersPosts from '../../components/LinkUsersPosts';
import UserAvatar from '../../components/UserAvatar';

export interface IUsersPostsProps {
    user: IUserModel;
}

const UsersPosts: FunctionComponent<IUsersPostsProps> = ({ user }) => {
    const dispatch = useDispatch();
    const {
        usersPosts,
        hasMoreUsersPosts,
        loadingUsersPosts,
        currentUser,
        currentUsername,
        currentPage,
        postsLimit,
    } = useSelector<IRootState, IUsersPostsState>((s) => s.usersPosts);
    const onClickLoadMore = useCallback(() => {
        dispatch({
            type: actionTypes.LOAD_USERS_POSTS_CALL,
            data: {
                user: user,
                page: (currentPage || 0) + 1,
                limit: postsLimit,
                keyword: '',
            },
        });
    }, [dispatch, postsLimit, user, usersPosts]);
    return (
        <DefaultLayout>
            <ContentWrapper>
                <Spin spinning={loadingUsersPosts}>
                    <PageHeader
                        title={
                            <div>
                                <LinkUsersPosts user={currentUser}>
                                    <UserAvatar user={currentUser} />
                                </LinkUsersPosts>
                                <span>
                                    {currentUser && currentUser.displayName}
                                </span>
                            </div>
                        }
                    />
                    <Divider />
                    <ListExcerpt
                        posts={usersPosts}
                        hasMore={hasMoreUsersPosts}
                        loading={loadingUsersPosts}
                        loadMoreHandler={onClickLoadMore}
                    />
                </Spin>
            </ContentWrapper>
        </DefaultLayout>
    );
};

// UsersPosts.propTypes = {
//     user: PropTypes.string.isRequired,
// };

UsersPosts.getInitialProps = async (context) => {
    const state = context.store.getState();
    const { user } = context.query;
    const {
        postsLimit,
        usersPosts,
        currentUser,
        currentUsername,
    } = state.usersPosts;

    if (
        context.isServer ||
        !usersPosts ||
        usersPosts.length === 0 ||
        user !== currentUsername
    ) {
        // 서버 요청 || 사용자 글 목록이 없음 || 현재 사용자와 요청 사용자가 다름
        context.store.dispatch({
            type: actionTypes.LOAD_USERS_POSTS_CALL,
            data: {
                user: user,
                // page: null,
                limit: postsLimit,
                keyword: '',
            },
        });
    }
    return {
        user: user,
    };
};

export default UsersPosts;
