"use strict";
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    entry: {
        index: path.join(__dirname, 'render/index')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:4].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            // {
            //     test: /.css$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader'
            //     ]
            // },
            {
                test: /.css$/,
                use: [
                    "style-loader", //在head标签钟生成style标签将样式自动生成在style标签中
                    "css-loader"
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader, //自动生成link 标签将 打包过的css放在 head中
                    'css-loader',
                    'less-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require('autoprefixer')({ //使用autoprefixer 进行css3后缀的补全 进行浏览器的适配
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:4].css'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    }
};