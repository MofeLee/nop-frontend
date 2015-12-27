var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');

var devFlagPlugin = new webpack.DefinePlugin({
  __TEST__: process.env.NODE_ENV === 'test',
  __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

const PATHS = {
  src: path.resolve(__dirname + '/src'),
  dist: path.resolve(__dirname + '/dist')
}

// webpack 打包工具
module.exports = {
  context: PATHS.src,
  entry: './index.js',
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules'
      } // 模块化加载css文件
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    devFlagPlugin,
    new HtmlwebpackPlugin({
      title: "Mofe's Blog"
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    // Display only errors to reduce the amount of output.
    stat: 'error-only',

    // Parse host and port from env so this is easy to customize
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '8080'
  }
};
