import React, { FunctionComponent, memo } from 'react';
import Link from 'next/link';
import { IUserModel } from '../typings/IUserModel';

export interface ILinkUsersPostsProps {
    user: IUserModel;
    children: React.ReactNode;
}

const LinkUsersPosts: FunctionComponent<ILinkUsersPostsProps> = memo(
    ({ user, children }) => {
        const username = (user && user.username) || '';
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
    },
);

export default LinkUsersPosts;
