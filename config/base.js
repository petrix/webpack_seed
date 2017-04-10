const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require("path");

const baseConf = (_path) => {
    const dependecies = Object.keys(require(path.normalize(_path + '/package')).dependencies);
    const htmlSrc = path.normalize(_path+ "/src/index.html");

    return {
        entry: {
            application: path.normalize(_path + "/src/app.js"),
            vendors: dependecies
        },

        output: {
            filename: "[name].js",
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader'
                        }
                    ]
                },
                {
                    test: /\.js/,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env']
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
            }),
            new HtmlWebpackPlugin({
                template: htmlSrc
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                VERSION: JSON.stringify("5fa3b9"),
                BROWSER_SUPPORTS_HTML5: true,
                "typeof window": JSON.stringify("object")
            })
        ]
    };
};

module.exports = baseConf;