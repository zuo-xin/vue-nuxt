import router from "./router";
import i18n from "./config/i18n.js";

export default {
  head: {
    //title: "vue-nuxt",
    meta: [
      { charset: "utf-8" },
	  {"http-equiv":"X-UA-Compatible",content:"IE=edge"},
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" },
    ],
    link: [
		{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      	{ rel: "shortcut icon", href: "/favicon.ico" },
      	{ rel: "apple-touch-icon", href: "/favicon.ico" }
	]
  },
  loading: false,
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  css: ["~assets/iconfont/iconfont.css", "~assets/scss/reset.scss"],
  plugins: ["~/plugins/axios.js"],
  components: true,
  buildModules: [],
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/component-cache",
    "@nuxtjs/proxy",
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    ["nuxt-i18n", i18n]
  ],
  router,
  axios: {
    proxy: true
  },
  proxy: {
    "/api": {
      target: "http://api-feisu.whgxwl.com:8080/",
      changeOrigin: true
    }
  },
  styleResources: {
    scss: ["~/assets/scss/variable.scss"]
  },
  build: {
    extractCSS: true
  }
};
