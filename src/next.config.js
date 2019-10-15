const webpack = require('webpack');
const dotenv = require('dotenv');

// const withTypescript = require('@zeit/next-typescript');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const CompressionPlugin = require('compression-webpack-plugin');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

dotenv.config();

function HACK_removeMinimizeOptionFromCssLoaders(config) {
    console.warn(
        'HACK: Removing `minimize` option from `css-loader` entries in Webpack config',
    );
    config.module.rules.forEach((rule) => {
        if (Array.isArray(rule.use)) {
            rule.use.forEach((u) => {
                if (u.loader === 'css-loader' && u.options) {
                    delete u.options.minimize;
                }
            });
        }
    });
}

module.exports = withBundleAnalyzer(
    withCSS(
        withSass({
            distDir: '.next',
            publicRuntimeConfig: {
                // Will be available on both server and client
                // Pass through env variables
                // apiBaseUrl: 'http://localhost:5000',
                apiBaseUrl: process.env.API_BASEURL,
                env: process.env.NODE_ENV,
                googleAnalyticsTraceId: process.env.GOOGLE_ANALYTICS_TRACE_ID,
            },
            webpack(config) {
                // console.log('config', config);
                const prod = process.env.NODE_ENV === 'production';

                const plugins = [
                    ...config.plugins,
                    new webpack.ContextReplacementPlugin(
                        /moment[/\\]locale$/,
                        /^\.\/ko$/,
                    ),
                    // new ForkTsCheckerWebpackPlugin(),
                ];

                // if (prod) {
                //     plugins.push(new CompressionPlugin());
                // }

                // config.module.rules.push({
                //     test: /\.css$/,
                //     loader: ['style-loader', 'css-loader', 'sass-loader'],
                // });
                // console.log(config);
                // HACK_removeMinimizeOptionFromCssLoaders(config);

                return {
                    ...config,
                    // mode: prod ? 'production' : 'development',
                    // devtool: prod ? 'hidden-source-map' : 'eval',
                    module: {
                        ...config.module,
                        rules: [
                            ...config.module.rules,
                            // {
                            //     loader: 'webpack-ant-icon-loader',
                            //     enforce: 'pre',
                            //     include: [
                            //         require.resolve(
                            //             '@ant-design/icons/lib/dist',
                            //         ),
                            //     ],
                            // },
                        ],
                    },
                    plugins: plugins,
                };
            },
        }),
    ),
);
