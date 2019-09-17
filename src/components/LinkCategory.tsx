import React, { FunctionComponent, memo } from 'react';
import Link from 'next/link';
import { Icon } from 'antd';
import styled from 'styled-components';
import { IUserModel } from '../typings/IUserModel';
import { ICategoryModel } from '../typings/ICategoryModel';

const LinkWrapper = styled.span`
    margin-right: 1em;
`;

export interface ILinkCategoryProps {
    user: IUserModel;
    category: ICategoryModel;
}

/**
 * 분류 링크 컴포넌트입니다.
 *
 * @param {string} 분류 이름
 * @param {string} 분류 슬러그
 */
const LinkCategory: FunctionComponent<ILinkCategoryProps> = memo(
    ({ user, category }) => {
        const { username } = user;
        const { name, slug } = category;
        const displayUsername = `@${username}`;

        return (
            <LinkWrapper>
                <Link
                    href={{
                        pathname: '/users/categoryposts',
                        query: { user: displayUsername, category: slug },
                    }}
                    as={`/users/${displayUsername}/categories/${slug}/posts`}>
                    <a>
                        <Icon type='container' /> <span>{name}</span>
                    </a>
                </Link>
            </LinkWrapper>
        );
    },
);

export default LinkCategory;
