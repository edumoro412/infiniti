export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    currentsApiKey: process.env.NUXT_PUBLIC_APITUBE_API_KEY,
    public: {
      currentsApiKey: process.env.NUXT_PUBLIC_CURRENTS_API_KEY,
    },
  },
  css: ["@/assets/styles/css/variables.css", "@/assets/styles/scss/main.scss"],
  app: {
    head: {
      title: "INFINITI",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/imgs/infinito.png",
        },
      ],
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "nuxt-svgo",
    "@nuxtjs/i18n",
  ],
  i18n: {
    defaultLocale: "fr",
    locales: [
      { code: "es", name: "Español", file: "es.json" },
      { code: "en", name: "English", file: "en.json" },
      { code: "fr", name: "Français", file: "fr.json" },
      { code: "pt", name: "Português", file: "pt.json" },
      { code: "de", name: "Deutsch", file: "de.json" },
      { code: "it", name: "Italiano", file: "it.json" },
    ],
    strategy: "no_prefix",
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/scss/mixins" as *;`,
        },
      },
    },
  },
});
