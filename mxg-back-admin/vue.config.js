module.exports = {
  publicPath: "./",
  lintOnSave: false,
  devServer: {
    // host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        //代理api
        target: process.env.VUE_APP_SERVICE_URL, //服务器api地址
        changeOrigin: true, //是否跨域
        pathRewrite: {
          //重写路径
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  }
};
