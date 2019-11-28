import React, { FunctionComponent, memo } from "react";
import Link from "next/link";
import { PostModel } from "../typings/dto";

export interface LinkSinglePostProps {
    post: PostModel;
    children: React.ReactNode;
}

const LinkSinglePost: FunctionComponent<LinkSinglePostProps> = memo(
    ({ post, children }) => {
        const user = `@${post.user.username}`;
        const slug = encodeURIComponent(post.slug);

        return (
            <Link
                href={{
                    pathname: "/users/post",
                    query: {
                        user: user,
                        slug: slug
                    }
                }}
                as={`/users/${user}/posts/${slug}`}
            >
                <a>{children}</a>
            </Link>
        );
    }
);

export default LinkSinglePost;
