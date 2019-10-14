import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import { Avatar, Typography } from 'antd';
import { IUserModel } from '../typings/dto';
import { appOptions } from '../config/appOptions';
import { IPageProps } from '../typings/IPageProps';

export interface IUserAvatarProps extends IPageProps {
    user: IUserModel;
    showDisplayName?: boolean;
}

const UserAvatar: FunctionComponent<IUserAvatarProps> = memo(
    ({ user, showDisplayName }) => {
        const displayName = (user && user.displayName) || '';
        const photo = (user && user.photo) || '';

        let photoSrc = photo;
        if (photoSrc && photoSrc.startsWith('/')) {
            photoSrc = `${appOptions.apiBaseUrl}${photoSrc}`;
        }

        return (
            <>
                <Avatar src={photoSrc}>
                    {displayName && displayName[0].toUpperCase()}
                </Avatar>
                {showDisplayName && (
                    <span style={{ verticalAlign: 'middle' }}>
                        {displayName && displayName}
                    </span>
                )}
            </>
        );
    },
);

export default UserAvatar;
