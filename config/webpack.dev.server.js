module.exports = {
    compress: true,
    hot: true,
    open: true,
    port: 3000,
    client: {
        overlay: false
    },
    setupExitSignals: true,
    historyApiFallback: true,
    watchFiles: ["src/**"]
}