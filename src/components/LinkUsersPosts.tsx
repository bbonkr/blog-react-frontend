import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export interface ILinkUsersPostsProps {
    user: any; // todo user type
    children: React.ReactNode;
}

const LinkUsersPosts: FunctionComponent<ILinkUsersPostsProps> = ({ user, children }) => {
    const { username } = user;
    const displayUsername: string = `@${username}`;
    return (
        <Link
            href={{
                pathname: '/users/posts',
                query: {
                    user: displayUsername,
                },
            }}
            as={`/users/${displayUsername}/posts`}>
            <a>{children}</a>
        </Link>
    );
};

LinkUsersPosts.propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
};

export default LinkUsersPosts;
