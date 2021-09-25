const path = require('path')

const config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
}

module.exports = (env, args) => {
    if (args.mode == "development") {
        config.devtool = 'source-map';
        config.devServer = {
            static: path.join(__dirname, 'public'),
            port: 3031,
            hot: true,
            liveReload: true,
        }
    }
    return config;
}