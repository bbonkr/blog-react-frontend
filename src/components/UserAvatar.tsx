import React, { FunctionComponent, memo, useEffect, useState } from "react";
import { Avatar, Typography } from "antd";
import { UserModel } from "../typings/dto";
import { appOptions } from "../config/appOptions";
import { PageProps } from "../typings/PageProps";

export interface UserAvatarProps extends PageProps {
    user: UserModel;
    showDisplayName?: boolean;
}

const UserAvatar: FunctionComponent<UserAvatarProps> = memo(
    ({ user, showDisplayName }) => {
        const displayName = (user && user.displayName) || "";
        const photo = (user && user.photo) || "";

        let photoSrc = photo;
        if (photoSrc && photoSrc.startsWith("/")) {
            photoSrc = `${appOptions.apiBaseUrl}${photoSrc}`;
        }

        return (
            <>
                <Avatar src={photoSrc}>
                    {displayName && displayName[0].toUpperCase()}
                </Avatar>
                {showDisplayName && (
                    <span style={{ verticalAlign: "middle" }}>
                        {displayName && displayName}
                    </span>
                )}
            </>
        );
    }
);

export default UserAvatar;
