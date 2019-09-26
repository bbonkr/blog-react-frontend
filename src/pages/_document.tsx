import React from 'react';
import Document, {
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
    DocumentProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { NextPageContext } from 'next';
import { NextJSContext } from 'next-redux-wrapper';
import { IRootState } from '../typings/reduxStates';
import { IBlogAction } from '../typings/IBlogAction';
import { IPageProps } from '../typings/IPageProps';
import { appOptions } from '../config/appOptions';

export interface IBlogDocumentProps extends IPageProps, DocumentInitialProps {
    // helmet: HelmetData;
    // styleTags: React.ReactElement<{}>[];
}

class BlogDocument extends Document<IBlogDocumentProps> {
    public static async getInitialProps(
        ctx: DocumentContext & NextJSContext<IRootState, IBlogAction>,
    ): Promise<IBlogDocumentProps> {
        const styleSheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        styleSheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,

                styles: (
                    <>
                        {initialProps.styles}
                        {styleSheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            styleSheet.seal();
        }

        // https://github.com/zeit/next.js/blob/master/examples/with-styled-components/pages/_document.js
    }

    public render() {
        // console.debug('[APP] _document props.styles: ', this.props.styles);
        // console.debug(
        //     '[APP] _document props.helmet.styles: ',
        //     this.props.helmet.style,
        // );

        // const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;

        const prefixDir = '/_next/';
        const cssFiles = this.props.files.filter((v) => v.endsWith('.css'));

        // const htmlAttrs = htmlAttributes.toComponent();
        // const bodyAttrs = bodyAttributes.toComponent();

        const prod = process.env.NODE_ENV === 'production';
        /* IE 지원하려면 true */
        const ieSupport = false;

        // console.info('[APP] _document render');
        // {...htmlAttrs} {...bodyAttrs}
        console.debug('[APP] styles: ', this.props.styles);
        return (
            <html lang='ko'>
                <Head>
                    {this.props.styles}
                    {/* {this.props.styleTags && this.props.styleTags.map((v) => v)} */}
                    {/* {this.props.styleTags} */}
                    {/* {cssFiles.map((css) => {
                        console.log('=========> css file: ', css);
                        return (
                            <link
                                key={`${css}`}
                                rel='stylesheet'
                                href={`${prefixDir}${css}`}
                                type='text/css'
                            />
                        );
                    })} */}
                    {/* <link
                        href='/css/prism.css'
                        rel='stylesheet'
                        type='text/css'
                    /> */}
                </Head>
                <body>
                    <Main />
                    {/** IE supports */ prod && ieSupport && (
                        <script src='https://polyfill.io/v3/polyfill.min.js?features=es7%2Ces6%2Ces5%2Ces2017%2Ces2016%2Ces2015' />
                    )}
                    <NextScript />
                </body>
            </html>
        );
    }
}

export default BlogDocument;
