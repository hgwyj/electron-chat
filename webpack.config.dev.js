"use strict";
const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    entry: {
        index: "./render/index.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[hash:4].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                use: 'babel-loader'
            },
            {
                test: /.(woff|woff2|png|jpeg|jpg|gif)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: '[name]_[hash:4].[ext]'
                        }
                    }
                ]
            },
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
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: '[path][name]_[local]--[hash:base64:4]'
                            },
                            url: true,
                        }
                    },
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
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    devServer: {
        contentBase: "./dist",
        hot: true,
        port: 8888,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[hash:4].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "render/template/index.html"),
            filename: "index.html",
            chunks: ["vendors", "index"],
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            minChunks: 1,
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
};