import React, {
    useEffect,
    useState,
    FunctionComponent,
    useCallback,
} from 'react';
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
import { withSize, SizeMeProps } from 'react-sizeme';
import { IPostModel } from '../typings/dto';
import { appOptions } from '../config/appOptions';

const FullWidthButton = styled(Button)`
    width: 100%;
`;

export interface IListExceptProps extends SizeMeProps {
    posts: IPostModel[];
    loading: boolean;
    hasMore: boolean;
    loadMoreHandler: () => void;
}

const ListExcerpt: FunctionComponent<IListExceptProps> = ({
    posts,
    loading,
    hasMore,
    loadMoreHandler,
    size,
}) => {
    // const { me } = useSelector<IRootState, IUserState>(s => s.user);
    const { width } = size;
    const [cardWidth, setCardWidth] = useState('100%');

    useEffect(() => {
        const images = document.getElementsByTagName('img');

        for (let i = 0; i < images.length; i++) {
            const img = images.item(i);
            if (img.src.startsWith('/')) {
                img.src = `${appOptions.apiBaseUrl}${img.src}`;
            }
        }
    }, []);

    useEffect(() => {
        let columnWidth = '100%';

        // const { width } = size;
        if (width) {
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

    const onClickLoadMore = useCallback(() => {
        if (loadMoreHandler) {
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
                    {posts &&
                        posts.map((post) => {
                            const { title, excerpt, createdAt } = post;
                            let coverSrc = post.coverImage;
                            if (coverSrc && coverSrc.startsWith('/')) {
                                coverSrc = `${appOptions.apiBaseUrl}${coverSrc}`;
                            }
                            return (
                                <div key={post.id}>
                                    <Card
                                        cover={
                                            post.coverImage && (
                                                <img
                                                    src={coverSrc}
                                                    alt={post.title}
                                                />
                                            )
                                        }
                                        actions={[
                                            <IconText
                                                type='eye'
                                                text={`${
                                                    post.accessLogs &&
                                                    post.accessLogs.length > 0
                                                        ? post.accessLogs.length
                                                        : 0
                                                }`}
                                            />,
                                            <IconLike post={post} />,
                                        ]}
                                        extra={
                                            null
                                            // <IconText
                                            //     type='clock-circle'
                                            //     text={moment(createdAt).format(
                                            //         'YYYY-MM-DD HH:mm:ss',
                                            //     )}
                                            // />
                                        }>
                                        <Card.Meta
                                            avatar={
                                                <LinkUsersPosts
                                                    user={post.user}>
                                                    <UserAvatar
                                                        user={post.user}
                                                    />
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
                                                post.categories &&
                                                post.categories.map(
                                                    (category) => {
                                                        return (
                                                            <LinkCategory
                                                                key={
                                                                    category.slug
                                                                }
                                                                user={post.user}
                                                                category={
                                                                    category
                                                                }
                                                            />
                                                        );
                                                    },
                                                )
                                            }
                                        />
                                        <div>
                                            <Divider orientation='right'>
                                                <span>
                                                    <Icon type='clock-circle' />{' '}
                                                    {moment(
                                                        new Date(
                                                            post.createdAt,
                                                        ),
                                                        'YYYY-MM-DD HH:mm:ss',
                                                    ).fromNow()}
                                                </span>
                                            </Divider>

                                            <div>{excerpt}</div>

                                            {post.tags &&
                                                post.tags.length > 0 && (
                                                    <Divider dashed={true} />
                                                )}
                                            <div>
                                                {post.tags &&
                                                    post.tags.map((v) => {
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

export default withSize({ noPlaceholder: true })(ListExcerpt);
