/**
 * users/:user/posts
 */
import React, { useCallback, FunctionComponent, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../../components/DefaultLayout";
import { ContentWrapper } from "../../styledComponents/Wrapper";
import ListExcerpt from "../../components/ListExcerpt";
import { actionTypes } from "../../reducers/actionTypes";
import { RootState, UsersPostsState } from "../../typings/reduxStates";
import { PageHeader, Divider, Spin, Skeleton } from "antd";
import LinkUsersPosts from "../../components/LinkUsersPosts";
import UserAvatar from "../../components/UserAvatar";
import { appOptions } from "../../config/appOptions";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { BaseAction } from "../../typings/BaseAction";
import { PageProps } from "../../typings/PageProps";
import Head from "next/head";

export interface UsersPostsPageProps extends PageProps {
    user: string;
}

const UsersPosts: FunctionComponent<UsersPostsPageProps> = ({ user }) => {
    const siteName = appOptions.title;
    const dispatch = useDispatch();
    const {
        usersPosts,
        hasMoreUsersPosts,
        loadingUsersPosts,
        currentUser,
        currentUsername,
        currentPage,
        postsLimit
    } = useSelector<RootState, UsersPostsState>(s => s.usersPosts);

    const title: string = useMemo(() => {
        return `${currentUser && currentUser.displayName}'s posts | ${
            appOptions.title
        }`;
    }, [currentUser]);

    const onClickLoadMore = useCallback(() => {
        dispatch({
            type: actionTypes.LOAD_USERS_POSTS_CALL,
            data: {
                user: user,
                page: (currentPage || 0) + 1,
                limit: postsLimit,
                keyword: ""
            }
        });
    }, [dispatch, postsLimit, user, currentPage]);

    if (!currentUser) {
        return (
            <DefaultLayout>
                <ContentWrapper>
                    <Skeleton active={true} loading={true} />
                </ContentWrapper>
            </DefaultLayout>
        );
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

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
        </>
    );
};

UsersPosts.getInitialProps = async (
    context: NextPageContext & NextJSContext<RootState, BaseAction>
): Promise<UsersPostsPageProps> => {
    const state = context.store.getState();

    const user: string = context.query.user as string;

    const { postsLimit, usersPosts, currentUsername } = state.usersPosts;

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
                keyword: ""
            }
        });
    }
    return {
        user: user
    };
};

export default UsersPosts;
