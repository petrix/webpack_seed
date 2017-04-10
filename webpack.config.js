const path = require('path');
const baseConfig = require('./config/base');
const devConfig = require('./config/dev');
const prodConfig = require('./config/prod');
const rootPath = __dirname.split('/').slice(0, -1).join('/');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const env = process.env.NODE_ENV;

const _path = __dirname;

let config = baseConfig(_path);

if (env === "development") {
    config = devConfig(config, path.normalize(path.join(_path, "dist")));
}

if (env === "production") {
   config = prodConfig(config, path.normalize(path.resolve(rootPath + "/api/public")))
}


module.exports = config;