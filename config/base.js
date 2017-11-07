const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const baseConf = (_path) => {
  const entry = {
    index: ['babel-polyfill', './src/index/index.js'],
    about: ['babel-polyfill', './src/about/about.js']
  };
  console.log(_path);
  const plugins = Object.keys(entry).reduce((acc, name) => {
    acc.push(new HtmlWebpackPlugin({
      title: `${name}`,
      template: `./src/${name}/${name}.html`,
      chunks: [name],
      filename: `./${name}.html`,
    }));
    acc.push(new ExtractTextPlugin({
      filename: `styles/[name].css`,
      allChunks: false
    }));

    return acc;
  }, []);

  plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      VERSION: JSON.stringify("5fa3b9"),
      BROWSER_SUPPORTS_HTML5: true,
      "typeof window": JSON.stringify("object")
    })
  ]);

  return {
    entry,
    output: {
      filename: 'js/[name].js',
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
        },
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader','autoprefixer-loader?browsers=last 5 version', 'stylus-loader']
          })
        },
        {

          /**
           * ASSET LOADER
           * Reference: https://github.com/webpack/file-loader
           * Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
           * Rename the file using the asset hash
           * Pass along the updated reference to your code
           * You can add here any file extension you want to get copied to your output
           */
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: 'file-loader?name=/assets/images/[name].[ext]',
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader?name=assets/fonts/[name].[ext]'
        }
      ]
    },
    plugins
  };
};

module.exports = baseConf;