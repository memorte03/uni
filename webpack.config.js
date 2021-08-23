const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
    entry: './src/Index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        publicPath: '/',
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers':
            'X-Requested-With, content-type, Authorization',
        },
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss'],
        alias: {
            '~': path.resolve(__dirname, 'src/'),
            '~c': path.resolve(__dirname, 'src/components'),
            '~s': path.resolve(__dirname, 'src/styles'),
            '~sc': path.resolve(__dirname, 'src/scenes'),
            '~a': path.resolve(__dirname, 'src/assets'),
            '~api': path.resolve(__dirname, 'src/api'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { modules: true },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // favicon: 'src/assets/favicon/favicon.ico',
            template: 'src/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.GRAPHQL_URI': JSON.stringify(process.env.GRAPHQL_URI),
        }),
    ],
};
