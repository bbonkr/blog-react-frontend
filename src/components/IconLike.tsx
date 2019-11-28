import React, {
    useCallback,
    useMemo,
    useState,
    FunctionComponent,
    useEffect
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "antd";
import { actionTypes } from "../reducers/actionTypes";
import { PostModel } from "../typings/dto";
import { RootState, UserState, PostState } from "../typings/reduxStates";

const LIKE_COLOR = "#eb2f96";

export interface IconLikeProps {
    post: PostModel;
}

const IconLike: FunctionComponent<IconLikeProps> = ({ post }) => {
    const dispatch = useDispatch();
    const { me } = useSelector<RootState, UserState>(s => s.user);
    const { likePostLoading } = useSelector<RootState, PostState>(s => s.post);
    const [loading, setLoading] = useState(false);

    useMemo(() => {
        if (!likePostLoading) {
            setLoading(false);
        }
    }, [likePostLoading]);

    const likersCount = useMemo(() => {
        return (post.likers && post.likers.length) || 0;
    }, [post.likers]);

    const liked: boolean = useMemo(() => {
        return (
            me && post.likers && post.likers.findIndex(x => x.id === me.id) >= 0
        );
    }, [me, post.likers]);

    const isMyPost: boolean = useMemo(() => {
        if (me) {
            return me.id === post.user.id;
        }
        return false;
    }, [me, post.user.id]);

    const description: string = useMemo(() => {
        if (isMyPost) {
            return "This post is yours.";
        }

        if (liked) {
            return "Cancel to like a post.";
        }

        return "Like this post";
    }, [liked, isMyPost]);

    const cursor: string = useMemo(() => {
        if (!me || isMyPost) {
            return "not-allowed";
        }
        return "pointer";
    }, [me, isMyPost]);

    const onClickLike = useCallback(() => {
        if (me) {
            if (!isMyPost) {
                let action: actionTypes = actionTypes.ADD_LIKE_POST_CALL;

                if (liked) {
                    action = actionTypes.REMOVE_LIKE_POST_CALL;
                }

                setLoading(true);

                dispatch({
                    type: action,
                    data: {
                        user: post.user.username,
                        post: post.slug
                    }
                });
            }
        }
    }, [dispatch, liked, me, post.user.username, post.slug]);

    return (
        <span
            onClick={onClickLike}
            style={{ cursor: cursor }}
            title={description}
        >
            <Icon
                type={loading ? "loading" : "heart"}
                theme={!liked || loading ? "outlined" : "twoTone"}
                twoToneColor={LIKE_COLOR}
                spin={loading}
            />{" "}
            {`${likersCount}`}
        </span>
    );
};

export default IconLike;
