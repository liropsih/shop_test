module.exports = {
  pages: process.env.NODE_ENV === 'development' ? {
    index: 'src/index/main.js',
    admin: 'src/admin/main.js'
  } : undefined,
  publicPath: '.',
  runtimeCompiler: true
}