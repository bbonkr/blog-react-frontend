/**
 * /users/:user/posts
 */
import React, { useCallback, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import DefaultLayout from '../../components/DefaultLayout';
import { ContentWrapper } from '../../styledComponents/Wrapper';
import PropTypes from 'prop-types';
import SinglePost from '../../components/SinglePost';
import { Skeleton, Spin } from 'antd';
import { actionTypes } from '../../reducers/actionTypes';
import { IUserModel } from '../../typings/IUserModel';
import {
    IRootState,
    IPostState,
    ISettingState,
} from '../../typings/reduxStates';

// import '../../styles/prism.css';
// import '../../styles/singlepost.css';

export interface IUsersPostProps {
    user: IUserModel;
    slug: string;
}

const UsersPost: FunctionComponent = () => {
    const siteName = 'nodeblog';
    const { loadingPost, singlePost } = useSelector<IRootState, IPostState>(
        (s) => s.post,
    );
    const { baseUrl, currentUrl } = useSelector<IRootState, ISettingState>(
        (s) => s.settings,
    );

    const getOgImage = useCallback(() => {
        if (!singlePost) {
            return '';
        }
        if (!!singlePost.coverImage) {
            return `${baseUrl}${singlePost.coverImage}`;
        }
        if (!!singlePost.user && singlePost.user.photo) {
            return `${baseUrl}${singlePost.user.photo}`;
        }
        return '';
    }, [baseUrl, singlePost]);
    return (
        <>
            {!!singlePost && (
                <Helmet
                    title={`${singlePost.title} | ${singlePost.user.displayName} | ${siteName}`}
                    meta={[
                        { name: 'description', content: singlePost.excerpt },
                        { name: 'og:title', content: singlePost.title },
                        { name: 'og:description', content: singlePost.excerpt },
                        { name: 'og:url', content: `${baseUrl}${currentUrl}` },
                        { name: 'og:image', content: getOgImage() },
                    ]}
                />
            )}
            <DefaultLayout>
                <ContentWrapper>
                    <Spin spinning={loadingPost} tip='loading ...'>
                        {!!singlePost && !loadingPost ? (
                            <SinglePost post={singlePost} />
                        ) : (
                            <Skeleton active paragraph={{ rows: 4 }} />
                        )}
                    </Spin>
                </ContentWrapper>
            </DefaultLayout>
        </>
    );
};

// UsersPost.propTypes = {
//     user: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
// };

UsersPost.getInitialProps = async (context) => {
    const { user, slug } = context.query;
    // console.log('Post.getInitialize() ==> user: ', user);
    // console.log('Post.getInitialize() ==> slug: ', slug);
    const decodedUser = user;
    const decodedSlug = decodeURIComponent(slug);
    context.store.dispatch({
        type: actionTypes.LOAD_SINGLE_POST_CALL,
        data: { user: decodedUser, slug: decodedSlug },
    });

    return {
        user,
        slug,
    };
};

export default UsersPost;
