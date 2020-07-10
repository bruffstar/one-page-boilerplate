const paths = require('./paths');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const globals = require('./globals.js');

module.exports = merge(base, {
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            config: {
                                path: paths.config,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            config: {
                                path: paths.config
                            },
                        },
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].bundle.css',
            chunkFilename: '[name].[contenthash:8].chunk.css',
        }),
        new HtmlWebpackPlugin({
            template: paths.src + '/index.html',
            filename: 'index.html',
            templateParameters: globals,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: false,
                },
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true,
                            },
                            minifyFontValues: {
                                removeQuotes: false,
                            },
                        },
                    ],
                },
            }),
        ],
    },
});
