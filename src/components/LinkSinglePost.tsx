import React, { FunctionComponent, memo } from 'react';
import Link from 'next/link';
import { IPostModel } from '../typings/dto';

export interface ILinkSinglePostProps {
    post: IPostModel;
    children: React.ReactNode;
}

const LinkSinglePost: FunctionComponent<ILinkSinglePostProps> = memo(
    ({ post, children }) => {
        const user = `@${post.user.username}`;
        const slug = encodeURIComponent(post.slug);

        return (
            <Link
                href={{
                    pathname: '/post',
                    query: {
                        user: user,
                        slug: slug,
                    },
                }}
                as={`/users/${user}/posts/${slug}`}>
                <a>{children}</a>
            </Link>
        );
    },
);

export default LinkSinglePost;
