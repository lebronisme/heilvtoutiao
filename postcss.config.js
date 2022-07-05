module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // rootValue 设置设计稿量出来的尺寸 除以多少 设置基准字体大小
      rootValue ({ file }) {
        // 因为我们自己的设计稿宽度是750，所以只有我们的需要除以75再转换成rem，其他的组件内置样式，都除以37.5
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
