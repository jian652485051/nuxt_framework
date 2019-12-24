export default {
  mode: 'universal',  //universal or spa

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name,
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
    {src: '@/plugins/responsive',ssr: false},
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
    debug: false
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
          loadPaths: ['assets/img']
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
    extend(config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // config.module.rules.push({
        //   test: /\.postcss$/,
        //   use: [
        //     'vue-style-loader',
        //     'css-loader',
        //     {
        //       loader: 'postcss-loader'
        //     }
        //   ]
        // })
      }
    }
  },
  router: {
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    //middleware:'headers'
  }
}
