import React, {
    useEffect,
    useState,
    FunctionComponent,
    useCallback,
    useMemo,
} from 'react';
import {
    Button,
    Divider,
    Card,
    Typography,
    Icon,
    Spin,
    Row,
    Col,
    List,
} from 'antd';
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
import styled from 'styled-components';

const CroppedFigure = styled.figure`
    max-width: 10rem;
    max-height: 10rem;
    overflow: hidden;
    margin: 0;
    &:focus {
        outline: -webkit-focus-ring-color none 0;
    }
    & img {
        display: block;
        width: 200.777%;
        height: 200.777%;
        margin: 0 -38.885%;
    }
`;

export interface IListExceptProps extends IPageProps {
    posts: IPostModel[];
    loading: boolean;
    hasMore: boolean;
    postsCount?: number;
    loadMoreHandler: () => void;
}

const ListExcerpt: FunctionComponent<IListExceptProps> = ({
    posts,
    loading,
    hasMore,
    loadMoreHandler,
    postsCount,
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

    const hideCoverImage = useMemo(() => {
        return stackGridColumnWidth === '100%';
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

    // const renderPostsWithCard = (posts: IPostModel[]) => {
    //     return posts.map((post) => {
    //         const { title, excerpt, createdAt } = post;
    //         let coverSrc = post.coverImage;
    //         if (coverSrc && coverSrc.startsWith('/')) {
    //             coverSrc = `${appOptions.apiBaseUrl}${coverSrc}`;
    //         }
    //         return (
    //             <Col
    //                 key={post.id}
    //                 span={24}
    //                 xs={24}
    //                 sm={24}
    //                 md={12}
    //                 lg={8}
    //                 xl={6}
    //                 xxl={4}>
    //                 <Card
    //                     cover={
    //                         false &&
    //                         post.coverImage && (
    //                             <CroppedFigure>
    //                                 <img src={coverSrc} alt={post.title} />
    //                             </CroppedFigure>
    //                         )
    //                     }
    //                     actions={[
    //                         <IconText
    //                             type='eye'
    //                             text={`${
    //                                 post.accessLogs &&
    //                                 post.accessLogs.length > 0
    //                                     ? post.accessLogs.length
    //                                     : 0
    //                             }`}
    //                         />,
    //                         <IconLike post={post} />,
    //                     ]}
    //                     extra={
    //                         null
    //                         // <IconText
    //                         //     type='clock-circle'
    //                         //     text={moment(createdAt).format(
    //                         //         'YYYY-MM-DD HH:mm:ss',
    //                         //     )}
    //                         // />
    //                     }>
    //                     <Card.Meta
    //                         avatar={
    //                             <LinkUsersPosts user={post.user}>
    //                                 <UserAvatar user={post.user} />
    //                             </LinkUsersPosts>
    //                         }
    //                         title={
    //                             <LinkSinglePost post={post}>
    //                                 <Typography.Title level={3} ellipsis={true}>
    //                                     {title}
    //                                 </Typography.Title>
    //                             </LinkSinglePost>
    //                         }
    //                         description={
    //                             post.categories &&
    //                             post.categories.map((category) => {
    //                                 return (
    //                                     <LinkCategory
    //                                         key={category.slug}
    //                                         user={post.user}
    //                                         category={category}
    //                                     />
    //                                 );
    //                             })
    //                         }
    //                     />
    //                     <div>
    //                         <Divider orientation='right'>
    //                             <span>
    //                                 <Icon type='clock-circle' />{' '}
    //                                 {moment(
    //                                     new Date(post.createdAt),
    //                                     'YYYY-MM-DD HH:mm:ss',
    //                                 ).fromNow()}
    //                             </span>
    //                         </Divider>

    //                         <Typography.Paragraph
    //                             ellipsis={{ rows: 6, expandable: false }}>
    //                             {excerpt}
    //                         </Typography.Paragraph>

    //                         {post.tags && post.tags.length > 0 && (
    //                             <Divider dashed={true} />
    //                         )}
    //                         <div>
    //                             {post.tags &&
    //                                 post.tags.map((v) => {
    //                                     return <LinkTag tag={v} key={v.slug} />;
    //                                 })}
    //                         </div>
    //                     </div>
    //                 </Card>
    //             </Col>
    //         );
    //     });
    // };

    const renderPostsWithList = (posts: IPostModel[]) => {
        return (
            <List
                style={{ backgroundColor: '#FFFFFF' }}
                bordered={true}
                itemLayout='vertical'
                size='large'
                dataSource={posts}
                renderItem={(post: IPostModel) => {
                    const { title, excerpt, createdAt } = post;
                    let coverSrc = post.coverImage;
                    if (coverSrc && coverSrc.startsWith('/')) {
                        coverSrc = `${appOptions.apiBaseUrl}${coverSrc}`;
                    }
                    return (
                        <List.Item
                            key={post.slug}
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
                                !hideCoverImage &&
                                post.coverImage && (
                                    <CroppedFigure>
                                        <img src={coverSrc} alt={post.title} />
                                    </CroppedFigure>
                                )
                            }>
                            <List.Item.Meta
                                avatar={
                                    <LinkUsersPosts user={post.user}>
                                        <UserAvatar user={post.user} />
                                    </LinkUsersPosts>
                                }
                                title={
                                    <LinkSinglePost post={post}>
                                        <Typography.Title
                                            level={3}
                                            ellipsis={{
                                                rows: 2,
                                                expandable: false,
                                            }}>
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

                            <Typography.Paragraph
                                ellipsis={{ rows: 4, expandable: false }}>
                                {post.excerpt}
                            </Typography.Paragraph>
                            {/* <Divider /> */}
                            <div>
                                {post.tags &&
                                    post.tags.map((v) => {
                                        return <LinkTag tag={v} key={v.slug} />;
                                    })}
                            </div>
                        </List.Item>
                    );
                }}
            />
        );
    };

    return (
        <article>
            <Spin spinning={loading}>
                {/* <StackGrid
                    columnWidth={stackGridColumnWidth}
                    gutterWidth={16}
                    gutterHeight={16}
                    enableSSR={true}
                    monitorImagesLoaded={true}>
                    {renderPosts(posts)}
                </StackGrid> */}
                {/* <Row gutter={8}>{renderPostsWithCard(posts)}</Row> */}
                {renderPostsWithList(posts)}
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
