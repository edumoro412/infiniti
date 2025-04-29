export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    currentsApiKey: process.env.NUXT_PUBLIC_APITUBE_API_KEY,
    public: {},
  },
  css: ["@/assets/styles/css/variables.css", "@/assets/styles/scss/main.scss"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
  ],
});
