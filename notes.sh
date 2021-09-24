yarn init

mkdir src public

yarn add react react-dom

yarn add --dev \
    @babel/core \
    @babel/cli \
    @babel/preset-env \
    @babel/preset-react \
    webpack \
    webpack-cli \
    webpack-dev-server \
    style-loader \
    css-loader \
    babel-loader
touch \
    babel.config.js \
    webpack.config.js \
    public/index.html \
    src/index.js \
    src/App.js \
    src/App.css \
    .gitignore