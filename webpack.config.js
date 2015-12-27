var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
    __TEST__: process.env.NODE_ENV === 'test',
    __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

// webpack 打包工具
module.exports = {
    context: __dirname + '/src',
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        },
        { test: /\.css$/, exclude: /node_modules/,loader: 'style-loader!css-loader?modules' } // 模块化加载css文件
        ]
    },
    plugins: [
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
    }
};