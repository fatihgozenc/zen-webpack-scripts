const webpack = require("webpack")
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ESLintPlugin = require('eslint-webpack-plugin')
const styleConfig = require("./webpack.styles")

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    output: {
        clean: false,
        filename: "static/js/[name].bundle.js",
        chunkFilename: "static/js/[name].chunk.js",
    },
    stats: process.argv.includes("--v") ? 'verbose' : 'minimal',
    watchOptions: {
        ignored: /node_modules/,
    },
    optimization: {
        usedExports: true,
    },
    module: {
        rules: [
            {
                test: /\.module(\.css|\.s[ac]ss)$/i,
                use: [
                    "style-loader", // Creates `style` nodes from JS strings
                    styleConfig.cssLoaderModuleDev,
                    "sass-loader"   // Compiles Sass to CSS
                ],
            },
            {
                test: /(\.css|\.s[ac]ss)$/i,
                exclude: /\.module(\.css|\.s[ac]ss)$/i,
                use: [
                    "style-loader", // Creates `style` nodes from JS strings
                    styleConfig.cssLoaderDefault,
                    "sass-loader"   // Compiles Sass to CSS
                ],
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            ...styleConfig.cssGlobalProviders,
            React: 'react',
            ReactDOM: 'react-dom',
        }),
        new ESLintPlugin({
            context: "./src",
            fix: process.argv.includes("--fix") ? true : true
        })
    ]
})