import React, { useCallback, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import DefaultLayout from '../../components/DefaultLayout';
import { ContentWrapper } from '../../styledComponents/Wrapper';
import ListExcerpt from '../../components/ListExcerpt';
import { PageHeader, Divider } from 'antd';
import UserAvatar from '../../components/UserAvatar';
import LinkUsersPosts from '../../components/LinkUsersPosts';
import { IRootState } from 'reducers';
import { IPostState } from 'reducers/post';
import { actionTypes } from '../../reducers/actionTypes';
import { IUserModel } from 'typings/IUserModel';
import { ICategoryModel } from 'typings/ICategoryModel';

export interface IUserCategoryPostsProps {
    user: IUserModel;
    category: ICategoryModel;
}

const UserCategoryPosts: FunctionComponent<IUserCategoryPostsProps> = ({
    user,
    category,
}) => {
    const dispatch = useDispatch();
    const {
        userCategoryPosts,
        userCategoryPostsHasMore,
        userCategoryPostsLoading,
        postsLimit,
        userCategoryPostsCategory,
        userCategoryPostsUser,
    } = useSelector<IRootState, IPostState>((s) => s.post);

    const onClickLoadMore = useCallback(() => {
        const pageToken =
            userCategoryPosts &&
            userCategoryPosts.length > 0 &&
            userCategoryPosts[userCategoryPosts.length - 1].id;

        dispatch({
            type: actionTypes.LOAD_USER_CATEGORY_POSTS_CALL,
            data: {
                user: user,
                category: category,
                pageToken: `${pageToken}`,
                limit: postsLimit,
                keyword: '',
            },
        });
    }, [category, dispatch, postsLimit, user, userCategoryPosts]);

    return (
        <DefaultLayout>
            <ContentWrapper>
                <PageHeader
                    title={
                        <div>
                            <span>CATEGORY: </span>
                            <LinkUsersPosts user={userCategoryPostsUser}>
                                <UserAvatar user={userCategoryPostsUser} />
                            </LinkUsersPosts>
                            <span>
                                {!!userCategoryPostsCategory &&
                                    userCategoryPostsCategory.name}
                            </span>
                        </div>
                    }
                />
                <Divider />
                <ListExcerpt
                    posts={userCategoryPosts}
                    hasMore={userCategoryPostsHasMore}
                    loading={userCategoryPostsLoading}
                    loadMoreHandler={onClickLoadMore}
                />
            </ContentWrapper>
        </DefaultLayout>
    );
};

// UserCategoryPosts.propTypes = {
//     user: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
// };

UserCategoryPosts.getInitialProps = async (context) => {
    const state = context.store.getState();
    const { user, category } = context.query;
    const { userCategoryPosts, postsLimit, currentUserCategory } = state.post;

    if (
        context.isServer ||
        !userCategoryPosts ||
        userCategoryPosts.length === 0 ||
        `${user}${category}` !== currentUserCategory
    ) {
        // 서버 요청 || 사용자 글 목록이 없음 || 현재 사용자와 요청 사용자가 다름
        context.store.dispatch({
            type: actionTypes.LOAD_USER_CATEGORY_POSTS_CALL,
            data: {
                user: user,
                category: category,
                pageToken: null,
                limit: postsLimit,
                keyword: '',
            },
        });
    }
    return { user, category };
};

export default UserCategoryPosts;
