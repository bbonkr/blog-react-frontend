import React, { FunctionComponent, memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Icon } from 'antd';
import { ITagModel } from '../typings/dto';

const LinkWrapper = styled.span`
    margin-right: 1em;
`;

export interface ILinkTagProps {
    tag: ITagModel;
}

const LinkTag: FunctionComponent<ILinkTagProps> = memo(({ tag }) => {
    // const { name, slug } = tag;
    const name = (tag && tag.name) || '';
    const slug = (tag && tag.slug) || '';
    const encodedSlug = encodeURIComponent(slug);
    return (
        <LinkWrapper>
            <Link
                href={{ pathname: '/tag', query: { slug: encodedSlug } }}
                as={`/tag/${encodedSlug}`}>
                <a>
                    <Icon type='tag' /> <span>{name}</span>
                </a>
            </Link>
        </LinkWrapper>
    );
});

export default LinkTag;
