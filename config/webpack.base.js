const paths = require('./paths');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: paths.src + '/resources/js/index.ts',
    output: {
        path: paths.build,
        filename: '[name].[contenthash:8].bundle.js',
        chunkFilename: '[name].[contenthash:8].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        configFile: paths.config + '/babel.config.js',
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[contenthash:8].[ext]',
                            limit: 4096,
                            outputPath: 'images',
                            esModule: false,
                        },
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './src/resources/img',
                    to: 'images/[name].[hash].[ext]',
                    toType: 'template'
                },
            ],
        }),
    ]
};
