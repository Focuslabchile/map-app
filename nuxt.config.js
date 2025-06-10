export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Infomap',
        htmlAttrs: {
            lang: 'es'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },

            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@100;300;400;700&display=swap' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }
        ]
    },
    styleResources: {
        scss: [
            "@/assets/scss/colors.scss"
        ],
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "@/assets/scss/fonts.scss",
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: "@/plugins/vue-tippy.js", ssr: false },
        { src: "@/plugins/axios.js", ssr: false },
        '@/plugins/toast.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ['@nuxtjs/tailwindcss'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios'
    ],

    publicRuntimeConfig: {
        apiUrl: process.env.API_URL,
        apiToken: process.env.API_TOKEN,
        contactApiToken: process.env.CONTACT_API_TOKEN,
        mapboxApiUrl: process.env.MAPBOX_API_URL
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extend (config, { isDev, isClient }) {
            // Add Chart.js loader
            config.module.rules.push({
              test: /chart\.js$/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              ]
            })
          }
    }
}