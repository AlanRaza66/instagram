export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@nuxt/ui"],
  build: {
    transpile: ["trpc-nuxt"],
  },
  css: ["~/assets/css/main.css"],
  typescript: {
    shim: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
