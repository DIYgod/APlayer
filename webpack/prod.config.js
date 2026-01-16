const path = require('path');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'production',

    bail: true,

    devtool: 'source-map',

    entry: {
        APlayer: './src/index_vue.js',
    },

    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].min.js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/',
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.scss', '.vue'],
    },

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: [
                    'template-string-optimize-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer, cssnano],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer, cssnano],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 40000,
                },
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.art$/,
                loader: 'art-template-loader',
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            APLAYER_VERSION: `"${require('../package.json').version}"`,
            GIT_HASH: JSON.stringify(gitRevisionPlugin.version()),
        }),
        new VueLoaderPlugin(),
    ],

    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};
