import React, { FunctionComponent } from 'react';
import { Icon } from 'antd';
import { IconProps } from 'antd/lib/icon';

export interface IIconTextProps {
    type: string;
    text: string;
    spanProps?: any;
    iconProps?: IconProps;
}

const IconText: FunctionComponent<IIconTextProps> = ({
    type,
    text,
    spanProps,
    iconProps,
}) => (
    <span {...spanProps}>
        <Icon type={type} style={{ marginRight: 8 }} {...iconProps} />
        {text}
    </span>
);

export default IconText;
