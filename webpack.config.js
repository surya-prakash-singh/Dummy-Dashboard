const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const argv = require('yargs').argv
const HTMLWebpackPlugin = require("html-webpack-plugin");

const mode = argv.NODE_ENV || 'development';

  // ++++++++++++++ RULES +++++++++++++++++++

const babelRule = {
  test: /\.jsx$/,
  exclude: /node_modules/,
  use:{
    loader: 'babel-loader',
    options:{
      // option from babel rc
    }
  }
}

const sassRule = {
  test: /\.scss$/,
  use:[
    MiniCssExtractPlugin.loader,{
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader'
    }
  ]
}

const urlRule = {
  test: /\.(png|jpg|gif)$/,
  use:[
    {
      loader: 'url-loader',
      options:{
        limit: 5000
      }
    }
  ]
}

const fontRule = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "fonts/"
      }
    }
  ]
};

const rules = [babelRule, sassRule, fontRule, urlRule];
  // ++++++++++++++ End RULES +++++++++++++++++++

  // -- PLUGINS:  -- //
const hotModule = new webpack.HotModuleReplacementPlugin();
const sourceMap = new webpack.SourceMapDevToolPlugin({});
const extractCss = new MiniCssExtractPlugin({
  filename: "style.css",
  chunkFilename: "[name].css"
});
  // -- End PLUGINS:  -- //


  // -- PLUGIN: The HTML templates
  const indexHtml = new HTMLWebpackPlugin({
    title: 'CampaignDashboard',
    template: "./src/index.ejs",
    inject: true,
    minify: {
      collapseWhitespace: false,
      hash: true
    }
  });


const getPath = () => (mode === 'production') ? 'prod': 'dist';

const devServerMain = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000
}

module.exports = {
  mode: mode,
  devtool: false,
  devServer: devServerMain,
  entry: './src/index.jsx',
  output: {
   filename: '[name].js',
   path: path.resolve(__dirname,getPath())
  },
  plugins: mode !== 'production'
  ?[extractCss,sourceMap,hotModule,indexHtml]
  :[extractCss,sourceMap,indexHtml],
  module:{ rules }
}
