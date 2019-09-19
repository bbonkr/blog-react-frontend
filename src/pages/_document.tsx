import React from 'react';
import Document, { Main, NextScript } from 'next/document';
import Helmet, { HelmetData } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { IDictionary } from '../typings/IDictionary';

export interface IBlogDocumentProps extends IDictionary<any> {
    helmet: HelmetData;
    styleTags: Array<React.Component<any, any, any>>;
}

class BlogDocument extends Document<IBlogDocumentProps> {
    public static async getInitialProps(ctx) {
        const styleSheet = new ServerStyleSheet();
        const page = ctx.renderPage((App) => (props) =>
            styleSheet.collectStyles(<App {...props} />),
        );
        const styleTags = styleSheet.getStyleElement();
        try {
            return { ...page, helmet: Helmet.renderStatic(), styleTags };
        } finally {
            styleSheet.seal();
        }

        // https://github.com/zeit/next.js/blob/master/examples/with-styled-components/pages/_document.js
        // const sheet = new ServerStyleSheet();
        // const originalRenderPage = ctx.renderPage;

        // try {
        //     ctx.renderPage = () =>
        //         originalRenderPage({
        //             enhanceApp: (App) => (props) =>
        //                 sheet.collectStyles(<App {...props} />),
        //         });

        //     const initialProps = await Document.getInitialProps(ctx);
        //     return {
        //         ...initialProps,
        //         helmet: Helmet.renderStatic(),
        //         styles: (
        //             <>
        //                 {initialProps.styles}
        //                 {sheet.getStyleElement()}
        //             </>
        //         ),
        //     };
        // } finally {
        //     sheet.seal();
        // }
    }

    public render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;

        const prefixDir = '/_next/';
        const cssFiles = this.props.files.filter((v) => v.endsWith('.css'));

        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();

        const prod = process.env.NODE_ENV === 'production';
        /* IE 지원하려면 true */
        const ieSupport = false;

        console.info('[APP] _document render');
        return (
            <html {...htmlAttrs}>
                <head>
                    {Object.values(helmet).map((el) => el.toComponent())}

                    {cssFiles.map((css) => {
                        console.log('=========> css file: ', css);
                        return (
                            <link
                                key={`${css}`}
                                rel='stylesheet'
                                href={`${prefixDir}${css}`}
                                type='text/css'
                            />
                        );
                    })}
                    {this.props.styleTags && this.props.styleTags.map((v) => v)}
                    {/* {this.props.styles} */}
                </head>
                <body {...bodyAttrs}>
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
