const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
  ]
})
module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: './config/.env.production',
      }),
    ],
  },
}