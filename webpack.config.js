const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
          }),
    ],
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