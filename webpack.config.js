const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    entry: ['babel-polyfill','./src/index.tsx'],
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: [
            path.resolve(__dirname + '/src'),
            path.resolve(__dirname + '/node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // {
            //     test: /\.jsx?$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/,
            // },
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ],
    },
    plugins: [
        new CopyPlugin({ patterns: [{ from: "public" }] })
    ]

}

module.exports = (env, args) => {
    if (args.mode == "development") {
        config.devtool = 'source-map';
        config.devServer = {
            static: path.join(__dirname, 'public'),
            port: 3091,
            hot: true,
            liveReload: true,
        }
    } else {
        config.plugins.push(
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                maximumFileSizeToCacheInBytes: 5000000
            })
        )
    }
    return config;
}