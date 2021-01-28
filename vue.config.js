
process.env.VUE_APP_BACKEND = 'http://localhost:8081/api'

module.exports = {
    runtimeCompiler: true,
    devServer: {
        port: 7000,
    }
}

