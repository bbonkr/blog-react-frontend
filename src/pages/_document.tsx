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
    public static getInitialProps(context) {
        const styleSheet = new ServerStyleSheet();
        const page = context.renderPage((App) => (props) =>
            styleSheet.collectStyles(<App {...props} />),
        );
        const styleTags = styleSheet.getStyleElement();

        return { ...page, helmet: Helmet.renderStatic(), styleTags };
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

        return (
            <html {...htmlAttrs}>
                <head>
                    {Object.values(helmet).map((el) => el.toComponent())}

                    {cssFiles.map((css) => {
                        // console.log('=========> css file: ', css);
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
