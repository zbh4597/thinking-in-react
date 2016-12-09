var path = require('path');
// var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./app/main.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    alias: {
        'react': 'react/dist/react.min.js',
        'react-dom': 'react-dom/dist/react-dom.min.js'
    },
    module: {
        // noParse: [/react/, /react-dom/],//开启会影响代码合并。应该是在有CDN的情况下使用。即html页面要引入CDN文件。
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader?{browsers: ["last 2 version"]}'
            },
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader!autoprefixer-loader?{browsers: ["last 2 version"]}!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!autoprefixer-loader?{browsers: ["last 2 version"]}!sass-loader?outputStyle=expanded'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }
        ]
    }
    // ,
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         },
    //         output: {
    //             comments: false
    //         },
    //     }),
    // ]
};