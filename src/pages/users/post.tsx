/**
 * /users/:user/posts
 */
import React, {
    useCallback,
    FunctionComponent,
    useMemo,
    useEffect
} from "react";
import { useSelector } from "react-redux";
// import Helmet from 'react-helmet';
import Head from "next/head";
import DefaultLayout from "../../components/DefaultLayout";
import { ContentWrapper } from "../../styledComponents/Wrapper";
import SinglePost from "../../components/SinglePost";
import { Skeleton, Spin } from "antd";
import { actionTypes } from "../../reducers/actionTypes";
import {
    RootState,
    SettingState,
    SinglePostState
} from "../../typings/reduxStates";
import { appOptions } from "../../config/appOptions";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { BaseAction } from "../../typings/BaseAction";
import { PageProps } from "../../typings/PageProps";

import "../../styles/prism.css";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "../../styles/singlepost.css";

export interface UsersPostPageProps extends PageProps {
    user: string;
    slug: string;
}

const UsersPost: FunctionComponent = () => {
    const siteName = appOptions.title;
    const { loadingPost, singlePost } = useSelector<RootState, SinglePostState>(
        s => s.singlePost
    );

    const { currentUrl } = useSelector<RootState, SettingState>(
        s => s.settings
    );

    const baseUrl: string = appOptions.apiBaseUrl;

    useEffect(() => {
        console.info("[APP] Post componentDidMount");
    }, []);

    // const getOgImage = useCallback(() => {
    //     if (!singlePost) {
    //         return '';
    //     }
    //     if (!!singlePost.coverImage) {
    //         return `${baseUrl}${singlePost.coverImage}`;
    //     }
    //     if (!!singlePost.user && singlePost.user.photo) {
    //         return `${baseUrl}${singlePost.user.photo}`;
    //     }
    //     return '';
    // }, [baseUrl, singlePost]);

    const ogImage = useMemo(() => {
        if (!singlePost) {
            return "";
        }
        if (singlePost.coverImage) {
            return `${appOptions.apiBaseUrl}${singlePost.coverImage}`;
        }
        if (!!singlePost.user && singlePost.user.photo) {
            return `${appOptions.apiBaseUrl}${singlePost.user.photo}`;
        }
        return "";
    }, [singlePost]);

    // const title: string = useMemo(() => {
    //     if (!singlePost) {
    //         return siteName;
    //     }

    //     return `${singlePost && singlePost.title} | ${singlePost &&
    //         singlePost.user.displayName} | ${siteName}`;
    // }, [singlePost]);

    const title: string = `${singlePost && singlePost.title} | ${singlePost &&
        singlePost.user.displayName} | ${siteName}`;

    return (
        <>
            {/* {!!singlePost && (
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
            )} */}
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content={singlePost && singlePost.excerpt}
                />
                <meta
                    name="og:title"
                    content={singlePost && singlePost.title}
                />
                <meta
                    name="og:description"
                    content={singlePost && singlePost.excerpt}
                />
                <meta name="og:url" content={currentUrl} />
                <meta name="og:image" content={ogImage} />
            </Head>
            <DefaultLayout>
                <ContentWrapper>
                    <Spin spinning={loadingPost} tip="loading ...">
                        {singlePost && !loadingPost ? (
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

UsersPost.getInitialProps = async (
    context: NextPageContext & NextJSContext<RootState, BaseAction>
): Promise<UsersPostPageProps> => {
    const user: string = context.query.user as string;
    const slug: string = context.query.slug as string;
    // console.log('Post.getInitialize() ==> user: ', user);
    // console.log('Post.getInitialize() ==> slug: ', slug);
    const decodedUser = user;
    const decodedSlug = decodeURIComponent(slug);
    context.store.dispatch({
        type: actionTypes.LOAD_SINGLE_POST_CALL,
        data: { user: decodedUser, slug: decodedSlug }
    });

    return {
        user,
        slug
    };
};

export default UsersPost;
