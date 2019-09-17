import React, { FunctionComponent, memo } from 'react';
import { Avatar } from 'antd';
import { IUserModel } from '../typings/IUserModel';

export interface IUserAvatarProps {
    user: IUserModel;
}

const UserAvatar: FunctionComponent<IUserAvatarProps> = memo(({ user }) => {
    // const { displayName, photo } = user;
    const photo = (user && user.photo) || '';
    const displayName = (user && user.displayName) || '';

    return (
        <Avatar src={!!photo && photo}>
            {displayName && displayName[0].toUpperCase()}
        </Avatar>
    );
});

export default UserAvatar;
