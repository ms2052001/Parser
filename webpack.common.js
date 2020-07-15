const webpack = require("webpack");
const path = require("path");

//#region for config

const pkg = require('./package.json');
const productName = 'MagicalParser'; /// the global name for your integrated module
const {mode} = require('./package.json');

//#region banner

const date = new Date();
const banner = `
${pkg.name} v${pkg.version}       ${date}
by ${pkg.author instanceof Object ? pkg.author.name + '       ' + pkg.author.email : pkg.author}
${ pkg.homepage || ''}

Copyright: ${ date.getFullYear()} NTNU;
License: ${ pkg.license}

Build: [hash]
   `;
   
//#endregion

//#endregion

//#region 

function getFileExtension(libraryTarget) {
   let fileExtention = "";
   switch (libraryTarget) {
      case "commonjs2":
         fileExtention = "common";
         break;
      case 'umd':
         fileExtention = '';
         break;
      default:
         fileExtention = libraryTarget;
         break;
   }
   return fileExtention;
}

function getOutput(options) {
   var fileExtention = getFileExtension(options.libraryTarget);

   if (options.libraryTarget === 'umd') {
      return {
         path: path.resolve(__dirname, "lib"),
         filename: productName + ".js",
         library: productName,
         libraryTarget: 'umd'
      };
   }
   else {
      return {
         path: path.resolve(__dirname, "lib"),
         filename: productName + '.' + fileExtention + '.js',
         libraryExport: 'default',
         libraryTarget: options.libraryTarget,
         umdNamedDefine: true,
         globalObject: `(typeof self !== 'undefined' ? self : this)`
      };
   }
}

function createConfig(options) {

   var entry = "./build/index.js";

   var output = getOutput(options);

   var babelOptions = require('./babel.config');

   return {
      mode,
      entry,
      output,
      devtool: 'source-map',
      watch: false,
      module: {
         rules: [
            {
               test: /\.js$/,
               exclude: /(node_modules)/,
               use: [
                  {
                     loader: "babel-loader",
                     options: babelOptions,
                  },
               ]
            }
         ]
      },
      plugins: [
         new webpack.BannerPlugin({ banner }),
      ]
   };
}
//#endregion


module.exports = {
    createConfig
}
