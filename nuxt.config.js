export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "vue-nuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: false,
  server: {
    port: 2021, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  
  
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~assets/iconfont/iconfont.css", "~assets/scss/reset.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/axios.js'],
  
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/component-cache',
    '@nuxtjs/proxy',
    '@nuxtjs/axios'
  ],

  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target:'http://api-feisu.whgxwl.com:8080/',
      changeOrigin: true
    }
  },
  styleResources: {
    scss: ["~/assets/scss/variable.scss"]
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ['axios']
  }
};
