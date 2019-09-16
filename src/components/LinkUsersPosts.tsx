import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { IUserModel } from 'typings/IUserModel';

export interface ILinkUsersPostsProps {
    user: IUserModel;
    children: React.ReactNode;
}

const LinkUsersPosts: FunctionComponent<ILinkUsersPostsProps> = ({
    user,
    children,
}) => {
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

export default LinkUsersPosts;
