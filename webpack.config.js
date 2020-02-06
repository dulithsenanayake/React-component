const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    context: __dirname,
    entry:
        './src/index.js',
    output: {
        path: path.resolve(__dirname, '/home/dulith/Documents/Extension_new/ei-tooling-vscode/vscode-plugin/resources/build'),
        filename: '[name].js',
        library: 'mediationComponent',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    watch: true,
    devServer: {
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'public'),
        port: 9000,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'public/img', to: 'img' }
        ]),
    ],
    devtool: 'source-map',
};