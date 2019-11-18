const dotenv = require('dotenv')
dotenv.config()

const webpack = require('webpack')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

export default config => {
  config.plugins.push(
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
      swDest: './sw.js',
      include: [/\.html$/, /\.js$/, /\.svg$/, /\.css$/, /\.png$/, /\.ico$/]
    })
  )

  config.plugins.push( new CopyWebpackPlugin([{ context: `${__dirname}/src`, from: `robots.txt` }]) )

  config.plugins.push(
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY),
      AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
      DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
      PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
      STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
      MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID)
    })
  )

  return config
}
