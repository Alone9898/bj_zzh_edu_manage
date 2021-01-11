module.exports = {
    lintOnSave: false,
    devServer: {
        https: false,
        overlay: false,
        proxy: {

            '/foo': {
                target: '<other_url>'
            },
            '/api': {
                target: 'http://qd.xlanben.com/', // 开发服务器
                changeOrigin: true,//允许跨域
                ws: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}