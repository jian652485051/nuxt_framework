import { api,siteTitle } from './config'
const webpack = require("webpack");
const CompressionWebpackPlugin = require('compression-webpack-plugin')//这个插件可以看官网还是很好用的
const productionGzipExtensions = ['js', 'css']//对什么文件进行压缩

const Timestamp = new Date().getTime();
const pkg  = require('./package');

export default {
  ssr:false,           //是否服务端渲染,false为单页面应用

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },

  /*
  ** Headers of the page
  */
  head: {
    title: siteTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no' },
      { name: 'renderer', content: 'webkit'},
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1'},
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ff6600' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    {src: '@/plugins/common',ssr: false},
    '@/plugins/components',
    '@/plugins/filters',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    retry: {
      retries: 3
    },
    debug: false,
    baseURL:api
  },

  /*
  ** Build configuration
  */
  build: {
    publicPath:'',
    transpile: [/^element-ui/],
    postcss:{
      plugins:{
        'postcss-url':false,
        'postcss-nested': {},
        'cssnano': { preset: 'default' },
        'postcss-assets':{
          relative:true,
          loadPaths: ['assets/img','assets/font']
        }
      },
      preset:{
        stage:2,
        autoprefixer: {
          grid: false,
          overrideBrowserslist: [
            'last 2 versions'
          ]
        },
        importFrom:['assets/css/root.css']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      //每次构建打包时给文件名加上时间戳，保证版本更新时与上版本文件名不一样
      config.output.filename = `js/[name].${pkg.version}.js`;
      config.output.chunkFilename = `js/[name].${pkg.version}.js`;
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),//该插件能够使得指定目录被忽略，从而使得打包变快，文件变小
      new CompressionWebpackPlugin({
        algorithm: 'gzip',//压缩算法
        test: productionGzipExtensions,//处理所有匹配此 {RegExp} 的资源
        threshold: 10240,//只处理比这个值大的资源。按字节计算
        minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5, //控制打包生成js的个数
        minChunkSize: 100
      })
    ]
  },
  router: {
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    //middleware:'headers'
  }
}
