 module.exports = {
  proxyList:{
    '/api':{
      target:'',
      changeOrigin:true,
      pathRewrite:{
        '^/api':''
      }
    }
  }
}

