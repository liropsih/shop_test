module.exports = {
  // pages: process.env.NODE_ENV === 'development' ? {
  //   index: 'src/main.js',
  //   admin: 'src/admin.js'
  // } : undefined,
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '.'
  //   : '/',
  configureWebpack: process.env.NODE_ENV === 'production' ? {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  } : undefined,
  runtimeCompiler: process.env.NODE_ENV === 'development' ? true : undefined,
  productionSourceMap: false
}