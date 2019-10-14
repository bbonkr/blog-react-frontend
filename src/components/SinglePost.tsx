import React, { useEffect, FunctionComponent } from 'react';
import { Card, Divider, Avatar, Typography, Icon, PageHeader } from 'antd';
import LinkCategory from './LinkCategory';
import LinkTag from './LinkTag';
import LinkSinglePost from './LinkSinglePost';
import UserAvatar from './UserAvatar';
import moment from 'moment';
import LinkUsersPosts from './LinkUsersPosts';
import IconLike from './IconLike';
import { IPostModel } from '../typings/dto';
import Prism from 'prismjs';
// import {} from 'prism/plugins'
import { appOptions } from '../config/appOptions';
import Loading from './Loading';
import Paragraph from 'antd/lib/skeleton/Paragraph';
// import prismjsShowLanguage from 'prismjs/plugins/show-language/prism-show-language';
// import prismjsLineNumbers from 'prismjs/plugins/line-numbers/prism-line-numbers';

// import '../styles/prism.css';
// import 'prismjs/themes/prism-okaidia.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
// import '../styles/singlepost.css';

export interface ISinglePostProps {
    post: IPostModel;
}

const SinglePost: FunctionComponent<ISinglePostProps> = ({ post }) => {
    useEffect(() => {
        Prism.highlightAll();
        // prismjsShowLanguage();
        // prismjsLineNumbers();
        // const prismShowLanguage =

        // const prismLineNumbers =

        // import('prismjs/plugins/line-numbers/prism-line-numbers').then((x) => {
        //     // Object.assign(Prism.plugins, {
        //     //     ...Prism.plugins,
        //     //     'prism-line-numbers': x,
        //     // });
        //     Prism.plugins['line-numbers'] = x;
        // });

        // import('prismjs/plugins/show-language/prism-show-language').then(
        //     (x) => {
        //         // Object.assign(Prism.plugins, {
        //         //     ...Prism.plugins,
        //         //     'prism-show-language': x,
        //         // });
        //         Prism.plugins['show-language'] = x;
        //     },
        // );

        // prismShowLanguage();
        // prismLineNumbers();
    }, []);

    let coverImage = post.coverImage;
    if (coverImage && coverImage.startsWith('/')) {
        coverImage = `${appOptions.apiBaseUrl}${coverImage}`;
    }

    const findImgSrcRegex = /<img.*?src="([^">]*\/[^">]*?)".*?>/g;
    let html =
        post.html &&
        post.html.replace(findImgSrcRegex, (imgTag, imgTagSrc) => {
            if (imgTag && imgTagSrc && imgTagSrc.startsWith('/')) {
                let url = imgTagSrc;
                url = `${appOptions.apiBaseUrl}${url}`;

                return imgTag.replace(imgTagSrc, url);
            }
            return imgTag;
        });

    return (
        <article>
            <Card
                cover={
                    post.coverImage && (
                        <img src={`${coverImage}`} alt={`${post.title}`} />
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
                                    <Typography.Title level={3} ellipsis={true}>
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
                        __html: html,
                    }}
                />

                <Divider dashed={true} />

                {post.tags &&
                    post.tags.map((v) => {
                        return <LinkTag key={v.slug} tag={v} />;
                    })}
            </Card>
        </article>
    );
};

export default SinglePost;
