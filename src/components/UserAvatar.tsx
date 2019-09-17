import React, { FunctionComponent } from 'react';
import { Avatar } from 'antd';
import { IUserModel } from '../typings/IUserModel';

export interface IUserAvatarProps {
    user: IUserModel;
}

const UserAvatar: FunctionComponent<IUserAvatarProps> = ({ user }) => {
    const { displayName, photo } = user;

    return (
        <Avatar src={!!photo && photo}>
            {displayName && displayName[0].toUpperCase()}
        </Avatar>
    );
};

export default UserAvatar;
