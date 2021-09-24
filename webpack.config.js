const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, 'public'),
        port: 3003,
        hot: true,
        liveReload: true,
    },
}