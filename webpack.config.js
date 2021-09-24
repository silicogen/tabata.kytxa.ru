const path = require('path')

module.exports = {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
    },
    devServer: {
        static: path.join(__dirname, 'public/'),
        port: 3003,
    },
    entry: './src/index.tsx',
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
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    devtool: 'eval-source-map', // builds high quality source maps
}