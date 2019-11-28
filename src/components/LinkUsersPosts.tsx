import React, { FunctionComponent, memo } from "react";
import Link from "next/link";
import { UserModel } from "../typings/dto";

export interface LinkUsersPostsProps {
    user: UserModel;
    children: React.ReactNode;
}

const LinkUsersPosts: FunctionComponent<LinkUsersPostsProps> = memo(
    ({ user, children }) => {
        const username = (user && user.username) || "";
        const displayUsername: string = `@${username}`;
        return (
            <Link
                href={{
                    pathname: "/users/posts",
                    query: {
                        user: displayUsername
                    }
                }}
                as={`/users/${displayUsername}/posts`}
            >
                <a>{children}</a>
            </Link>
        );
    }
);

export default LinkUsersPosts;
