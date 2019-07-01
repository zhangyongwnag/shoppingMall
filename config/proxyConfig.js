module.exports = {
  '/api':{
    proxyList:{
      target:'',
      changeOrigin:true,
      pathReWrite:{
        '^/api':''
      }
    }
  }
}
