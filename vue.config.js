module.exports = {
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