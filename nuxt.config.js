import pkg from './package'

export default {
    mode: 'universal',

    server: {
        port: 8000, // default: 3000
        host: '0.0.0.0', // default: localhost,
    },

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'renderer', content: 'webkit'},
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1'},
            { hid: 'description', name: 'description', content: pkg.description }
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
        transpile: [/^element-ui/],
        postcss: [
            require('postcss-import')({
                path: ['assets/css']
            }),
            require('postcss-url')(),
            require('postcss-cssnext')(),
            require('postcss-assets')({
                relative: true,
                loadPaths: ['assets/img']
            })
        ],
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {}
    },
    router: {
        linkActiveClass: '',
        linkExactActiveClass: 'active',
        //middleware:'headers'
    }
}
