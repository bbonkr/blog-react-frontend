import React, { useCallback, useMemo, useState, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'antd';
import { IPostState } from '../reducers/post';
import { IRootState } from 'reducers';
import { IUserState } from 'reducers/user';
import { actionTypes } from 'reducers/actionTypes';

const LIKE_COLOR = '#eb2f96';

export interface IIconLikeProps {
    post: any;  // todo type post
}

const IconLike: FunctionComponent<IIconLikeProps> = ({ post }) => {
    const dispatch = useDispatch();
    const { me } = useSelector<IRootState, IUserState>(s => s.user);
    const { likePostLoading } = useSelector<IRootState, IPostState>(s => s.post);
    const [loading, setLoading] = useState(false);

    useMemo(() => {
        if (!likePostLoading) {
            setLoading(false);
        }
    }, [likePostLoading]);

    const likersCount = useMemo(() => {
        return (post.Likers && post.Likers.length) || 0;
    }, [post.Likers]);

    const liked = useMemo(() => {
        return (
            me && post.Likers && post.Likers.findIndex(x => x.id === me.id) >= 0
        );
    }, [me, post.Likers]);

    const onClickLike = useCallback(() => {
        if (!!me) {
            let action: actionTypes = actionTypes.ADD_LIKE_POST_CALL;

            if (liked) {
                action = actionTypes.REMOVE_LIKE_POST_CALL;
            }

            setLoading(true);

            dispatch({
                type: action,
                data: {
                    user: post.User.username,
                    post: post.slug,
                },
            });
        }
    }, [dispatch, liked, me, post.User.username, post.slug]);

    return (
        <span onClick={onClickLike} style={{ cursor: !!me ? 'pointer' : '' }}>
            <Icon
                type={loading ? 'loading' : 'heart'}
                theme={!liked || loading ? 'outlined' : 'twoTone'}
                twoToneColor={LIKE_COLOR}
                spin={loading}
            />{' '}
            {`${likersCount}`}
        </span>
    );
};

export default IconLike;
