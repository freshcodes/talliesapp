const dotenv = require('dotenv')
dotenv.config()

const path = require('path')

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

export default config => {
  // https://github.com/firebase/firebaseui-web/issues/722#issuecomment-694277747
  config.module.rules.push({
    test: /esm\.js$/,
    loader: 'string-replace-loader',
    include: path.resolve('node_modules/firebaseui/dist'),
    query: {
      search: "import * as firebase from 'firebase/app';",
      replace: "import firebase from 'firebase/app';"
    }
  })

  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: 'robots.txt' }]))
  config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: 'browserconfig.xml' }]))

  config.plugins.push(
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY),
      AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
      DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
      PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
      STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
      MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
      APP_ID: JSON.stringify(process.env.APP_ID)
    })
  )

  return config
}
