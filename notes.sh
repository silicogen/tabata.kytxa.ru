yarn init

mkdir src public

yarn add react react-dom

yarn add --dev \
    @babel/core \
    @babel/cli \
    @babel/preset-env \
    @babel/preset-typescript \
    @babel/preset-react \
    typescript \
    @types/react \
    @types/react-dom \
    webpack \
    webpack-cli \
    webpack-dev-server \
    style-loader \
    css-loader \
    babel-loader

touch \
    babel.config.js \
    tsconfig.json \
    webpack.config.js \
    public/index.html \
    src/index.tsx \
    src/App.tsx \
    src/App.css \
    .gitignore