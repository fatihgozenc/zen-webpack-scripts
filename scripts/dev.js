const webpack = require('webpack')
const devConfig = require("../config/webpack.dev")
const devServerConfig = require("../config/webpack.dev.server")
const WebpackDevServer = require('webpack-dev-server')

process.env["NODE_ENV"] = "production"

const compiler = webpack(devConfig)
const devServer = new WebpackDevServer(devServerConfig, compiler)

devServer.startCallback(() => {
    // if (process.stdout.isTTY) clearConsole()
})

function clearConsole() {
    process.stdout.write(
        process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
    )
}