import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/hints', '@nuxt/icon/module', '@nuxt/image', '@nuxt/scripts',
    '@csrf-armor/nuxt', '@dargmuesli/nuxt-cookie-control', '@formkit/auto-animate/nuxt',
    '@nuxtjs/color-mode', '@nuxtjs/device', '@nuxtjs/html-validator',
    '@nuxtjs/i18n', '@nuxtjs/robots',
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    '@fontsource-variable/inter',
    '@fontsource-variable/vazirmatn',
    '~/assets/css/main.css',
  ],
  vite: { plugins: [tailwindcss()] },

  // adds class="dark" to <html>, follows the OS by default
  colorMode: { classSuffix: '', preference: 'system', fallback: 'light' },

  i18n: {
    defaultLocale: 'fa',
    strategy: 'prefix_except_default', // /about (fa), /en/about (en)
    locales: [
      { code: 'fa', language: 'fa-IR', name: 'فارسی', dir: 'rtl', file: 'fa.json' },
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
    ],
    detectBrowserLanguage: { useCookie: true, cookieKey: 'i18n_locale', redirectOn: 'root' },
  },

  runtimeConfig: {
    public: { apiBase: 'http://localhost:8000/api' }, // override with NUXT_PUBLIC_API_BASE
  },
})