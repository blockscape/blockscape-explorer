var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var webpack = require('webpack');

var cfg = {
    entry: {
        main: './client/main.ts',
        vendor: ['vue', 'vue-router', 'vue-resource', 'vuex', 'lodash', 'c3', 'd3']
    },
    output: {
        filename: '[name]/bundle.js',
        path: path.resolve(__dirname, 'dist/client'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'vue-ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['client/css']
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    loaders: {
                        js: 'vue-ts-loader',
                        ts: 'vue-ts-loader',
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    includePaths: ['client/css'],
                                }
                            }
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    includePaths: ['client/css'],
                                    indentedSyntax: true
                                }
                            }
                        ]
                    },
                    esModule: true
                }
            },
			{
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    prefix: 'assets/'
                }
            },
			{
                test: /\.(woff|woff2)$/,
                loader:"url-loader",
                options: {
                    limit: 5000,
                    name: 'assets/[hash].[ext]'
                }
            },
			{
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream',
                    name: 'assets/[hash].[ext]'
                }
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/png',
                    name: 'assets/[hash].[ext]'
                }
            },
            {
                test: /\.jpg$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/jpeg',
                    name: 'assets/[hash].[ext]'
                }
            },
			{
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml',
                    name: 'assets/[hash].[ext]'
                }
            },
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new HtmlWebpackPlugin({
            title: 'Explorer', 
            chunks: ['vendor', 'main'], 
            filename: 'index.html',
            template: 'client/index.html'
        }),
        new FaviconsWebpackPlugin({
            logo: './client/img/favicon.png', 
            prefix: 'assets/', 
            persistentCache: true, 
            inject: true, 
            title: 'Blockscape Explorer',
            theme_color: '#000'
        }),
        // separate out vendor files into separate chunk--this dramatically improves load time because vendor chunk
        // only updates after 
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        // here we use async components child example: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        // this will place a common dependency between multiple into a separate package loaded async on chunk load
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
            minChunks: 3
        }),
        new OfflinePlugin()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.vue', '.js', '.scss', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.js',
            'lib': path.resolve(__dirname, 'lib/'),
        },
        modules: [path.resolve(__dirname, 'client'), 'node_modules']
    },
    devServer: {
        historyApiFallback: true
    },
    performance: {
        hints: false
    },
    devtool: 'inline-source-map'
};

if(process.env.NODE_ENV == 'production') {
    console.log('Node env is production');
    cfg.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));

    cfg.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: true
    }));

    cfg.devtool = 'nosources-source-map';
}

module.exports = cfg;