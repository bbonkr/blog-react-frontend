import React, { useEffect, FunctionComponent } from 'react';
import { Card, Divider, Avatar, Typography, Icon } from 'antd';
import LinkCategory from './LinkCategory';
import LinkTag from './LinkTag';
import LinkSinglePost from './LinkSinglePost';
import UserAvatar from './UserAvatar';
import moment from 'moment';
import LinkUsersPosts from './LinkUsersPosts';
import IconLike from './IconLike';
import { IPostModel } from '../typings/dto';
import Prism from 'prismjs';

import '../styles/prism.css';
import '../styles/singlepost.css';

export interface ISinglePostProps {
    post: IPostModel;
}

const SinglePost: FunctionComponent<ISinglePostProps> = ({ post }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <>
            <article>
                <Card
                    cover={
                        post.coverImage && (
                            <img
                                src={`${post.coverImage}`}
                                alt={`${post.title}`}
                            />
                        )
                    }>
                    <Card.Meta
                        avatar={
                            <LinkUsersPosts user={post.user}>
                                <UserAvatar user={post.user} />
                            </LinkUsersPosts>
                        }
                        title={
                            <div>
                                <div style={{ float: 'left' }}>
                                    <LinkSinglePost post={post}>
                                        <Typography.Title
                                            level={3}
                                            ellipsis={true}>
                                            {post.title}
                                        </Typography.Title>
                                    </LinkSinglePost>
                                </div>
                                <div style={{ float: 'right' }}>
                                    <IconLike post={post} />
                                </div>
                            </div>
                        }
                        description={
                            post.categories &&
                            post.categories.map((category) => {
                                return (
                                    <LinkCategory
                                        key={category.slug}
                                        user={post.user}
                                        category={category}
                                    />
                                );
                            })
                        }
                    />
                    <Divider orientation='right'>
                        <span>
                            <Icon type='clock-circle' />{' '}
                            {moment(
                                new Date(post.createdAt),
                                'YYYY-MM-DD HH:mm:ss',
                            ).fromNow()}
                        </span>
                    </Divider>

                    <div
                        className={`article-post`}
                        dangerouslySetInnerHTML={{
                            __html: post.html,
                        }}
                    />

                    <Divider dashed={true} />

                    {post.tags &&
                        post.tags.map((v) => {
                            return <LinkTag key={v.slug} tag={v} />;
                        })}
                </Card>
            </article>
        </>
    );
};

export default SinglePost;
