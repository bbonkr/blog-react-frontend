import React, {
    useEffect,
    useState,
    FunctionComponent,
    useCallback,
    useMemo,
} from 'react';
import { Button, Divider, Card, Typography, Icon, Spin } from 'antd';
import StackGrid from 'react-stack-grid';
import moment from 'moment';
import IconText from './IconText';
import LinkCategory from './LinkCategory';
import LinkTag from './LinkTag';
import LinkSinglePost from './LinkSinglePost';
import LinkUsersPosts from './LinkUsersPosts';
import UserAvatar from './UserAvatar';
import IconLike from './IconLike';
import { IPostModel } from '../typings/dto';
import { appOptions } from '../config/appOptions';
import { ButtonFullWidth } from '../styledComponents/Buttons';
import { IPageProps } from '../typings/IPageProps';

export interface IListExceptProps extends IPageProps {
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
}) => {
    // const { me } = useSelector<IRootState, IUserState>(s => s.user);
    const [documentElementWidth, setDocumentElementWidth] = useState(0);

    const stackGridColumnWidth = useMemo(() => {
        let columnWidth = '100%';

        // if (documentElementWidth > 576) {
        //     columnWidth = '50%';
        // }

        if (documentElementWidth > 768) {
            columnWidth = '50%'; //'33.33%';
        }

        if (documentElementWidth > 992) {
            columnWidth = '33.33%'; // '25.0%';
        }

        if (documentElementWidth > 1200) {
            columnWidth = '25.0%'; //'20%';
        }

        return columnWidth;
    }, [documentElementWidth]);

    useEffect(() => {
        setDocumentElementWidth(window.document.documentElement.clientWidth);

        const images = document.getElementsByTagName('img');

        for (let i = 0; i < images.length; i++) {
            const img = images.item(i);
            if (img.src.startsWith('/')) {
                img.src = `${appOptions.apiBaseUrl}${img.src}`;
            }
        }
        const onResize = () => {
            setDocumentElementWidth(
                window.document.documentElement.clientWidth,
            );
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const onClickLoadMore = useCallback(() => {
        if (loadMoreHandler) {
            loadMoreHandler();
        }
    }, [loadMoreHandler]);
    const renderPosts = (posts: IPostModel[]) => {
        return posts.map((post) => {
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
                                <img src={coverSrc} alt={post.title} />
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
                                <LinkUsersPosts user={post.user}>
                                    <UserAvatar user={post.user} />
                                </LinkUsersPosts>
                            }
                            title={
                                <LinkSinglePost post={post}>
                                    <Typography.Title level={3} ellipsis={true}>
                                        {title}
                                    </Typography.Title>
                                </LinkSinglePost>
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
                        <div>
                            <Divider orientation='right'>
                                <span>
                                    <Icon type='clock-circle' />{' '}
                                    {moment(
                                        new Date(post.createdAt),
                                        'YYYY-MM-DD HH:mm:ss',
                                    ).fromNow()}
                                </span>
                            </Divider>

                            <div>{excerpt}</div>

                            {post.tags && post.tags.length > 0 && (
                                <Divider dashed={true} />
                            )}
                            <div>
                                {post.tags &&
                                    post.tags.map((v) => {
                                        return <LinkTag tag={v} key={v.slug} />;
                                    })}
                            </div>
                        </div>
                    </Card>
                </div>
            );
        });
    };
    return (
        <article>
            <Spin spinning={loading}>
                <StackGrid
                    columnWidth={stackGridColumnWidth}
                    gutterWidth={16}
                    gutterHeight={16}
                    enableSSR={true}
                    monitorImagesLoaded={true}>
                    {renderPosts(posts)}
                </StackGrid>
            </Spin>
            <Divider />
            {hasMore && (
                <ButtonFullWidth loading={loading} onClick={onClickLoadMore}>
                    Load more
                </ButtonFullWidth>
            )}
        </article>
    );
};

export default ListExcerpt;
