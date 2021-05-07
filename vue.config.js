module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  },
  pages: process.env.NODE_ENV === 'development' ? {
    index: 'src/main.js',
    admin: 'src/admin.js'
  } : undefined,
  publicPath: process.env.NODE_ENV === 'production'
    ? '.'
    : '/',
  runtimeCompiler: true
}