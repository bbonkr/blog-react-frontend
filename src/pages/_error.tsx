import React, { FunctionComponent } from 'react';
import Error from 'next/error';
import { ContentWrapper } from '../styledComponents/Wrapper';
import DefaultLayout from '../components/DefaultLayout';
import { NextPageContext } from 'next';
import { NextJSContext } from 'next-redux-wrapper';
import { IRootState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import { IPageProps } from '../typings/IPageProps';
import Head from 'next/head';
import { appOptions } from '../config/appOptions';

export interface IBlogErrorProps extends IPageProps {
    statusCode?: number;
}

const BlogError: FunctionComponent<IBlogErrorProps> = ({ statusCode }) => {
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
    context: NextPageContext & NextJSContext<IRootState, IBlogAction>,
): Promise<IBlogErrorProps> => {
    const statusCode = context.res
        ? context.res.statusCode
        : context.err
        ? context.err.statusCode
        : null;
    return {
        statusCode,
    };
};

export default BlogError;
