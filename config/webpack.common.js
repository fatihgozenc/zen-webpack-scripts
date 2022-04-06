const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const Dotenv = require("dotenv-webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackDeployPlugin = require("html-webpack-deploy-plugin")

module.exports = {
    entry: {
        app: path.resolve("src", "index.js"),
        preload: path.resolve("src", "preload.js"),
    },
    target: "browserslist",
    output: {
        path: path.resolve("build"),
        publicPath: "/",
    },
    resolve: {
        fallback: {
            dgram: false,
            fs: false,
            net: false,
            tls: false,
            child_process: false,
            __dirname: false
        },
        modules: ["node_modules"],
        extensions: [
            ".web.ts", ".ts", ".web.tsx", ".tsx",
            ".web.js", ".js", ".web.jsx", ".jsx",
            ".json"
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve("src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        exclude: [
                            /node_modules[\\\/]core-js/,
                            /node_modules[\\\/]webpack[\\\/]buildin/,
                        ],
                        presets: ["@babel/preset-react"],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|ttf|eot)$/i,
                type: "asset/resource",
                generator: {
                    filename: "public/[name][ext]",
                }
            },
        ]
    },
    plugins: [
        new Dotenv(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: "Zen App",
            // inject: false,
            template: path.resolve("src", "index.html"),
            // filename: 'index.[contenthash].html',
            minify: true,
            meta: {
                viewport: "viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
                "theme-color": "#fff",
                // "Content-Security-Policy": { 
                //     "http-equiv": "Content-Security-Policy",
                //     content: "default-src https:"
                // },
                // "set-cookie": { 
                //     "http-equiv": "set-cookie", 
                //     content: "name=value; expires=date; path=url" 
                // },
                // Will generate: <meta http-equiv="set-cookie" content="value; expires=date; path=url">
                // Which equals to the following http header: `set-cookie: value; expires=date; path=url`
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/public",
                    to: "./public"
                }
            ],
        }),
        new WebpackManifestPlugin({
            fileName: "assets.json"
        }),
    ]
};