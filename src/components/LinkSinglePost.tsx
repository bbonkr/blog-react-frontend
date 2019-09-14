import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export interface ILinkSinglePostProps {
    post: any; // todo post type
    children: React.ReactNode;
}

const LinkSinglePost: FunctionComponent<ILinkSinglePostProps> = ({ post, children }) => {
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
};

LinkSinglePost.propTypes = {
    post: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
};

export default LinkSinglePost;
