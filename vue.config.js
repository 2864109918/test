module.exports = {
    assetsDir: 'static', // 配置js、css静态资源二级目录的位置  
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://sggsxt.0791jr.com', //请求地址
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //请求地址
                }
            }
        }

    },
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             'assets': '@/assets',
    //             'common': '@/common',
    //             'components': '@/components',
    //             'router': '@/router',
    //             'store': '@/store',
    //             'views': '@/views',
    //             'network': '@/network',
    //    