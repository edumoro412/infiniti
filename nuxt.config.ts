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
  ],

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