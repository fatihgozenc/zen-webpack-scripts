const webpack = require("webpack")
const { merge } = require('webpack-merge');
const prod = require('./webpack.prod.js');
const ESLintPlugin = require('eslint-webpack-plugin');
const styleConfig = require("./webpack.styles")
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = merge(prod, {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
})