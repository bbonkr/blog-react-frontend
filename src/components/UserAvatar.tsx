import React, { FunctionComponent, memo } from 'react';
import { Avatar } from 'antd';
import { IUserModel } from '../typings/dto';
import { appOptions } from '../config/appOptions';

export interface IUserAvatarProps {
    user: IUserModel;
}

const UserAvatar: FunctionComponent<IUserAvatarProps> = memo(({ user }) => {
    // const { displayName, photo } = user;
    const photo = (user && user.photo) || '';
    const displayName = (user && user.displayName) || '';
    let photoSrc = photo;
    if (photoSrc && photoSrc.startsWith('/')) {
        photoSrc = `${appOptions.apiBaseUrl}${photoSrc}`;
    }
    return (
        <Avatar src={photoSrc && photoSrc}>
            {displayName && displayName[0].toUpperCase()}
        </Avatar>
    );
});

export default UserAvatar;
