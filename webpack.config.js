const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// const API_URLS = {
//   development: 'http://localhost:3000'
// }

// const API_URL = JSON.stringify(API_URLS[process.env.NODE_ENV]) // must stringify but I'm not sure why!

const sharedHtmlWebpackConf = name => {
  const result = name === 'index' ? {} : { chunks: ['main'] }
  result.favicon = path.resolve(__dirname, './src/assets/images/logo.png')
  result.template = path.resolve(__dirname, `./src/html/${name}.html`)
  result.filename = `${name}.html`
  return result
}

const config = {
  entry: {
    main: path.resolve(__dirname, './src/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'docs/'),
    filename: '[name].bundle.js',
    publicPath: '',
    // assetModuleFilename: 'assets/[name][ext]',
    assetModuleFilename: (pathData) => {
      // console.log(pathData)
      const filepath = path
        .dirname(pathData.filename)
        .split('/')
        .slice(1)
        .join('/')
      return `./src/${filepath}/[name][ext]`
    },
    clean: true

  },
  devServer: {
    port: 8087,
    compress: false,
    static: {
      directory: path.join(__dirname, '/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(sharedHtmlWebpackConf('index')),
    new HtmlWebpackPlugin(sharedHtmlWebpackConf('photographer')),
    // Define global variable from NODE_ENV for the app
    new webpack.DefinePlugin({
      DEBUG: process.env.NODE_ENV === 'development',
      // API_URL,
      VERSION: JSON.stringify(require('./package.json').version)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/i,
        use: [{
          loader: 'html-loader'
        }]
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   use: 'babel-loader'
      // },
      // https://webpack.js.org/loaders/css-loader/
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'sass-loader' // Compiles Sass to CSS
        ]
      },
      // https://stackoverflow.com/questions/67432536/webpack-5-how-to-display-images-in-html-file
      {
        test: /\.(png|svg|jpg|jpeg|gif|otf|cur|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: './[file]'
        }
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        generator: {
          filename: 'src/data/[name][ext]'
        }
      }
    ]
  },
  devtool: 'eval-source-map'
}

module.exports = (env, argv) => {
  console.log(`mode = ${argv.mode}, NODE_ENV = ${process.env.NODE_ENV}`)

  return config
}
