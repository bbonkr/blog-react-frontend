import React, { useEffect, useState, FunctionComponent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Divider, Card, Typography, Icon, Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import IconText from './IconText';
import LinkCategory from './LinkCategory';
import LinkTag from './LinkTag';
import LinkSinglePost from './LinkSinglePost';
import LinkUsersPosts from './LinkUsersPosts';
import UserAvatar from './UserAvatar';
import IconLike from './IconLike';
import StackGrid from 'react-stack-grid';
import {withSize, SizeMeProps} from 'react-sizeme';
import { IUserState } from 'reducers/user';
import { IRootState } from 'reducers';

const FullWidthButton = styled(Button)`
    width: 100%;
`;

export interface IListExceptProps extends SizeMeProps {
    posts : any[];  // todo type post 
    loading: boolean;
    hasMore: boolean;
    loadMoreHandler: () => void;
}

const ListExcerpt: FunctionComponent<IListExceptProps> = ({ posts, loading, hasMore, loadMoreHandler, size }) => {
    // const { me } = useSelector<IRootState, IUserState>(s => s.user);
    const { width } = size;
    const [cardWidth, setCardWidth] = useState('100%');

    useEffect(() => {
        let columnWidth = '100%';
   
        // const { width } = size;
        if(width){
     
            if (width > 576) {
                columnWidth = '50%';
            }

            if (width > 768) {
                columnWidth = '33.33%';
            }

            if (width > 992) {
                columnWidth = '25.0%';
            }

            if (width > 1200) {
                columnWidth = '20%';
            }            
        }

        setCardWidth(columnWidth);

    }, [width]);

    const onClickLoadMore = useCallback((e) => {
        if(loadMoreHandler){
            loadMoreHandler();
        }
    }, [loadMoreHandler]);

    return (
        <article>
            <Spin spinning={loading}>
                <StackGrid
                    columnWidth={cardWidth}
                    gutterWidth={16}
                    gutterHeight={16}
                    enableSSR={false}
                    monitorImagesLoaded={true}>
                    {posts.map(post => {
                        const { title, excerpt, createdAt } = post;
                        return (
                            <div key={post.id}>
                                <Card
                                    cover={
                                        post.coverImage && (
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                            />
                                        )
                                    }
                                    actions={[
                                        <IconText
                                            type="eye"
                                            text={`${
                                                post.PostAccessLogs &&
                                                post.PostAccessLogs.length > 0
                                                    ? post.PostAccessLogs.length
                                                    : 0
                                            }`}
                                        />,
                                        <IconLike post={post} />,
                                    ]} 
                                    extra={<IconText
                                        type="clock-circle"
                                        text={moment(createdAt).format(
                                            'YYYY-MM-DD HH:mm:ss',
                                        )}
                                    />}>
                                    <Card.Meta
                                        avatar={
                                            <LinkUsersPosts user={post.User}>
                                                <UserAvatar user={post.User} />
                                            </LinkUsersPosts>
                                        }
                                        title={
                                            <LinkSinglePost post={post}>
                                                <Typography.Title
                                                    level={3}
                                                    ellipsis={true}>
                                                    {title}
                                                </Typography.Title>
                                            </LinkSinglePost>
                                        }
                                        description={
                                            post.Categories &&
                                            post.Categories.map(category => {
                                                return (
                                                    <LinkCategory
                                                        key={category.slug}
                                                        user={post.User}
                                                        category={category}
                                                    />
                                                );
                                            })
                                        }
                                    />
                                    <div>
                                        <Divider orientation="right">
                                            <span>
                                                <Icon type="clock-circle" />{' '}
                                                {moment(
                                                    new Date(post.createdAt),
                                                    'YYYY-MM-DD HH:mm:ss',
                                                ).fromNow()}
                                            </span>
                                        </Divider>

                                        <div>{excerpt}</div>

                                        {post.Tags && post.Tags.length > 0 && (
                                            <Divider dashed={true} />
                                        )}
                                        <div>
                                            {post.Tags &&
                                                post.Tags.map(v => {
                                                    return (
                                                        <LinkTag
                                                            tag={v}
                                                            key={v.slug}
                                                        />
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </StackGrid>
            </Spin>
            <Divider />
            {hasMore && (
                <FullWidthButton loading={loading} onClick={onClickLoadMore}>
                    Load more
                </FullWidthButton>
            )}
        </article>
    );
};

ListExcerpt.propTypes = {
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loadMoreHandler: PropTypes.func.isRequired,
    // size: PropTypes.shape({
    //     width: PropTypes.number,
    // }),
};

// export default sizeMe()(ListExcerpt);
export default withSize({ noPlaceholder: true })(ListExcerpt);
