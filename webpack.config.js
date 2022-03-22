"use strict";

const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { bundler, styles } = require("@ckeditor/ckeditor5-dev-utils");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");

module.exports = {
    devtool: "source-map",
    performance: { hints: false },

    entry: path.resolve(__dirname, "src", "ckeditor.js"),

    output: {
        library: "ClassicEditor",
        path: path.resolve(__dirname, "build"),
        filename: "ckeditor.js",
        libraryTarget: "umd",
        libraryExport: "default",
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    output: { comments: /^!/ },
                },
                extractComments: false,
            }),
        ],
    },

    plugins: [
        new CKEditorWebpackPlugin({
            language: "en",
            additionalLanguages: "all",
        }),
        new webpack.BannerPlugin({
            banner: bundler.getLicenseBanner(),
            raw: true,
        }),
    ],

    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ["raw-loader"],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "singletonStyleTag",
                            attributes: { "data-cke": true },
                        },
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: styles.getPostCssConfig({
                                themeImporter: {
                                    themePath: require.resolve(
                                        "@ckeditor/ckeditor5-theme-lark"
                                    ),
                                },
                                minify: true,
                            }),
                        },
                    },
                ],
            },
        ],
    },
};
