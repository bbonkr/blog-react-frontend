import React, { FunctionComponent } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';

export interface IUserAvatarProps {
    user: any;  // todo type user
}

const UserAvatar: FunctionComponent<IUserAvatarProps> = ({ user }) => {
    const { username, displayName, photo } = user;

    return (
        <Avatar src={!!photo && photo}>{displayName && displayName[0].toUpperCase()}</Avatar>
    );
};

UserAvatar.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserAvatar;
