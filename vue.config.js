
process.env.VUE_APP_BACKEND = 'http://localhost:8080/api'

module.exports = {
    runtimeCompiler: true,
    devServer: {
        port: 7000,
    }
}

