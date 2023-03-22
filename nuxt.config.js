export default {
  rootUrl: process.env.NODE_ENV === 'production' ? 'https://nuxt-bn-b.vercel.app' : 'http://localhost:3000',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "Mastering Nuxt: %s",
    htmlAttrs: {
      lang: "en"
    },
    bodyAttrs: {
      class: [
        "my-style"
      ]
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/sass/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/maps.client",
    "~/plugins/dataApi",
    "~/plugins/auth.client",
    "~/plugins/vCalendar.client",
    "~/plugins/stripe.client",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "~/modules/auth",
    "~/modules/algolia",
    "~/modules/cloudinary",
    "~/modules/stripe",
    "@nuxtjs/cloudinary",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
  ],
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dno09jcsf/image/upload/'
    },
  },
  cloudinary: {
    cloudName: 'dno09jcsf',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/"
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  serverMiddleware: [

  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    },
  },

  publicRuntimeConfig: {
    auth: {
      cookieName: "idToken",
      clientId: '',
    },
    algolia: {
      appId: 'ZQ9UF7RP1U',
      key: '2e3cdcce6886af847e405a224b28f275',
    },
    cloudinary: {
      apiKey: '739858233285687',
    },
    stripe: {
      key: "",
    },
  },
  privateRuntimeConfig: {
    algolia: {
      appId: 'ZQ9UF7RP1U',
      key: '96d9607dba05c44480edfd1d9795ee65',
    },
    cloudinary: {
      apiSecret: 'RKzZmtNR5UqQulX1BGzk_q9PbrI',
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  },
};
