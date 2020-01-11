import React, { FunctionComponent } from "react";
import Error from "next/error";
import { ContentWrapper } from "../styledComponents/Wrapper";
import DefaultLayout from "../components/DefaultLayout";
import { NextPageContext } from "next";
import { NextJSContext } from "next-redux-wrapper";
import { RootState } from "../typings/reduxStates";
import { BaseAction } from "../typings/BaseAction";
import { PageProps } from "../typings/PageProps";
import Head from "next/head";
import { appOptions } from "../config/appOptions";

export interface BlogErrorPageProps extends PageProps {
    statusCode?: number;
}

const BlogError: FunctionComponent<BlogErrorPageProps> = ({ statusCode }) => {
    // console.log('statusCode', statusCode);

    return (
        <>
            <Head>
                <title>{`HTTP ${statusCode || 400} | ${
                    appOptions.title
                }`}</title>
            </Head>
            <DefaultLayout>
                <ContentWrapper>
                    <h1>{`HTTP ${statusCode || 400}`}</h1>
                    {/* <Error statusCode={statusCode} /> */}
                </ContentWrapper>
            </DefaultLayout>
        </>
    );
};

BlogError.getInitialProps = async (
    context: NextPageContext & NextJSContext<RootState, BaseAction>
): Promise<BlogErrorPageProps> => {
    const statusCode = context.res
        ? context.res.statusCode
        : context.err
        ? context.err.statusCode
        : null;
    return {
        statusCode
    };
};

export default BlogError;
