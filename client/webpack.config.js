const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// webpack configuration
module.exports = () => {
  return {
    mode: 'development',
    // entry point for the application
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // output for the bundled files
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // webpack plugin to generate an HTML file
      new HtmlWebpackPlugin({
        template: './index.html', 
        title: 'J.A.T.E.', 
        favicon: './favicon.ico',
      }), 
      // webpack plugin to generate a service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js'
      }),
      // webpack plugin to generate a manifest.json file
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'A simple text editor that runs in the browser and works offline.',
        background_color: '#272822',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          }
        ]
      })     
    ],

    module: {
      // css loaders
      rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, 
      {test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']}}
      },
    ],
    },
  };
};
