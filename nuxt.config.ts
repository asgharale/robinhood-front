// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/hints', '@nuxt/icon/module', '@nuxt/image', '@nuxt/scripts', '@csrf-armor/nuxt', '@dargmuesli/nuxt-cookie-control', '@formkit/auto-animate/nuxt', '@nuxtjs/color-mode', '@nuxtjs/device', '@nuxtjs/html-validator', '@nuxtjs/i18n', '@nuxtjs/robots'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
