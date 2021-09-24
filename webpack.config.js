const path = require('path')
const MiniCssExtructPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        port: 3003,
        hot: false,
        liveReload: false,
        // hot: true,
        // liveReload: true,
    },
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtructPlugin.loader, 'css-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },

    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new MiniCssExtructPlugin(),
    ]
}