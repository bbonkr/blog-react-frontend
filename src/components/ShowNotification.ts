import { notification } from 'antd';

export interface IShowNotificationProps {
    title: string;
    message: string;
    onClick?: ()=> void;
    icon?: string;
}

export const ShowNotification = ({ title, message, onClick, icon }: IShowNotificationProps): void => {
    notification.open({
        message: title,
        description: message,
        onClick: onClick,
        icon: !!icon && icon,
    });
};
