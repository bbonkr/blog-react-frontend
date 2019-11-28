import { PostModel } from '../../typings/dto';

/**
 * 글 좋아요 데이터를 갱신합니다.
 * @param source 글 목록 또는 글; 좋아요 데이터 포함 (likers)
 * @param update 글; 좋아요 데이터 포함 (likers)
 */
export const applyUpdatedPostLikers = (
    source: PostModel | PostModel[],
    update: PostModel,
): void => {
    if (source == null) {
        return;
    }

    let post: any = {};

    if (Array.isArray(source)) {
        // posts
        post = source.find((x) => x.id === update.id);
    } else {
        post = source;
    }

    if (post == null) {
        return;
    }

    post.likers = update.likers;
};
