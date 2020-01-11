import React, { useCallback, FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageHeader, Divider, Timeline, Button, Card, Icon } from "antd";
import moment from "moment";
import MeLayout from "../../components/MeLayout";
import { ContentWrapper } from "../../styledComponents/Wrapper";
import { withAuth } from "../../utils/auth";
import Router from "next/router";
import { actionTypes } from "../../reducers/actionTypes";
import { RootState, MeState } from "../../typings/reduxStates";
import { PageProps } from "../../typings/PageProps";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { BaseAction } from "../../typings/BaseAction";
import { ButtonFullWidth } from "../../styledComponents/Buttons";

const Liked: FunctionComponent = () => {
    const dispatch = useDispatch();
    const {
        likedPosts,
        likedPostsLoading,
        likedPostsHasMore,
        likedPostsLimit,
        likedPostPage
    } = useSelector<RootState, MeState>(s => s.me);

    const onClickLoadMore = useCallback(() => {
        if (likedPostsHasMore) {
            dispatch({
                type: actionTypes.LOAD_LIKED_POSTS_CALL,
                data: {
                    page: (likedPostPage || 0) + 1,
                    limit: likedPostsLimit,
                    keyword: ""
                }
            });
        }
    }, [dispatch, likedPostsHasMore, likedPostsLimit, likedPostPage]);

    const onClickOpnePost = useCallback(
        post => () => {
            const username = `@${post.user.username}`;
            const slug = encodeURIComponent(post.slug);

            Router.push(`/users/${username}/posts/${slug}`);
        },
        []
    );

    return (
        <MeLayout>
            <ContentWrapper>
                <PageHeader title="Liked posts" />
                <Divider />
                <Timeline
                    pending={likedPostsLoading}
                    reverse={false}
                    mode="left"
                >
                    {likedPosts.map(likePost => {
                        return (
                            <Timeline.Item key={likePost.slug}>
                                <Card
                                    title={`Liked at ${moment(
                                        likePost.createdAt
                                    ).format("YYYY-MM-DD HH:mm:ss")}`}
                                    extra={
                                        <Button
                                            type="primary"
                                            onClick={onClickOpnePost(likePost)}
                                        >
                                            Opne
                                        </Button>
                                    }
                                >
                                    <Card.Meta
                                        title={likePost.title}
                                        description={
                                            <span>
                                                <Icon type="clock-circle-o" />
                                                {` ${moment(
                                                    likePost.createdAt,
                                                    "YYYY-MM-DD HH:mm:ss"
                                                ).fromNow()}`}{" "}
                                            </span>
                                        }
                                    />
                                    {likePost.excerpt}
                                </Card>
                            </Timeline.Item>
                        );
                    })}
                </Timeline>
                <ButtonFullWidth
                    type="primary"
                    loading={likedPostsLoading}
                    onClick={onClickLoadMore}
                    disabled={!likedPostsHasMore}
                >
                    Load more
                </ButtonFullWidth>
            </ContentWrapper>
        </MeLayout>
    );
};

Liked.getInitialProps = async (
    context: NextPageContext & NextJSContext<RootState, BaseAction>
): Promise<PageProps> => {
    const state = context.store.getState();
    const { likedPostsLimit } = state.me;

    context.store.dispatch({
        type: actionTypes.LOAD_LIKED_POSTS_CALL,
        data: {
            page: null,
            limit: likedPostsLimit,
            keyword: ""
        }
    });

    return {};
};

export default withAuth(Liked);
